import {
    doc,
    addDoc,
    collection,
    updateDoc,
    getDoc,
    setDoc,
    getDocs,
    query,
    where,
  } from "firebase/firestore";
  import { db } from "./config.js";
  
  export const usersCollection = "users";
  
  export async function createUser(data) {
    const { uid, ...restData } = data;
  
    if (uid) {
      return setDoc(doc(db, usersCollection, uid), restData);
    }
  
    return addDoc(collection(db, usersCollection), restData);
  }
  
  export async function updateUser(userId, data) {
    const userRef = doc(db, usersCollection, userId);
    return updateDoc(userRef, data);
  }
  
  export async function getUserById(userId) {
    const userRef = doc(db, usersCollection, userId);
    return getDoc(userRef);
  }
  
  export async function getUserProfile(email) {
    const userQuery = query(
      collection(db, usersCollection),
      where("email", "==", email)
    );
  
    const results = await getDocs(userQuery);
  
    if (results.size > 0) {
      const [user] = results.docs.map((item) => ({
        ...item.data(),
        id: item.id,
      }));
      return user;
    }
  
    return null;
  }