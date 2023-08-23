import { useState } from "react";
import TweetContent from "./TweetContent/TweetContent.jsx";
import ReplyContent from "./ReplyContent/ReplyContent.jsx";
import LikeContent from "./LikeContent/LikeContent.jsx";
import styles from "./TweetTabs.module.scss";

const dummyUserTweets = [
  {
    id: 101,
    userName: "JohnDoe",
    accountName: "johndoe",
    avatar:
      "https://pic.baike.soso.com/ugc/baikepic2/1284/20230320164402-1468310604_jpeg_1131_754_187393.jpg/1284",
    tweet: {
      id: 1,
      createdAt: "2023-08-22T10:00:00Z",
      textContent: "Having a great day at the beach! 🏖️ #SummerVibes",
      numOfReply: 12,
      numOfLike: 45,
    },
  },
  {
    id: 101,
    userName: "JohnDoe",
    accountName: "johndoe",
    avatar:
      "https://pic.baike.soso.com/ugc/baikepic2/1284/20230320164402-1468310604_jpeg_1131_754_187393.jpg/1284",
    tweet: {
      id: 2,
      createdAt: "2023-08-22T11:15:00Z",
      textContent:
        "Just finished reading an amazing book. Highly recommended! 📚 #BookLover",
      numOfReply: 5,
      numOfLike: 32,
    },
  },
  {
    id: 101,
    userName: "JohnDoe",
    accountName: "johndoe",
    avatar:
      "https://pic.baike.soso.com/ugc/baikepic2/1284/20230320164402-1468310604_jpeg_1131_754_187393.jpg/1284",
    tweet: {
      id: 3,
      createdAt: "2023-08-22T12:45:00Z",
      textContent:
        "Exploring the city's hidden gems today. Found the best coffee shop! ☕ #CityAdventures",
      numOfReply: 8,
      numOfLike: 23,
    },
  },
  {
    id: 101,
    userName: "JohnDoe",
    accountName: "johndoe",
    avatar:
      "https://pic.baike.soso.com/ugc/baikepic2/1284/20230320164402-1468310604_jpeg_1131_754_187393.jpg/1284",
    tweet: {
      id: 4,
      createdAt: "2023-08-22T14:30:00Z",
      textContent:
        "Just adopted a cute kitten! Meet my new furry friend. 🐱 #PetLove",
      numOfReply: 20,
      numOfLike: 67,
    },
  },
  {
    id: 101,
    userName: "JohnDoe",
    accountName: "johndoe",
    avatar:
      "https://pic.baike.soso.com/ugc/baikepic2/1284/20230320164402-1468310604_jpeg_1131_754_187393.jpg/1284",
    tweet: {
      id: 5,
      createdAt: "2023-08-22T15:20:00Z",
      textContent:
        "Attended a fascinating tech conference today. So many innovative ideas! 💡 #TechEnthusiast",
      numOfReply: 15,
      numOfLike: 50,
    },
  },
  {
    id: 101,
    userName: "JohnDoe",
    accountName: "johndoe",
    avatar:
      "https://pic.baike.soso.com/ugc/baikepic2/1284/20230320164402-1468310604_jpeg_1131_754_187393.jpg/1284",
    tweet: {
      id: 6,
      createdAt: "2023-08-22T16:10:00Z",
      textContent:
        "Enjoying a relaxing evening with a cup of tea and my favorite TV show. 🍵📺 #ChillTime",
      numOfReply: 10,
      numOfLike: 38,
    },
  },
];

const dummyUserReplies = [
  {
    id: 101,
    userName: "JaneSmith",
    accountName: "janesmith",
    avatar:
      "https://pic.baike.soso.com/ugc/baikepic2/1284/20230320164402-1468310604_jpeg_1131_754_187393.jpg/1284",
    reply: {
      replyContent:
        "Looks like you had a fantastic time! I love the beach too. 🏖️",
      whoTweet: "JohnDoe",
      createdAt: "2023-08-22T10:15:00Z",
    },
  },
  {
    id: 101,
    userName: "JaneSmith",
    accountName: "janesmith",
    avatar:
      "https://pic.baike.soso.com/ugc/baikepic2/1284/20230320164402-1468310604_jpeg_1131_754_187393.jpg/1284",
    reply: {
      replyContent:
        "That book sounds intriguing! I'll add it to my reading list. 📚",
      whoTweet: "JohnDoe",
      createdAt: "2023-08-22T11:30:00Z",
    },
  },
  {
    id: 101,
    userName: "JaneSmith",
    accountName: "janesmith",
    avatar:
      "https://pic.baike.soso.com/ugc/baikepic2/1284/20230320164402-1468310604_jpeg_1131_754_187393.jpg/1284",
    reply: {
      replyContent:
        "I love exploring the city too! Any coffee shop recommendations? ☕",
      whoTweet: "JohnDoe",
      createdAt: "2023-08-22T13:00:00Z",
    },
  },
  {
    id: 101,
    userName: "JaneSmith",
    accountName: "janesmith",
    avatar:
      "https://pic.baike.soso.com/ugc/baikepic2/1284/20230320164402-1468310604_jpeg_1131_754_187393.jpg/1284",
    reply: {
      replyContent: "Your new kitten is adorable! What's its name? 🐱",
      whoTweet: "JohnDoe",
      createdAt: "2023-08-22T14:45:00Z",
    },
  },
  {
    id: 101,
    userName: "JaneSmith",
    accountName: "janesmith",
    avatar:
      "https://pic.baike.soso.com/ugc/baikepic2/1284/20230320164402-1468310604_jpeg_1131_754_187393.jpg/1284",
    reply: {
      replyContent:
        "The tech conference sounds amazing! Did you learn anything mind-blowing? 💡",
      whoTweet: "JohnDoe",
      createdAt: "2023-08-22T15:45:00Z",
    },
  },
  {
    id: 101,
    userName: "JaneSmith",
    accountName: "janesmith",
    avatar:
      "https://pic.baike.soso.com/ugc/baikepic2/1284/20230320164402-1468310604_jpeg_1131_754_187393.jpg/1284",
    reply: {
      replyContent: "Enjoy your chill time! What's your favorite TV show? 🍵📺",
      whoTweet: "JohnDoe",
      createdAt: "2023-08-22T16:30:00Z",
    },
  },
];

const dummyUserLikes = [
  {
    id: 201,
    userName: "JohnDoe",
    accountName: "johndoe",
    avatar:
      "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*XGw9zUEZGYPNmeKGmyeX1g.jpeg",
    tweet: {
      textContent: "Having a great day at the beach! 🏖️ #SummerVibes",
      numOfReply: 12,
      numOfLike: 45,
      createdAt: "2023-08-22T10:00:00Z",
    },
  },
  {
    id: 202,
    userName: "AliceJohnson",
    accountName: "alicejohnson",
    avatar:
      "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*XGw9zUEZGYPNmeKGmyeX1g.jpeg",
    tweet: {
      textContent: "Just had the most amazing meal! 🍔🍟 #Foodie",
      numOfReply: 8,
      numOfLike: 32,
      createdAt: "2023-08-22T11:45:00Z",
    },
  },
  {
    id: 203,
    userName: "MarkWilliams",
    accountName: "markwilliams",
    avatar:
      "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*XGw9zUEZGYPNmeKGmyeX1g.jpeg",
    tweet: {
      textContent:
        "Exploring the beautiful countryside this weekend. Nature is amazing! 🌳🌼 #NatureLover",
      numOfReply: 15,
      numOfLike: 58,
      createdAt: "2023-08-22T13:30:00Z",
    },
  },
  {
    id: 204,
    userName: "EmilyBrown",
    accountName: "emilybrown",
    avatar:
      "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*XGw9zUEZGYPNmeKGmyeX1g.jpeg",
    tweet: {
      textContent:
        "Had a blast at the concert last night! The music was electric! 🎶🎤 #MusicFestival",
      numOfReply: 20,
      numOfLike: 75,
      createdAt: "2023-08-22T15:15:00Z",
    },
  },
  {
    id: 205,
    userName: "ChrisTaylor",
    accountName: "christaylor",
    avatar:
      "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*XGw9zUEZGYPNmeKGmyeX1g.jpeg",
    tweet: {
      textContent:
        "Just watched an incredible movie! Highly recommended! 🎬🍿 #MovieNight",
      numOfReply: 10,
      numOfLike: 42,
      createdAt: "2023-08-22T16:00:00Z",
    },
  },
  {
    id: 206,
    userName: "SarahMiller",
    accountName: "sarahmiller",
    avatar:
      "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*XGw9zUEZGYPNmeKGmyeX1g.jpeg",
    tweet: {
      textContent:
        "Spent the day volunteering at the local animal shelter. So rewarding! 🐾❤️ #Volunteer",
      numOfReply: 5,
      numOfLike: 27,
      createdAt: "2023-08-22T17:30:00Z",
    },
  },
];

export default function TweetTabs() {
  const [activeTab, setActiveTab] = useState("tweets");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <div className={styles.tabBtns}>
        <button
          className={activeTab === "tweets" ? styles.active : ""}
          onClick={() => handleTabClick("tweets")}
        >
          <span
            className={`${styles.buttonText} ${
              activeTab === "tweets" ? styles.active : ""
            }`}
          >
            推文
          </span>
        </button>
        <button
          className={activeTab === "replies" ? styles.active : ""}
          onClick={() => handleTabClick("replies")}
        >
          <span
            className={`${styles.buttonText} ${
              activeTab === "replies" ? styles.active : ""
            }`}
          >
            回覆
          </span>
        </button>
        <button
          className={activeTab === "likes" ? styles.active : ""}
          onClick={() => handleTabClick("likes")}
        >
          <span
            className={`${styles.buttonText} ${
              activeTab === "likes" ? styles.active : ""
            }`}
          >
            喜歡的內容
          </span>
        </button>
      </div>
      <div className={styles.tabContent}>
        {activeTab === "tweets" && <TweetContent tweets={dummyUserTweets} />}
        {activeTab === "replies" && <ReplyContent replies={dummyUserReplies} />}
        {activeTab === "likes" && <LikeContent likes={dummyUserLikes} />}
      </div>
    </>
  );
}
