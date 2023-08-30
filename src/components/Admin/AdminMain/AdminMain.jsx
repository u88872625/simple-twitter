import styles from "./AdminMain.module.scss";
import AdminTweetItemCollection from "./AdminTweetItemCollection";

// const dummyTweets = [
//   {
//     id: 1,
//     account: "user1",
//     name: "Alice",
//     avatar:
//       "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*XGw9zUEZGYPNmeKGmyeX1g.jpeg",
//     post: {
//       id: 101,
//       createdAt: "2023-08-24T10:00:00Z",
//       textContent: "Just had a wonderful day at the park! 🌳 #NatureLover",
//     },
//   },
//   {
//     id: 2,
//     account: "user2",
//     name: "Bob",
//     avatar:
//       "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*XGw9zUEZGYPNmeKGmyeX1g.jpeg",
//     post: {
//       id: 102,
//       createdAt: "2023-08-23T15:30:00Z",
//       textContent:
//         "Exploring new recipes in the kitchen today. Cooking is so much fun! 🍳🥗",
//     },
//   },
//   {
//     id: 3,
//     account: "user3",
//     name: "Charlie",
//     avatar:
//       "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*XGw9zUEZGYPNmeKGmyeX1g.jpeg",
//     post: {
//       id: 103,
//       createdAt: "2023-08-22T20:15:00Z",
//       textContent:
//         "Attended an amazing concert last night. The energy was incredible! 🎶🎤",
//     },
//   },
//   {
//     id: 4,
//     account: "user4",
//     name: "David",
//     avatar:
//       "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*XGw9zUEZGYPNmeKGmyeX1g.jpeg",
//     post: {
//       id: 104,
//       createdAt: "2023-08-21T12:45:00Z",
//       textContent:
//         "Enjoying a relaxing weekend by the beach. Perfect weather for some sunbathing! ☀️🏖️",
//     },
//   },
// ];

export default function AdminMain({tweets, onClick}) {

  
  return (
    <div>
      <AdminTweetItemCollection tweets={tweets} onClick={(id)=>onClick?.(id)}/>
    </div>
  );
}
