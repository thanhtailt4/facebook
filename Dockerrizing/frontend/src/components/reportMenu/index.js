import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Naudity from "./Naudity";
import { useDispatch } from "react-redux";

import SubmitNaudity from "./submitNaudity";
import SubmitSpam from "./submitSpam";
import Violence from "./Violence";
import SubmitSharingPrivate from "./submitSharingPrivate";
import SubmitViolence from "./submitViolence";
import SubmitAnimalAbuse from "./submitAnimalAbuse";
import SubmitSexualViolence from "./submitSexualViolence";
import FalseInformation from "./FalseInformation";
import SubmitCommunityStandards from "./submitCommunityStandards";
export default function ReportMenu({ setReport }) {
  const [visible, setVisible] = useState(0);
  const [type, setType] = useState(null);
  return (
    <div
      className="blur"
      style={{
        alignContent: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="mmenu_report">
        <div className="box_header">
          {visible !== 0 && (
            <div
              className="small_circle hover1"
              style={{ left: "0", display: "flex", position: "absolute" }}
              onClick={() => {
                setVisible(0);
              }}
            >
              <i className="arrow_back_icon"></i>
            </div>
          )}

          <span>Report</span>
          <div
            className="small_circle hover1"
            style={{ right: "0", display: "flex", position: "absolute" }}
            onClick={() => {
              setReport(false);
            }}
          >
            <i className="exit_icon"></i>
          </div>
        </div>
        {visible === 0 && (
          <div>
            <div className="mmenu_main">
              <div className="mmenu_col">
                <div style={{ fontSize: "18px", fontWeight: "700" }}>
                  Please select a problem
                </div>
                <div style={{ fontSize: "15px", color: "#65676b" }}>
                  If someone is in immediate danger, get help before reporting
                  to Facebook. Don't wait.
                </div>
              </div>
            </div>
            <div className="mmenu_splitter"></div>
            <div
              className="mmenu_item hover3"
              style={{ paddingTop: "10px", paddingBottom: "10px" }}
              onClick={() => {
                setVisible(1);
              }}
            >
              <span style={{ fontSize: "18px", fontWeight: "500" }}>
                Nudity
              </span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div
              className="mmenu_item hover3"
              style={{ paddingTop: "10px", paddingBottom: "10px" }}
              onClick={() => {
                setVisible(2);
              }}
            >
              <span style={{ fontSize: "18px", fontWeight: "500" }}>
                Violence
              </span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div
              className="mmenu_item hover3"
              style={{ paddingTop: "10px", paddingBottom: "10px" }}
              onClick={() => {
                setVisible(3);
              }}
            >
              <span style={{ fontSize: "18px", fontWeight: "500" }}>
                False infomation
              </span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div
              className="mmenu_item hover3"
              style={{ paddingTop: "10px", paddingBottom: "10px" }}
              onClick={() => {
                setVisible(4);
              }}
            >
              <span style={{ fontSize: "18px", fontWeight: "500" }}>Spam</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="mmenu_splitter" style={{marginBottom: "25px"}}></div>
          </div>
        )}
        {visible === 1 && <Naudity setVisible={setVisible} setType={setType}/>}
        {visible === 2 && <Violence setVisible={setVisible} setType={setType}/>}
        {visible === 3 && <FalseInformation setVisible={setVisible} />}
        {visible === 4 && <SubmitSpam setVisible={setVisible} type={type}/>}
        {visible === 5 && <SubmitNaudity setVisible={setVisible} type={type}/>}
        {visible === 6 && <SubmitSharingPrivate setVisible={setVisible} type={type}/>}
        {visible === 7 && <SubmitViolence setVisible={setVisible} type={type}/>}
        {visible === 8 && <SubmitAnimalAbuse setVisible={setVisible} type={type}/>}
        {visible === 9 && <SubmitSexualViolence setVisible={setVisible} type={type}/>}
        {visible === 10 && <SubmitCommunityStandards setVisible={setVisible} type={type}/>}
        
      </div>
    </div>
  );
}
