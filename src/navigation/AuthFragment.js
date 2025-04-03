import React, { useContext, useState } from "react";
import LoginScreen from "../pages/LoginScreen";
import SignUpScreen from "../pages/SignUpScreen";
import { AuthContext } from "../context/AuthContext";

const AuthFragmentView = () => {
    const [isMember, setIsMember] = useState(true);
    const togglePage = () => setIsMember(previous => !previous);
    return (
        isMember ? <LoginScreen togglePage={togglePage}/> : <SignUpScreen togglePage={togglePage}/>
    )
}
export default AuthFragmentView;