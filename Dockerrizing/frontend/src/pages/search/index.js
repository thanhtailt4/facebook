import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import Header from "../../components/header";
import { getUser, search } from "../../functions/user";
import { Link, useParams } from "react-router-dom";
import "./style.css";
import { addFriend, cancelRequest, acceptRequest } from "../../functions/user";
import { createNotification } from "../../functions/notification";
export default function Search({
  socket,
  posts,
  getAllPosts,
  notifications,
  setNotifi,
  getDataFriend,
  setShowChat
}) {
  const { user } = useSelector((state) => ({ ...state }));
  const { type } = useParams();
  const { searchTerm, typeSearch } = useParams();
  const [searchs, setSearchs] = useState([]);
  const [User, setUser] = useState();
  const searchHandler = async () => {
    const res = await search(searchTerm, user.token);
    setSearchs(res);
  };
  const getUserData = async () => {
    const res = await getUser(user.token);
    setUser(res);
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    searchHandler();
    getDataFriend();
  }, [searchTerm, User]);

  const addFriendHandler = async (Userid) => {
    await addFriend(Userid, user.token);
    const newNotification = await createNotification(
      Userid,
      "addFriend",
      null,
      null,
      `/profile/${user.id}`,
      ` <b>${user.first_name} ${user.last_name}</b> has sent you a friend request.`,
      user.token,
      null
    );
    socket.emit("sendNotification", {
      senderId: user.id,
      sender_first_name: user.first_name,
      sender_last_name: user.last_name,
      sender_picture: user.picture,
      receiverId: Userid,
      type: "addFriend",
      postId: "",
      commentId: "",
      link: `/profile/${user.id}`,
      description: ` <b>${user.first_name} ${user.last_name}</b> has sent you a friend request.`,
      id: newNotification.newnotification._id,
      createdAt: newNotification.newnotification.createdAt,
      groupId: "",
    });
    getUserData();
  };

  const cancelRequestHandler = async (Userid) => {
    await cancelRequest(Userid, user.token);
    getUserData();
  };
  const acceptRequestHanlder = async (Userid) => {
    await acceptRequest(Userid, user.token);
    getUserData();
    const newNotification = await createNotification(
      Userid,
      "acceptRequest",
      null,
      null,
      `/profile/${user.id}`,
      ` <b>${user.first_name} ${user.last_name}</b> accepted your friend request.`,
      user.token,
      null
    );

    socket.emit("sendNotification", {
      senderId: user.id,
      sender_first_name: user.first_name,
      sender_last_name: user.last_name,
      sender_picture: user.picture,
      receiverId: Userid,
      type: "acceptRequest",
      postId: "",
      commentId: "",
      link: `/profile/${user.id}`,
      description: ` <b>${user.first_name} ${user.last_name}</b> accepted your friend request.`,
      id: newNotification.newnotification._id,
      createdAt: newNotification.newnotification.createdAt,
      groupId: "",
    });
  };
  return (
    <div className="home">
      <Header
        getAllPosts={getAllPosts}
        socket={socket}
        notifications={notifications}
        setNotifi={setNotifi}
        setShowChat={setShowChat}
      />
      <div className="friends">
        <div className="friends_left">
          <div className="friends_left_header">
            <h2>Search results</h2>
          </div>
          <div className="friends_left_wrap">
            <Link
              to={`/search/searchTerm=${searchTerm}`}
              className={`mmenu_item hover3 ${
                typeSearch === undefined && "active_friends"
              }`}
            >
              <div className="small_circle">
                <i className="all_search_icon"></i>
              </div>
              <span>All</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
          </div>
          <div className="friends_left_wrap">
            <Link
              to={`/search/people/searchTerm=${searchTerm}`}
              className={`mmenu_item hover3 ${
                typeSearch === "people" && "active_friends"
              }`}
            >
              <div className="small_circle">
                <i className="friends_home_icon"></i>
              </div>
              <span>People</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
          </div>
          <div className="friends_left_wrap">
            <Link
              to={`/search/groups/searchTerm=${searchTerm}`}
              className={`mmenu_item hover3 ${
                typeSearch === "groups" && "active_friends"
              }`}
            >
              <div className="small_circle">
                <i className="group_icon"></i>
              </div>
              <span>Groups</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
          </div>
        </div>
        <div className="search_right scrollbar">
          <div className="search_middle ">
            <div className="serach">
              {User ? (
                <>
                  {" "}
                  {searchs.map((search, i) => (
                    <>
                      <div className="user_serach_wrap">
                        <Link
                          to={`/profile/${search?._id}`}
                          className={"user_serach "}
                        >
                          <img src={search?.picture} alt="" />
                          <div className="user_serach_name">
                            {search?.first_name} {search?.last_name}
                          </div>
                        </Link>

                        {search?.friends.indexOf(user.id) !== -1 ? (
                          <>
                            <button className="btn_add_friend_search">
                              <p>Message</p>
                            </button>
                          </>
                        ) : (
                          <>
                            {search?.requests.indexOf(user.id) !== -1 ? (
                              <button
                                className="btn_add_friend_search"
                                onClick={() => cancelRequestHandler(search._id)}
                              >
                                <p>Cancel request</p>
                              </button>
                            ) : (
                              <>
                                {User?.requests.indexOf(search._id) !== -1 ? (
                                  <button
                                    className="btn_add_friend_search"
                                    onClick={() =>
                                      acceptRequestHanlder(search._id)
                                    }
                                  >
                                    <p>Confirm request</p>
                                  </button>
                                ) : (
                                  <>
                                    {search._id === User._id ? (
                                      ""
                                    ) : (
                                      <button
                                        className="btn_add_friend_search"
                                        onClick={() =>
                                          addFriendHandler(search._id)
                                        }
                                      >
                                        <p>Add Friend</p>
                                      </button>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </>
                  ))}
                </>
              ) : (
                <>
                  {" "}
                  <div className="sekelton_loader">
                    <HashLoader color="#1876f2" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
