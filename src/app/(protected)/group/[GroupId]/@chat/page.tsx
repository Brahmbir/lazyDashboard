import MessageBox from "./_component/MessageBox";
import SendMail from "./_component/SendMail";

const ChatPage = ({
  params,
}: {
  params: {
    GroupId: string;
  };
}) => {
  return (
    <div className="max-w-[700px] h-full border w-full flex flex-col flex-1 mx-auto">
      <MessageBox GroupId={params.GroupId} />

      <SendMail GroupId={params.GroupId} />
    </div>
  );
};

export default ChatPage;
