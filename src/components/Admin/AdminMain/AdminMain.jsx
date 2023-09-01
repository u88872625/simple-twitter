import styles from "./AdminMain.module.scss";
import AdminTweetItemCollection from "./AdminTweetItemCollection";

export default function AdminMain({tweets, onClick}) {

  return (
    <div>
      <AdminTweetItemCollection tweets={tweets} onClick={(id)=>onClick?.(id)}/>
    </div>
  );
}
