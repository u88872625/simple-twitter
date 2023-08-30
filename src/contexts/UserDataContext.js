import {createContext, useState,useContext} from 'react'

const defaultUserDataContext ={
	isDataUpdate:false
}
const UserDataContext = createContext(defaultUserDataContext);
export const useDataUpdate = ()=>useContext(UserDataContext)
export function UserDataContextProvider({children}){

	const [isDataUpdate, setIsDataUpdate] = useState(false)
	
	return (
    <UserDataContext.Provider
      value={(isDataUpdate, setIsDataUpdate)}
    >
      {children}
    </UserDataContext.Provider>
  );
}