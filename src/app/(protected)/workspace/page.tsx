import * as React from "react";
import WorkspacePageStructure from "@/modules/protectedPages/workspace/pageStructure";

interface IWorkspacePageProps {}

export default function WorkspacePage(props: IWorkspacePageProps) {
  return <WorkspacePageStructure {...props} />;
}
