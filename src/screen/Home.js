import React, { useState, useContext, useEffect } from "react";
import Header from "./componentes/Header";
import Post from "./componentes/Post";
import { db } from "../firebase/firebase";

import { UserProvider, UserContext } from "./componentes/UserContext";
import Fileupload from "./componentes/Fileupload";
function Home(props) {
  const [post, setPost] = useState([]);

  const userAuth = useContext(UserContext);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPost(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);
  return (
    <div>
      <Header props={props} user={userAuth.displayName} />
      <div className="post_dash">
        {post.map(({ id, post }) => (
          <Post
            key={id}
            profilePic={post.profilePic}
            caption={post.caption}
            postImage={post.imageUrl}
            userName={post.username}
            postID={id}
            user={userAuth.displayName}
            timeS={post.date}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
