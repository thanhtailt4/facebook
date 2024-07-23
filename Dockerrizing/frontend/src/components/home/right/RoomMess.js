import { getUser } from "../../../functions/user";
import { useEffect, useRef, useState } from "react";
export default function RoomMess({
  user,
  dataRoomMess,
  setShowChatRoom,
  setShowChat,
}) {
  const offroom = (room) => {
    setShowChat(null);
    setShowChatRoom(room);
  };
  return (
    <>
      {dataRoomMess &&
        dataRoomMess.roomMess?.map((room) => (
          <>
            <div
              className="contact hover3"
              onClick={() => {
                offroom(room);
              }}
            >
              <div className="contact_img">
                <img src={room?.groupRef.cover} alt="" />
              </div>
              <div className="state_active_user" />
              <span>{room?.groupRef.group_name}</span>
            </div>
          </>
        ))}
    </>
  );
}
