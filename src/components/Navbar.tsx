import React from "react";
import { FaRegFilePdf, FaGithub } from "react-icons/fa6";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="p-2 md:p-10 flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <FaRegFilePdf size={40} />
        <h1 className="ml-2 text-2xl font-bold">PDF-editor</h1>
      </Link>
      <div>
        <Link
          href="https://github.com/Dax2405"
          target="_blank"
          className="flex items-center space-x-2"
        >
          <h1 className="font-bold">Dax</h1>
          <FaGithub size={30} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
