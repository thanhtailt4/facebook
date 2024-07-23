import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Dots } from "../../svg";

export default function Card_Group({ group }) {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className="req_card_group">
      <div className="group_content">
        <div className="content_head">
          <Link to={`/group/${group._id}`}>
            <img src={group.cover} alt="" />
          </Link>
          <div>
            <div className="req_name">{group.group_name}</div>
            <div className="post_profile_privacy_date">
              <p>{group?.numMembers} members</p>
            </div>
          </div>
        </div>
        <div className="content_bottom">
          <Link
            to={`/group/${group._id}`}
            className="light_blue_btn hover5"
            style={{ marginTop: "10px", width: "304px" }}
          >
            <p style={{ color: "#0567D2" }}>View group</p>
          </Link>
          <div
            className="p10_dots_friend"
            style={{ height: "39px", marginTop: "10px" }}
          >
            <Dots />
          </div>
        </div>
      </div>
    </div>
  );
}
