import React from "react";
import { auth } from "../../firebase/firebase";
import Fileupload from "./Fileupload";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Modal from "@material-ui/core/Modal";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Header({ props, user }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function Logout() {
    auth.signOut();
    props.history.push("/");
  }
  return (
    <div className="header">
      <h1>kudos</h1>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Fileupload user={user} closeModal={() => setOpen(false)} />
      </Modal>
      <div>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={handleOpen}
        >
          <PhotoCamera />
        </IconButton>
        <span onClick={Logout}>Log out</span>
      </div>
    </div>
  );
}

export default Header;
