"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

const UserLogin = (props) => {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlelogin = async (e) => {
    e.preventDefault();

    let response = await fetch("api/user/login", {
      method: "post",
      body: JSON.stringify({ email, password })
    })

    response = await response.json();

    if (response.success) {
      const { data } = response
      delete data.password;
      localStorage.setItem("user", JSON.stringify(data));

      if (props?.redirect?.order) {
        router.push('/order')
      } else {
        router.push('/')
      }
    } else {
      alert(response.message)
    }

  }

  return (
    <>
      <div className="flex items-center justify-center mt-20">
        <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
            <form className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-describedby="email-description"
                />
                <p id="email-description" className="text-sm text-gray-500 mt-1">
                  We'll never share your email.
                </p>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  onClick={handlelogin}
                  className="w-full py-2 px-4 bg-teal-600 text-white font-medium rounded-lg shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
