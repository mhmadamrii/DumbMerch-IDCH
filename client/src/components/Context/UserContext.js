import { createContext, useReducer } from "react";

export const UserContext = createContext()

const initialState = {
    isLogin: false,
    user: {}
}

const reducer = (state, action) => {
    
    // kondisi type = login(true), payload = Login(false)
    const { type, payload } = action

    switch (type) {
        case 'loginSuccess':
            return {
                isLogin: true,
                user: payload
            }
        case 'logOut':
            return {
                isLogin: false,
                user: {}
            }
        default:
            throw new Error()
    }
}

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState) 

    // proses create context
    return (
        <UserContext.Provider value={[state, dispatch]} >
            {children}
        </UserContext.Provider>
    )
}