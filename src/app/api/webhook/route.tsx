import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const route = async function webhook(req: NextRequest) {
  const webhook = process.env.WEBHOOK!;
  const { name, email } = await req.json();
  const message = {
    content: null,
    embeds: [
      {
        color: 3517456,
        fields: [
          {
            name: "New Signup!",
            value: `Name: ${name}\nEmail: ${email}`,
          },
        ],
      },
    ],
    attachments: [],
  };
  await axios.post(webhook, message);
  return NextResponse.json("success");
};

export const POST = route;
