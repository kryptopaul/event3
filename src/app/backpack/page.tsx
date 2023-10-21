"use client";
import { Text, Button, Container, Title, Progress, Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import Link from "next/link";
import { HeaderSimple } from "../../../components/HeaderSimple/HeaderSimple";
import { FooterSimple } from "../../../components/FooterSimple/FooterSimple";
import abi from "@/abi/abi.json";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import Safe, { getSafeContract } from "@safe-global/protocol-kit";
import { useEffect, useState } from "react";

import { ADAPTER_EVENTS, UserInfo, WALLET_ADAPTERS } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3AuthOptions } from "@web3auth/modal";
import { EthersAdapter } from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import {
  AuthKitSignInData,
  Web3AuthModalPack,
  Web3AuthEventListener,
} from "../../../authHelpers";

import SafeApiKit from "@safe-global/api-kit";
import { SafeFactory } from "@safe-global/protocol-kit";
import { SafeAccountConfig } from "@safe-global/protocol-kit";
import dotenv from "dotenv";
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
import { UserInfoIcons } from "../../../components/UserInfoIcons/UserInfoIcons";
import { CardWithStats } from "../../../components/CardWithStats/CardWithStats";

dotenv.config();

const connectedHandler: Web3AuthEventListener = (data) =>
  console.log("CONNECTED", data);
const disconnectedHandler: Web3AuthEventListener = (data) =>
  console.log("DISCONNECTED", data);

export default function UserWallet() {
  const [web3AuthModalPack, setWeb3AuthModalPack] =
    useState<Web3AuthModalPack>();
  const [safeAuthSignInResponse, setSafeAuthSignInResponse] =
    useState<AuthKitSignInData | null>(null);
  const [userInfo, setUserInfo] = useState<Partial<UserInfo>>();
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [nfts, setNFTs] = useState<any[] | null>(null); // Idk if alchemy provides types
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [backpackCreationStatus, setBackpackCreationStatus] =
    useState<string>("");
  const [displayAlert, setDisplayAlert] = useState<boolean>(false);

  // set stuff to be used by the event page (yes, I know but I'm too late to do this properly  :( )
  useEffect(() => {
    (async () => {
      //@ts-ignore
      const privateKey = await web3AuthModalPack?.getProvider()?.request({
        method: "eth_private_key",
      });
      localStorage.setItem("privateKey", privateKey);
      const safeAddress = safeAuthSignInResponse?.safes![0]!;
      localStorage.setItem("safeAddress", safeAddress);
      const email = userInfo?.email!;
      localStorage.setItem("email", email);
      const name = userInfo?.name!;
      localStorage.setItem("name", name);
    })();
  }, [web3AuthModalPack, safeAuthSignInResponse, userInfo]);

  useEffect(() => {
    (async () => {
      const options: Web3AuthOptions = {
        clientId:
          "BJ-D7-ykBL3jVzcBo0EUzeZ3tdtHAour1uRC6MUXIZBlmRUH0tXTLJTEhwTRWMDzCQG0eDjY5a_zeGb5FlFZ76o",
        web3AuthNetwork: "testnet",
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x5",
          rpcTarget: `https://rpc.ankr.com/eth_goerli`,
        },
        uiConfig: {
          loginMethodsOrder: ["google", "facebook"],
        },
      };

      const modalConfig = {
        [WALLET_ADAPTERS.TORUS_EVM]: {
          label: "torus",
          showOnModal: false,
        },
        [WALLET_ADAPTERS.METAMASK]: {
          label: "metamask",
          showOnDesktop: true,
          showOnMobile: false,
        },
      };

      const openloginAdapter = new OpenloginAdapter({
        loginSettings: {
          mfaLevel: "mandatory",
        },
        adapterSettings: {
          uxMode: "popup",
          whiteLabel: {
            appName: "Safe",
          },
        },
      });

      const web3AuthModalPack = new Web3AuthModalPack({
        txServiceUrl: "https://safe-transaction-goerli.safe.global",
      });

      await web3AuthModalPack.init({
        options,
        adapters: [openloginAdapter],
        modalConfig,
      });

      web3AuthModalPack.subscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler);

      web3AuthModalPack.subscribe(
        ADAPTER_EVENTS.DISCONNECTED,
        disconnectedHandler
      );

      setWeb3AuthModalPack(web3AuthModalPack);

      return () => {
        web3AuthModalPack.unsubscribe(
          ADAPTER_EVENTS.CONNECTED,
          connectedHandler
        );
        web3AuthModalPack.unsubscribe(
          ADAPTER_EVENTS.DISCONNECTED,
          disconnectedHandler
        );
      };
    })();
  }, []);

  useEffect(() => {
    if (web3AuthModalPack && web3AuthModalPack.getProvider()) {
      (async () => {
        await login();
      })();
    }
  }, [web3AuthModalPack]);

  useEffect(() => {
    if (safeAuthSignInResponse?.safes) {
      if (safeAuthSignInResponse?.safes?.length > 0) {
        (async () => {
          await axios
            .post("/api/getNFTs", {
              address: safeAuthSignInResponse!.safes![0]!,
            })
            .then((res) => {
              setNFTs(res.data.ownedNfts);
            });
        })();
      }
    }
  }, [safeAuthSignInResponse]);

  const login = async () => {
    if (!web3AuthModalPack) return;

    const signInInfo = await web3AuthModalPack.signIn();
    console.log("SIGN IN RESPONSE: ", signInInfo);

    const userInfo = await web3AuthModalPack.getUserInfo();
    console.log("USER INFO: ", userInfo);
    setSafeAuthSignInResponse(signInInfo);
    setUserInfo(userInfo || undefined);
    setProvider(web3AuthModalPack.getProvider() as SafeEventEmitterProvider);
  };

  const logout = async () => {
    if (!web3AuthModalPack) return;

    await web3AuthModalPack.signOut();

    setProvider(null);
    setSafeAuthSignInResponse(null);
  };

  const createSafe = async () => {
    try {
      setLoading(true);
      setProgress(0);
      setBackpackCreationStatus(
        "Preparing the informaton for your Backpack..."
      );
      const provider = new ethers.providers.JsonRpcProvider(
        "https://rpc.ankr.com/eth_goerli"
      );

      // @ts-ignore
      const privateKey = await web3AuthModalPack?.getProvider()?.request({
        method: "eth_private_key",
      });
      const signer = new ethers.Wallet(privateKey, provider);
      const ethAdapterOwner = new EthersAdapter({
        ethers,
        signerOrProvider: signer,
      });
      const txServiceUrl = "https://safe-transaction-goerli.safe.global";
      const safeService = new SafeApiKit({
        txServiceUrl,
        ethAdapter: ethAdapterOwner,
      });
      const safeFactory = await SafeFactory.create({
        ethAdapter: ethAdapterOwner,
      });
      const safeAccountConfig: SafeAccountConfig = {
        owners: [await signer.getAddress()],
        threshold: 1, // We dont need multisig functionality
      };
      console.log("Safe info prepared: Funding EOA");
      setBackpackCreationStatus(
        "Preparing Ethereum fees... (don't worry, it's on us!)"
      );
      setProgress(25);
      await axios.post("/api/onramp", {
        address: await signer.getAddress(),
      });
      console.log("EOA Funded: Deploying Safe");
      setBackpackCreationStatus("Deploying your Backpack...");
      setProgress(50);
      const safeSdkOwner = await safeFactory.deploySafe({ safeAccountConfig });
      const safeAddress = await safeSdkOwner.getAddress();
      console.log("Your Safe has been deployed:");
      console.log(`https://goerli.etherscan.io/address/${safeAddress}`);
      console.log(`https://app.safe.global/gor:${safeAddress}`);

      // Minting Welcome NFT
      console.log("Minting Welcome NFT");
      setBackpackCreationStatus("Minting your Welcome collectible...");
      setProgress(75);
      const nftAddress = "0x78385a1be94e2a04c07bbf5fa01ee23efd218653";
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
      setSafeAuthSignInResponse(
        safeAuthSignInResponse
          ? {
              ...safeAuthSignInResponse,
              safes: [safeAddress],
            }
          : null
      );
      setLoading(false);
      setProgress(100);
      setBackpackCreationStatus("Your backpack is ready!");
      setDisplayAlert(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderSimple />
      <Container size="lg">
        <Alert
          variant="outline"
          color="lime"
          title="Your backpack has been set up!"
          icon={<IconInfoCircle />}
          mt={-50}
          display={displayAlert ? "flex" : "none"}
        >
          Why not check out an <Link href={"/event"}>Epic Web3 Meetup</Link>{" "}
          soon?
        </Alert>
        <br />
        {userInfo ? <Title>{`Welcome!`}</Title> : null}
        <br />
        {userInfo ? (
          <UserInfoIcons
            image={userInfo.profileImage!}
            name={userInfo.name ? userInfo.name : userInfo.email!}
            safeAddress={safeAuthSignInResponse?.safes![0]!}
          />
        ) : null}
        <br />

        <Title order={2}>Your backpack</Title>
        <Text>
          Your backpack allows you to store your event collectibles and other
          digital assets.
        </Text>
        <br />

        {safeAuthSignInResponse?.safes?.length === 0 ? (
          <>
            <Title order={2}>
              Seems like you&apos;ve not set up your backpack yet.
            </Title>
            <Text>
              This will only take a moment and you&apos;ll receive a free
              collectible as a reward!
            </Text>
            <br />
            <Button loading={loading} onClick={createSafe}>
              Create Backpack
            </Button>
            <br />
            <br />
            <br />
            <Progress
              animated
              value={progress}
              style={{
                display: loading ? "block" : "none",
              }}
            />
            <br />
            <Text>{backpackCreationStatus}</Text>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
              }}
            >
              {nfts
                ? nfts.map((nft, key) => {
                    return (
                      <CardWithStats
                        key={key}
                        name={nft.contract.name}
                        image={nft.rawMetadata.image.replace(
                          "ipfs://",
                          "https://ipfs.io/ipfs/"
                        )}
                        // https://testnets.opensea.io/assets/goerli/0xf4e4ef564dea63fd007102b335338cbe0869bc01/2
                        url={`https://testnets.opensea.io/assets/goerli/${nft.contract.address}/${nft.tokenId}`}
                      />
                    );
                  })
                : null}
            </div>
          </>
        )}
      </Container>
      <FooterSimple />
    </>
  );
}
