import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import React from "react";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="border-b py-4 ">
      <div className="container flex justify-between items-center">
        <h1 className="text-xl font-bold">Vaultify</h1>
        <div className="flex gap-2">
            <OrganizationSwitcher />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
