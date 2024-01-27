import { useEffect, useState } from "react";
import { User } from '../models/Users'
import { useRouter } from 'next/router'
import firesotoreDatabase from "@/database";

import Jwt from "@/utils/Jwt";

export default function home() {
  const router = useRouter()
  const [user, setUser] = useState({} as User);

  const handleLocalUser = async () => {
    const curUser = firesotoreDatabase._auth.currentUser
    if (!curUser) {
      router.push("/Login");
      return;
    }
    router.push("/Lobby");
  }
  useEffect(() => {
    handleLocalUser();   
  }, []);
  return (
    <>
    </>
  );
  
}
