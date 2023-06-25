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
  
  export async function updateUserFavorites(userId, newFavs) {
    const allFavs = [];
    const userRef = doc(db, usersCollection, userId);
    const oldFavs = await getUserMovies(userId);

    if (oldFavs.includes(newFavs)) {
      console.error("USER ALREADY HAS THAT MOVIE AS FAVORITE");
      return window.alert("You already have that movie in favorites");
    } else {
      if (oldFavs.length < 1) {
        allFavs.push(newFavs);
        try {
          await updateDoc(userRef, { "favorites": allFavs });
          
          console.log('FAVORITES UPDATED SUCCESFULLY');
          window.alert("The movie has been added to your favorites list!");
          
        } catch (error) {
          console.error('ERROR UPDATING FAVORITES:', error);
          return;
  
        }
      } else {
        for (let index = 0; index < oldFavs.length; index++) {
          const element = oldFavs[index];
          allFavs.push(element); 
        }
        allFavs.push(newFavs);

        try {
          await updateDoc(userRef, { "favorites": allFavs });
          console.log('FAVORITES UPDATED SUCCESFULLY');
          window.alert("The movie has been added to your favorites list!");
        } catch (error) {
          console.error('ERROR UPDATING FAVORITES:', error);
        }
      }
    } 
  }
  
  export async function getUserMovies(userID) {
    const userRef = doc(db, usersCollection, userID);
    try {
      const userDoc = await getDoc(userRef);
      const favorites = userDoc.data().favorites;
      console.log('OBTAINED: ', favorites);
      return favorites;
    } catch (error) {
      console.error('ERROR', error);
      return null;
    }
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