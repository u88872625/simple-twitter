import React from "react";

const AuthBtn = ({ text, onClick }) => {
  return (
    <div>
      <button className="AuthBtn" onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default AuthBtn;
