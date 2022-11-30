import React from "react";

export default function EmployeePage({ userProfile }) {
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
      <h1>Add employee functionalities here</h1>
    </>
  );
}
