import React from "react";
import { Link } from "react-router-dom";
const UserMenuLink = ({ path, name, onClick }) => {
  return (
    <>
      {path && (
        <Link
          to={"/dashboard" + path}
          onClick={onClick}
          className="px-2 hover:bg-orange-300 py-1"
        >
          {name}
        </Link>
      )}
      {!path && (
        <Link className="px-2 hover:bg-orange-300 py-1" onClick={onClick}>
          {name}
        </Link>
      )}
    </>
  );
};

export default UserMenuLink;
