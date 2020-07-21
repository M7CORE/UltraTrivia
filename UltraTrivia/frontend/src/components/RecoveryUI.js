import React, { useState } from 'react';

function RecoveryUI()
{
  var email;
  var password;

    const changePassword = async event => 
    {
	
  	};

    const changeEmail = async event => 
    {
        
    };

    const goLogin = async event => 
    {
        window.location.href = '/';
    };

    return(
        <div id="profileUIDiv" style={{width: '100%', height: '100%', backgroundImage: "linear-gradient(to bottom, #4A148C,#673AB7, #9C27B0)", position:'absolute'}}>
        <h1 id="title"> Password and Email Recovery </h1>
        <button type="button" id="homePage" class="buttons" 
          onClick={goLogin}> Return to Login Page </button><br />
        <br />
        <input type="password" id="loginPassword" placeholder="Password" ref={(c) => password = c} /><br />
        <button style={{backgroundColor:'lightblue', width: '135px'}} type="button" id="changePassword" class="buttons" 
          onClick={changePassword}> Change Password </button><br />
      </div>
      
    );
}

export default RecoveryUI;