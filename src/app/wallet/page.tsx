"use client";
import { Image, Grid, Text, Button } from "@mantine/core";
import { Container, Center, Title } from "@mantine/core";
import { HeroBullets } from "../../../components/HeroBullets/HeroBullets";
import { HeaderSimple } from "../../../components/HeaderSimple/HeaderSimple";
import { FeaturesCard } from "../../../components/FeaturesCard/FeaturesCard";
import { FooterSimple } from "../../../components/FooterSimple/FooterSimple";

import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";

import { useEffect, useState } from "react";

import { ADAPTER_EVENTS, UserInfo, WALLET_ADAPTERS } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3AuthOptions } from "@web3auth/modal";

import {
  AuthKitSignInData,
  Web3AuthModalPack,
  Web3AuthEventListener,
} from "../../../authHelpers";

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

  return (
    <>
      <HeaderSimple />
      <Container size="lg">
        <Title>Wallet</Title>
        <Text>Debug mode</Text>
        <Text>{`EOA: ${safeAuthSignInResponse?.eoa}`}</Text>
        <Text>{`Safes: ${safeAuthSignInResponse?.safes}`}</Text>
        {/* <Text>{`${account}`}</Text>
        <Text>{`${privateKey}`}</Text>
        <Button onClick={login}>Connect Wallet</Button> */}
        {safeAuthSignInResponse?.safes?.length === 0 ? (
          <>
            <Text>No Safes - Create one?</Text>
            <Button>Create Safe</Button>
          </>
        ) : (
          <Text>Safe</Text>
        )}
      </Container>
      <FooterSimple />
    </>
  );
}
