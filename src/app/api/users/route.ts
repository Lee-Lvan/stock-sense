import { NextRequest, NextResponse } from "next/server";
import User from "../../models/usersModel";
import getDefaultWatchlist from "../watchlist/getDefaultWatchlist";
import { ObjectId } from "mongodb";

export const GET = async (req: NextRequest ) => {
  const params = req.nextUrl.searchParams.get("query") as string;
  const response = await User.find({ email: params }).populate('watchlist');
  if (response.length) {
    return NextResponse.json(response);
  } else {
    const defaultWatchlist: ObjectId[] = await getDefaultWatchlist();
    const newUser = new User({
      email: params,
      watchlist: defaultWatchlist,
      holdings: [],
      cash: 10000
    })
    await newUser.save();
    const response = await User.findOne({email: params}).populate('watchlist').exec()
    return NextResponse.json(response);
  }  
}
