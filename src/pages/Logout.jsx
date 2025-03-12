import React from "react";
import { Link } from "react-router-dom";

function Logout() {
  localStorage.removeItem("token"); // Borrar ❌ el token del localStorage

  return (
    <div className="bg-base-100">
      <div
        className="flex flex-col gap-y-4 justify-center items-center min-h-[40dvh] mt-20 
      container mx-auto border"
      >
        <h2 className="text-3xl">Logout page</h2>
        <div className=" [&>Link]:text-lg">
          <p className="font-bold mb-4">Session closed</p>
          <div className="flex flex-col gap-y-2 place-items-center text-lg">
            <Link to="/">Home</Link>
            <Link to="/Login">Login</Link>
            <Link to="/Register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
