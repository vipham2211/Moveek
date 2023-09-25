import React from "react";
import DisclosureComponent from "../ui/DisclosureComponent";
import { cookies } from 'next/headers'

const Navbar = async () => {

  const cookiesList = cookies()
  const token = cookiesList.get('REMEMBERME')?.value ??''

  return (
    <DisclosureComponent token={token}/>
  );
};

export default Navbar;
