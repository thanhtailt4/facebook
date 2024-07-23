import { getUser } from "../../../functions/user";
import { useEffect, useRef, useState } from "react";
export default function Contact({
  user,
  dataFriend,
  setShowChat,
  setShowChatRoom,
  onlineUsers,
}) {
  const offchat = (friend) => {
    setShowChatRoom(null);
    setShowChat(friend);
  };
  return (
    <>
      {dataFriend &&
        dataFriend.friends?.map((friend) => (
          <>
            <div
              className="contact hover3"
              onClick={() => {
                offchat(friend);
              }}
            >
              <div className="contact_img">
                <img src={friend?.picture} alt="" />
              </div>
              {onlineUsers.some((user) => user.userId === friend._id) && (
                <div className="state_active_user" />
              )}

              <span>
                {friend?.first_name} {friend?.last_name}
              </span>
            </div>
          </>
        ))}
    </>
  );
}
