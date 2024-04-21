import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function GroupLayout({
  //   children,
  home,
  members,
  tasks,
  settings,
  chat,
}: {
  tasks: React.ReactNode;
  settings: React.ReactNode;
  members: React.ReactNode;
  chat: React.ReactNode;
  home: React.ReactNode;
}) {
  return (
    <div className="mt-16 px-2 pt-3 h-full flex w-full">
      <Tabs
        defaultValue="chat"
        className="min-w-[600px] overflow-hidden flex flex-col flex-1 "
      >
        <TabsList className="grid grid-cols-4 w-[600px] mx-auto">
          {/* <TabsTrigger value="home">Home</TabsTrigger> */}
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="members">members</TabsTrigger>
          <TabsTrigger value="settings">settings</TabsTrigger>
        </TabsList>
        <div className="mt-2 max-h-[85%] flex-grow flex [&>*]:flex-grow [&>*]:h-full">
          {/* <TabsContent value="home">{home}</TabsContent> */}
          <TabsContent value="chat">{chat}</TabsContent>
          <TabsContent value="tasks">{tasks}</TabsContent>
          <TabsContent value="members">{members}</TabsContent>
          <TabsContent value="settings">{settings}</TabsContent>
        </div>
      </Tabs>
      {/* {children} */}
    </div>
  );
}
