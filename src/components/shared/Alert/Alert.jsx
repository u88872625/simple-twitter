import styles from './Alert.module.scss'
import { useEffect, useState } from 'react';


export default function Alert({msg, icon}) {
	const [visable, setVisible] = useState(true)

	// 1.5秒後消失
	useEffect(()=> {
		const timer = setTimeout(()=>{
			setVisible(false)
		}, 1500)
		// alert消失後,取消timer
		return ()=>{
			clearTimeout(timer)
		}
	},[visable])
	// 一般狀況下 隱藏alert
	if(!visable){
		return null
	}

	return (
    <div className={styles.alert}>
      <p className={styles.errMsg}>{msg}</p>
      <img className={styles.icon} src={icon} alt="icon" />
    </div>
  );
}