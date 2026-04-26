import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { AuthService } from "./Appwrite/auth/auth";
import { login, logout } from "./store/authSlice";
import { Loading } from "./components/Loading/Loading";
import { useMemo } from "react";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const authentication = useMemo(() => new AuthService(), [])

  useEffect(() => {

    const startTime = Date.now()

    async function fetchUser () {
      try {
        const userInfo = await authentication.getUserData();

        if (userInfo) {
          dispatch(
            login({
              $id: userInfo.$id,
              name: userInfo.name,
              email: userInfo.email,
              emailVerification: userInfo.emailVerification,
              prefs: userInfo.prefs,
            }),
          );
        } else {
          dispatch(logout());
        }
      } catch(error) {
        console.error(error)
      } finally {
        const time = Date.now() - startTime
        const remaining = Math.max(1000 - time,0);

        setTimeout(()=>{
          setLoading(false)
        },remaining)
      }
    };
    fetchUser()
  }, []);



  return (
    <div>
      {
        loading ? <Loading></Loading> : <Outlet></Outlet>
      }
    </div>
  );
}

export default App;
