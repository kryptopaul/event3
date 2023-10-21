import { ethers } from "ethers";
import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv";
dotenv.config();

const route = async function onramp(req: NextRequest) {
  const sponsor = process.env.SPONSOR!;
  const data = await req.json();
  const { address } = data;
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_goerli"
  );
  const signerWallet = new ethers.Wallet(sponsor, provider);
  const tx = await signerWallet.sendTransaction({
    to: address,
    value: ethers.utils.parseEther("0.005"),
  });
  await tx.wait(1);
  console.log("tx", tx);
  return NextResponse.json("success");
};

export const POST = route;
