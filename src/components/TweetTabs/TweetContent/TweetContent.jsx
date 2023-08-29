import TweetItem from "../../TweetItem/TweetItem.jsx";

export default function TweetContent({ tweets, onClick, onTweetClick, onLikeClick }) {
  return (
    <div>
      {tweets.map((tweet) => {
        return (
          <TweetItem
            key={tweet.id}
            tweet={tweet}
            onClick={onClick}
            onTweetClick={(id) => onTweetClick?.(id)}
            onLikeClick={(id,isLiked) => onLikeClick?.(id, isLiked)}
          />
        );
      })}
    </div>
  );
}
