import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function About_group({ dataPageGroup , idGroup }) {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className="profile_card">
      <div className="profile_card_header" style={{fontWeight: "500"}}>About</div>
      {dataPageGroup.description && (
        <>
          <p>{dataPageGroup.description}</p>
        </>
      )}
      {dataPageGroup.public ? (
        <>
          {" "}
          <h3>
            <i className="lock_icon"></i> Private
          </h3>{" "}
          Only members can see who's in the group and what they post.{" "}
        </>
      ) : (
        <>
          <h3>
            <i className="lock_icon"></i> Private
          </h3>{" "}
          Only members can see who's in the group and what they post.
        </>
      )}
      {dataPageGroup.hidden ? (
        <>
          {" "}
          <i className="clock_eye_icon"></i>
          <h3>Hidden</h3> Only members can find this group.{" "}
        </>
      ) : (
        <>
          <h3>
            <i className="open_eye_icon"></i> Visible
          </h3>{" "}
          Anyone can find this group.
        </>
      )}
      <Link to={`/group/${idGroup}`}>
        <button
          className="gray_btn"
          style={{ marginTop: "10px", width: "478px" }}
        >
          Learn More
        </button>
      </Link>
    </div>
  );
}
