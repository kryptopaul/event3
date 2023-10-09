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
  // const [web3auth, setWeb3auth] = useState<any>(null);
  // const [account, setAccount] = useState<string | null>(null);

  // const [idToken, setIdToken] = useState<string | null>(null);
  // const [privateKey, setPrivateKey] = useState<string | null>(null);
  // const [events, setEvents] = useState<string[]>([
  //   `A sample application to demonstrate how to integrate self-custodial\nsocial login and transacting with Web3Auth and userop.js.`,
  // ]);
  // const [loading, setLoading] = useState(false);

  // const web3AuthClientId =
  //   "BJ-D7-ykBL3jVzcBo0EUzeZ3tdtHAour1uRC6MUXIZBlmRUH0tXTLJTEhwTRWMDzCQG0eDjY5a_zeGb5FlFZ76o";

  // useEffect(() => {
  //   console.log(privateKey);
  //   console.log(idToken);
  //   console.log(account);
  //   const init = async () => {
  //     setLoading(true);
  //     try {
  //       const provider = new JsonRpcProvider("https://rpc.ankr.com/eth_goerli");
  //       const network = await provider.getNetwork();
  //       const chainId = network.chainId;
  //       const web3auth = new Web3Auth({
  //         clientId: web3AuthClientId,
  //         web3AuthNetwork: "testnet",
  //         chainConfig: {
  //           chainNamespace: CHAIN_NAMESPACES.EIP155,
  //           chainId: toQuantity(chainId),
  //           rpcTarget: "https://rpc.ankr.com/eth_goerli",
  //         },
  //       });

  //       await web3auth.initModal();

  //       setWeb3auth(web3auth);
  //       // setAuthorized(web3auth);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   init();
  // }, []);

  // const createAccount = async (privateKey: string) => {
  //   console.log(privateKey);
  //   const acc = new Wallet(privateKey);
  //   console.log(acc);
  //   setAccount(acc.address);

  //   console.log(account);
  //   return await console.log("createAccount");
  // };

  // const getPrivateKey = async (provider: SafeEventEmitterProvider) => {
  //   return (await provider.request({
  //     method: "private_key",
  //   })) as string;
  // };

  // const setAuthorized = async (w3auth: Web3Auth) => {
  //   if (!w3auth.provider) {
  //     throw new Error("web3authprovider not initialized yet");
  //   }
  //   const authenticateUser = await w3auth.authenticateUser();

  //   const privateKey = await getPrivateKey(w3auth.provider);
  //   const acc = await createAccount(privateKey);
  //   console.log(acc);
  //   setIdToken(authenticateUser.idToken);
  //   setPrivateKey(privateKey);
  // };

  // const login = async () => {
  //   if (!web3auth) {
  //     throw new Error("web3auth not initialized yet");
  //   }
  //   const web3authProvider = await web3auth.connect();
  //   if (!web3authProvider) {
  //     throw new Error("web3authprovider not initialized yet");
  //   }

  //   setAuthorized(web3auth);
  // };

  // const logout = async () => {
  //   if (!web3auth) {
  //     throw new Error("web3auth not initialized yet");
  //   }
  //   await web3auth.logout();
  //   setAccount(null);
  //   setIdToken(null);
  //   setPrivateKey(null);
  // };

  // const sendTransaction = async (recipient: string, amount: string) => {
  //   if (!account) {
  //     throw new Error("Account not initialized");
  //   }
  //   return await console.log("sendTransaction");
  // };

  // if (loading) {
  //   return <p>loading...</p>;
  // }

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
        {/* <Text>{`${account}`}</Text>
        <Text>{`${privateKey}`}</Text>
        <Button onClick={login}>Connect Wallet</Button> */}
      </Container>
      <FooterSimple />
    </>
  );
}
