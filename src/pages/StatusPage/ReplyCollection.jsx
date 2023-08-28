import ReplyItem from "../../components/ReplyItem/ReplyItem";

export default function ReplyCollection({ replies }) {


  return (
    <div>
      {replies.map((tweet) => {
        return <ReplyItem key={tweet.id} tweet={tweet} />;
      })}
    </div>
  );
}
