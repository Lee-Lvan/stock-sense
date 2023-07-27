import { NextRequest, NextResponse } from 'next/server';
import User from '../../models/usersModel';
import Watchlistitem from '../../models/watchlistItemsModel';
import getDefaultWatchlist from '../watchlist/getDefaultWatchlist';
import { ObjectId } from 'mongodb';

export const GET = async (req: NextRequest) => {
  try {
    const params = req.nextUrl.searchParams.get('query') as string;
    const response = await User.findOne({ email: params }).populate('watchlist');
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
    const chunks = [];
    for await (const chunk of req.body) {
      chunks.push(chunk);
    }
    const transactionData = JSON.parse(Buffer.concat(chunks).toString('utf-8'));
    const user = await User.findOne({ email: email });
    if (typeof transactionData === 'object' && !Array.isArray(transactionData)) {
      user.holdings.push({
        _id: new ObjectId(),
        name: transactionData.name,
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
      console.log(transactionData);
      for (const data of transactionData) {
        const { _id, sharesToSell, currentPrice } = data;
        const holdingIndex = user.holdings.findIndex(holding => holding._id.toString() === _id);

        if (holdingIndex !== -1) {
          const existingHolding = user.holdings[holdingIndex];
          const sharesToSellInt = parseInt(sharesToSell, 10);

          if (sharesToSellInt > 0 && existingHolding.quantity >= sharesToSellInt) {
            existingHolding.quantity -= sharesToSellInt;
            existingHolding.totalPrice = (
              existingHolding.quantity * existingHolding.buyPrice
            ).toFixed(2);
            user.cash += sharesToSellInt * parseFloat(currentPrice);
            if (existingHolding.quantity === 0) {
              user.holdings.splice(holdingIndex, 1);
            }
          }
        }
      }
    }
    await user.save();
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error handling request:', error);
  }
};
