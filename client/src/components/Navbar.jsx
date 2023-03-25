import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to={'/'} className="btn btn-ghost normal-case text-xl">daisyUI</Link>
      </div>
      <div className="flex-none px-4">
        <Link to={'/register'}>
        <button className="btn btn-circle btn-ghost px-2">
          <i class="bx bxs-user-circle bx-md"></i>
        </button>
        </Link>
        <Link to={'/login'}>
          <button className="btn btn-circle btn-ghost px-2">
            <i class="bx bxs-log-in-circle bx-md"></i>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
