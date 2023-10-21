import { ethers } from "ethers";
import { NextRequest, NextResponse } from "next/server";
import { Network, Alchemy } from "alchemy-sdk";
import dotenv from "dotenv";
dotenv.config();

const route = async function getNFTs(req: NextRequest) {
  const data = await req.json();
  const { address } = data;
  const alchemyKey = process.env.ALCHEMY_KEY!;

  const settings = {
    apiKey: alchemyKey, // Replace with your Alchemy API Key.
    network: Network.ETH_GOERLI, // Replace with your network.
  };

  const alchemy = new Alchemy(settings);

  // Print all NFTs returned in the response:
  const nfts = await alchemy.nft.getNftsForOwner(address);
  return NextResponse.json(nfts);
};

// No idea why the body isnt parsed when this is set to get
export const POST = route;
