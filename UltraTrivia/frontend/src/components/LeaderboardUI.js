import React, { useState } from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { createChainedFunction } from '@material-ui/core';

const BASE_URL = 'https://mernstack-1.herokuapp.com/';

export default function LeaderboardUI() {

  const[stage, setStage] = useState(1);

  var card = '';
  var search = '';

  const [message,setMessage] = useState('');
  const [searchResults,setResults] = useState('');
  const [cardList,setCardList] = useState('');
  const [u1,s1] = useState('');
  const [u2,s2] = useState('');
  const [u3,s3] = useState('');
  const [u4,s4] = useState('');
  const [u5,s5] = useState('');
  const [u6,s6] = useState('');
  const [u7,s7] = useState('');
  const [u8,s8] = useState('');
  const [u9,s9] = useState('');
  const [u10,s10] = useState('');
  const [u11,s11] = useState('');
  const [u12,s12] = useState('');
  const [u13,s13] = useState('');
  const [u14,s14] = useState('');
  const [u15,s15] = useState('');
  const [u16,s16] = useState('');
  const [u17,s17] = useState('');
  const [u18,s18] = useState('');
  const [u19,s19] = useState('');
  const [u20,s20] = useState('');

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#FF69B4',
      color: 'theme.palette.common.white',
      fontWeight : 'bold',
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    width: 300,
      root: {
      '&:nth-of-type(odd)': {
        backgroundColor: 'lightpink',
      },
    },
  }))(TableRow);

  function createData(Rank, User, Points) {
    return { Rank, User, Points };
  }

  /*
  var js = '{"numPlayers":0}';

  const response = fetch(BASE_URL + 'api/leaderboard',
              {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

  var txt = response.text();
  var res = JSON.parse(txt);
  var _results = res.Results;

  const rows = [
    createData('1', _results[0].Email, _results[0].Points),
    createData('2', _results[1].Email, _results[1].Points),
    createData('3', _results[2].Email, _results[2].Points),
    createData('4', _results[3].Email, _results[3].Points),
    createData('5', _results[4].Email, _results[4].Points),
    createData('6', _results[5].Email, _results[5].Points),
    createData('7', _results[6].Email, _results[6].Points),
    createData('8', _results[7].Email, _results[7].Points),
    createData('9', _results[8].Email, _results[8].Points),
    createData('10', _results[9].Email, _results[9].Points)
    
  ];
 */

  
const searchCard = async event => 
{
    event.preventDefault();
      
    var js = '{"numPlayers":0}';
    


    try
    {
        var _ud = localStorage.getItem('user_data');
        var ud = JSON.parse(_ud);
        var userId = ud.email;
        var js2 = '{"email": "'+userId+'"}';
        const response = await fetch(BASE_URL + 'api/getPoints',
        {method:'POST',body:js2,headers:{'Content-Type': 'application/json'}});

        var txt = await response.text();
        var res = JSON.parse(txt);
        var _results = res.Points;
        s20(res.Points);
    }
    catch(e)
    {
        setResults(e.toString());
    }

    try
    {
        const response = await fetch(BASE_URL + 'api/leaderboard',
        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

        var txt = await response.text();
        var res = JSON.parse(txt);
        var _results = res.Results;
        var resultText = '';
        var a = res.Results[0];
        var b = a.split(': ');
        setCardList(b[0]);
        s1(b[1]);
        var a = res.Results[1];
        var b = a.split(': ');
        s2(b[0]);
        s3(b[1]);
        var a = res.Results[2];
        var b = a.split(': ');
        s4(b[0]);
        s5(b[1]);
        var a = res.Results[3];
        var b = a.split(': ');
        s6(b[0]);
        s7(b[1]);
        var a = res.Results[4];
        var b = a.split(': ');
        s8(b[0]);
        s9(b[1]);
        var a = res.Results[5];
        var b = a.split(': ');
        s10(b[0]);
        s11(b[1]);
        var a = res.Results[6];
        var b = a.split(': ');
        s12(b[0]);
        s13(b[1]);
        var a = res.Results[7];
        var b = a.split(': ');
        s14(b[0]);
        s15(b[1]);
        var a = res.Results[8];
        var b = a.split(': ');
        s16(b[0]);
        s17(b[1]);
        var a = res.Results[9];
        var b = a.split(': ');
        s18(b[0]);
        s19(b[1]);
        setStage(2);
    }
    catch(e)
    {
        setResults(e.toString());
    }
      
  }

  const rows = [
    createData('1', cardList, u1),
    createData('2', u2, u3),
    createData('3', u4, u5),
    createData('4', u6, u7),
    createData('5', u8, u9),
    createData('6', u10, u11),
    createData('7', u12, u13),
    createData('8', u14, u15),
    createData('9', u16, u17),
    createData('10', u18, u19)
    
  ];

  /*
  const rows = [
    createData('1', 'mirettegamal965@gmail.com', '174'),
    createData('2', 'jertz@uswnt.com', '45'),
    createData('3', 'mfch98@gmail.com', '30'),
    createData('4', 'maxmc2234@gmail.com', '21'),
    createData('5', 'rockyrod@baonpdx', '17'),
    createData('6', 'mfch98@yahoo.com', '4'),
    createData('7', 'ptfc@baonpdx.com', '3'),
    createData('8', 'corella_m@knights.ucf.edu', '3'),
    createData('9', 'maxmc2234@knights.ucf.edu', '1'),
    createData('10', 'mfch98@hotmail.com', '1')
    
  ];
  */

  const useStyles = makeStyles({
    table: {
      minWidth: 300,
    },
  });

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

    const classes = useStyles();

    return (
      <div id="leaderDIV" style={{textAlign:'center', width: '100%', height: '100%', backgroundImage: "linear-gradient(to bottom, #4A148C,#673AB7, #9C27B0)", position:'absolute', left:'50%', top:'50%', transform: 'translate(-50%, -50%)', display: 'flex', alignItems:'center',justifyContent:'center'}}>
      {stage === 1 && (
      <form style={{ width:700, justifyContent: 'center', alignItems: 'center'}}>
      <button style={{backgroundColor:'lightblue', fontSize: 24, height: 40, width: '125px', float: 'right'}} type="button" id="logoutButton" class="buttons" 
             onClick={doLogout}> Log Out </button>
      <button style={{backgroundColor:'lightblue', fontSize: 24, height: 40, width: '125px', float: 'left'}} type="button" id="faqPage" class="buttons" 
            onClick={faq}> FAQ </button>
      <button style={{backgroundColor:'lightblue', fontSize: 24, height: 40, width: '250px'}} id = "leaderboardButton" onClick={searchCard}>Leaderboard</button>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <h1 style={{color:'white', fontSize: 48}} >Welcome to Ultra Trivia</h1>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br />
      </form>
      )}
      {stage === 2 && (
          <form style={{ width:700, justifyContent: 'center', alignItems: 'center'}}>
            <br />
          <button style={{backgroundColor:'lightblue', fontSize: 24, height: 40, width: '125px', float: 'right'}} type="button" id="logoutButton" class="buttons" 
              onClick={doLogout}> Log Out </button>
          <button style={{backgroundColor:'lightblue', fontSize: 24, height: 40, width: '125px', float: 'left'}} type="button" id="faqPage" class="buttons" 
              onClick={faq}> FAQ </button>
          <br /><br />
          <h1 style={{color:'white', fontSize: 48}} >Ultra Trivia - Leaderboard</h1>
          <br /><label style={{fontSize: 24, color: 'white'}}>Your High Score: {u20}</label><br /><br />
          
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow >
              <StyledTableCell align="center" >Rank</StyledTableCell>
              <StyledTableCell align="center" >User</StyledTableCell>
              <StyledTableCell align="center" >Score</StyledTableCell>
  
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name} >
  
                <StyledTableCell align="center">{row.Rank}</StyledTableCell>
                <StyledTableCell align="center">{row.User}</StyledTableCell>
                <StyledTableCell align="center">{row.Points}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </form>
      )}
      </div>
        
    );
    
};