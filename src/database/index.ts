import db from "./Firestore";
import { doc, getDoc } from "@firebase/firestore";

export async function GetUsers() {
    const docRef = doc(db, "users");
    const snap = await getDoc(docRef);

    if(snap.exists()) {
        return snap.data();
    } else {
        throw new Error();
    }
}