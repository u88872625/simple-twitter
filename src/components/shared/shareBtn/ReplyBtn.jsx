import React from "react";

const ReplyBtn = ({ text, onClick }) => {
  return (
    <div>
      <button className="ReplyBtn" onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default ReplyBtn;
