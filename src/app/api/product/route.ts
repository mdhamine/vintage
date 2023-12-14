export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { withDatabase } from "../_db/withDatabase";
import { Product } from "./model";
import { connectDB } from "../_db/connectDB";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();
    const url = new URL(req.nextUrl);
    const slugs = url.searchParams.get("slugs")?.split(",") || [];

    // console.log({ slugs });

    const products = await Product.find({ slug: { $in: slugs } }).exec();

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
      messsage: JSON.stringify(err),
    });
  }
};
