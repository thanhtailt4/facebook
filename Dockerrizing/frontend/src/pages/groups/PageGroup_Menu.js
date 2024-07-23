import { Link, useNavigate, useParams } from "react-router-dom";
import { Dots } from "../../svg";
const medias = ["media"];
export default function PageGroup_Menu({ idGroup }) {
  const { sk } = useParams();

  return (
    <div className="pagegroupe_menu_wrap">
      <div className="pagegroupe_menu">
        <Link
          to={`/group/${idGroup}`}
          className={sk === undefined ? "profile_menu_active" : "hover1"}
        >
          Discussion
        </Link>
        <Link
          to={`/group/${idGroup}/members`}
          className={sk === "members" ? "profile_menu_active" : "hover1"}
        >
          Members
        </Link>
        <Link
          to={`/group/${idGroup}/media`}
          className={medias.includes(sk) ? "profile_menu_active" : "hover1"}
        >
          Media
        </Link>

        <div className="p10_dots">
          <Dots />
        </div>
      </div>
    </div>
  );
}
