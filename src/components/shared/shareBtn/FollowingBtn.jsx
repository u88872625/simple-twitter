import React from "react";

const FollowingBtn = ({ text, onClick }) => {
  return (
    <div>
      <button className="FollowingBtn" onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default FollowingBtn;
