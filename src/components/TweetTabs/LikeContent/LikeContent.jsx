import TweetItem from "../../TweetItem/TweetItem.jsx";

export default function TweetContent({ likes }) {
  return (
    <div>
      {likes.map((tweet) => {
        return <TweetItem key={tweet.id} tweet={tweet} />;
      })}
    </div>
  );
}
