import React from "react";

export default function AdminPage({ userProfile }) {
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
      <h1>Add admin functionalities here</h1>
    </>
  );
}
