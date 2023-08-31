import ReplyItem from "../../components/ReplyItem/ReplyItem";

export default function ReplyCollection({ replies, poster }) {
  if (!Array.isArray(replies) || replies.length === 0) {
    return <div>No replies available.</div>;
  }
  return (
    <div>
      {replies.map((tweet) => {
        return <ReplyItem key={tweet.id} tweet={tweet} poster={poster} />;
      })}
    </div>
  );
}
