import { createContext, useContext, useReducer } from 'react';
import userReducer from '../reducers/userReducer'
import postReducer from '../reducers/postReducer'
import commentsReducer from '../reducers/commentsReducer'
import usersReducer from '../reducers/usersReducer';

const AppContext = createContext(null)

export const AppContextProvider = ({children}) =>{
    const initialUser = {
        user:null,
        isAuth:false,
    }
    const initialUsers={
        users:[],
        friends:[]
    }
    const initialPost = {
        posts:[],
        categories:[],
        isActiveFilter: false
    }
    const initialComments = {
        comments:[]
    }
    const [user,userDispatch] = useReducer(userReducer,initialUser)
    const [users,usersDispatch] = useReducer(usersReducer,initialUsers)
    const [posts,postsDispatch] = useReducer(postReducer,initialPost)
    const [comments,commentsDispatch] = useReducer(commentsReducer,initialComments)

    const globalState={
        user:{user,userDispatch},
        users:{users,usersDispatch},
        posts:{posts,postsDispatch},
        comments:{comments,commentsDispatch},
    }
    return <AppContext.Provider value={{...globalState}}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext);