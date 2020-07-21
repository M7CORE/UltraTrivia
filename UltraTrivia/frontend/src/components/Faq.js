import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
  width: 700,
     root: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'lightpink',
    },
  },
}))(TableRow);

function createData(Questions, Answers) {
  return { Questions, Answers };
}

const rows = [
  createData('How do I download the app?', 'Click on the link above.'),
  createData('How do I play the game?', 'Open the mobile app, log in and then select a category for the trivia.'),
  createData('Whats the difference between the web and mobile app?', 'The mobile app is for trivia section. The web app is used to reset your password, view the faq, and check the leaderboard.'),
  createData('How can I reset my password?', 'You can reset your password on the login page in the web app.'),
  createData('Can I view my high score?', 'Yes, click on leaderboard on the home page to view your score and compare it against the top 10 players.'),
];

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});
const app = async event => 
    {
        window.location.href = '/home';
    };

const goHome = async event => 
    {
        window.location.href = '/home';
    };

export default function PageTitle() {
  const classes = useStyles();

  return (
    <div id="faqDiv" style={{textAlign:'center', width: '100%', height: '100%', backgroundImage: "linear-gradient(to bottom, #4A148C,#673AB7, #9C27B0)", position:'absolute', left:'50%', top:'50%', transform: 'translate(-50%, -50%)', display: 'flex', alignItems:'center',justifyContent:'center'}}>
    
    <form style={{ width:700, justifyContent: 'center', alignItems: 'center'}}>
    <h1 style={{color:'white', fontSize: 48}}>FAQ</h1>
    <br />
    <a style={{fontSize: 30, fontColor: 'white', color: 'white'}}href="https://appetize.io/app/g5dm4kbz6kpg12ewmavw5gkf18" >Ultra Trivia App. Click Here! </a>
    <br />
    <br />
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow width= "700">
            <StyledTableCell align="center" >Questions</StyledTableCell>
            <StyledTableCell align="center" >Answers</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name} width="700">
              <StyledTableCell align="center">{row.Questions}</StyledTableCell>
              <StyledTableCell align="center">{row.Answers}</StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br />
    <button style={{backgroundColor:'lightblue', fontSize: 24, height: 40, width: '250px', justifyContent: 'center', alignItems: 'center'}} type="button" id="faqPage" class="buttons" 
          onClick={goHome}> Home </button><br />
    </form>
    </div>
  );
  
}