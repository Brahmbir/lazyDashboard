import * as React from "react";
import Icon from "../Icon";

export interface IFooterProps {}

export default function Footer(props: IFooterProps) {
  return (
    <footer className="bg-slate-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="sm:pt-24 pt-16 pb-8 px-6 max-w-7xl mx-auto">
        <div>
          <div className="space-y-8">
            <Icon className="max-w-12 text-slate-100 fill-current" />
            <p className="text-slate-100 leading-6 text-sm">
              Making the world a better place through constructing elegant
              hierarchies.
            </p>
          </div>
        </div>
        <div className="pt-8 border-slate-100 border-t-[1px] mt-16">
          <p className="text-slate-100 leading-5 text-xs">© 2024 </p>
        </div>
      </div>
    </footer>
  );
}
