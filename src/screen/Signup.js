import React, { useState, useEffect, useCallback, useContext } from "react";
import { withRouter } from "react-router";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "../firebase/firebase";
import Alert from "@material-ui/lab/Alert";
import "./style/Style.css";
import LinearProgress from "@material-ui/core/LinearProgress";
import { UserProvider, UserContext } from "./componentes/UserContext";

const useStyles = makeStyles((theme) => ({
  btn: {
    backgroundColor: "royalblue",
    color: "#fff",
    marginTop: 10,
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: 10,
  },
  alert: {
    marginBottom: 10,
  },
}));

function Login(props) {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [state, setState] = useState(false);
  const [error, setError] = useState(false);
  function Signin(e) {
    e.preventDefault();
    setState(true);
    setError(false);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((data) => props.history.push("/Home"))
      .catch((e) => {
        setState(false);
        setError(true);
      });
  }

  return (
    <div className="login">
      <form className={classes.form}>
        {error ? (
          <Alert severity="error" className={classes.alert}>
            Invalid credentials
          </Alert>
        ) : (
          ""
        )}
        <TextField
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required={true}
          type="email"
          value={email}
          label="Email Id"
          className={classes.input}
          variant="outlined"
        />
        <TextField
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required={true}
          type="password"
          value={password}
          variant="outlined"
          label="Password"
          className={classes.input}
        />
        <Button
          type="submit"
          disabled={state ? true : false}
          id="btn"
          onClick={Signin}
          className={classes.btn}
        >
          Login
        </Button>
        {state ? <LinearProgress /> : ""}
      </form>
    </div>
  );
}

function CreateAccount(props) {
  const classes = useStyles();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [state, setState] = useState(false);
  const [error, setError] = useState(false);
  const Register = (e) => {
    setState(true);
    setError(false);
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        auth.onAuthStateChanged((authUser) => {
          console.log(authUser);
          authUser.updateProfile({
            displayName: username,
          });
          setError(false);
          return;
        });
      })
      .catch((error) => setError(true));
  };

  return (
    <div className="signup">
      <form className={classes.form}>
        {error ? (
          <Alert severity="error" className={classes.alert}>
            Invalid credentials or Email already exist
          </Alert>
        ) : (
          ""
        )}
        <TextField
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required={true}
          type="text"
          value={username}
          label="User Name"
          variant="outlined"
          className={classes.input}
        />
        <TextField
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required={true}
          type="email"
          value={email}
          label="Email Id"
          variant="outlined"
          className={classes.input}
        />
        <TextField
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required={true}
          type="password"
          value={password}
          variant="outlined"
          label="Password"
          className={classes.input}
        />
        <Button
          type="submit"
          disabled={state ? true : false}
          className={classes.btn}
          onClick={Register}
          id="btn"
        >
          Create Account
        </Button>
        {state ? <LinearProgress /> : ""}
      </form>
    </div>
  );
}
function Signup(props) {
  const [state, setState] = useState(true);
  const userAuth = useContext(UserContext);
  const [user, setUser] = useState();
  useEffect(() => {
    const authV = () => {
      if (userAuth) {
        console.log(userAuth);
        props.history.push("/Home");
        return;
      } else {
        props.history.push("/");
      }
    };
    authV();
  }, [userAuth]);
  return (
    <div className="sign">
      <h1>kudos</h1>
      <div className="container">
        <div className="selector">
          <span
            onClick={() => {
              setState(true);
            }}
            style={{
              backgroundColor: state ? "royalblue" : "#fff",
              color: state ? "#fff" : "",
            }}
          >
            Login
          </span>
          <span
            onClick={() => {
              setState(false);
            }}
            style={{
              backgroundColor: state ? "#fff" : "royalblue",
              color: state ? "" : "#fff",
            }}
          >
            Create Account
          </span>
        </div>
        {state ? <Login props={props} /> : <CreateAccount props={props} />}
      </div>
    </div>
  );
}

export default withRouter(Signup);
