import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import useClickOutside from "../../helpers/clickOutside";

export default function OldCovers({ photos, setCoverPicture, setShow }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [tab, setTab] = useState("Recent_Photos");
  const Ref = useRef(null);
  useClickOutside(Ref, () => setShow(false));

  return (
    <div className="blur">
      <div className="postBox selectCoverBox" ref={Ref}>
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => {
              setShow(false);
            }}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Select photo</span>
        </div>
        <div className="selectCoverBox_links">
          <div
            className={`${
              tab === "Recent_Photos"
                ? "selectCoverBox_link_active"
                : "selectCoverBox_link"
            }`}
            onClick={() => setTab("Recent_Photos")}
          >
            Recent Photos
          </div>
          <div
            className={`${
              tab === "Photo_Albums"
                ? "selectCoverBox_link_active"
                : "selectCoverBox_link"
            }`}
            onClick={() => setTab("Photo_Albums")}
          >
            Photo Albums
          </div>
        </div>

        {tab === "Recent_Photos" ? (
          <>
            {" "}
            <div className="old_pictures_wrap scrollbar">
              <div className="old_pictures">
                {photos.cover_pictures &&
                  photos.cover_pictures.map((photo) => (
                    <img
                      src={photo.secure_url}
                      key={photo.public_id}
                      alt=""
                      onClick={() => {
                        setCoverPicture(photo.secure_url);
                        setShow(false);
                      }}
                    />
                  ))}
              </div>
              <div className="old_pictures">
                {photos.post_images &&
                  photos.post_images.map((photo) => (
                    <img
                      src={photo.secure_url}
                      key={photo.public_id}
                      alt=""
                      onClick={() => {
                        setCoverPicture(photo.secure_url);
                        setShow(false);
                      }}
                    />
                  ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="old_pictures_wrap scrollbar">
              <div className="old_pictures">
                <p>asd</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
