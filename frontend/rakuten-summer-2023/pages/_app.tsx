import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { createContext, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { UserInfoType } from '@/types';

interface UserContext {
    userInfo: UserInfoType,
    setUserInfo: Dispatch<SetStateAction<UserInfoType>>
  }

export const LoginUser = createContext({} as UserContext)

function MyApp({ Component, pageProps }: AppProps) {
    const [userInfo, setUserInfo] = useState({} as UserInfoType)

  return (
    <ChakraProvider>
        <LoginUser.Provider value={{ userInfo, setUserInfo }}>
            <Component {...pageProps} />
        </LoginUser.Provider>
    </ChakraProvider>
  )
}

export default MyApp
