"use client";
import { useState } from "react";
import { Container, Group, Burger, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./HeaderSimple.module.css";
import Link from "next/link";

const links = [
  { link: "/", label: "Home" },
  { link: "/backpack", label: "Backpack" },
  // { link: "/pricing", label: "Pricing" },
  // { link: "/learn", label: "Learn" },
  // { link: "/community", label: "Community" },
];

export function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Link href={"/"} style={{textDecoration: 'none', color: 'white'}}>
          <Title>Event3</Title>
        </Link>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
