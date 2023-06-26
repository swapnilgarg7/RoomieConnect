import { useState, useEffect } from "react";
import "firebase/auth"

export default function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const auth = firebase.auth();
        auth.onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true);
            }
            else {
                setLoggedIn(false);
            }
            setCheckingAuth(false);
        });
    }, []);

    return { loggedIn, checkingAuth };
}