import { useEffect } from "react";
import { store } from "../lib/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import Container from "../ui/Container";
import Registration from "../ui/Registration";
import Loading from "../ui/Loading";
import UserInfo from "../ui/UserInfo";

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

  return (
    <Container>
      {currentUser ? <UserInfo /> : <Registration />}
      {isLoading && <Loading />}
    </Container>
  );
};

export default Profile;
