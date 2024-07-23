import { Link, useNavigate, useParams } from "react-router-dom";

import { Dots } from "../../svg";
import { useEffect, useReducer, useState, useRef } from "react";
import { HashLoader } from "react-spinners";

export default function DetailAlbums({
  sk,
  idUser,
  loading,
  photos,
  album,
  setVisiblePhoto,
}) {
  return (
    <>
      <div className="about_card">
        <div className="profile_menu_wrap">
          <div className="header_photo">
            <h1>{album === "0" ? "Cover photos" : "Profile pictures"}</h1>
            {/* <div className="menu_photo">
              <div className="p10_dots_friend">
                <Dots />
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="about_card">
        <>
          {loading ? (
            <div className="sekelton_loader_friends">
              <HashLoader color="#1876f2" />
            </div>
          ) : (
            <>
              {album === "0" ? (
                <>
                  <div className="profile_card_grid_photo">
                    <div className="friends_right_wrap">
                      <div className="flex_wrap">
                        {photos.cover_pictures?.map((img, index) => (
                          <div
                            onClick={() =>
                              setVisiblePhoto({
                                url: img.secure_url,
                                type: "cover",
                              })
                            }
                            className="cover_photos_card"
                            style={{ width: "32%" }}
                            key={index}
                          >
                            <img src={img.secure_url} alt="" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="profile_card_grid_photo">
                  <div className="friends_right_wrap">
                    <div className="flex_wrap">
                      {photos.profile_pictures?.map((img, index) => (
                        <div
                          onClick={() =>
                            setVisiblePhoto({
                              url: img.secure_url,
                              type: "profile",
                            })
                          }
                          className="post_photos_card"
                          key={index}
                          style={{ width: "30%" }}
                        >
                          <img src={img.secure_url} alt="" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      </div>
    </>
  );
}
