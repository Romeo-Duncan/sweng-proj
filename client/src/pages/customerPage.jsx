import React from "react";

export default function CustomerPage({ userProfile }) {
  return (
    <>
      <p>Name: {userProfile.name}</p>
      <p>Email: {userProfile.email}</p>
      <button
        onClick={() => {
          localStorage.removeItem("profile");
          window.location.reload();
        }}
      >
        Logout
      </button>
      <br />
      <br />
      <h1>Add customer functionalities here</h1>
    </>
  );
}
