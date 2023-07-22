import { NextRequest, NextResponse } from "next/server";
import User from "../../models/usersModel";

export const GET = async (req: NextRequest ) => {
  const params = req.nextUrl.searchParams.get("query") as string;
  const response = await User.find({ email: params });
  console.log('route, response------->', response);
  if (response !== null) {
    return NextResponse.json(response);
  } else {
    const newUser = {
      email: params,
      watchlist: [], // refer to the id from the watchlistitems
      holdings: [],
    }
    const user = await User.create(newUser);
    console.log('user created------->', user);
    return NextResponse.json(user);
  }

}

