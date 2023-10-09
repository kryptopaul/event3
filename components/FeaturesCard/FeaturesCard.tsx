"use client"
import { Card, Image, Text, Group, Badge, Center, Button } from '@mantine/core';
import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from '@tabler/icons-react';
import classes from './FeaturesCard.module.css';

const mockdata = [
    { label: '4 passengers', icon: IconUsers },
    { label: '100 km/h in 4 seconds', icon: IconGauge },
    { label: 'Automatic gearbox', icon: IconManualGearbox },
    { label: 'Electric', icon: IconGasStation },
];

export function FeaturesCard() {
    const features = mockdata.map((feature) => (
        <Center key={feature.label}>
            <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
            <Text size="xs">{feature.label}</Text>
        </Center>
    ));

    return (
        <Card withBorder radius="md" className={classes.card}>
            <Group justify="space-between" mb={"md"}>
                <div>
                    <Text fw={500}>Epic Web3 Meetup</Text>
                    <Text fz="xs" c="dimmed">
                        Price per ticket
                    </Text>
                </div>
                <Badge size='xl' variant="outline">$4.99</Badge>
            </Group>
            {/* 
      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Basic configuration
        </Text>

        <Group gap={8} mb={-8}>
          {features}
        </Group>
      </Card.Section> */}

            <Card.Section className={classes.section}>
                <Group gap={30}>


                    <Button radius="xl" size='lg' style={{ flex: 1 }}>
                        Sign up
                    </Button>
                </Group>
            </Card.Section>
        </Card>
    );
}