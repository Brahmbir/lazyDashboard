interface IMenuGroup {
  children: JSX.Element[] | JSX.Element;
  title?: string | JSX.Element | null;
}

export default function NavGroup({ children, title }: IMenuGroup) {
  return (
    <div className="grid gap-px py-2 [&>*]:uppercase [&>*]:font-semibold ">
      {title && <p className="px-3 ">{title}</p>}
      <div className="grid gap-px hover:[&>*]:bg-[#b5d0eb] [&>*]:transition [&>*]:duration-200 [&>*]:flex [&>*]:grid-cols-1 [&>*]:box-content [&>*]:px-3 [&>*]:py-2 [&>*]:rounded-xl [&>*]:h-6 [&>*]:uppercase [&>*]:font-semibold [&>*]:bg-transparent">
        {children}
      </div>
    </div>
  );
}
