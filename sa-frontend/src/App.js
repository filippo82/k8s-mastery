
import React, {useState} from 'react';

// Material UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import SentimentDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentDissatisfiedOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import ReactRough, { Arc } from 'react-rough';

//import Polarity from "./components/Polarity";

// Copyright at the bottom
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://">
        Brocer
      </Link>
      {' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

// Simple counter
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Typography variant="body2" color="textSecondary" align="center">
        You clicked {count} times
        <Button variant="contained" onClick={() => setCount(count + 1)}>
          Click me
        </Button>
      </Typography>
    </div>
  );
}

// Styles, see https://material-ui.com/styles/basics/
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js

// Icons: https://material-ui.com/components/material-icons/

const App = () => {
  const classes = useStyles();
  const [sentence, setSentence] = useState("");
  const [polarity, setPolarity] = useState(0.0);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting Sentence ${sentence}`)
}

  const analyzeSentence = (evt) => {
      evt.preventDefault();
      fetch('sentiment', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({sentence})
      })
          .then(response => response.json())
          .then(data => setPolarity(data.polarity));
  }

  /*
  const polarityColor = (polarity) => {
      const green = Math.round((polarity + 1) * 128);
      const red = 255 - green;
      return green
  }
  */

  const polarityRGBColor = (polarity) => {
      const green = Math.round((polarity + 1) * 128);
      const red = 255 - green;
      return `rgb(${red}, ${green}, 0)`
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sentiment analysis
        </Typography>
        <form className={classes.form} noValidate onSubmit={analyzeSentence}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="sentence"
            value={sentence}
            onChange={e => setSentence(e.target.value)}
            placeholder="Have a good day!"
            helperText="Type your sentence."
            name="sentence"
            autoComplete="sentence"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
          <Grid container justify="space-around" xs={12}>
            <Grid item>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Grid container justify="center" xs={12}>
            <Grid item>
              <ReactRough
                height={300}
                width={220}
              >
                  <Arc
                    closed
                    fill={polarityRGBColor(polarity)}
                    fillStyle="hachure"
                    height={200}
                    width={200}
                    start={Math.PI * 0.5}
                    stop={Math.PI * (1.5 + polarity)}
                    x={110}
                    y={150}
                  />
              </ReactRough>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={1}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default App;
