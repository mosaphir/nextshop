import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import axios from "axios";

export async function POST(req: Request) {
  const { amount, currency, productId } = await req.json();

  // Create order in DB
  const order = await prisma.order.create({
    data: {
      total: amount,
      currency,
      status: "pending",
      userId: 1, // Replace with actual logged-in user id
    },
  });

  // Call Apirone API for crypto payment
  try {
    const response = await axios.post("https://apirone.com/api/v2/invoice", {
      amount,
      currency,
      orderId: order.id,
    });

    // Update order with payment URL
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentUrl: response.data.payment_url },
    });

    return NextResponse.json({ paymentUrl: response.data.payment_url });
  } catch (error) {
    return NextResponse.json({ error: "Payment API error" }, { status: 500 });
  }
}
