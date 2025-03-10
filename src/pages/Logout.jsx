import React from "react";
import { Link } from "react-router-dom";

function Logout() {
  localStorage.removeItem("token"); // Borrar ❌ el token del localStorage

  return (
    <div className="bg-base-100">
      <div className="flex flex-col gap-y-6 justify-center items-center min-h-[40dvh] mt-20 w-1/4 mx-auto border">
        <h2 className="text-3xl">Logout page</h2>
        <div className="flex flex-col gap-y-2 justify-center items-center">
          <p className="font-semibold">Session closed</p>
          <Link to="/">Home</Link>
          <Link to="/Login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Logout;
