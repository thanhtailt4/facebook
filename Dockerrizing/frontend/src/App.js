import { notification } from "antd";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import Chat_screen from "./components/chat";
import Room_Mess_screen from "./components/chat/RoomMess";
import CreatePostPopup from "./components/createPostPopup";
import PhotoPopup from "./components/photoPopup";
import Post_detail from "./components/post/Post_detail";
import ReactPopup from "./components/reactPopup";
import ReactCommentPopup from "./components/reactPopup/reactCommentPopup";
import ReportMenu from "./components/reportMenu";
import ReportGroupMenu from "./components/reportMenu/reportGroupMenu";
import { setRead } from "./functions/notification";
import { friendspage, friendspageByBirthday, groupdiscoverspage, groupspage, notificationsReducer, postgroups, postsReducer, roommess } from "./functions/reducers";
import { getdiscoverGroups, getFriendsByBirthday, getFriendsPageInfos, getGroupsJoined } from "./functions/user";
import Friends from "./pages/friends";
import Groups from "./pages/groups";
import PageGroup from "./pages/groups/PageGroup";
import Home from "./pages/home";
import Activate from "./pages/home/activate";
import Login from "./pages/login";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import Profile from "./pages/profile";
import Reset from "./pages/reset";
import Search from "./pages/search";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
function App() {
  const [visible, setVisible] = useState(false);
  const [visiblePost, setVisiblePost] = useState(null);
  const [visiblePhoto, setVisiblePhoto] = useState(null);
  const [visibleReact, setVisibleReact] = useState(null);
  const [visibleReactComment, setVisibleReactComment] = useState(null);
  const { user, darkTheme } = useSelector((state) => ({ ...state }));
  const [api, contextHolder] = notification.useNotification();
  const [notifi, setNotifi] = useState(null);
  const [report, setReport] = useState(false);
  const [reportGroup, setReportGroup] = useState(null);
  const [reportComment, setReportComment] = useState(false);
  const [reportGroupComment, setReportGroupComment] = useState(false);
  const [showChat, setShowChat] = useState(null);
  const [showChatRoom, setShowChatRoom] = useState(null);

  useEffect(() => {
    if (user?.id !== undefined) {
      getDatafriendsByBirthday();
      getAllPosts();
      getDataFriend();
      getGroups();
      getDiscoverGroups();
      getPostGroups();
      getRoomMess();
      getNotifications();
    }
  }, [user?.id]);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:5000", {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  //add online users

  useEffect(() => {
    if (socket === null) return;
    socket.emit("newUser", user?.id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });
    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  console.log(onlineUsers);

  const [photoDetail, setPhotoDetail] = useState("");
  const [{ loading, error, posts }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: "",
  });

  const reacts = ["Like", "Love", "Angry", "Haha", "Sad", "Wow"];

  const [
    { loadingNotification, errorNotification, notifications },
    dispatchNotification,
  ] = useReducer(notificationsReducer, {
    loading: false,
    notifications: [],
    error: "",
  });

  const getNotifications = async () => {
    try {
      dispatchNotification({
        type: "NOTIFICATIONS_REQUEST",
      });
      const { data } = await axios.get(
        `http://34.118.225.254:81/getAllNotification`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatchNotification({
        type: "NOTIFICATIONS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatchNotification({
        type: "NOTIFICATIONS_ERROR",
        payload: errorNotification?.response.data.message,
      });
    }
  };

  const [
    { loading: friendsLoading, error: friendsError, dataFriend },
    dispatchFriends,
  ] = useReducer(friendspage, {
    loading: false,
    dataFriend: [],
    error: "",
  });

  const [
    { loading: groupsLoading, error: groupsError, dataGroups },
    dispatchGroups,
  ] = useReducer(groupspage, {
    loading: false,
    dataGroups: [],
    error: "",
  });

  const [
    {
      loading: discoverGroupsLoading,
      error: discoverGroupsError,
      dataDiscoverGroups,
    },
    dispatchDiscoverGroups,
  ] = useReducer(groupdiscoverspage, {
    loading: false,
    dataDiscoverGroups: [],
    error: "",
  });

  const [
    { loading: postGroupsLoading, error: postGroupsError, dataPostGroups },
    dispatchPostGroups,
  ] = useReducer(postgroups, {
    loading: false,
    dataPostGroups: [],
    error: "",
  });

  const [
    { loading: roomMessLoading, error: roomMessError, dataRoomMess },
    dispatchRoomMess,
  ] = useReducer(roommess, {
    loading: false,
    dataRoomMess: [],
    error: "",
  });

  const getRoomMess = async () => {
    try {
      dispatchRoomMess({ type: "ROOM_MESS_REQUEST" });
      const { data } = await axios.get(`http://34.118.225.254:81/getRoomMess`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatchRoomMess({ type: "ROOM_MESS_SUCCESS", payload: data });
    } catch (error) {
      dispatchRoomMess({
        type: "ROOM_MESS_ERROR",
        payload: roomMessError?.response.data.message,
      });
    }
  };

  const getPostGroups = async () => {
    try {
      dispatchPostGroups({ type: "POST_GROUPS_REQUEST" });
      const { data } = await axios.get(
        `http://34.118.225.254:81/getpostgroups`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatchPostGroups({ type: "POST_GROUPS_SUCCESS", payload: data });
    } catch (error) {
      dispatchPostGroups({
        type: "POST_GROUPS_ERROR",
        payload: groupsError?.response.data.message,
      });
    }
  };

  const getGroups = async () => {
    dispatchGroups({ type: "GROUPS_REQUEST" });
    const data = await getGroupsJoined(user?.token);
    console.log(data);
    if (data.status === "ok") {
      dispatchGroups({ type: "GROUPS_SUCCESS", payload: data.data });
    } else {
      dispatchGroups({
        type: "GROUPS_ERROR",
        payload: groupsError.response.data.message,
      });
    }
  };

  const getDiscoverGroups = async () => {
    dispatchDiscoverGroups({ type: "DISCOVER_GROUPS_REQUEST" });
    const data = await getdiscoverGroups(user?.token);
    console.log(data);
    if (data.status === "ok") {
      dispatchDiscoverGroups({
        type: "DISCOVER_GROUPS_SUCCESS",
        payload: data.data,
      });
    } else {
      dispatchDiscoverGroups({
        type: "DISCOVER_GROUPS_ERROR",
        payload: groupsError.response.data.message,
      });
    }
  };

  const getDataFriend = async () => {
    dispatchFriends({ type: "FRIENDS_REQUEST" });
    const data = await getFriendsPageInfos(user?.id, user?.token);
    if (data.status === "ok") {
      dispatchFriends({ type: "FRIENDS_SUCCESS", payload: data.data });
    } else {
      dispatchFriends({
        type: "FRIENDS_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  const [
    {
      loading: friendsByBirthdayLoading,
      error: friendsByBirthdayError,
      dataByBirthday,
    },
    dispatchFriendsByBirthday,
  ] = useReducer(friendspageByBirthday, {
    loading: false,
    dataByBirthday: [],
    error: "",
  });

  const getDatafriendsByBirthday = async () => {
    dispatchFriendsByBirthday({ type: "FRIENDS_BY_BIRTHDAY_REQUEST" });
    const data = await getFriendsByBirthday(user?.id, user?.token);
    if (data.status === "ok") {
      dispatchFriendsByBirthday({
        type: "FRIENDS_BY_BIRTHDAY_SUCCESS",
        payload: data.data,
      });
    } else {
      dispatchFriendsByBirthday({
        type: "FRIENDS_BY_BIRTHDAY_ERROR",
        payload: data.data,
      });
    }
  };

  const setReadNotificaion = async (idNotification) => {
    try {
      await setRead(idNotification, user.token).then(setNotifi(idNotification));
    } catch (error) {
      console.error("Error while setting read:", error);
      // Handle the error as needed
    }
  };

  useEffect(() => {
    if (socket === null) return;
    socket.on("getNotification", (data) => {
      getDataFriend();
      if (data) {
        api.open({
          message: "New notification",
          description: (
            <>
              <Link
                style={{ color: "#0F0F0F" }}
                to={data?.link}
                className="mmenu_item hover3 "
                onClick={() => {
                  setReadNotificaion(data?.id);
                }}
              >
                <div className="profile_link_active">
                  <div className="circle_icon_notification">
                    <img src={data?.sender_picture} alt="" />
                    <div className="right_bottom_notification">
                      {reacts.includes(data?.type) ? (
                        <img
                          src={`../../../../reacts/${data?.type}.svg`}
                          alt=""
                        />
                      ) : (
                        <i className={`${data?.type}_icon`}></i>
                      )}
                    </div>
                  </div>
                  <p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${data?.description}`,
                      }}
                    />

                    <div className="notification_privacy_date_active">
                      <Moment fromNow interval={30}>
                        {data?.createdAt}
                      </Moment>
                    </div>
                  </p>
                </div>
                <div
                  className="notification_icon_active"
                  style={{ width: "12px" }}
                />
              </Link>
            </>
          ),
          placement: "bottomLeft",
        });
      }
      getNotifications();
    });
  }, [socket]);

  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });
      const { data } = await axios.get(`http://34.118.225.254:81/getAllposts`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  return (
    <div className={darkTheme && "dark"}>
      {visible && (
        <CreatePostPopup
          user={user}
          setVisible={setVisible}
          posts={posts}
          dispatch={dispatch}
        />
      )}
      {visibleReact && (
        <ReactPopup
          user={user}
          setVisibleReact={setVisibleReact}
          visibleReact={visibleReact}
          socket={socket}
        />
      )}
      {visibleReactComment && (
        <ReactCommentPopup
          user={user}
          setVisibleReactComment={setVisibleReactComment}
          visibleReactComment={visibleReactComment}
          socket={socket}
        />
      )}
      {visiblePost && (
        <Post_detail
          post={visiblePost.post}
          user={user}
          socket={socket}
          setVisiblePost={setVisiblePost}
          visiblePost={visiblePost}
          visibleReact={visibleReact}
          setVisibleReact={setVisibleReact}
          setVisibleReactComment={setVisibleReactComment}
          visibleReactComment={visibleReactComment}
          setVisiblePhoto={setVisiblePhoto}
          page={visiblePost.page}
          setReportGroup={setReportGroup}
        />
      )}
      {visiblePhoto && (
        <PhotoPopup
          setVisiblePost={setVisiblePost}
          setVisibleReact={setVisibleReact}
          setVisibleReactComment={setVisibleReactComment}
          visibleReactComment={visibleReactComment}
          visiblePhoto={visiblePhoto}
          setVisiblePhoto={setVisiblePhoto}
          socket={socket}
        />
      )}
      {showChat && (
        <Chat_screen
          showChat={showChat}
          setShowChat={setShowChat}
          setShowChatRoom={setShowChatRoom}
          socket={socket}
        />
      )}
      {showChatRoom && (
        <Room_Mess_screen
          showChatRoom={showChatRoom}
          setShowChatRoom={setShowChatRoom}
          setShowChat={setShowChat}
          socket={socket}
        />
      )}
      {report && <ReportMenu setReport={setReport}/>}
      {reportGroup && <ReportGroupMenu setReportGroup={setReportGroup} reportGroup={reportGroup}/>}
      {reportComment && <ReportMenu setReport={setReport}/>}
      {reportGroupComment && <ReportGroupMenu setReportGroup={setReportGroup}/>}
      {contextHolder}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route
            path="/profile"
            element={
              <Profile
                setVisible={setVisible}
                getAllPosts={getAllPosts}
                socket={socket}
                notifications={notifications}
                setNotifi={setNotifi}
                setVisiblePost={setVisiblePost}
                visibleReact={visibleReact}
                setVisibleReact={setVisibleReact}
                setVisibleReactComment={setVisibleReactComment}
                visibleReactComment={visibleReactComment}
                dataFriend={dataFriend}
                getDataFriend={getDataFriend}
                friendsLoading={friendsLoading}
                getNotifications={getNotifications}
                dataByBirthday={dataByBirthday}
                getDatafriendsByBirthday={getDatafriendsByBirthday}
                setVisiblePhoto={setVisiblePhoto}
                setShowChat={setShowChat}
              />
            }
            exact
          />
          <Route
            path="/profile&sk=:sk"
            element={
              <Profile
                setVisible={setVisible}
                getAllPosts={getAllPosts}
                socket={socket}
                notifications={notifications}
                setNotifi={setNotifi}
                setVisiblePost={setVisiblePost}
                visibleReact={visibleReact}
                setVisibleReact={setVisibleReact}
                setVisibleReactComment={setVisibleReactComment}
                visibleReactComment={visibleReactComment}
                dataFriend={dataFriend}
                getDataFriend={getDataFriend}
                friendsLoading={friendsLoading}
                getNotifications={getNotifications}
                dataByBirthday={dataByBirthday}
                getDatafriendsByBirthday={getDatafriendsByBirthday}
                setVisiblePhoto={setVisiblePhoto}
                setShowChat={setShowChat}
              />
            }
            exact
          />
          <Route
            path="/profile&sk=:sk/album=:album"
            element={
              <Profile
                setVisible={setVisible}
                getAllPosts={getAllPosts}
                socket={socket}
                notifications={notifications}
                setNotifi={setNotifi}
                setVisiblePost={setVisiblePost}
                visibleReact={visibleReact}
                setVisibleReact={setVisibleReact}
                setVisibleReactComment={setVisibleReactComment}
                visibleReactComment={visibleReactComment}
                dataFriend={dataFriend}
                getDataFriend={getDataFriend}
                friendsLoading={friendsLoading}
                getNotifications={getNotifications}
                dataByBirthday={dataByBirthday}
                getDatafriendsByBirthday={getDatafriendsByBirthday}
                setVisiblePhoto={setVisiblePhoto}
                setShowChat={setShowChat}
              />
            }
            exact
          />
          <Route
            path="/profile/:IdUser"
            element={
              <Profile
                setVisible={setVisible}
                getAllPosts={getAllPosts}
                socket={socket}
                notifications={notifications}
                setNotifi={setNotifi}
                setVisiblePost={setVisiblePost}
                visibleReact={visibleReact}
                setVisibleReact={setVisibleReact}
                setVisibleReactComment={setVisibleReactComment}
                visibleReactComment={visibleReactComment}
                dataFriend={dataFriend}
                getDataFriend={getDataFriend}
                friendsLoading={friendsLoading}
                getNotifications={getNotifications}
                dataByBirthday={dataByBirthday}
                getDatafriendsByBirthday={getDatafriendsByBirthday}
                setVisiblePhoto={setVisiblePhoto}
                setShowChat={setShowChat}
              />
            }
            exact
          />
          <Route
            path="/profile/:IdUser&sk=:sk"
            element={
              <Profile
                setVisible={setVisible}
                getAllPosts={getAllPosts}
                socket={socket}
                notifications={notifications}
                setNotifi={setNotifi}
                setVisiblePost={setVisiblePost}
                visibleReact={visibleReact}
                setVisibleReact={setVisibleReact}
                setVisibleReactComment={setVisibleReactComment}
                visibleReactComment={visibleReactComment}
                dataFriend={dataFriend}
                getDataFriend={getDataFriend}
                friendsLoading={friendsLoading}
                getNotifications={getNotifications}
                dataByBirthday={dataByBirthday}
                getDatafriendsByBirthday={getDatafriendsByBirthday}
                setVisiblePhoto={setVisiblePhoto}
                setShowChat={setShowChat}
              />
            }
            exact
          />
          <Route
            path="/profile/:IdUser&sk=:sk/album=:album"
            element={
              <Profile
                setVisible={setVisible}
                getAllPosts={getAllPosts}
                socket={socket}
                notifications={notifications}
                setNotifi={setNotifi}
                setVisiblePost={setVisiblePost}
                visibleReact={visibleReact}
                setVisibleReact={setVisibleReact}
                setVisibleReactComment={setVisibleReactComment}
                visibleReactComment={visibleReactComment}
                dataFriend={dataFriend}
                getDataFriend={getDataFriend}
                friendsLoading={friendsLoading}
                getNotifications={getNotifications}
                dataByBirthday={dataByBirthday}
                getDatafriendsByBirthday={getDatafriendsByBirthday}
                setVisiblePhoto={setVisiblePhoto}
                setShowChat={setShowChat}
              />
            }
            exact
          />
          <Route
            path="/profile/:IdUser&post_id:=post_id"
            element={
              <Profile
                setVisible={setVisible}
                getAllPosts={getAllPosts}
                socket={socket}
                notifications={notifications}
                setNotifi={setNotifi}
                setVisiblePost={setVisiblePost}
                visibleReact={visibleReact}
                setVisibleReact={setVisibleReact}
                setVisibleReactComment={setVisibleReactComment}
                visibleReactComment={visibleReactComment}
                dataFriend={dataFriend}
                getDataFriend={getDataFriend}
                friendsLoading={friendsLoading}
                getNotifications={getNotifications}
                dataByBirthday={dataByBirthday}
                getDatafriendsByBirthday={getDatafriendsByBirthday}
                setVisiblePhoto={setVisiblePhoto}
                setShowChat={setShowChat}
              />
            }
            exact
          />
          <Route
            path="/profile/:IdUser&post_id:=post_id&comment_id:=comment_id"
            element={
              <Profile
                setVisible={setVisible}
                getAllPosts={getAllPosts}
                socket={socket}
                notifications={notifications}
                setNotifi={setNotifi}
                setVisiblePost={setVisiblePost}
                visibleReact={visibleReact}
                setVisibleReact={setVisibleReact}
                setVisibleReactComment={setVisibleReactComment}
                visibleReactComment={visibleReactComment}
                dataFriend={dataFriend}
                getDataFriend={getDataFriend}
                friendsLoading={friendsLoading}
                getNotifications={getNotifications}
                dataByBirthday={dataByBirthday}
                getDatafriendsByBirthday={getDatafriendsByBirthday}
                setVisiblePhoto={setVisiblePhoto}
                setShowChat={setShowChat}
              />
            }
            exact
          />
          <Route
            path="/friends"
            element={
              <Friends
                getAllPosts={getAllPosts}
                socket={socket}
                notifications={notifications}
                setNotifi={setNotifi}
                dataFriend={dataFriend}
                getDataFriend={getDataFriend}
                friendsLoading={friendsLoading}
                dataByBirthday={dataByBirthday}
                getDatafriendsByBirthday={getDatafriendsByBirthday}
                friendsByBirthdayLoading={friendsByBirthdayLoading}
                setShowChat={setShowChat}
              />
            }
            exact
          />
          <Route
            path="/friends/:type"
            element={
              <Friends
                getAllPosts={getAllPosts}
                socket={socket}
                notifications={notifications}
                setNotifi={setNotifi}
                dataFriend={dataFriend}
                getDataFriend={getDataFriend}
                friendsLoading={friendsLoading}
                dataByBirthday={dataByBirthday}
                getDatafriendsByBirthday={getDatafriendsByBirthday}
                friendsByBirthdayLoading={friendsByBirthdayLoading}
                setShowChat={setShowChat}
              />
            }
            exact
          />
          <Route
            path="/groups"
            element={
              <Groups
                getGroups={getGroups}
                getDiscoverGroups={getDiscoverGroups}
                getAllPosts={getAllPosts}
                socket={socket}
                notifications={notifications}
                setNotifi={setNotifi}
                dataFriend={dataFriend}
                getDataFriend={getDataFriend}
                friendsLoading={friendsLoading}
                getNotifications={getNotifications}
                setVisible={setVisible}
                setVisiblePost={setVisiblePost}
                visibleReact={visibleReact}
                setVisibleReact={setVisibleReact}
                setVisibleReactComment={setVisibleReactComment}
                visibleReactComment={visibleReactComment}
                postGroupsLoading={postGroupsLoading}
                dataPostGroups={dataPostGroups}
                groupsLoading={groupsLoading}
                discoverGroupsLoading={discoverGroupsLoading}
                dataDiscoverGroups={dataDiscoverGroups}
                dataGroups={dataGroups}
                setVisiblePhoto={setVisiblePhoto}
                setShowChat={setShowChat}
              />
            }
            exact
          />
          <Route
            path="/groups/:type"
            element={
              <Groups
                getGroups={getGroups}
                getDiscoverGroups={getDiscoverGroups}
                getAllPosts={getAllPosts}
                socket={socket}
                notifications={notifications}
                setNotifi={setNotifi}
                dataFriend={dataFriend}
                getDataFriend={getDataFriend}
                friendsLoading={friendsLoading}
                getNotifications={getNotifications}
                setVisible={setVisible}
                setVisiblePost={setVisiblePost}
                visibleReact={visibleReact}
                setVisibleReact={setVisibleReact}
                setVisibleReactComment={setVisibleReactComment}
                visibleReactComment={visibleReactComment}
                postGroupsLoading={postGroupsLoading}
                dataPostGroups={dataPostGroups}
                groupsLoading={groupsLoading}
                discoverGroupsLoading={discoverGroupsLoading}
                dataDiscoverGroups={dataDiscoverGroups}
                dataGroups={dataGroups}
                setVisiblePhoto={setVisiblePhoto}
                setShowChat={setShowChat}
              />
            }
            exact
          />
          <Route
            path="/group/:idgroup/:sk/album=:album"
            element={
              <PageGroup
                getAllPosts={getAllPosts}
                socket={socket}
                notifications={notifications}
                setNotifi={setNotifi}
                dataFriend={dataFriend}
                getDataFriend={getDataFriend}
                friendsLoading={friendsLoading}
                getNotifications={getNotifications}
                setVisible={setVisible}
                setVisiblePost={setVisiblePost}
                visibleReact={visibleReact}
                setVisibleReact={setVisibleReact}
                setVisibleReactComment={setVisibleReactComment}
                visibleReactComment={visibleReactComment}
                getGroups={getGroups}
                getDiscoverGroups={getDiscoverGroups}
                setVisiblePhoto={setVisiblePhoto}
                setShowChat={setShowChat}
              />
            }
            exact
          />
          <Route
            path="/group/:idgroup/:sk/:type"
            element={
              <PageGroup
                getAllPosts={getAllPosts}
                socket={socket}
                notifications={notifications}
                setNotifi={setNotifi}
                dataFriend={dataFriend}
                getDataFriend={getDataFriend}
                friendsLoading={friendsLoading}
                getNotifications={getNotifications}
                setVisible={setVisible}
                setVisiblePost={setVisiblePost}
                visibleReact={visibleReact}
                setVisibleReact={setVisibleReact}
                setVisibleReactComment={setVisibleReactComment}
                visibleReactComment={visibleReactComment}
                getGroups={getGroups}
                getDiscoverGroups={getDiscoverGroups}
                setVisiblePhoto={setVisiblePhoto}
                setShowChat={setShowChat}
              />
            }
            exact
          />
          <Route
            path="/group/:idgroup/:sk"
            element={
              <PageGroup
                getAllPosts={getAllPosts}
                socket={socket}
                notifications={notifications}
                setNotifi={setNotifi}
                dataFriend={dataFriend}
                getDataFriend={getDataFriend}
                friendsLoading={friendsLoading}
                getNotifications={getNotifications}
                setVisible={setVisible}
                setVisiblePost={setVisiblePost}
                visibleReact={visibleReact}
                setVisibleReact={setVisibleReact}
                setVisibleReactComment={setVisibleReactComment}
                visibleReactComment={visibleReactComment}
                getGroups={getGroups}
                getDiscoverGroups={getDiscoverGroups}
                setVisiblePhoto={setVisiblePhoto}
                setShowChat={setShowChat}
              />
            }
            exact
          />
          <Route
            path="/group/:idgroup"
            element={
              <PageGroup
                getAllPosts={getAllPosts}
                socket={socket}
                notifications={notifications}
                setNotifi={setNotifi}
                dataFriend={dataFriend}
                getDataFriend={getDataFriend}
                friendsLoading={friendsLoading}
                getNotifications={getNotifications}
                setVisible={setVisible}
                setVisiblePost={setVisiblePost}
                visibleReact={visibleReact}
                setVisibleReact={setVisibleReact}
                setVisibleReactComment={setVisibleReactComment}
                visibleReactComment={visibleReactComment}
                getGroups={getGroups}
                getDiscoverGroups={getDiscoverGroups}
                setVisiblePhoto={setVisiblePhoto}
                setShowChat={setShowChat}
              />
            }
            exact
          />
          <Route
            path="/"
            element={
              <Home
                setVisible={setVisible}
                socket={socket}
                posts={posts}
                loading={loading}
                getAllPosts={getAllPosts}
                notifications={notifications}
                setVisiblePost={setVisiblePost}
                visiblePost={visiblePost}
                setVisibleReact={setVisibleReact}
                setVisibleReactComment={setVisibleReactComment}
                visibleReactComment={visibleReactComment}
                getNotifications={getNotifications}
                setShowChat={setShowChat}
                setShowChatRoom={setShowChatRoom}
                dataFriend={dataFriend}
                getDataFriend={getDataFriend}
                dataByBirthday={dataByBirthday}
                getDatafriendsByBirthday={getDatafriendsByBirthday}
                setVisiblePhoto={setVisiblePhoto}
                dataRoomMess={dataRoomMess}
                onlineUsers={onlineUsers}
                setReport={setReport}
                setReportGroup={setReportGroup}
              />
            }
            exact
          />
          <Route
            path="/search/searchTerm=:searchTerm"
            element={
              <Search
                socket={socket}
                getAllPosts={getAllPosts}
                notifications={notifications}
                setNotifi={setNotifi}
                getDataFriend={getDataFriend}
                setShowChat={setShowChat}
              />
            }
            exact
          />
          <Route
            path="/search/:typeSearch/searchTerm=:searchTerm"
            element={
              <Search
                socket={socket}
                getAllPosts={getAllPosts}
                notifications={notifications}
                setNotifi={setNotifi}
                getDataFriend={getDataFriend}
                setShowChat={setShowChat}
              />
            }
            exact
          />

          <Route path="/activate/:token" element={<Activate />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login socket={socket} />} exact />
        </Route>
        <Route path="/reset" element={<Reset />} />
        <Route
          path="*"
          element={
            <NotFoundPage
              socket={socket}
              getAllPosts={getAllPosts}
              notifications={notifications}
              setVisiblePost={setVisiblePost}
              setNotifi={setNotifi}
              setShowChat={setShowChat}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
