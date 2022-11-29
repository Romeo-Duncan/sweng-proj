import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/homepage";
import UseLoggedIn from "./hooks/useLoggedIn";
import Login from "./pages/login";
import AdminPage from "./pages/adminPage";
import CustomerPage from "./pages/customerPage";
import SignUp from "./pages/signup";
import NotAllowed from "./pages/notAllowed";
import EmployeePage from "./pages/employeePage";

export default function App() {
  const { isLoading, isLoggedIn, userProfile } = UseLoggedIn();
  const userRedirect = {
    owner: "/admin",
    customer: "/customer",
    employee: "/employee",
  };

  if (isLoading) return <p>Loading App</p>;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to={`${userRedirect[userProfile?.role]}`} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              <Navigate to={`${userRedirect[userProfile?.role]}`} />
            ) : (
              <SignUp />
            )
          }
        />
        <Route
          path="/admin"
          element={
            userProfile?.role === "owner" ? (
              <AdminPage userProfile={userProfile} />
            ) : (
              <NotAllowed />
            )
          }
        />
        <Route
          path="/employee"
          element={
            userProfile?.role === "employee" ? (
              <EmployeePage userProfile={userProfile} />
            ) : (
              <NotAllowed />
            )
          }
        />
        <Route
          path="/customer"
          element={
            userProfile?.role === "customer" ? (
              <CustomerPage userProfile={userProfile} />
            ) : (
              <NotAllowed />
            )
          }
        />
      </Routes>
    </Router>
  );
}
