import Image from "next/image";
import { Container, Center, Title } from "@mantine/core";
import { HeroBullets } from "../../components/HeroBullets/HeroBullets";
import { HeaderSimple } from "../../components/HeaderSimple/HeaderSimple";
export default function Home() {
  return (
    <>
      <HeaderSimple />
      <Container size="lg">
        <HeroBullets />
      </Container>
    </>
  );
}
