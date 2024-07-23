import { Link, useNavigate, useParams } from "react-router-dom";
import { Dots } from "../../svg";
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
const photoSections = ["photos", "photos_by", "photos_albums"];

export default function ProfileMenu({ idUser }) {
  const { sk } = useParams();

  return (
    <div className="profile_menu_wrap">
      <div className="profile_menu">
        <Link
          to={idUser ? `/profile/${idUser}` : "/profile"}
          className={sk === undefined ? "profile_menu_active" : "hover1"}
        >
          Posts
        </Link>
        <Link
          to={idUser ? `/profile/${idUser}&sk=about` : "/profile&sk=about"}
          className={
            aboutSections.includes(sk) ? "profile_menu_active" : "hover1"
          }
        >
          About
        </Link>
        <Link
          to={
            idUser ? `/profile/${idUser}&sk=friends` : "/profile&sk=friends"
          }
          className={
            friendSections.includes(sk) ? "profile_menu_active" : "hover1"
          }
        >
          Friends
        </Link>
        <Link
          to={
            idUser ? `/profile/${idUser}&sk=photos` : "/profile&sk=photos"
          }
          className={
            photoSections.includes(sk) ? "profile_menu_active" : "hover1"
          }
        >
          Photos
        </Link>
        {/* <Link className="hover1">More</Link> */}
        <div className="p10_dots">
          <Dots />
        </div>
      </div>
    </div>
  );
}
