import React from "react";

import Link from "next/link";

import { fetchUser } from "@/lib/fetchUser.js";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Logout from "./Logout";

export async function NavBar() {
  const loggedInUser = await fetchUser();

  return (
    <div className="navbar">
      <div className="emoji">
        <img className="pic" src="/pictures/reddit.png" alt="reddit image" />
        <FontAwesomeIcon className="home" icon={faHome} />
        <Link href={"/"}> Home</Link>
      </div>

      <input className="search" type="text" placeholder="Search a reddit" />

      {loggedInUser.id && (
        <Link href={"/submit"} className="sub">
          ➕ Create a Post
        </Link>
      )}

      {loggedInUser.id && (
        <>
          <span className="welcome">Welcome {loggedInUser.username}</span>
          <Logout></Logout>
        </>
      )}

      {!loggedInUser.id && (
        <>
          <Link className="sub" href={"/Login"}>
            Login
          </Link>
        </>
      )}
    </div>
  );
}
