import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Link,
  Tailwind,
} from "@react-email/components";
import { IEmail } from "./utils";

export default function WelcomeMail(props: IEmail) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Welcome to Pictorial - Get Started Now!</Preview>
      <Tailwind>
        <Body className="bg-[#d2d2d2] my-auto mx-auto font-sans px-2">
          <Container className="border border-solid bg-white border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section>
              <Heading className="text-2xl text-gray-800 mb-4">
                Welcome to [Your Service Name], {props.name}!
              </Heading>
              <Text className="text-base text-gray-600 mb-4">
                We're thrilled to have you on board. [Your Service Name] is here
                to help you [describe the value or purpose of your service
                briefly].
              </Text>
              <Text className="text-base text-gray-600 mb-4">
                Here are a few things you can do to get started:
              </Text>
              <ul className="list-disc pl-5 text-gray-600 mb-4">
                <li>Explore our features</li>
                <li>Set up your profile</li>
                <li>
                  Get started with your first [action related to your service]
                </li>
              </ul>
              <Text className="text-base text-gray-600 mb-4">
                If you have any questions or need assistance, feel free to reach
                out to us at{" "}
                <Link
                  href="mailto:support@example.com"
                  className="text-blue-500 underline"
                >
                  support@example.com
                </Link>
                .
              </Text>
              <Text className="text-base text-gray-600">
                Thank you for choosing [Your Service Name]. We can't wait to see
                what you'll achieve!
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
