import React, { useState, useEffect } from "react";
import FontendLayout from "../components/shared/layout/FontendLayout/FontendLayout";
import AddTweet from "../components/AddTweet/AddTweet";
import TweetContent from "../components/TweetTabs/TweetContent/TweetContent";

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
      isLike: false,
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
      isLike: false,
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
      isLike: true,
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
      isLike: true,
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
      isLike: true,
    },
  },
];

const HomePage = () => {
  // const [tweets, setTweets] = useState([]);

  // useEffect(() => {
  //   const getTweetsAsync = async () => {
  //     try {
  //       const tweets = await getAllTweets();
  //       setTweets(tweets.map((tweet) => ({ ...tweet })));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  // }, []);

  return (
    <div>
      <FontendLayout>
        <AddTweet />
        <TweetContent tweets={dummyUserTweets} />
      </FontendLayout>
    </div>
  );
};

export default HomePage;
