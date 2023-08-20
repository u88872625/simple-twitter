import React from "react";

const FollowBtn = ({ text, onClick }) => {
  return (
    <div>
      <div>
        <button className="FollowBtn" onClick={onClick}>
          {text}
        </button>
      </div>
    </div>
  );
};

export default FollowBtn;
