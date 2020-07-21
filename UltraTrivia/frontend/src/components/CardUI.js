import React, { useState } from 'react';

const BASE_URL = 'https://mernstack-1.herokuapp.com/';
//const BASE_URL = 'http://localhost:5000/';

function CardUI()
{
    var add = '';
    var search = '';
    var user = {};

    const [message,setMessage] = useState('');
    const [searchResults,setResults] = useState('');
    const [friendList,setFriendList] = useState('');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var email = ud.email;

    const addFriend = async event => 
    {
	    event.preventDefault();

        var js = '{"email":"'+email+'","addFriend":"'+add.value+'"}';

        try
        {
            const response = await fetch(BASE_URL + 'api/addfriend',
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var txt = await response.text();
            var res = JSON.parse(txt);

            if( res.error.length > 0 )
            {
                setMessage( "API Error:" + res.error );
            }
            else
            {
                setMessage('Friend has been added');
            }
        }
        catch(e)
        {
            setMessage(e.toString());
        }

	};

  const searchFriend = async event => 
  {
      event.preventDefault();
        
      var js = '{"email":"'+email+'","search":"'+search.value+'"}';

      try
      {
          const response = await fetch(BASE_URL + 'api/searchfriend',
          {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

          var txt = await response.text();
          var res = JSON.parse(txt);
          var _results = res.results;
          var resultText = '';
          for( var i=0; i<_results.length; i++ )
          {
              resultText += _results[i];
              if( i < _results.length - 1 )
              {
                  resultText += ', ';
              }
          }
          setResults('Friends(s) have been retrieved');
          setFriendList(resultText);
      }
      catch(e)
      {
          alert(e.toString());
          setResults(e.toString());
      }
  };

  const doLogout = event => 
  {
    event.preventDefault();
  
    localStorage.removeItem("user_data")
    window.location.href = '/';
  }; 

  const goProfile = async event =>
    {
        window.location.href = '/profile';
  };

	const faq = async event =>
    {
        window.location.href = '/faq';
  };

  return(
    <div id="cardUIDiv" style={{width: '100%', height: '100%', backgroundImage: "linear-gradient(to bottom, #4A148C,#673AB7, #9C27B0)", position:'absolute'}}>
        <h1 style={{color:'white'}}>WELCOME user</h1>
        <span id="userName">Logged In As {email} </span><br />
        <button style={{backgroundColor:'lightblue', width: '135px'}} type="button" id="logoutButton" class="buttons" 
           onClick={doLogout}> Log Out </button>
        <button style={{backgroundColor:'lightblue', width: '135px'}} type="button" id="profilePage" class="buttons" 
          onClick={goProfile}> Profile </button>
        <button style={{backgroundColor:'lightblue', width: '135px'}} type="button" id="faqPage" class="buttons" 
          onClick={faq}> FAQ </button><br />
        <input type="text" id="searchText" placeholder="Search for a friend" 
          ref={(c) => search = c} />
        <button style={{backgroundColor:'lightblue', width: '135px'}} type="button" id="searchFriendButton" class="buttons" 
          onClick={searchFriend}> Search Friend</button>
        <span id="friendSearchResult">{searchResults}</span>
        <p id="friendList">{friendList}</p><br />
        <input type="text" id="addText" placeholder="Add a friend" 
          ref={(c) => add = c} />
        <button style={{backgroundColor:'lightblue', width: '135px'}} type="button" id="addFriendButton" class="buttons" 
          onClick={addFriend}> Add Friend </button>
        <span id="friendAddResult">{message}</span>
      </div>
  );
}

export default CardUI;