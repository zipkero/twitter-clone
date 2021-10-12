import React from "react";
import { Link } from "react-router-dom";

function Navigation({ userInfo }: any) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">{userInfo.displayName}의 Profile</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
