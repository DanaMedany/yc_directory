"use client";

import { Login } from "@/utils/authActions";

type ButtonProps = {
  children: React.ReactNode;
};

function Button({ children }: ButtonProps) {
  const handleLogin = async () => {
    await Login("github");
  };

  return <button onClick={handleLogin}>{children}</button>;
}

export default Button;
