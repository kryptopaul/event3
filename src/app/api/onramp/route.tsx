import { ethers } from "ethers";
import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv";
dotenv.config();

const route = async function onramp(req: NextRequest) {
  const sponsor = process.env.SPONSOR!;
  const data = await req.json();
  const { address } = data;
  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mainnet.g.alchemy.com/v2/5CA4mBnOfkXDqz5gVelXqhyfBYwat2zC"
  );
  const signerWallet = new ethers.Wallet(sponsor, provider);
  const tx = await signerWallet.sendTransaction({
    to: address,
    value: ethers.utils.parseEther("0.075"), // aprox to deploy a safe
    gasPrice: ethers.utils.parseUnits("400", "gwei"), // Just to be sure it gets mined, subject to change
  });
  console.log("submitted tx", tx.hash);
  return NextResponse.json({ txHash: tx.hash });
};

export const POST = route;
