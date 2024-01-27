import { AuthCredential } from "@firebase/auth";
export type User = {
    google_id: string;
    name: string | null;
    photoURL?: string | null;
    email: string;
}

