import { useEffect } from "react";
import User from '../models/User'
import { useRouter } from 'next/router'
import LocalStorage from '../utils/LocalStorage'
export default function home() {
  const router = useRouter()
  useEffect(() => {
    const user: User | null = LocalStorage.getUser() as User;
    if(user == null) {
      router.push("/Login")
    }
    console.log(user);
  }, []);
  return (
    <>
    <h1>Hello World</h1>
    </>
  );
  
}
