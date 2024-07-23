export default function SubmitReportGroup({ setVisible, type }) {
  return (
    <>
      <div className="mmenu_main">
        <div className="mmenu_col">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              className="light_blue_btn"
              style={{ width: "fit-content", borderRadius: "25px" }}
            >
              <i className="check"></i>
              <p style={{ color: "#0567D2" }}>{type}</p>
            </div>
            <div style={{ marginTop: "20px" }}>
              You reported this post to the group admins.
            </div>
          </div>
          <div
            className="mmenu_splitter"
            style={{ marginBottom: "10px", marginTop: "15px" }}
          ></div>
          <button
            className="blue_btn_requests"
            style={{ marginTop: "20px", width: "500px" }}
            // onClick={() => confirmHandler(dataFriend.requests[0]?._id)}
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}
