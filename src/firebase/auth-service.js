import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, getAdditionalUserInfo } from "@firebase/auth";
import { auth, googleProvider } from "./config";
import { createUser } from "./users-service";

export const googleLogin = async () => {
    try {
       const result = await signInWithPopup(auth, googleProvider);

       const { isNewUser } = getAdditionalUserInfo(result);

       if (isNewUser) {
            await createUser(result.user.uid, {
                email: result.user.email,
                name: result.user.displayName,
                age: 0,
                role: "regular",
                favorites: [],
            })
       }

    } catch (error) {
        console.error({error});
    }
};

export const emailPasswordRegister = async (email, password, extraData) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await createUser(result.user.uid, { 
            email, 
            ...extraData});
    } catch (error) {
        console.error({error});
    }
};


export const emailPasswordLogin = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);

    } catch (error) {
        console.error({ error });
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error({error});
    }
};
