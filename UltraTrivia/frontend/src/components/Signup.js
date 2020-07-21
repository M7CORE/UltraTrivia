import React, { useState } from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const BASE_URL = 'https://mernstack-1.herokuapp.com/';

    export default () => {

      const [stage, setStage] = useState(1); // 1 = email stage, 2 = code stage
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState("");
    
      const poolData = {
        UserPoolId: 'us-east-2_qzkz9I4xL',
        ClientId: '2f4sc8c7580bo68jotflq4sr3l'
      };
    
      const UserPool = new CognitoUserPool(poolData);
    
      const onSubmit = event => {
        event.preventDefault();

        if (password !== confirmPassword) {
          console.error("Passwords are not the same");
          setStage(2);
          return;
        }

        var js = '{"email":"'+ email + '"}'; //saves email in a variable to send to API

        try
        {    
        const response = fetch(BASE_URL + 'api/signup',
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});//API call
        }
        catch(e)
        {
            alert(e.toString());
            return;
        } 

        UserPool.signUp(email, password, [], null, (err, data) => {
          if (err) console.error(err);
          console.log(data);
          window.location.href = '/';
          
        });
      };

      const goLogin = async event =>
      {
        window.location.href ='/';
      };
      
    return (
      <div id="singupDiv" style={{textAlign:'center', width: '100%', height: '100%', backgroundImage: "linear-gradient(to bottom, #4A148C,#673AB7, #9C27B0)", position:'absolute', left:'50%', top:'50%', transform: 'translate(-50%, -50%)', display: 'flex', alignItems:'center',justifyContent:'center'}}>
      {stage === 1 && (
      <form onSubmit={onSubmit}>
      <h1 style={{color:'white', fontSize: 48}}>Signup!</h1>
      <form style={{backgroundColor:'lightblue', justifyContent: 'center', alignItems: 'center', height: '400px', width: '400px'}}><br /><br />
            <input
              style={{width: '350px', height: '50px', fontSize: 24, justifyContent: 'center', alignItems: 'center'}}
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder="Email"
            /><br />
    
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
    
            <button style={{fontSize: 24, height: 40, width: '300px'}} type='submit'>Signup</button><br />
            <button style={{fontSize: 24, height: 40, width: '300px'}} type="submit" onClick={goLogin} >Return to Login</button>
            
            
          </form>
          </form>
          )}

      {stage === 2 && (
      <form onSubmit={onSubmit}>
      <h1 style={{color:'white', fontSize: 48}}>Signup!</h1>
      <form style={{backgroundColor:'lightblue', justifyContent: 'center', alignItems: 'center', height: '300px', width: '400px'}}><br /><br />
            <input
              style={{width: '350px', height: '50px', fontSize: 24, justifyContent: 'center', alignItems: 'center'}}
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder="Email"
            /><br />
    
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
    
            <button style={{fontSize: 24, height: 40, width: '300px'}} type='submit'>Signup</button><br />
            <button style={{fontSize: 24, height: 40, width: '300px'}} type="submit" onClick={goLogin} >Return to Login</button>
            <label style={{width: '350px', height: '50px', fontSize: 24, justifyContent: 'center', alignItems: 'center'}} >Passwords Do Not Match</label><br /><br />
        
            
          </form>
          </form>
          )}
        </div>
      
      );
};