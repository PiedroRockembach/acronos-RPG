import { GoogleAuthProvider, getAuth, signInWithPopup } from '@firebase/auth'
import User from '../models/User'
import { auth } from '../database/Firestore'


export async function LoginWithPopup(): Promise<User> {
    const provider = await new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider); 
    const userInfo : User = {
        google_id: user.uid,
        name: user.displayName,
        photoURL: user.photoURL 
    } 
    return userInfo;
}