import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Bio from "./Bio";
import EditDetails from "./EditDetails";
import "./style.css";
export default function Intro({ detailss, visitor, setOthername }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [details, setDetails] = useState();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setDetails(detailss);
    setInfos(detailss);
  }, [detailss]);
  const initial = {
    bio: details?.bio ? details.bio : "",
    otherName: details?.otherName ? details.otherName : "",
    job: details?.job ? details.job : "",
    workplace: details?.workplace ? details.workplace : "",
    highSchool: details?.highSchool ? details.highSchool : "",
    college: details?.college ? details.college : "",
    currentCity: details?.currentCity ? details.currentCity : "",
    hometown: details?.hometown ? details.hometown : "",
    relationship: details?.relationship ? details.relationship : "",
    instagram: details?.instagram ? details.instagram : "",
  };
  const [infos, setInfos] = useState(initial);
  const [showBio, setShowBio] = useState(false);
  const [max, setMax] = useState(infos?.bio ? 100 - infos?.bio.length : 100);

  const updateDetails = async () => {
    try {
      console.log("sent");
      const { data } = await axios.put(
        `http://34.124.241.174:81/updateDetails`,
        {
          infos,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setShowBio(false);
      setDetails(data);
      setOthername(data.otherName);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfos({ ...infos, [name]: value });
    setMax(100 - e.target.value.length);
  };
  return (
    <div className="profile_card">
      <div className="profile_card_header">Intro</div>
      {details?.bio && !showBio && (
        <div className="info_col">
          <span className="info_text">{details?.bio}</span>
          {!visitor && (
            <button
              className="gray_btn hover1"
              onClick={() => setShowBio(true)}
            >
              Edit Bio
            </button>
          )}
        </div>
      )}
      {!details?.bio && !showBio && !visitor && (
        <button
          className="gray_btn hover1 w100"
          onClick={() => setShowBio(true)}
        >
          Add Bio
        </button>
      )}
      {showBio && (
        <Bio
          infos={infos}
          max={max}
          handleChange={handleChange}
          setShowBio={setShowBio}
          updateDetails={updateDetails}
          placeholder="Add Bio"
          name="bio"
        />
      )}
      <div className="create_splitter"></div>
      {details?.job && details?.workplace ? (
        <div className="info_profile">
          <img width="20px" height="20px" src="../../../icons/job.png" alt="" />
          <p>
            {" "}
            Works as <span style={{ fontWeight: "600" }}>
              {details?.job}
            </span>{" "}
            at <span style={{ fontWeight: "600" }}>{details?.workplace}</span>
          </p>
        </div>
      ) : details?.job && !details?.workplace ? (
        <div className="info_profile">
          <img width="20px" height="20px" src="../../../icons/job.png" alt="" />
          <p>
            {" "}
            Works as <span style={{ fontWeight: "600" }}>{details?.job}</span>
          </p>
        </div>
      ) : (
        details?.workplace &&
        !details?.job && (
          <div className="info_profile">
            <img
              width="20px"
              height="20px"
              src="../../../icons/job.png"
              alt=""
            />
            <p>
              Works at{" "}
              <span tyle={{ fontWeight: "600" }}>{details?.workplace}</span>
            </p>
          </div>
        )
      )}
      {details?.relationship && (
        <div className="info_profile">
          <img
            width="20px"
            height="20px"
            src="../../../icons/relationship.png"
            alt=""
          />
          {details?.relationship}
        </div>
      )}
      {details?.college && (
        <div className="info_profile">
          <img
            width="20px"
            height="20px"
            src="../../../icons/studies.png"
            alt=""
          />
          <p>
            Studied at{" "}
            <span style={{ fontWeight: "600" }}>{details?.college}</span>
          </p>
        </div>
      )}
      {details?.highSchool && (
        <div className="info_profile">
          <img
            width="20px"
            height="20px"
            src="../../../icons/studies.png"
            alt=""
          />
          <p>
            Went to{" "}
            <span style={{ fontWeight: "600" }}>{details?.highSchool}</span>
          </p>
        </div>
      )}
      {details?.currentCity && (
        <div className="info_profile">
          <img
            width="20px"
            height="20px"
            src="../../../icons/home.png"
            alt=""
          />
          <p>
            Lives in{" "}
            <span style={{ fontWeight: "600" }}>{details?.currentCity}</span>
          </p>
        </div>
      )}
      {details?.hometown && (
        <div className="info_profile">
          <img
            width="20px"
            height="20px"
            src="../../../icons/hometown.png"
            alt=""
          />
          <p>
            From <span style={{ fontWeight: "600" }}>{details?.hometown}</span>
          </p>
        </div>
      )}
      {details?.websites && (
        <>
          {details?.websites.map((data, index) => (
            <div
              className="info_profile"
              style={{ alignItems: "unset", flexDirection: "column" }}
              key={index}
            >
              <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover6"
                style={{ display: "flex" }}
              >
                <img
                  style={{ paddingRight: "5px" }}
                  width="22px"
                  height="20px"
                  src={`../../../icons/${
                    data.type === undefined ? "Instagram" : data.type
                  }.png`}
                  alt=""
                />
                {data.link}
              </a>
              <div className="link_type">
                {data.type === undefined ? "Instagram" : data.type}
              </div>
            </div>
          ))}
        </>
      )}
      {!visitor && (
        <button
          className="gray_btn hover1 w100"
          onClick={() => setVisible(true)}
        >
          Edit Details
        </button>
      )}
      {visible && !visitor && (
        <EditDetails
          details={details}
          handleChange={handleChange}
          updateDetails={updateDetails}
          infos={infos}
          setVisible={setVisible}
        />
      )}

      {/* {!visitor && (
        <button className="gray_btn hover1 w100">Add Hobbies</button>
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100">Add Featured</button>
      )} */}
    </div>
  );
}
