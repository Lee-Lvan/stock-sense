import { NextRequest, NextResponse } from "next/server";
import User from "../../models/usersModel";

export const GET = async (req: NextRequest ) => {
  const params = req.nextUrl.searchParams.get("query") as string;
  const response = await User.find({ email: params });
  if (response) {
    return NextResponse.json(response);
  } else {
    const newUser = {
      username: params,
      watchlist: [], // refer to the id from the watchlistitems
      holdings: [],
    }
  }

}

