import { createContext, useContext, useReducer } from 'react';

const AppContext = createContext(null)

export const AppContextProvider = ({children}) =>{
    return <AppContext.Provider></AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext);