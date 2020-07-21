import React, { Component, useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import Pool from './UserPool';

export default () => {
  const [stage, setStage] = useState(1); // 1 = email stage, 2 = code stage
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const getUser = () => {
    return new CognitoUser({
      Username: email.toLowerCase(),
      Pool
    });
  };


  const sendCode = event => {
    event.preventDefault();

    getUser().forgotPassword({
      onSuccess: data => {
        console.log("onSuccess:", data);
      },
      onFailure: err => {
        console.error("onFailure:", err);
      },
      inputVerificationCode: data => {
        console.log("Input code:", data);
        setStage(2);
      }
    });
  };

  const resetPassword = event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords are not the same");
      setStage(3);
      return;
    }

    getUser().confirmPassword(code, password, {
      onSuccess: data => {
        console.log("onSuccess:", data);
        window.location.href = '/';
      },
      onFailure: err => {
        console.error("onFailure:", err);
        setStage(4);
      }
      
    });
  };

  const goLogin = async event => 
    {
        window.location.href = '/';
    };
  
  return (
    <div id="forgotDiv" style={{textAlign:'center', width: '100%', height: '100%', backgroundImage: "linear-gradient(to bottom, #4A148C,#673AB7, #9C27B0)", position:'absolute', left:'50%', top:'50%', transform: 'translate(-50%, -50%)', display: 'flex', alignItems:'center',justifyContent:'center'}}>
      {stage === 1 && (
        <form onSubmit={sendCode}>
          <h1 style={{color:'white', fontSize: 48}}>Recover Password</h1>
          <form style={{backgroundColor:'lightblue', justifyContent: 'center', alignItems: 'center', height: '250px', width: '425px'}}><br /><br /><br />
          <input
            style={{width: '350px', height: '50px', fontSize: 24, justifyContent: 'center', alignItems: 'center'}}
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder="Email"
          />
          <button style={{fontSize: 24, height: 40, width: '300px'}} type="submit">Send verification code</button><br />
          <button style={{fontSize: 24, height: 40, width: '300px'}} type="submit" onClick={goLogin} >Return to Login</button>
          </form>
        </form>
      )}

      {stage === 2 && (
        <form onSubmit={resetPassword}>
          <h1 style={{color:'white', fontSize: 48}}>Recover Password</h1>
          <form style={{backgroundColor:'lightblue', justifyContent: 'center', alignItems: 'center', height: '350px'}}><br />
          <label style={{width: '350px', height: '50px', fontSize: 24, justifyContent: 'center', alignItems: 'center'}} >Check Email for Verfication Code</label><br /><br />
          <input style={{width: '350px', height: '50px', fontSize: 24, justifyContent: 'center', alignItems: 'center'}} value={code} onChange={event => setCode(event.target.value)} placeholder="Verification Code" /><br />
          <input
            style={{width: '350px', height: '50px', fontSize: 24, justifyContent: 'center', alignItems: 'center'}}
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Password"
            type = 'password'
          /><br />
          <input
            style={{width: '350px', height: '50px', fontSize: 24, justifyContent: 'center', alignItems: 'center'}}
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            placeholder="Confirm Password"
            type = 'password'
          /><br />
          <button style={{fontSize: 24, height: 40, width: '300px'}} type="submit"  >Change password</button><br />
          <button style={{fontSize: 24, height: 40, width: '300px'}} type="submit" onClick={goLogin} >Return to Login</button><br />
          </form>
        </form>
      )}

        {stage === 3 && (
        <form onSubmit={resetPassword}>
          <h1 style={{color:'white', fontSize: 48}}>Recover Password</h1>
          <form style={{backgroundColor:'lightblue', justifyContent: 'center', alignItems: 'center', height: '350px'}}><br />
          <label style={{width: '350px', height: '50px', fontSize: 24, justifyContent: 'center', alignItems: 'center'}} >Check Email for Verfication Code</label><br /><br />
          <input style={{width: '350px', height: '50px', fontSize: 24, justifyContent: 'center', alignItems: 'center'}} value={code} onChange={event => setCode(event.target.value)} placeholder="Verification Code" /><br />
          <input
            style={{width: '350px', height: '50px', fontSize: 24, justifyContent: 'center', alignItems: 'center'}}
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Password"
            type = 'password'
          /><br />
          <input
            style={{width: '350px', height: '50px', fontSize: 24, justifyContent: 'center', alignItems: 'center'}}
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            placeholder="Confirm Password"
            type = 'password'
          /><br />
          <button style={{fontSize: 24, height: 40, width: '300px'}} type="submit"  >Change password</button><br />
          <button style={{fontSize: 24, height: 40, width: '300px'}} type="submit" onClick={goLogin} >Return to Login</button><br />
          <label style={{width: '350px', height: '50px', fontSize: 24, justifyContent: 'center', alignItems: 'center'}} >Passwords Do Not Match</label><br /><br />
          </form>
        </form>
      )}
      {stage === 4 && (
        <form onSubmit={resetPassword}>
          <h1 style={{color:'white', fontSize: 48}}>Recover Password</h1>
          <form style={{backgroundColor:'lightblue', justifyContent: 'center', alignItems: 'center', height: '350px'}}><br />
          <label style={{width: '350px', height: '50px', fontSize: 24, justifyContent: 'center', alignItems: 'center'}} >Check Email for Verfication Code</label><br /><br />
          <input style={{width: '350px', height: '50px', fontSize: 24, justifyContent: 'center', alignItems: 'center'}} value={code} onChange={event => setCode(event.target.value)} placeholder="Verification Code" /><br />
          <input
            style={{width: '350px', height: '50px', fontSize: 24, justifyContent: 'center', alignItems: 'center'}}
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Password"
            type = 'password'
          /><br />
          <input
            style={{width: '350px', height: '50px', fontSize: 24, justifyContent: 'center', alignItems: 'center'}}
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            placeholder="Confirm Password"
            type = 'password'
          /><br />
          <button style={{fontSize: 24, height: 40, width: '300px'}} type="submit"  >Change password</button><br />
          <button style={{fontSize: 24, height: 40, width: '300px'}} type="submit" onClick={goLogin} >Return to Login</button><br />
          <label style={{width: '350px', height: '50px', fontSize: 24, justifyContent: 'center', alignItems: 'center'}} >Incorrect Verification Code</label><br /><br />
          </form>
        </form>
      )}

    </div>
  );
};