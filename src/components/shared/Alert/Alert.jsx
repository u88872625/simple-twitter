import styles from './Alert.module.scss'
import { useEffect, useState } from 'react';

export default function Alert({msg, icon}) {
	const [visable, setVisible] = useState(true)

	// 1秒後消失
	useEffect(()=> {
		const timer = setTimeout(()=>{
			setVisible(false)
		}, 1000)

		// alert消失後,取消timer
		return ()=>{
			clearTimeout(timer)
		}
	},[])

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