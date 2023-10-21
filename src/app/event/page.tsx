"use client";
import { Image, Grid, Text } from "@mantine/core";
import { Container, Center, Title } from "@mantine/core";
import { HeaderSimple } from "../../../components/HeaderSimple/HeaderSimple";
import { FeaturesCard } from "../../../components/FeaturesCard/FeaturesCard";
import { FooterSimple } from "../../../components/FooterSimple/FooterSimple";
import { useState, useEffect } from "react";
const nftAddress = "0xc57bd652b721c3cda7cdfe206c55e5207d64bd00";

export default function Event() {
  // 😏😏😏
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [safeAddress, setSafeAddress] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setPrivateKey(localStorage.getItem("privateKey"));
    setSafeAddress(localStorage.getItem("safeAddress"));
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
  });

  console.log(privateKey, safeAddress, name, email);
  return (
    <>
      <HeaderSimple />
      <Container size="lg">
        <Center>
          <Image
            src={"/penguins.jpeg"}
            height={400}
            radius={"lg"}
            mt={"-4rem"}
            mb={"lg"}
          />
        </Center>
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
          <Grid.Col span={8}>
            <Title order={1}>Epic Web3 Meetup</Title>
            <br />
            <Text>
              Join us for an enlightening evening diving into the decentralized
              future. The Web3 Revolution Meetup is your portal to the next era
              of the internet. Whether you&apos;re a blockchain enthusiast, a
              digital innovator, or just curious about the buzz, come along!
            </Text>
            <br />
            <Text>🔗 Explore the potential of decentralized applications.</Text>
            <Text>
              🔐 Dive deep into cutting-edge cryptographic techniques.
            </Text>
            <Text>
              💡 Meet fellow pioneers pushing the boundaries of what&apos;s
              possible online.
            </Text>
          </Grid.Col>
          <Grid.Col span={4}>
            {/* <Title order={1}>Purchase form</Title>
                        <br/> */}
            <FeaturesCard
              privateKey={privateKey!}
              safeAddress={safeAddress!}
              name={name!}
              nftAddress={nftAddress!}
              email={email!}
            />
          </Grid.Col>
        </Grid>
      </Container>
      <FooterSimple />
    </>
  );
}
