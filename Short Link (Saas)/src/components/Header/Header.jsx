import { Logo } from "../Logo/Logo";
import { Navbar } from "../Navbar/Navbar";
import { MobileContentMenu } from "../MobileContentMenu/MobileContentMenu";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { AuthService } from "../../Appwrite/auth/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { Button } from "../Button/Button";

export function Header() {
  const optionsData = [
    { name: "Home", slug: "/home", id: "#fru548u" },
    { name: "Links", slug: "/links", id: "#gr5h5gu" },
    { name: "QR Codes", slug: "/qr-code", id: "#g5u5u44" },
    { name: "Pages", slug: "/pages", id: "#5thu58u" },
  ];
  const [openMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.authSlice.status);
  const userInfo = useSelector((state) => state.authSlice.userInfo);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const authentication = new AuthService();
  const [logoutLoading, setLogLoading] = useState(false);
  const [error, setError] = useState(null);
  const accountDisplay = userInfo?.name.charAt(0)?.toUpperCase() || "U";

  useEffect(() => {
    function clickOutSide(e) {
      if (!e.target.closest("#userInfo") && !e.target.closest("#userInfoBtn")) {
        setShowUserInfo(false);
      }
    }

    document.addEventListener("click", clickOutSide);

    return () => document.removeEventListener("click", clickOutSide);
  }, []);

  console.log(userInfo);

  const handleMobileMenu = () => {
    setMobileMenu(!openMenu);
  };

  function handleClick() {
    setShowUserInfo(true);
  }

  async function handleLogOut() {
    setLogLoading(true);

    try {
      await authentication.logOut();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      setLogLoading(false);

      switch (error.code) {
        case 401:
          setError(`session doesn't exist`);
          break;

        default:
          setError("logout failed");
          break;
      }
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full flex justify-center items-center"
    >
      <div className="w-[90%] sm:w-[95%] flex justify-between items-center">
        <div>
          <Logo size="30px"></Logo>
        </div>

        <div className="hidden md:flex">
          <Navbar options={optionsData}></Navbar>
        </div>

        <div className="flex items-center gap-2 ">
          {loginStatus ? (
            <>
              <button className="text-[12px] cursor-pointer p-[2px] rounded-[3px] w-[50px] border-1 border-gray-400 flex justify-center items-center hover:bg-gray-800 transition-all font-[Inter] hidden md:flex">
                About
              </button>
              <div
                id="userInfoBtn"
                onClick={handleClick}
                className={`p-1 w-[30px] relative cursor-pointer text-black font-[Inter] rounded-[3px] flex flex-col items-center justify-center bg-white`}
              >
                <p className="">{accountDisplay}</p>

                {showUserInfo && (
                  <div
                    id="userInfo"
                    className="absolute right-0 top-12 z-50 w-72 rounded-xl border border-zinc-800 bg-zinc-950 p-5 shadow-2xl backdrop-blur-md"
                  >
                    <div className="space-y-1 border-b border-zinc-800 pb-4">
                      <p className="text-sm text-zinc-400">Signed in as</p>
                      <h3 className="truncate text-base font-semibold text-white">
                        {userInfo?.name}
                      </h3>
                      <p className="truncate text-sm text-zinc-500">
                        {userInfo?.email}
                      </p>
                    </div>

                    {error && (
                      <p className="mt-4 rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400">
                        {error}
                      </p>
                    )}

                    <Button
                      onClick={handleLogOut}
                      loadingText={logoutLoading && 'Logging out...'}
                      className="mt-4 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-[12px] border-1 w-[50px] p-[2px] rounded-[3px] border-gray-400 cursor-pointer flex justify-center items-center hover:bg-gray-800 transition-all font-[Inter] hidden md:flex"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/sign-up")}
                className="text-[12px] w-[60px] p-1 rounded-sm bg-white text-black cursor-pointer flex justify-center items-center hover:bg-gray-300 transition-all font-[Inter]"
              >
                Sign Up
              </button>
            </>
          )}

          <div
            onClick={handleMobileMenu}
            className="w-[25px] h-[25px] bg-black border-1 border-gray-600 rounded-[50%] cursor-pointer flex flex-col items-center justify-center gap-[2px] p-1 hover:gap-[3px] transition-all md:hidden"
          >
            <div className="w-[10px] h-[1.5px]  bg-white"></div>
            <div className="w-[10px] h-[1.5px]  bg-white"></div>
          </div>
        </div>

        <MobileContentMenu
          handleMobileMenu={handleMobileMenu}
          openMenu={openMenu}
          options={optionsData}
        ></MobileContentMenu>
      </div>
    </motion.header>
  );
}
