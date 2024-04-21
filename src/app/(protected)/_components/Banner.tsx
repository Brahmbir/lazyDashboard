import { Content } from "./navigation/BannerContent";
import { Trigger } from "./navigation/BannerTrigger";
import AvatarCo from "./UserMenu";

export default function Banner({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="top-0 w-full z-40 bg-slate-100 fixed">
        <div
          className="px-4 py w-full h-16 flex flex-row items-center justify-between"
          role="banner"
        >
          <Trigger />

          {/* <div id="center" className="flex">
          <div className="">j</div>
        </div> */}
          <div id="right" className="flex">
            <AvatarCo />
          </div>
        </div>
      </div>
      <Content />

      {children}
    </>
  );
}
