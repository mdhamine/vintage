export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Product } from "../product/model";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const orderedProducts = await Product.find({
      slug: { $in: body.products.map((product: any) => product.slug) },
      stock: { $gt: 0 },
    }).select("name slug price stock");

    if (orderedProducts.length === 0) {
      return NextResponse.json({
        success: false,
        // message: "Products might be out of stock. Please order again later.",
        message: "قد تكون المنتجات غير متوفرة حاليًا. يرجى إعادة الطلب لاحقًا.",
      });
    }

    const smtpConfig = {
      host: process.env.SMTP_HOST,
      port: 465, // 587,
      secure: true,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
    };

    const transporter = nodemailer.createTransport(smtpConfig);

    // const productsOrdered = orderedProducts.map(proudct => {return {name: product.}})

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: [process.env.RECEIVER_EMAIL || ""],
      // to: process.env.RECEIVER_EMAIL,
      subject: "New order on the website",
      text: `
        You have received a new order.

        Here are the order details:
        -----------------------------------------------

        Fullname: ${body.fullname}
        Phone: ${body.phone}
        Address: ${body.address}
        Delivery Type: ${body.delivery}

        -----------------------------------------------

        Products Ordered:
        ${orderedProducts.map((product: any, index: number) => {
          const orderFromCustomer = body.products.find(
            (p: any) => p.slug === product.slug
          );
          return `
                Product ${index + 1}
                Name: ${product.name}
                Price: ${product.price}
                Quantity: ${orderFromCustomer?.quantity}
                Stock Remaining: ${
                  product.stock - orderFromCustomer?.quantity || 1
                }
            `;
        })}

        -----------------------------------------------
        Total: ${orderedProducts.reduce((acc, curr) => {
          const orderFromCustomer = body.products.find(
            (p: any) => p.slug === curr.slug
          );
          return acc + (curr.price * orderFromCustomer?.quantity || 1);
        }, 0)}
        Order Received on: ${new Date().toISOString()}
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    if (info.rejected.length > 0) {
      return NextResponse.json({
        success: false,
        message: "تعذر إرسال البريد الإلكتروني. يرجى إعادة الطلب لاحقًا.",
        // message: "Couldnt send email. Please order again later.",
      });
    }

    const productsInDb = await Product.find({
      slug: { $in: body.products.map((product: any) => product.slug) },
    });

    productsInDb.forEach(async (product) => {
      const orderFromCustomer = body.products.find(
        (p: any) => p.slug === product.slug
      );
      product.stock = product.stock - orderFromCustomer?.quantity || 1;
      await product.save();
    });

    return NextResponse.json({
      success: true,
      // message: "Order received successfully",
      message: "تم استلام الطلب بنجاح",
    });
  } catch (error) {
    console.error("Error on order :", error);
    return NextResponse.json({
      success: false,
      // message: "Something went wrong. Please try again later.",
      message: "حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقًا.",
    });
  }
}
