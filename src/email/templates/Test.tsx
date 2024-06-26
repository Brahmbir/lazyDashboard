import * as React from "react";
import { Button } from "@react-email/button";
import { Hr } from "@react-email/hr";
import { Html } from "@react-email/html";
import { Text } from "@react-email/text";

export function MyTemplate({ link }: { link: string }) {
  return (
    <Html lang="en">
      <Text>Some title</Text>
      <Hr />
      <Button href={link}>Click me</Button>
    </Html>
  );
}

export default MyTemplate;
