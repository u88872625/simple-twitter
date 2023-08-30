import AdminTweetItem from "./AdminTweetItem/AdminTweetItem.jsx";

export default function AdminTweetItemCollection({tweets, onClick}){
	return (
    <div>
      {tweets.map((tweet) => {
        return <AdminTweetItem key={tweet.id} tweet={tweet} onClick={(id)=>onClick?.(id)}/>;
      })}
    </div>
  );
}