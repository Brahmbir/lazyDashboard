import {
  createGithubAuthorizationURL,
  createGoogleAuthorizationURL,
} from "@/action/auth/oAuthAction";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

export default function OAuthComp({
  description = "Use OAuth",
}: {
  description: string;
}) {
  const onGoogleRegister = async () => {
    const res = await createGoogleAuthorizationURL();
    if (res.success) {
      window.location.href = res.message;
    } else {
      toast.error(res.error);
    }
  };
  const onGithunRegister = async () => {
    const res = await createGithubAuthorizationURL();
    if (res.success) {
      window.location.href = res.message;
    } else {
      toast.error(res.error);
    }
  };
  return (
    <div className="space-y-2">
      <p className="text-neutral-500 font-bold text-sm  text-left">
        {description}
      </p>
      <div className="gap-x-4 flex ">
        <Button
          variant="outline"
          className="flex-grow"
          onClick={onGoogleRegister}
          size="icon"
        >
          <div className="sr-only">with google</div>
          <FcGoogle className="h-full w-auto" />
        </Button>
        <Button
          variant="outline"
          className="flex-grow"
          onClick={onGithunRegister}
          size="icon"
        >
          <div className="sr-only">with github</div>
          <FaGithub className="fill-neutral-800 h-full w-auto" />
        </Button>
      </div>
    </div>
  );
}
