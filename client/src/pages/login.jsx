import React, { useState } from "react";
import { login } from "../Services/index";

export default function Login() {
  const [{ email, password }, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setIsLoading] = useState(false);

  function upDateField(e) {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData((values) => ({ ...values, [name]: value }));
  }

  async function submitLogin() {
    if (!email.trim() || !password.trim()) return alert("Fill all reilds");

    try {
      setIsLoading(true);
      const { data } = await login({ email, password });
      setIsLoading(false);
      localStorage.setItem("profile", JSON.stringify(data.data));
      window.location.reload();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert(error?.response?.data?.message ?? "Something Went Wrong");
    }
  }

  if (loading) return <p>Loading ... </p>;

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        name="email"
        value={email}
        placeholder="Email"
        onChange={upDateField}
      />
      <br />
      <br />
      <input
        type="password"
        name="password"
        value={password}
        onChange={upDateField}
        placeholder="Password"
      />
      <br />
      <br />
      <button onClick={submitLogin}>Submit</button>
    </div>
  );
}
