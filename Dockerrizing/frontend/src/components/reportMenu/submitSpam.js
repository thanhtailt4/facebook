export default function SubmitSpam({ setVisible }) {
  return (
    <>
      <div className="mmenu_main">
        <div className="mmenu_col">
          <div style={{ fontSize: "18px", fontWeight: "700" }}>Spam</div>
          <div style={{ fontSize: "15px", color: "#65676b" }}>
            We don’t allow things like:
          </div>
          <div
            style={{
              fontSize: "15px",
              color: "#65676b",
              fontWeight: "500",
              marginTop: "10px",
            }}
          >
            <div style={{ display: "flex" }}>
              {" "}
              <li /> Buying, selling or giving away accounts, roles or permissions{" "}
            </div>
            <div style={{ display: "flex", marginTop: "10px" }}>
              {" "}
              <li /> Encouraging people to engage with content under false pretences{" "}
            </div>
            <div style={{ display: "flex", marginTop: "10px" }}>
              {" "}
              <li /> Directing people away from Facebook through the misleading use of links){" "}
            </div>
          </div>
          <button
            className="blue_btn_requests"
            style={{ marginTop: "20px", width: "500px" }}
            // onClick={() => confirmHandler(dataFriend.requests[0]?._id)}
          >
            Submit
          </button>
          <div className="mmenu_splitter" style={{marginBottom: "15px" , marginTop: "15px"}}></div>
        </div>
      </div>
    </>
  );
}
