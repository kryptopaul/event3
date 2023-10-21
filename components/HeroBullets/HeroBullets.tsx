"use client";
import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import Lottie from "lottie-react";
import ticketLottie from "../../public/lotties/ticketLottie.json";
import Link from "next/link";

import classes from "./HeroBullets.module.css";

export function HeroBullets() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            The <span className={classes.highlight}>event</span> platform <br />{" "}
            for the new internet.
          </Title>
          <Text c="dimmed" mt="md">
            Attend events, meetups and conferences with ease. Claim digital
            proofs of attendance regardless of your Web3 experience.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>No Web3 wallet required</b> – login with your social media or
              email.
            </List.Item>
            <List.Item>
              <b>Keep track of your events</b> – claim digital proofs of
              attendance upon each meetup.
            </List.Item>
            <List.Item>
              <b>Powered by Safe</b> – We&apos;re using Safe AA stack to power
              our platform.
            </List.Item>
          </List>

          <Group mt={30}>
            <Link href="/backpack">
              <Button radius="xl" size="md" className={classes.control}>
                Get started
              </Button>
            </Link>
            <Link href={"https://github.com/kryptopaul/event3"} target="_blank">
              <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
              >
                Source code
              </Button>
            </Link>
          </Group>
        </div>
        <Lottie animationData={ticketLottie} className={classes.image} />
      </div>
    </Container>
  );
}
