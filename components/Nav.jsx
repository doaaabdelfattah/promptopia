"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  // console.log("session: ", session);
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  const handleSignOut = async () => {
    localStorage.clear();
    sessionStorage.clear();
    await fetch("/api/auth/logout", { method: "POST" });

    await signOut({ redirect: true, callbackUrl: "/" });
  };
  // useEffect(() => {
  //   const fetchProviders = async () => {
  //     try {
  //       const res = await fetch("/api/auth/providers");
  //       const data = await res.json();
  //       console.log("Fetched providers manually:", data);
  //       setProviders(data);
  //     } catch (error) {
  //       console.error("Error fetching providers:", error);
  //     }
  //   };
  //   fetchProviders();
  // }, []);

  useEffect(() => {
    const loadProviders = async () => {
      const res = await getProviders();
      // console.log("Fetched providers:", res); // This will show the providers in the console
      setProviders(res); // Set the providers in the state
    };
    loadProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* ====== Desktop Nav ======= */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={() => handleSignOut()}
              className="outline_btn"
            >
              Sign out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                alt="profile-image"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: window.location.origin,
                      prompt: "select_account",
                    })
                  }
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* ============== Mobile Nav ======= */}
      <div className="flex sm:hidden relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              alt="profile-image"
              width={37}
              height={37}
              className="rounded-full cursor-pointer"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="black_btn w-full mt-5"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: window.location.origin,
                      prompt: "select_account",
                    })
                  }
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
