import { GoogleAuthProvider, OAuthCredential, signInWithPopup, UserCredential, signInWithCustomToken, getAuth } from '@firebase/auth'
import { User } from '../models/Users'
import firesotoreDatabase from '@/database';


export async function LoginWithPopup(): Promise<User | null> {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(firesotoreDatabase._auth, provider); 
        const user = result.user;
        const userInfo : User = {
            google_id: user.uid,
            name: user.displayName,
            photoURL: user.photoURL,
            email: user.email!,
        }
        const alreadyLoggedIn = await firesotoreDatabase.GetUserByEmail(userInfo.email)
        console.log('already logged in: ', alreadyLoggedIn);
        
        if(!alreadyLoggedIn) await firesotoreDatabase.AddUser(userInfo);
        
        return userInfo;
    } catch (e) {
        console.log('login canceled');
        return null;
    }
        
}

