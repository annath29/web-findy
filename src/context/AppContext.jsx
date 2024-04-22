import { createContext, useContext, useReducer } from 'react';
import userReducer from '../reducers/userReducer'
import postReducer from '../reducers/postReducer'
import commentsReducer from '../reducers/commentsReducer'

const AppContext = createContext(null)

export const AppContextProvider = ({children}) =>{
    const initialUser = {
        user:null,
        isAuth:true,
    }
    const initialPost = {
        posts:[]
    }
    const initialComments = {
        comments:[]
    }
    const [user,userDispatch] = useReducer(userReducer,initialUser)
    const [post,postDispatch] = useReducer(postReducer,initialPost)
    const [comments,commentsDispatch] = useReducer(commentsReducer,initialComments)

    const globalState={
        user:{user,userDispatch},
        post:{post,postDispatch},
        comments:{comments,commentsDispatch},
    }
    return <AppContext.Provider value={{...globalState}}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext);