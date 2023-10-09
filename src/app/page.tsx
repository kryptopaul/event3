import Image from "next/image";
import { Container, Center, Title } from "@mantine/core";
import { HeroBullets } from "../../components/HeroBullets/HeroBullets";
import { HeaderSimple } from "../../components/HeaderSimple/HeaderSimple";
import { FooterSimple } from "../../components/FooterSimple/FooterSimple";
export default function Home() {
  return (
    <>
      <HeaderSimple />
      <Container size="lg">
        <HeroBullets />
      </Container>
      <FooterSimple />
    </>
  );
}
