import React, { useState } from 'react';
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "./UserPool";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stage, setStage] = useState(1);

  const onSubmit = event => {
    event.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool
    });
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password
    });

    user.authenticateUser(authDetails, {
      onSuccess: data => {
        console.log("onSuccess:", data);
        var user = {email:email};
        localStorage.setItem('user_data', JSON.stringify(user));
        window.location.href = '/home';
      },

      onFailure: err => {
        console.error("onFailure:", err);
        //alert("Confirm email");
        console.error("Password are not the same");
          setStage(2);
      },

      newPasswordRequired: data => {
        console.log("newPasswordRequired:", data);
      }
    });
  };
  const doSignup = async event => 
  {
      
              window.location.href = '/signup';
       
  };

  const doForgotPassword = async event =>
  {
    window.location.href='/ForgotPassword';
  };
  
  return (
    <div id="loginDiv" style={{textAlign:'center', width: '100%', height: '100%', backgroundImage: "linear-gradient(to bottom, #4A148C,#673AB7, #9C27B0)", position:'absolute', left:'50%', top:'50%', transform: 'translate(-50%, -50%)', display: 'flex', alignItems:'center',justifyContent:'center'}}>
    {stage === 1 && (
    <form onSubmit={onSubmit}>
    <h1 style={{color:'white', fontSize: 48}}>WELCOME TO ULTRA TRIVIA</h1>
    <form style={{backgroundColor:'lightblue', justifyContent: 'center', alignItems: 'center', height: '350px'}}><br />
    <span style={{color:'black', fontSize: 30}} id="inner-title"  >PLEASE LOG IN</span><br />
      <input style={{width: '350px', height: '50px', fontSize: 24, justifyContent: 'center', alignItems: 'center'}} value={email} onChange={event => setEmail(event.target.value)} placeholder="Email" /><br />
      <input style={{width: '350px', height: '50px', fontSize: 24, justifyContent: 'center', alignItems: 'center'}} type = 'password' value={password}onChange={event => setPassword(event.target.value)} placeholder="Password"/><br />

      <button style={{fontSize: 24, height: 40, width: '125px'}} type="submit">Login</button>
      <input style={{fontSize: 24, height: 40, width: '125px'}} type="submit" id="loginButton" class="buttons" value = "Signup?"
        onClick={doSignup} /><br />
      <input style={{fontSize: 24, height: 40, width: '250px'}} type="submit" id="loginButton" class="buttons" value = "ForgotPassword?"
        onClick={doForgotPassword} />
      </form>
    </form>
    )}
    {stage === 2 && (
    <form onSubmit={onSubmit}>
    <h1 style={{color:'white', fontSize: 48}}>WELCOME TO ULTRA TRIVIA</h1>
    <form style={{backgroundColor:'lightblue', justifyContent: 'center', alignItems: 'center', height: '350px'}}><br />
    <span style={{color:'black', fontSize: 30}} id="inner-title"  >PLEASE LOG IN</span><br />
      <input style={{width: '350px', height: '50px', fontSize: 24, justifyContent: 'center', alignItems: 'center'}} value={email} onChange={event => setEmail(event.target.value)} placeholder="Email" /><br />
      <input style={{width: '350px', height: '50px', fontSize: 24, justifyContent: 'center', alignItems: 'center'}} type = 'password' value={password}onChange={event => setPassword(event.target.value)} placeholder="Password"/><br />

      <button style={{fontSize: 24, height: 40, width: '125px'}} type="submit">Login</button>
      <input style={{fontSize: 24, height: 40, width: '125px'}} type="submit" id="loginButton" class="buttons" value = "Signup?"
        onClick={doSignup} /><br />
      <input style={{fontSize: 24, height: 40, width: '250px'}} type="submit" id="loginButton" class="buttons" value = "ForgotPassword?"
        onClick={doForgotPassword} />
      <br /><br /><label style={{width: '350px', height: '50px', fontSize: 24, justifyContent: 'center', alignItems: 'center'}}>Incorrect Password Combination</label>
      </form>
    </form>
    )}
  </div>
  );
};

