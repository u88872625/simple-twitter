import TweetItem from "../../TweetItem/TweetItem.jsx";

export default function TweetContent({ tweets, onClick, onTweetClick }) {
  return (
    <div>
      {tweets.map((tweet) => {
        return (
          <TweetItem
            key={tweet.id}
            tweet={tweet}
            onClick={onClick}
            onTweetClick={(id) => onTweetClick?.(id)}
          />
        );
      })}
    </div>
  );
}
