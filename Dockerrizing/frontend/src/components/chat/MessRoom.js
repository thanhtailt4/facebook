import Moment from "react-moment";
import "./style.css";
export default function MessRoom({ message, user}) {
  const sender = message?.senderId._id === user?.id;
  return (
    <>
      {sender ? (
        <>
          <div className="comment" style={{ flexDirection: "row-reverse" }}>
            <div className="comment_col">
              {message.message && (
                <>
                  <div className="mess_wrap_active">
                    <div className="comment_text">{message.message}</div>
                  </div>
                </>
              )}
              {message.image && (
                <>
                  {" "}
                  <div className="mess_img_wrap">
                    <img src={message.image} alt="" className="mess_image" />
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="comment">
            <div className="user_img_mess">
              <img src={message?.senderId.picture} alt="" />
            </div>
            <div className="comment_col">
              {message.message && (
                <>
                  <div className="mess_wrap">
                    <div className="comment_text">{message.message}</div>
                  </div>
                </>
              )}
              {message.image && (
                <>
                  <div className="mess_img_wrap">
                    {" "}
                    <img src={message.image} alt="" className="mess_image" />
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
