import { MenuDrawer } from "components/organisms";
import React from "react";

const AppHeader = () => {
  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between gap-5 rounded-b-xl bg-brand px-4 py-3 md:px-8 lg:px-24 xl:px-48">
      <a href="/home" className="flex items-center justify-start gap-5">
        <span className="font-bold">
          <span className="text-brand-light">Gestor</span>
          <span className="text-brand-lighter">Blockchain</span>
        </span>
      </a>
      <MenuDrawer />
    </header>
  );
};

export default AppHeader;
