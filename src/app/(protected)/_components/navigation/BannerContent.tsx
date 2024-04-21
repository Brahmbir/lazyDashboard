import NavCollective from "./NavCollective";

export const Content = ({
  DefaultState = false,
}: {
  DefaultState?: boolean;
}) => {
  return (
    <div
      id="menu_qwertyuiop"
      data-hidden={DefaultState}
      className="box-border flex flex-col pt-16 pb-1 h-full  data-[hidden=true]:hidden space-y-4 min-w-72 max-w-fit bg-slate-200 overscroll-none"
    >
      <NavCollective key={"non-dialog"} />
    </div>
  );
};
