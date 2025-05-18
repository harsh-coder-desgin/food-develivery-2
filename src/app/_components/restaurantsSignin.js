"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

const restaurantsSignin = () => {

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter()

  const Submitform = async (e) => {
    e.preventDefault();
    if (!name || !contact || !address || !city || !email || !password) {
      setError(true);
    }
    else {
      setError(false);

      let response = await fetch("api/restaurant", {
        method: "POST",
        body: JSON.stringify({ name, contact, address, city, email, password })
      })
      response = await response.json();

      if (response.success) {
        const { result } = response;
        delete result.password;
        localStorage.setItem("restaurantUser", JSON.stringify(result));
        router.push('/restaurants/dashboard')
      }
    }

  };

  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
        Create account
      </h2>
      <form className="max-w-lg mx-auto">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10">
            <div className="mt-10 space-y-6">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">
                  Enter Restaurant Name
                </label>
                <div className="mt-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="first-name"
                    name="first-name"
                    type="text"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                  />
                  {
                    error && !name && <span style={{ color: "red" }}> Please fill out all required fields</span>
                  }
                </div>
              </div>

              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-900">
                  Contact
                </label>
                <div className="mt-2">
                  <input
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    id="contact"
                    name="contact"
                    type="text"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                  />
                  {
                    error && !contact && <span style={{ color: "red" }}> Please fill out all required fields</span>
                  }
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-1/2">
                  <label htmlFor="street-address" className="block text-sm font-medium text-gray-900">
                    Street Address
                  </label>
                  <div className="mt-2">
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      id="street-address"
                      name="street-address"
                      type="text"
                      autoComplete="street-address"
                      className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                    />
                    {
                      error && !address && <span style={{ color: "red" }}> Please fill out all required fields</span>
                    }
                  </div>
                </div>

                <div className="w-1/2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-900">
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      id="city"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                    />
                    {
                      error && !city && <span style={{ color: "red" }}> Please fill out all required fields</span>
                    }
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Email Address
                </label>
                <div className="mt-2">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                    required />
                  {
                    error && !email && <span style={{ color: "red" }}> Please fill out all required fields</span>
                  }
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-1/2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      name="password"
                      type="text"
                      autoComplete="new-password"
                      className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                    />
                    {
                      error && !password && <span style={{ color: "red" }}> Please fill out all required fields</span>
                    }
                  </div>
                </div>

                <div className="w-1/2">
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-900">
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      autoComplete="new-password"
                      className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                    />
                    {
                      error && !password && <span style={{ color: "red" }}> Please fill out all required fields</span>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={Submitform}
            className="w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-0"
          >
            Create Account
          </button>
        </div>
      </form>
    </>
  );
};

export default restaurantsSignin;
