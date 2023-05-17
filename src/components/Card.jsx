import React from "react";

export default function Card({ image, selected, onClick }) {
  return (
    <div className="card">
      <div className={selected && "selected"}>
        <img src={image} alt="" className="card-face" />
        <img onClick={onClick} src={"/assets/fireship.png"} alt="" className="card-back" />
      </div>
    </div>
  );
}
