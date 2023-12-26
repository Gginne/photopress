import { useState } from "react";

import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Login from "./Login";
import Register from "./Register";

export default function Authentication() {
  const navigate = useNavigate();
  const { login, register, currentUser } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async (data: any) => {

    if (isLogin) {
      await login(data);
    } else {
      await register(data);
    }

    navigate("/");
  };

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div
      style={{
        minWidth: "250px",
        maxWidth: "350px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      {isLogin ? (
        <>
          <Login onSubmit={handleAuth} />
          <div style={{ marginTop: "1.25rem" }}>
            Don't have an account?{" "}
            <a
              href="#"
              style={{ textDecoration: "none" }}
              onClick={() => setIsLogin(false)}
            >
              Register
            </a>
          </div>
        </>
      ) : (
        <>
          <Register onSubmit={handleAuth} />
          <div style={{ marginTop: "1.25rem" }}>
            Have an account?{" "}
            <a
              href="#"
              style={{ textDecoration: "none" }}
              onClick={() => setIsLogin(true)}
            >
              Login
            </a>
          </div>
        </>
      )}
    </div>
  );
}
