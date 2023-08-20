import React from "react";

const SettingBtn = ({ text, onClick }) => {
  return (
    <div>
      <button className="SettingBtn" onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default SettingBtn;
