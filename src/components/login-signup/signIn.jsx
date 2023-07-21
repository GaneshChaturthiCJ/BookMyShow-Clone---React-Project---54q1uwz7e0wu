import React, { useContext, useState } from "react";
import { BsShieldLock } from "react-icons/bs";
import "../login-signup/signIn-signUp-styles.css";
import { loggedInUserNameContext } from "../../App";
import { useNavigate } from "react-router-dom";

export function UserLoginForm(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userFlag, setUserFlag] = useState(false);
  const [passwordFlag, setPasswordFlag] = useState(false);

  const navigate = useNavigate();

  const [warningMsg, setWarningMsg] = useState(false);
  let loginInfo;

  //getting value of loggedInUserNameContext from app.js
  const { loggedInUserName, setLoggedInUserName } = useContext(
    loggedInUserNameContext
  );

  //getting login info from local storage
  loginInfo = JSON.parse(localStorage.getItem("userInfo"));

  const submitHandler = (e) => {
    e.preventDefault();
    setUserFlag(false);
    setPassword(false);
    setWarningMsg(false);

    if (userName === "") {
      setUserFlag(true);
      return;
    }

    if (password === "") {
      setPasswordFlag(true);
      return;
    }
    //console.log(userName, password , "userName and password")

    if (userName !== "" && password !== "") {
      const storeToLocal = {
        userName,
        password,
      };

      let data;
      if (
        loginInfo.some((info) => {
          if (
            info.userName === storeToLocal.userName &&
            info.password === storeToLocal.password
          ) {
            data = info;
            console.log(info.userName, info.password);
            return true;
          }
        })
      ) {
        setLoggedInUserName(data.userName);
        console.log("condition became true", loggedInUserName, "context data");
        navigate("/");
      } else {
        setWarningMsg(true);
        return;
      }
    }
  };

  const userInputHandler = (e) => {
    setUserName(e.target.value);
  };

  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={submitHandler} className="login-form">
      <div className="login-logo">
        <BsShieldLock style={{ fontSize: "2rem" }} />
      </div>

      <h3 className="user-heading">Login</h3>

      {warningMsg && (
        <div className="warning">Username or Password Not Matching</div>
      )}

      <input
        type="text"
        placeholder="User Name *"
        onChange={userInputHandler}
        value={userName}
      />
      {userFlag && <div className="warning">Please enter user name</div>}

      <input
        type="password"
        placeholder="password*"
        onChange={passwordInputHandler}
        value={password}
      />
      {passwordFlag && <div className="warning">Password not Matching</div>}

      <button type="submit">Login</button>
    </form>
  );
}
