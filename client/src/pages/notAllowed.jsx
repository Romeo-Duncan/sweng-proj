import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotAllowed() {
  const navigate = useNavigate();
  return (
    <>
      403 Not Authorized <br />
      <br />
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        Got to login
      </button>
    </>
  );
}
