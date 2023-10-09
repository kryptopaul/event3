"use client"
import { Image, Grid, Text } from "@mantine/core";
import { Container, Center, Title } from "@mantine/core";
import { HeroBullets } from "../../../components/HeroBullets/HeroBullets";
import { HeaderSimple } from "../../../components/HeaderSimple/HeaderSimple";
import { FeaturesCard } from "../../../components/FeaturesCard/FeaturesCard";
import { FooterSimple } from "../../../components/FooterSimple/FooterSimple";

export default function Event() {
    return (
        <>
            <HeaderSimple />
            <Container size="lg">
                <Center>
                    <Image
                        src={'/penguins.jpeg'}
                        height={400}
                        radius={"lg"}
                        mt={"-4rem"}
                        mb={'lg'}
                    />
                </Center>
                <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
                    <Grid.Col span={8}>
                        <Title order={1}>Epic Web3 Meetup</Title>
                        <br />
                        <Text>
                            Join us for an enlightening evening diving into the decentralized future. The Web3 Revolution Meetup is your portal to the next era of the internet. Whether you're a blockchain enthusiast, a digital innovator, or just curious about the buzz, come along!
                        </Text>
                        <br />
                        <Text>
                            🔗 Explore the potential of decentralized applications.</Text><Text>
                            🔐 Dive deep into cutting-edge cryptographic techniques.</Text>
                        <Text>
                            💡 Meet fellow pioneers pushing the boundaries of what's possible online.
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        {/* <Title order={1}>Purchase form</Title>
                        <br/> */}
                        <FeaturesCard />
                    </Grid.Col>
                </Grid>
            </Container>
            <FooterSimple />
        </>
    );
}
