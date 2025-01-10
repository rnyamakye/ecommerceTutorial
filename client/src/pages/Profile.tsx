import React, { useEffect } from "react";
import { store } from "../lib/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import Container from "../ui/Container";
import Registration from "../ui/Registration";


const Profile = () => {
  const { currentUser, getUserInfo, isLoading } = store();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      getUserInfo(user?.uid);
    });
    return () => {
      unSub();
    };
  }, [getUserInfo]);
  console.log(currentUser)

  return <Container>
    {currentUser ? <UserInfo/> : <Registration/>}
    {isLoading}
  </Container>;
};

export default Profile;
