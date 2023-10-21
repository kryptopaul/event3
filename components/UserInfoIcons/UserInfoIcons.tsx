import { Avatar, Text, Group } from "@mantine/core";
import { IconPhoneCall, IconBackpack } from "@tabler/icons-react";
import classes from "./UserInfoIcons.module.css";

interface UserInfoIconsProps {
  name: string;
  image: string;
  safeAddress: string;
}

export function UserInfoIcons({
  name,
  image,
  safeAddress,
}: UserInfoIconsProps) {
  return (
<div>
      <Group wrap="nowrap">
        <Avatar src={image} size={94} radius="md" />
        <div>
          <Text fz="lg" fw={500} className={classes.name}>
            {name}
          </Text>

          <Group wrap="nowrap" gap={10} mt={3}>
            <IconBackpack stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {safeAddress
                ? `${safeAddress.slice(0, 4)}...${safeAddress.slice(-4)}`
                : "No Wallet"}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}
