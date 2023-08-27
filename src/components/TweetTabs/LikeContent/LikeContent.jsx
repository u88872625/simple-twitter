import TweetItem from "../../TweetItem/TweetItem.jsx";

export default function LikeContent({ likes, onClick }) {
  return (
    <div>
      {likes.map((tweet) => {
        return <TweetItem key={tweet.id} tweet={tweet} onClick={onClick} />;
      })}
    </div>
  );
}
