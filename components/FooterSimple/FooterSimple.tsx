"use client";
import { Container, Group, Anchor, Title, Text} from "@mantine/core";
import classes from "./FooterSimple.module.css";

export function FooterSimple() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Title>Event3</Title>
        <Text>Pawel Lechocki for ETHOnline 2023</Text>
      </Container>
    </div>
  );
}
