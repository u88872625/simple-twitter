import TweetItem from "../../TweetItem/TweetItem.jsx";
export default function LikeContent({
  likes,
  onClick,
  onTweetClick,
  onLikeClick,
  like,
  likeCount,
  userAvatar,
}) {
  return (
    <div>
      {likes.map((tweet) => {
        return (
          <TweetItem
            key={tweet.id}
            tweet={tweet}
            onClick={onClick}
            onTweetClick={(id) => onTweetClick?.(id)}
            onLikeClick={(id) => onLikeClick?.(id)}
            like={like}
            likeCount={likeCount}
            userAvatar={userAvatar}
          />
        );
      })}
    </div>
  );
}
