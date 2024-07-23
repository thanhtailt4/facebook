import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CreatePostPopup from "../../components/createPostPopup";
import Header from "../../components/header";
import { profileReducer } from "../../functions/reducers";
import Cover from "./Cover";
import ProfielPictureInfos from "./ProfielPictureInfos";
import ProfileMenu from "./ProfileMenu";
import "./style.css";
import About from "./tabs/About";
import Check_ins from "./tabs/Check_ins";
import Detail_Albums from "./tabs/Detail_Albums";
import Friends from "./tabs/Friends";
import Photos from "./tabs/Photos";
import Posts from "./tabs/Posts";
import Videos from "./tabs/Videos";

export default function Profile({
  getAllPosts,
  socket,
  notifications,
  setVisiblePost,
  visibleReact,
  setVisibleReact,
  setVisibleReactComment,
  visibleReactComment,
  setNotifi,
  dataFriend,
  getDataFriend,
  friendsLoading,
  getNotifications,
  dataByBirthday,
  getDatafriendsByBirthday,
  setVisiblePhoto,
  setShowChat,
}) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const { IdUser, sk, album } = useParams();
  const [photos, setPhotos] = useState([]);
  const [othername, setOthername] = useState();
  const [
    { loading: profileLoading, error: profileError, profile },
    dispatchProfile,
  ] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });

  var idUser = IdUser === undefined ? user.id : IdUser;
  var visitor = idUser === user.id ? false : true;

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("post_id");
  const commentId = urlParams.get("comment_id");

  function scrollToPost(postId) {
    const element = document.getElementById(`post-${postId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function scrollToComment(commmentId) {
    const element = document.getElementById(`comment-${commmentId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }

  const getProfile = async () => {
    try {
      dispatchProfile({
        type: "PROFILE_REQUEST",
      });
      const { data } = await axios.get(
        `http://backend-service:8000/getProfile/${idUser}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      if (data.ok === false) {
        navigate("/profile");
      } else {
        try {
          const images = await axios.post(
            `http://backend-service:8000/listImages`,
            { path, sort, max },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setPhotos(images.data);
        } catch (error) {
          console.log(profileError);
        }

        dispatchProfile({
          type: "PROFILE_SUCCESS",
          payload: data,
        });
      }
      if (postId) {
        scrollToPost(postId);
      }
    } catch (error) {
      dispatchProfile({
        type: "PROFILE_ERROR",
        payload: profileError.response.data.message,
      });
    }
  };

  const getPost = async (postId, commentId) => {
    const { data } = await axios.get(
      `http://backend-service:8000/getPost/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setVisiblePost({ post: data, commentId: commentId });
  };

  useEffect(() => {
    setVisiblePost(false);
    setVisibleReact(null);
    setVisibleReactComment(null);
    getProfile();
    getDataFriend();

    getNotifications();
    if (commentId) {
      getPost(postId, commentId);
      scrollToComment(commentId);
    }
    return () => {
      setVisiblePost(false);
      setVisibleReact(null);
      setVisibleReactComment(null);
    };
  }, [idUser]);

  useEffect(() => {
    setOthername(profile?.details?.otherName);
  }, [profile]);

  const path = `${idUser}/`;
  const max = 30;
  const sort = "desc";
  const photoSections = ["photos", "photos_by", "photos_albums"];
  const profileTop = useRef(null);
  const aboutSections = [
    "about",
    "about_overview",
    "about_work_and_education",
    "about_places",
    "about_contact_and_basic_info",
    "about_family_and_relationships",
    "about_details",
    "about_life_events",
  ];
  const friendSections = [
    "friends",
    "friends_all",
    "friends_with_upcoming_birthdays",
    "friends_mutual",
  ];
  return (
    <div className="profile">
      {visible && (
        <CreatePostPopup
          user={user}
          setVisible={setVisible}
          posts={profile?.posts}
          dispatch={dispatchProfile}
          profile
        />
      )}
      <Header
        page="profile"
        getAllPosts={getAllPosts}
        notifications={notifications}
        getNotifications={getNotifications}
        setShowChat={setShowChat}
      />
      <div className="profile_top" ref={profileTop}>
        <div className="profile_container">
          {profileLoading ? (
            <>
              <div className="profile_cover">
                <Skeleton
                  height="347px"
                  containerClassName="avatar-skeleton"
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div
                className="profile_img_wrap"
                style={{
                  marginBottom: "-3rem",
                  transform: "translateY(-8px)",
                }}
              >
                <div className="profile_w_left">
                  <Skeleton
                    circle
                    height="180px"
                    width="180px"
                    containerClassName="avatar-skeleton"
                    style={{ transform: "translateY(-3.3rem)" }}
                  />
                  <div className="profile_w_col">
                    <div className="profile_name">
                      <Skeleton
                        height="35px"
                        width="200px"
                        containerClassName="avatar-skeleton"
                      />
                      <Skeleton
                        height="30px"
                        width="100px"
                        containerClassName="avatar-skeleton"
                        style={{ transform: "translateY(2.5px)" }}
                      />
                    </div>
                    <div className="profile_friend_count">
                      <Skeleton
                        height="20px"
                        width="90px"
                        containerClassName="avatar-skeleton"
                        style={{ marginTop: "5px" }}
                      />
                    </div>
                    <div className="profile_friend_imgs">
                      {Array.from(new Array(6), (val, i) => i + 1).map(
                        (id, i) => (
                          <Skeleton
                            circle
                            height="32px"
                            width="32px"
                            containerClassName="avatar-skeleton"
                            style={{ transform: `translateX(${-i * 7}px)` }}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className={`friendship ${!visitor && "fix"}`}>
                  <Skeleton
                    height="36px"
                    width={120}
                    containerClassName="avatar-skeleton"
                  />
                  <div className="flex">
                    <Skeleton
                      height="36px"
                      width={120}
                      containerClassName="avatar-skeleton"
                    />
                    {visitor && (
                      <Skeleton
                        height="36px"
                        width={120}
                        containerClassName="avatar-skeleton"
                      />
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Cover
                cover={profile.cover}
                visitor={visitor}
                photos={photos}
                setVisiblePhoto={setVisiblePhoto}
              />
              <ProfielPictureInfos
                profile={profile}
                visitor={visitor}
                photos={photos}
                othername={othername}
                loading={profileLoading}
                socket={socket}
                getDataFriend={getDataFriend}
                setVisiblePhoto={setVisiblePhoto}
              />
            </>
          )}
          <ProfileMenu idUser={idUser} />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            {sk === undefined && (
              <Posts
                socket={socket}
                profile={profile}
                loading={profileLoading}
                visitor={visitor}
                setOthername={setOthername}
                idUser={idUser}
                photos={photos}
                setVisible={setVisible}
                profileTop={profileTop}
                setVisiblePost={setVisiblePost}
                visibleReact={visibleReact}
                setVisibleReact={setVisibleReact}
                commentId={commentId}
                postId={postId}
                setVisibleReactComment={setVisibleReactComment}
                visibleReactComment={visibleReactComment}
                setVisiblePhoto={setVisiblePhoto}
              />
            )}
            {aboutSections.includes(sk) && (
              <About
                sk={sk}
                profile={profile}
                loading={profileLoading}
                visitor={visitor}
                setOthername={setOthername}
                idUser={idUser}
                setVisible={setVisible}
                profileTop={profileTop}
              />
            )}

            {friendSections.includes(sk) && (
              <Friends
                sk={sk}
                profile={profile}
                idUser={idUser}
                loading={friendsLoading}
                dataByBirthday={dataByBirthday}
                dataFriend={dataFriend}
                getDataFriend={getDataFriend}
                getDatafriendsByBirthday={getDatafriendsByBirthday}
                user={user}
                visitor={visitor}
              />
            )}
            {photoSections.includes(sk) &&
              (album ? (
                <Detail_Albums
                  sk={sk}
                  idUser={idUser}
                  loading={friendsLoading}
                  photos={photos}
                  user={user}
                  album={album}
                  setVisiblePhoto={setVisiblePhoto}
                />
              ) : (
                <Photos
                  sk={sk}
                  idUser={idUser}
                  loading={friendsLoading}
                  photos={photos}
                  user={user}
                  setVisiblePhoto={setVisiblePhoto}
                />
              ))}
            {sk === "videos" && <Videos />}
            {sk === "check-ins" && <Check_ins />}
          </div>
        </div>
      </div>
    </div>
  );
}
