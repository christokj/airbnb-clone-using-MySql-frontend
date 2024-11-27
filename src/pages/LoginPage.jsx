import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../components/Context/UserContext";
import { axiosInstance } from "../config/axiosInstance";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUser, setReady } = useContext(UserContext);

  async function handleLoginSubmit(event) {
    event.preventDefault();
    try {
      const res = await axiosInstance.post("/login", { email, password });
      setRedirect(true);
      if (res) {
        axiosInstance
        .get("/profile")
        .then(({ data }) => {
          setUser(data);
          setReady(true);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error); // Log error
        });
        alert("Login successful");
      }

    } catch (e) {
      alert("Login failed");
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center font-black">Login</h1>
        <form action="" className="max-w-md" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="primary hover:bg-opacity-90">Login</button>
          <div className="text-center my-2 text-gray-500 ">
            Don't have an account yet?
            <Link to={"/signUp"} className="text-primary mx-1 hover:opacity-90">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
