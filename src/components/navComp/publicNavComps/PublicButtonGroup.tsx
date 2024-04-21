import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";

export interface IButtonGroupProps {
  show?: "login" | "register" | "both";
}

export default function ButtonGroup({ show = "both" }: IButtonGroupProps) {
  switch (show) {
    case "login":
      return (
        <>
          <LoginButton />
        </>
      );
    case "register":
      return (
        <>
          <RegisterButton />
        </>
      );
    case "both":
      return (
        <>
          <RegisterButton />
          <LoginButton />
        </>
      );
  }
}
