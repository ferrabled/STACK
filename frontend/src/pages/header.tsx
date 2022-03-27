import React from "react";

import Logo from "assets/Logo.svg";
import { AccountWallet } from "components/atoms";

const AppHeader = () => {
  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between gap-5 rounded-b-xl bg-brand px-4 py-3 md:px-8 lg:px-24 xl:px-48">
      {/* <img src={Logo} alt="React Logo" className="h-6" /> */}
      <span className="font-bold">
        <span className="text-brand-light">Gestor</span>
        <span className="text-brand-lighter">Blockchain</span>
      </span>
      <AccountWallet/>
    </header>
  );
};

export default AppHeader;