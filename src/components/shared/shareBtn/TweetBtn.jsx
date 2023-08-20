import React from "react";
import styled from "styled-components";

const TweetBtn = ({ text, onClick }) => {
  return (
    <div>
      <button className="TweetBtn" onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default TweetBtn;
