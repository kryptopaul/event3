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

import classes from "./HeroBullets.module.css";

export function HeroBullets() {
  return (
    <Container size="md" mt="-10rem">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            The <span className={classes.highlight}>event</span> platform <br />{" "}
            for the new internet.
          </Title>
          <Text c="dimmed" mt="md">
            Organise events, meetups and conferences with ease. Claim digital
            proofs of attendance regardless of your Web3 familiarity.
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
              <b>No Web3 wallet required</b> – thanks to the power of account abstraction, we'll handle everything for you 
            </List.Item>
            <List.Item>
              <b>Free and open source</b> – all packages have MIT license, you
              can use Mantine in any project
            </List.Item>
            <List.Item>
              <b>No annoying focus ring</b> – focus ring will appear only when
              user navigates with keyboard
            </List.Item>
          </List>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              Get started
            </Button>
            <Button
              variant="default"
              radius="xl"
              size="md"
              className={classes.control}
            >
              Source code
            </Button>
          </Group>
        </div>
        <Lottie animationData={ticketLottie} className={classes.image} />
      </div>
    </Container>
  );
}
