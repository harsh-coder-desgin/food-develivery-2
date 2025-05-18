"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

const restaurantsLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const router = useRouter();

  const Submitlogin = async (e) => {
    e.preventDefault(); 
    if (!email || !password) {
      setError(true);
    } else {
      setError(false)

      let response = await fetch("api/restaurant", {
        method: "POST",
        body: JSON.stringify({ email, password })
      })

      response = await response.json();

      if (response.success) {
        alert("Login successful")
        let { data } = response;
        delete data.password;
        localStorage.setItem("restaurantUser", JSON.stringify(data));
        router.push('/restaurants/dashboard')
      } else {
        alert(response.message)
      }
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-12 pb-2 lg:px-8 mt-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Login in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                />
                {
                  error && !email && <span style={{ color: "red" }}> Please fill out all required fields</span>
                }
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                />
                {
                  error && !password && <span style={{ color: "red" }}> Please fill out all required fields</span>
                }
              </div>
            </div>

            <div>
              <button
                onClick={Submitlogin}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default restaurantsLogin;
