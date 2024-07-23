import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/header";
import { HashLoader } from "react-spinners";
import Card from "./Card";
import FriendCard from "../../components/friend/FriendCard";
import "./style.css";
export default function Friends({
  getAllPosts,
  socket,
  notifications,
  setNotifi,
  dataFriend,
  getDataFriend,
  friendsLoading,
  dataByBirthday,
  getDatafriendsByBirthday,
  friendsByBirthdayLoading,
  setShowChat
}) {
  const { user } = useSelector((state) => ({ ...state }));
  const { type } = useParams();
  console.log(dataFriend.requests);
  return (
    <>
      <Header
        page="friends"
        getAllPosts={getAllPosts}
        socket={socket}
        notifications={notifications}
        setNotifi={setNotifi}
        setShowChat={setShowChat}
      />
      <div className="friends">
        <div className="friends_left">
          <div className="friends_left_header">
            <h2>Friends</h2>
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
          </div>
          <div className="friends_left_wrap">
            <Link
              to="/friends"
              className={`mmenu_item hover3 ${
                type === undefined && "active_friends"
              }`}
            >
              <div className="small_circle">
                <i className="friends_home_icon "></i>
              </div>
              <span>Home</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <Link
              to="/friends/requests"
              className={`mmenu_item hover3 ${
                type === "requests" && "active_friends"
              }`}
            >
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Friend Requests</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <Link
              to="/friends/sent"
              className={`mmenu_item hover3 ${
                type === "sent" && "active_friends"
              }`}
            >
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Sent Requests</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="friends_suggestions_icon"></i>
              </div>
              <span>Suggestions</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <Link
              to="/friends/all"
              className={`mmenu_item hover3 ${
                type === "all" && "active_friends"
              }`}
            >
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>All Friends</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <Link
              to="/friends/birthdays"
              className={`mmenu_item hover3 ${
                type === "birthdays" && "active_friends"
              }`}
            >
              <div className="small_circle">
                <i className="birthdays_icon"></i>
              </div>
              <span>Birthdays</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
          </div>
        </div>
        <div className="friends_right">
          {(type === undefined || type === "all") && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Friends</h3>
                {type === undefined && (
                  <Link to="/friends/all" className="see_link hover3">
                    See all
                  </Link>
                )}
              </div>
              <div className="flex_wrap">
                {friendsLoading ? (
                  <div className="sekelton_loader">
                    <HashLoader color="#1876f2" />
                  </div>
                ) : (
                  <>
                    {dataFriend.friends?.length > 0 ? (
                      dataFriend.friends.map((user) => (
                        <Card
                          userr={user}
                          key={user._id}
                          type="friends"
                          getData={getDataFriend}
                          socket={socket}
                        />
                      ))
                    ) : (
                      <div
                        className="No_results"
                        style={{
                          paddingLeft: "250px",
                          flexDirection: "column",
                        }}
                      >
                        <img src="../../../images/no_user_friend.png" alt="" />
                        <p>No user to show</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
          {(type === undefined || type === "requests") && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Friend Requests</h3>
                {type === undefined && (
                  <Link to="/friends/requests" className="see_link hover3">
                    See all
                  </Link>
                )}
              </div>

              <div className="flex_wrap">
                {friendsLoading ? (
                  <>
                    <div className="sekelton_loader">
                      <HashLoader color="#1876f2" />
                    </div>
                  </>
                ) : (
                  <>
                    {dataFriend.requests?.length > 0 ? (
                      dataFriend.requests.map((user) => (
                        <Card
                          userr={user}
                          key={user._id}
                          type="request"
                          getData={getDataFriend}
                          socket={socket}
                        />
                      ))
                    ) : (
                      <div
                        className="No_results"
                        style={{
                          paddingLeft: "250px",
                          flexDirection: "column",
                        }}
                      >
                        <img src="../../../images/no_user_friend.png" alt="" />
                        <p>No user to show</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
          {(type === undefined || type === "sent") && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Sent Requests</h3>
                {type === undefined && (
                  <Link to="/friends/sent" className="see_link hover3">
                    See all
                  </Link>
                )}
              </div>
              <div className="flex_wrap">
                {friendsLoading ? (
                  <div className="sekelton_loader">
                    <HashLoader color="#1876f2" />
                  </div>
                ) : (
                  <>
                    {dataFriend.sentRequests?.length > 0 ? (
                      dataFriend.sentRequests.map((user) => (
                        <Card
                          userr={user}
                          key={user._id}
                          type="sent"
                          getData={getDataFriend}
                          socket={socket}
                        />
                      ))
                    ) : (
                      <div
                        className="No_results"
                        style={{
                          paddingLeft: "250px",
                          flexDirection: "column",
                        }}
                      >
                        <img src="../../../images/no_user_friend.png" alt="" />
                        <p>No user to show</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
          {type === "birthdays" && (
            <div className="friends_right_wrap">
              <div className="flex_wrap">
                {friendsByBirthdayLoading ? (
                  <div className="sekelton_loader">
                    <HashLoader color="#1876f2" />
                  </div>
                ) : (
                  <>
                    {dataByBirthday.todayBirthdays?.length > 0 && (
                      <div
                        className="profile_card"
                        style={{ marginLeft: "370px" }}
                      >
                        <p
                          style={{
                            fontWeight: "600",
                            fontSize: "20px",
                            paddingBottom: "10px",
                          }}
                        >
                          Today's Birthdays
                        </p>
                        {dataByBirthday.todayBirthdays.map(
                          (user, cardIndex) => (
                            <FriendCard
                              userr={user}
                              key={cardIndex}
                              type="friends"
                              getData={getDatafriendsByBirthday}
                            />
                          )
                        )}
                      </div>
                    )}

                    {dataByBirthday.comingBirthdays?.length > 0 && (
                      <div
                        className="profile_card"
                        style={{ marginLeft: "370px" }}
                      >
                        <p
                          style={{
                            fontWeight: "600",
                            fontSize: "20px",
                            paddingBottom: "10px",
                          }}
                        >
                          Upcoming Birthdays
                        </p>
                        {dataByBirthday.comingBirthdays.map(
                          (user, cardIndex) => (
                            <FriendCard
                              userr={user}
                              key={cardIndex}
                              type="friends"
                              getData={getDatafriendsByBirthday}
                            />
                          )
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
