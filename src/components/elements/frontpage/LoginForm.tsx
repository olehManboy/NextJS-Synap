import React, { ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import { Button, Typography, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";

const LoginForm: React.FC = () => {
  const [username, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const router = useRouter();

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        throw new Error("Please enter your email and password.");
      }

      const userData = await signIn("credentials", {
        redirect: false,
        username,
        password,
        callbackUrl: "/",
      });

      if (userData?.status === 401) {
        throw new Error("Incorrect email or password.");
      } else {
        console.log(userData);
        router.push("/");
        // use callback instead here
      }
    } catch (err: any) {
      setError(err?.message);
    }
  };

  return (
    <form className="login-form">
      <p className="form-header-text">Login</p>
      <p className="s-header-text">Login to stay connected.</p>
      <div className="user-info-container">
        <p>Email</p>
        <TextField
          className="field-input"
          variant="standard"
          name="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={username}
        />
      </div>

      <div className="user-info-container">
        <p>Password</p>
        <Input
          className="standard-password-adorment"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        {error && <p className="error-message">{error}</p>}
      </div>
      <div className="row-form">
        <div className="remember-me">
          <input type="checkbox" />
          <p>Remember me?</p>
        </div>
        <Link className="forgot-password-text" href="/forgotpassword">
          Forgot password
        </Link>
      </div>
      <Button onClick={handleLogin} className="action-button">
        <Typography variant="button" style={{ textTransform: "none" }}>
          Login
        </Typography>
      </Button>
      <p className="auth-option"> or sign in with other accounts?</p>
      <div className="identity-provider-icons">
        <Image
          alt="google-login"
          src="/icons/gmail.png"
          width="40"
          height="40"
          priority
          className="google-icon"
        />
        <Image
          alt="facebook-login"
          src="/icons/facebook.png"
          width="36"
          height="36"
          priority
          className="facebook-icon"
        />
      </div>
      <div className="alt-switch">
        Dont&#39;t have an account?{" "}
        <Link href="/signup" className="click-here-signup">
          Click here to sign up.
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
