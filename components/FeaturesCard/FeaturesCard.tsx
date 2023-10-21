"use client";
import { Card, Image, Text, Group, Badge, Center, Button } from "@mantine/core";

import classes from "./FeaturesCard.module.css";
import abi from "../../src/abi/abi.json";
import { ethers } from "ethers";

import Safe, { getSafeContract } from "@safe-global/protocol-kit";

import { EthersAdapter } from "@safe-global/protocol-kit";

import AccountAbstraction, {
  AccountAbstractionConfig,
} from "@safe-global/account-abstraction-kit-poc";
import { GelatoRelayPack } from "@safe-global/relay-kit";
import {
  MetaTransactionData,
  MetaTransactionOptions,
  OperationType,
  RelayTransaction,
} from "@safe-global/safe-core-sdk-types";
import axios from "axios";
import { useState } from "react";
interface FeaturesCardProps {
  privateKey: string;
  safeAddress: string;
  name: string;
  email: string;
  nftAddress: string;
}

export function FeaturesCard({
  privateKey,
  safeAddress,
  name,
  email,
  nftAddress,
}: FeaturesCardProps) {
  const [loading, setLoading] = useState(false);

  async function handlePurchase() {
    setLoading(true);
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rpc.ankr.com/eth_goerli"
    );
    const signer = new ethers.Wallet(privateKey, provider);
    const nftContract = new ethers.Contract(nftAddress, abi, signer);
    const relayPack = new GelatoRelayPack(
      "3pn_hYCQSf30XYDygl__21SH1kM_scukWtYiuXilTII_"
    );
    const sdkConfig: AccountAbstractionConfig = {
      relayPack,
    };
    const safeAccountAbstraction = new AccountAbstraction(signer);
    await safeAccountAbstraction.init(sdkConfig);

    const safeTransaction: MetaTransactionData = {
      to: nftAddress,
      data: nftContract.interface.encodeFunctionData("mint", [1]),
      value: "0",
      operation: OperationType.Call,
    };
    // 0xa0712d680000000000000000000000000000000000000000000000000000000000000001
    console.log(safeTransaction.data);
    const options: MetaTransactionOptions = {
      isSponsored: true,
    };
    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer,
    });

    const safeSDK = await Safe.create({
      ethAdapter,
      safeAddress,
    });
    const standardizedSafeTx = await relayPack.createRelayedTransaction({
      transactions: [safeTransaction],
      safe: safeSDK,
      options: options,
    });
    const signedSafeTx = await safeSDK.signTransaction(standardizedSafeTx);
    const safeSingletonContract = await getSafeContract({
      ethAdapter: ethAdapter,
      safeVersion: await safeSDK.getContractVersion(),
    });
    const encodedTx = safeSingletonContract.encode("execTransaction", [
      signedSafeTx.data.to,
      signedSafeTx.data.value,
      signedSafeTx.data.data,
      signedSafeTx.data.operation,
      signedSafeTx.data.safeTxGas,
      signedSafeTx.data.baseGas,
      signedSafeTx.data.gasPrice,
      signedSafeTx.data.gasToken,
      signedSafeTx.data.refundReceiver,
      signedSafeTx.encodedSignatures(),
    ]);

    const relayTransaction: RelayTransaction = {
      target: safeAddress,
      encodedTransaction: encodedTx,
      chainId: 5,
      options,
    };
    const relayResponse = await relayPack.relayTransaction(relayTransaction);
    console.log(
      `Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${relayResponse.taskId}`
    );
    let status;
    do {
      const response: any = await axios.get(
        `https://api.gelato.digital/tasks/status/${relayResponse.taskId}`
      );
      status = response.data.task.taskState;
      console.log("status", status);
      await new Promise((r) => setTimeout(r, 1000));
    } while (status !== "ExecSuccess");
    // Notify owner
    await axios.post("/api/webhook", { name, email });
    console.log("done");
    setLoading(false);
    alert("You have successfully signed up!");
  }

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Group justify="space-between" mb={"md"}>
        <div>
          <Text fw={500}>Epic Web3 Meetup</Text>
          <Text fz="xs" c="dimmed">
            Price per ticket
          </Text>
        </div>
        <Badge size="xl" variant="outline">
          FREE
        </Badge>
      </Group>

      <Card.Section className={classes.section}>
        <Group gap={30}>
          <Button
            radius="xl"
            size="lg"
            style={{ flex: 1 }}
            onClick={handlePurchase}
            loading={loading}
          >
            Sign up
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}
