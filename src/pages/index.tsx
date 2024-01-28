import { useEffect, useState } from "react";
import { User } from '../models/Users'
import { useRouter } from 'next/router'
import firesotoreDatabase from "@/database";

import Jwt from "@/utils/Jwt";

export default function home() {
  const router = useRouter()
  const [user, setUser] = useState({} as User);

  const handleLocalUser = async () => {
    const curUser = Jwt.getUserFromToken()
    if (!curUser) return router.push("/Login");

    const userData = await firesotoreDatabase.GetUserByEmail(curUser.email);
    if (!userData) return router.push("/Login");
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
