"use client"
import { Container, Group, Anchor, Title } from '@mantine/core';
import classes from './FooterSimple.module.css';

const links = [
  { link: '#', label: 'Contact' },
//   { link: '#', label: 'Privacy' },
//   { link: '#', label: 'Blog' },
//   { link: '#', label: 'Careers' },
];

export function FooterSimple() {
  const items = links.map((link) => (
    <Anchor<'a'>
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Title>Event3</Title>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}