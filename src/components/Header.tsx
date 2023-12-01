import Link from "next/link";
import {
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import HeaderAuth from "./header-auth";
import SearchInput from "./search-input";
import { Suspense } from "react";

export default async function Header() {
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link className="font-bold " href="/">
          <span>Circles</span>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Suspense>
            <SearchInput />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}
