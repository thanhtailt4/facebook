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
const medias = ["media"];
const photoSections = ["photos", "photos_by", "photos_albums"];

export default function PageGroup_Menu_Private({ idGroup }) {
  const { sk } = useParams();

  return (
    <div className="pagegroupe_menu_wrap">
      <div className="pagegroupe_menu">
        <Link
          to={`/group/${idGroup}`}
          className={sk === undefined ? "profile_menu_active" : "hover1"}
        >
          About
        </Link>

        <Link
          to={`/group/${idGroup}/discussion/preview`}
          className={sk === "discussion" ? "profile_menu_active" : "hover1"}
        >
          Discussion
        </Link>

        <div className="p10_dots">
          <Dots />
        </div>
      </div>
    </div>
  );
}
