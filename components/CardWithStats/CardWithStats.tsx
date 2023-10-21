import { Card, Image, Text, Group, RingProgress, Button } from "@mantine/core";
import classes from "./CardWithStats.module.css";

interface NFTProps {
  name: string;
  image: string;
  url: string;
}

export function CardWithStats({ name, image, url }: NFTProps) {
  return (
    <Card
      withBorder
      padding="lg"
      
      className={classes.card}
      style={{
        width: "15rem",
      }}
    >
      <Card.Section>
        <Image
          src={
            image
          }
          height={250}
          width={250}
        />
      </Card.Section>

      <Group mt="md">
        <Text fz="sm" fw={700} className={classes.title}>
          {name}
        </Text>
      </Group>
      <Group
        mt="md"
        style={{
          justifyContent: "center",
        }}
      >
        <Button component="a" href={url} target="_blank">Check out on OpenSea</Button>
      </Group>
    </Card>
  );
}
