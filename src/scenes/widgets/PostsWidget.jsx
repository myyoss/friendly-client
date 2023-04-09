import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const [mapByDate, setMapByDate] = useState([]);
  
  const getPosts = async () => {
    const response = await fetch("https://friendly-server.onrender.com/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    const mapDataByNewPostFirst = data
      .slice(0)
      .reverse()
      .map((element) => {
        return element;
      });
    setMapByDate(mapDataByNewPostFirst);
    dispatch(setPosts({ posts: mapDataByNewPostFirst }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `https://friendly-server.onrender.com/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();

    const mapDataByNewPostFirst = data
      .slice(0)
      .reverse()
      .map((element) => {
        return element;
      });
    setMapByDate(mapDataByNewPostFirst);
    dispatch(setPosts({ posts: mapDataByNewPostFirst }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {mapByDate.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          occupation,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            occupation={occupation}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
