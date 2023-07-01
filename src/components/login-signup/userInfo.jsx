import React, { useState } from "react";
import { UserLoginForm } from "./signIn";
import { UserSignUpForm } from "./signUp";

import '../login-signup/signIn-signUp-styles.css'

const UserInfo = (props) => {
  const [loginOrSignUp, setLoginOrSignUp] = useState(false);
  
  const checkForLoginOrSignUp = () => {
    setLoginOrSignUp(true);
  };
  const upLiftTheState = (arg) => {
    props.stateUpLisft(arg);
  };

  const signUpCheck = () => {
    props.functionCall();   
  };

  return (
    <>
      {loginOrSignUp ? (
        <UserLoginForm
          functionCall={signUpCheck}
          stateUpLisft={upLiftTheState}
        />
      ) : (
        <UserSignUpForm loginOrSignUp={loginOrSignUp} setLoginOrSignUp={setLoginOrSignUp} />
      )}
    </>
  );
}

export default UserInfo;