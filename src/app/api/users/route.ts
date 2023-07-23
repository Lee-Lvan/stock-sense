import { NextRequest, NextResponse } from "next/server";
import User from "../../models/usersModel";
import getDefaultWatchlist from "../watchlist/getDefaultWatchlist";

export const GET = async (req: NextRequest) => {
  try {
    const params = req.nextUrl.searchParams.get("query") as string;
    const response = await User.findOne({ email: params }).populate('watchlist');
    if (response) {
      return NextResponse.json(response);
    } else {
      const defaultWatchlist = await getDefaultWatchlist();
      const newUser = new User({
        email: params,
        watchlist: defaultWatchlist,
        holdings: [],
        cash: 10000
      });
      await newUser.save();
      const response = await User.findById(newUser._id).populate('watchlist');
      return NextResponse.json(response);
    }
  } catch (error) {
    console.error('Error handling request:', error);
  }
}
