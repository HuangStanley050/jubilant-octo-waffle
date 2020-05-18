import React, { useState, useEffect } from "react";
import Link from "next/link.js";
import axios from "axios";
import { Cookies } from "react-cookie";

const serverUrl = "http://localhost:3001";

const cookies = new Cookies();

const Index = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(cookies.get("token") || null);
  }, []);
  const onLoginClick = async () => {
    console.log("Login called");
    const response = await axios.get(serverUrl + "/api/login");
    const token = response.data.token;
    cookies.set("token", token);
    setToken(token);
  };
  return (
    <div>
      <h2>Main page</h2>
      <br></br>
      <button onClick={onLoginClick}>Get Token</button>
      <br></br>
      <p>Token: {token}</p>
      <br></br>
      <Link href="/secret">
        <a>Secret page</a>
      </Link>
    </div>
  );
};

export default Index;
