import { NextRequest, NextResponse } from 'next/server';
import User from '../../models/usersModel';
import Watchlistitem from '../../models/watchlistItemsModel';
import getDefaultWatchlist from '../watchlist/getDefaultWatchlist';
import { ObjectId } from 'mongodb';
import { HoldingsT } from '@/app/types/Holdings.type';
import { Readable } from 'stream';

export const GET = async (req: NextRequest) => {
  try {
    const params = req.nextUrl.searchParams.get('query') as string;
    const response = await User.findOne({ email: params }).populate(
      'watchlist',
    );
    if (response) {
      return NextResponse.json(response);
    } else {
      const defaultWatchlist = await getDefaultWatchlist();
      const newUser = new User({
        email: params,
        watchlist: defaultWatchlist,
        holdings: [],
        cash: 10000,
      });
      await newUser.save();
      const response = await User.findById(newUser._id).populate('watchlist');
      return NextResponse.json(response);
    }
  } catch (error) {
    console.error('Error handling request:', error);
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const email = req.nextUrl.searchParams.get('user') as string;
    const chunks: Uint8Array[] = [];
    const reader = req.body!.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    const concatenatedBuffer = chunks.reduce((acc, chunk) => {
      const combined = new Uint8Array(acc.length + chunk.length);
      combined.set(acc);
      combined.set(chunk, acc.length);
      return combined;
    }, new Uint8Array());

    const transactionData = JSON.parse(
      new TextDecoder().decode(concatenatedBuffer),
    );

    let user = await User.findOne({ email: email });

    if (
      typeof transactionData === 'object' &&
      !Array.isArray(transactionData)
    ) {
      user.holdings.push({
        _id: new ObjectId(),
        name: transactionData.name,
        exchange: transactionData.exchange,
        quantity: transactionData.quantity,
        buyPrice: transactionData.buyPrice,
        totalPrice: transactionData.totalPrice,
      });
      user.cash -= transactionData.totalPrice;

      const symbol = await Watchlistitem.findOne({
        name: { $regex: new RegExp(transactionData.name, 'i') },
      });

      if (!symbol) {
        const newSymbol = await Watchlistitem.create({
          name: transactionData.name,
        });
        user.watchlist.push(newSymbol._id);
      } else {
        user.watchlist.push(symbol._id);
      }
    } else if (Array.isArray(transactionData)) {
      for (const data of transactionData) {
        const { _id, sharesToSell, currentPrice } = data;
        const holdingIndex = user.holdings.findIndex(
          (holding: HoldingsT) => holding._id.toString() === _id,
        );

        if (holdingIndex !== -1) {
          const sharesToSellInt = parseInt(sharesToSell, 10);

          if (
            sharesToSellInt > 0 &&
            user.holdings[holdingIndex].quantity >= sharesToSellInt
          ) {
            user.holdings[holdingIndex].quantity -= sharesToSellInt;
            user.holdings[holdingIndex].totalPrice = (
              user.holdings[holdingIndex].quantity *
              user.holdings[holdingIndex].buyPrice
            ).toFixed(2);
            user.cash += sharesToSellInt * parseFloat(currentPrice);

            if (user.holdings[holdingIndex].quantity === 0) {
              user.holdings.splice(holdingIndex, 1);
            }
          }
        }
      }
    }

    user = await User.findOneAndUpdate({ email: email }, user);

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error handling request:', error);
  }
};
