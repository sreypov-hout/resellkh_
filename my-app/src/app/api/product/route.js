
import { NextResponse } from "next/server";
import { getAllProduct } from "../../../../lib/prisma/product-prisma";

export const GET = async () => {
  const payload = await getAllProduct();
  return NextResponse.json({
    message: " Product have been found successfully",
    payload,
    status: 200,
  },{status : 200});
};
