import TweetItem from "../../TweetItem/TweetItem.jsx";

export default function TweetContent({ tweets }) {
  return (
    <div>
      {tweets.map((tweet) => {
        return <TweetItem key={tweet.id} tweet={tweet} />;
      })}
    </div>
  );
}
