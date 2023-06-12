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

export const reservesCollection = "reservations";
export const functionsCollection = "movies";

//Functions availability
export async function createMovieFunction(data) {
    const { id, ...restData } = data;

    const movieExists = await getMovieFunction(id);

    if (!movieExists) {
        const defaultFunction = {};
        
        for (let index = 0; index < 20; index++) {
            defaultFunction[index+1] = true;
            
        }

        defaultFunction["id"] = id;

        await setDoc(doc(db, functionsCollection, id), defaultFunction);
        return updateFunction(id, restData);
    } else {

        return updateFunction(id, data);
    }

}

export async function getMovieFunction(movieID) {
    const movieQuery = query(
      collection(db, functionsCollection),
      where("id", "==", movieID)
    );
  
    const results = await getDocs(movieQuery);
  
    if (results.size > 0) {
      const [movie] = results.docs.map((item) => ({
        ...item.data(),
        id: item.id,
      }));
      return movie;
    }
  
    return null;
  }

export async function updateFunction(movieID, data) {
    const movieRef = doc(db, functionsCollection, movieID);
    return updateDoc(movieRef, data);
  }

  export async function getMovieById(movieID) {
    const movieRef = doc(db, functionsCollection, movieID);
    return getDoc(movieRef);
  }

//Reservations
export async function createReservation(data) {
    const { uid, ...restData } = data;

    const test = await getReservation("PAFgRBy1eBZVCFZrACN6N4fjmyp1");

    await addDoc(collection(db, reservesCollection), data);

}

export async function getReservation(userID) {
    const reserveQuery = query(
      collection(db, reservesCollection),
      where("uid", "==", userID)
    );
  
    const results = await getDocs(reserveQuery);

    const reservations = results.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }));
  
    return reservations;

  }



