import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Button } from "@material-ui/core";
import { storage, db } from "../../firebase/firebase";
import { UserProvider, UserContext } from "../componentes/UserContext";
import firebase from "firebase";
import "../style/Style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
    input: {
      display: "none",
    },
  },
}));

function Fileupload(props) {
  const classes = useStyles();
  const [caption, setCaption] = useState();
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const userAuth = useContext(UserContext);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
      console.log(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setFile(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const upload = storage.ref(`image/${image.name}`).put(image);
    const date = new Date().getDate().toString();
    const year = new Date().getFullYear().toString();
    const month = new Date().getMonth().toString();
    const tday = `${date}/${month}${year}`;
    upload.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("image")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption ? caption : "",
              imageUrl: url,
              username: props.user,
              profilePic: "",
              date: tday,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
            setFile(null);
          });
      }
    );
  };
  return (
    <div className="uploadBox">
      <form className={classes.root} id="form" noValidate autoComplete="off">
        <h1> Post Image </h1>{" "}
        <progress style={{ width: "100%" }} max="100" value={progress} />{" "}
        <TextField
          id="outlined-multiline-static"
          label="Caption"
          multiline
          rows={4}
          variant="outlined"
          onChange={(e) => setCaption(e.target.value)}
        />{" "}
        <input
          onChange={handleChange}
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          style={{ display: "none" }}
        />
        {file ? <img src={file} alt="" /> : ""}{" "}
        <div id="btn-select">
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Choose File{" "}
            </Button>{" "}
          </label>{" "}
          <Button
            onClick={handleUpload}
            variant="contained"
            color="primary"
            component="span"
            disabled={image ? false : true}
          >
            Upload{" "}
          </Button>{" "}
        </div>{" "}
      </form>{" "}
    </div>
  );
}

export default Fileupload;
