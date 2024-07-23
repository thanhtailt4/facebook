import { useEffect, useRef, useState, useReducer } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import Picker from "emoji-picker-react";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { ClipLoader } from "react-spinners";
import { getMessages, sendMessage } from "../../functions/messenger";
import { uploadImages } from "../../functions/uploadImages";
import Mess from "./Mess";
import SendImg from "../../svg/sendImg";
export default function Chat_screen({ setShowChat, showChat, socket }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [picker, setPicker] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [messageImage, setMessageImage] = useState("");
  const [cursorPosition, setCursorPosition] = useState();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(`${file.name} format is not supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb allowed.`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setMessageImage(event.target.result);
    };
  };
  useEffect(() => {
    getAllMessages(showChat._id);
  }, [showChat]);
  useEffect(() => {
    socket.on("getMessage", (data) => {
      getAllMessages(data.senderId);
    });
  }, [socket]);
  const getAllMessages = async (senderId) => {
    const res = await getMessages(senderId, user.token);
    setMessages(res);
    scrollToBottom();
  };
  const handleMessage = async (e) => {
    if (e.key === "Enter") {
      if (messageImage != "") {
        setLoading(true);
        const img = dataURItoBlob(messageImage);
        const path = `${user._id}/messages/${showChat._id}`;
        let formData = new FormData();
        formData.append("path", path);
        formData.append("file", img);
        const imgComment = await uploadImages(formData, path, user.token);

        const messages = await sendMessage(
          showChat._id,
          text,
          imgComment[0].url,
          user.token
        );
        setMessages(messages.newMessages);
        socket.emit("sendMessage", {
          senderId: user.id,
          receiverId: showChat._id,
        });
        setLoading(false);
        setText("");
        setMessageImage("");
      } else {
        setLoading(true);
        const messages = await sendMessage(showChat._id, text, "", user.token);
        setMessages(messages.newMessages);
        socket.emit("sendMessage", {
          senderId: user.id,
          receiverId: showChat._id,
        });
        setLoading(false);
        setText("");
        setMessageImage("");
      }
      scrollToBottom();
    }
  };
  const chatContainerRef = useRef(null);
  const textRef = useRef(null);
  const imgInput = useRef(null);
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };
  return (
    <div className="chat-window">
      <div className="box_header_user_mess">
        <div className="contact_img">
          <div className="state_active_user_mess" />
          <img src={showChat?.picture} alt="" />
        </div>

        <div className="user_name">
          {showChat?.first_name} {showChat?.last_name}
        </div>
        <div
          className="small_circle_mess"
          onClick={() => {
            setShowChat(null);
          }}
        >
          <i className="exit_icon"></i>
        </div>
      </div>
      <div className="messages scrollbar" ref={chatContainerRef}>
        {messages &&
          messages
            .sort((a, b) => {
              return new Date(a.messageAt) - new Date(b.messageAt);
            })
            .map((message, i) => (
              <Mess message={message} user={user} key={i} showChat={showChat} />
            ))}
      </div>

      <div className="write_chat">
        <div className="create_comment_wrap" style={{ marginTop: "10px" }}>
          <div className="create_comment">
            <SendImg />
            <div className="comment_input_wrap">
              {picker && (
                <div className="comment_emoji_picker">
                  <Picker onEmojiClick={handleEmoji} />
                </div>
              )}
              <input
                type="file"
                hidden
                ref={imgInput}
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleImage}
              />
              {error && (
                <div className="postError comment_error">
                  <div className="postError_error">{error}</div>
                  <button className="blue_btn" onClick={() => setError("")}>
                    Try again
                  </button>
                </div>
              )}
              <input
                type="text"
                ref={textRef}
                value={text}
                placeholder="Aa"
                onChange={(e) => setText(e.target.value)}
                onKeyUp={handleMessage}
              />
              <div className="comment_circle" style={{ marginTop: "5px" }}>
                <ClipLoader size={20} color="#1876f2" loading={loading} />
              </div>
              <div
                className="comment_circle_icon hover2"
                onClick={() => {
                  setPicker((prev) => !prev);
                }}
              >
                <i className="emoji_icon"></i>
              </div>
              <div
                className="comment_circle_icon hover2"
                onClick={() => imgInput.current.click()}
              >
                <i className="camera_icon"></i>
              </div>
            </div>
          </div>
          {messageImage && (
            <div className="comment_img_preview">
              <img src={messageImage} alt="" />
              <div
                className="small_white_circle"
                onClick={() => setMessageImage("")}
              >
                <i className="exit_icon"></i>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
