import mongoose from "mongoose";
import { NextRequest } from "next/server";

type RouteHandler<T> = (_req: NextRequest, ...others: any) => T;

export const withDatabase = async <T>(handler: RouteHandler<T>) => {
  const dbUrl = process.env.DB_URL;

  if (!dbUrl) throw new Error("DB_URL is not defined");

  await mongoose.connect(dbUrl);

  return async (req: NextRequest, ...others: any) => {
    return handler(req, ...others);
  };
};
