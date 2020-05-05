import React from "react";

function ToolDoor(props: { img: string; title: string; desc: string }) {
  return (
    <div className="tool">
      <div className="rect">
        <img src={props.img} alt={"The " + props.title + " logo"}></img>
      </div>
      <div className="door">
        <div className="text">
          <h5>{props.title}</h5>
          <p>{props.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default ToolDoor;
