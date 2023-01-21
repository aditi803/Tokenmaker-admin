
import React, { createContext, useState } from "react"


export const CommonContext = createContext()

export const CommonProvider = ({children}) => {

    const [toggle, setToggle] = useState(false)

    return <CommonContext.Provider value={{toggle, setToggle}}>
        {children}
    </CommonContext.Provider>
    
}