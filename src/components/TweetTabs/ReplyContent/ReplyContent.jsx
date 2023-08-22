import ReplyItem from "../../ReplyItem/ReplyItem";

export default function TweetContent({ replies }) {
  return (
    <div>
      {replies.map((tweet) => {
        return <ReplyItem key={tweet.id} tweet={tweet} />;
      })}
    </div>
  );
}
