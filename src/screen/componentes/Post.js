import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../../firebase/firebase";
import firebase from "firebase";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import CommentIcon from "@material-ui/icons/Comment";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    margin: 10,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function Post({
  postID,
  userName,
  caption,
  profilePic,
  postImage,
  user,
  timeS,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [state, setState] = React.useState(true);
  const [comment, setComment] = React.useState();
  const [comments, setComments] = React.useState([]);
  React.useEffect(() => {
    let data;
    if (postID) {
      const data = db
        .collection("posts")
        .doc(postID)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [postID]);
  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postID).collection("comments").add({
      comment: comment,
      username: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    /*<div className="post" style={{ display: state ? "none" : "inline" }}>
      <div className="post_header">
        <div>
          <Avatar alt="Remy Sharp" src={profilePic}></Avatar>
        </div>
        <h2 className="post_user">{userName}</h2>
      </div>
      <div className="post_img">
        <img src={postImage} alt="" onLoad={() => setState(false)} />
      </div>
      <div className="post_bottom_bar">
        <h5 className="post_user">{userName}</h5>
        <p>{caption}</p>
      </div>
      <div className="comment_bottom_bar">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username} </strong>
            {comment.comment}
          </p>
        ))}
      </div>
      <form className="comm_box">
        <input
          type="text"
          className="comment_input"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          disabled={!comment}
          className="post_btn"
          type="submit"
          onClick={postComment}
        >
          Post
        </button>
      </form>
        </div>*/

    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label={userName}
            src={profilePic}
            className={classes.avatar}
          ></Avatar>
        }
        title={userName}
        subheader={timeS}
      />
      <CardMedia className={classes.media} image={postImage} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <CommentIcon onClick={handleExpandClick} />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {comments.map((comment) => (
            <Typography>
              <strong>{comment.username} </strong>
              {comment.comment}
            </Typography>
          ))}
          <form className="comm_box">
            <input
              type="text"
              className="comment_input"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              disabled={!comment}
              className="post_btn"
              type="submit"
              onClick={postComment}
            >
              Post
            </button>
          </form>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Post;
