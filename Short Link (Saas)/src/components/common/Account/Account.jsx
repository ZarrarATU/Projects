import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { AuthService } from "../../../Appwrite/auth/auth";
import { useNavigate } from "react-router";
import { logout } from "../../../store/authSlice";

export function Account() {

    const userInfo = useSelector((state) => state.authSlice.userInfo);
    const accountDisplay = userInfo?.name.charAt(0)?.toUpperCase() || "U";
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [error, setError] = useState(null);
    const [logoutLoading, setLogLoading] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authentication = new AuthService();

    function handleClick() {
        setShowUserInfo(true);
    }

    useEffect(() => {
        function clickOutSide(e) {
            if (!e.target.closest("#userInfo") && !e.target.closest("#userInfoBtn")) {
                setShowUserInfo(false);
            }
        }

        document.addEventListener("click", clickOutSide);

        return () => document.removeEventListener("click", clickOutSide);
    }, []);

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
    )
}
