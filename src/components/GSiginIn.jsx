import React from "react";
import { useGSignIn } from "../hooks/useGoogleSignin";
import Signin from "./Signin";
import LeaderboardNoAuth from "./LeaderboardsNoAuth";
import Typewriter from "typewriter-effect";

const GSiginIn = () => {
  const { login, logined, isPending } = useGSignIn();
  return (
    <>
      <div className="body h-screen">
        {logined ? (
          <div>
            <Signin />
          </div>
        ) : (
          <div>
            <div className=" h-screen w-2/5 absolute left-0 flex items-center justify-center flex-col max-xl:w-full max-xl:relative">
              <div className=" my-20 m-auto  font-bold bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-clip-text text-transparent  text-6xl max-md:text-5xl max-[425px]:text-4xl">
                <Typewriter
                  className=" "
                  options={{
                    strings: ["HACKTOBER FEST"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </div>
              <br />

              <div className="block">
                <button
                  className="bg-gradient-to-r text-3xl max-[425px]:text-2xl from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 p-3 rounded-lg"
                  onClick={login}
                >
                  {!isPending ? "Register" : "Loading...."}
                </button>
              </div>

              <div className="top-24 relative hidden max-xl:block">

                <div class="h-0 w-0 border-x-8 border-x-transparent border-b-[16px] border-b-white"></div>
                <div class="h-0 w-0 border-x-8 border-x-transparent border-b-[16px] border-b-white opacity-50"></div>
              </div>
            </div>
            <div className=" max-xl:bg-custom-blue h-screen w-3/5 absolute right-0 flex items-center justify-center max-xl:w-full max-xl:relative">

              {/* <div className="bg-black h-screen block w-3/5 absolute right-0 flex items-center justify-center max-xl:w-full max-xl:relative"> */}
              {/* <Partbg/> */}

              <LeaderboardNoAuth />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GSiginIn;
