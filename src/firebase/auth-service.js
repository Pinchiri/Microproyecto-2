import { signInWithPopup, signOut } from "@firebase/auth";
import { auth, googleProvider } from "./firebaseConfig";

export const googleLogin = async () => {
    try {
       const result = await signInWithPopup(auth, googleProvider);

    } catch (error) {
        console.error({error});
    }
};

export const emailPasswordRegister = async () => {};

export const emailPasswordLogin = async () => {};

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error({error});
    }
};
