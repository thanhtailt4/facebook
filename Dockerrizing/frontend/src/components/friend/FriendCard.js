import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dots } from "../../svg";

export default function FriendCard({ userr, type, getData }) {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className="req_card_profile">
      <div className="req_profile_image">
        <Link to={`/profile/${userr._id}`}>
          <img src={userr.picture} alt="" />
        </Link>
      </div>
      <div className="req_name hover6">
        {userr.first_name} {userr.last_name}
        <div className="req_name_state">{userr.daysToBirthdayMessage}</div>
      </div>

      <div className="right">
        <div className="dots_friends hover1">
          <Dots />
        </div>
      </div>
    </div>
  );
}
