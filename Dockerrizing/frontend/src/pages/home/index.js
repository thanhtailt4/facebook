import { useEffect, useRef, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import SendVerification from "../../components/home/sendVerification";
import Stories from "../../components/home/stories";
import Post from "../../components/post";
import "./style.css";

export default function Home({
  setVisible,
  socket,
  posts,
  loading,
  getAllPosts,
  notifications,
  visiblePost,
  setVisiblePost,
  setVisibleReact,
  setVisibleReactComment,
  visibleReactComment,
  getNotifications,
  setShowChat,
  dataFriend,
  getDataFriend,
  dataByBirthday,
  getDatafriendsByBirthday,
  setVisiblePhoto,
  dataRoomMess,
  setShowChatRoom,
  onlineUsers,
  setReport,
  setReportGroup
}) {
  const { user } = useSelector((state) => ({ ...state }));
  const middle = useRef(null);
  const [height, setHeight] = useState();

  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [loading, height]);
  useEffect(() => {
    setVisiblePost(false);
    setVisibleReact(null);
    setVisibleReactComment(null);
  }, []);

  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
      <Header
        page="home"
        getAllPosts={getAllPosts}
        socket={socket}
        notifications={notifications}
        getNotifications={getNotifications}
        setShowChat={setShowChat}
      />
      <LeftHome user={user} />
      <div className="home_middle" ref={middle}>
        <CreatePost page="home" user={user} setVisible={setVisible} />
        {posts.length == 0 ? (
          <div className="sekelton_loader">
            <HashLoader color="#1876f2" />
          </div>
        ) : (
          <div className="posts">
            {posts.map((post, i) => (
              <Post
                key={i}
                post={post}
                user={user}
                socket={socket}
                setVisiblePost={setVisiblePost}
                visiblePost={visiblePost}
                setVisibleReact={setVisibleReact}
                setVisibleReactComment={setVisibleReactComment}
                visibleReactComment={visibleReactComment}
                commentId=""
                setVisiblePhoto={setVisiblePhoto}
                page="home"
                setReport={setReport}
                setReportGroup={setReportGroup}
              />
            ))}
          </div>
        )}
      </div>
      <RightHome
        user={user}
        dataFriend={dataFriend}
        getDataFriend={getDataFriend}
        setShowChat={setShowChat}
        setShowChatRoom={setShowChatRoom}
        socket={socket}
        dataByBirthday={dataByBirthday}
        getDatafriendsByBirthday={getDatafriendsByBirthday}
        dataRoomMess={dataRoomMess}
        onlineUsers={onlineUsers}
      />
    </div>
  );
}
