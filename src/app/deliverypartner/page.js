"use client"

import { useEffect, useState } from "react";
import DeliveryHeader from "../DeliveryHeader";
import { useRouter } from "next/navigation";


const Page = () => {

  const router = useRouter();

  const [loginmoblie, setloginmoblie] = useState('');
  const [loginpassword, setloginpassword] = useState('');
  const [name, setname] = useState('');
  const [address, setaddress] = useState('');
  const [city, setcity] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [moblie, setmobile] = useState('')

  useEffect(() => {
    const delivery = JSON.parse(localStorage.getItem('delivery'))
    if (delivery) {
      router.push('/deliverydashboard')
    }
  })

  const handlesignup = async (e) => {
    e.preventDefault();

    let response = await fetch("api/deliverypartners/signup", {
      method: "post",
      body: JSON.stringify({ name, password, city, address, moblie })
    });

    response = await response.json();

    if (response) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("delivery", JSON.stringify(result));
      router.push('/deliverydashboard')
    }
  }

  const handlelogin = async (e) => {
    e.preventDefault();

    let response = await fetch("api/deliverypartners/login", {
      method: "post",
      body: JSON.stringify({ moblie: loginmoblie, password: loginpassword })
    })

    response = await response.json();

    if (response.success) {
      const { result } = response
      delete result.password;
      localStorage.setItem("delivery", JSON.stringify(result));
      router.push('/deliverydashboard')
    } else {
      alert(response.message)
    }
  }

  return (
    <>
      <DeliveryHeader />
      <h1 className="text-3xl font-bold text-center mt-4">Delivery Partner</h1>
      <div className="flex items-center justify-center min-h-screen  p-4 space-x-10">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>

          <form className="space-y-4" onSubmit={handlelogin}>
            <div>
              <label className="block text-gray-700">Mobile</label>
              <input type="tel" placeholder="Enter your mobile number" value={loginmoblie} onChange={(e) => setloginmoblie(e.target.value)} className="w-full p-2 border rounded" />
            </div>

            <div>
              <label className="block text-gray-700">Password</label>
              <input type="password" placeholder="Enter your password" value={loginpassword} onChange={(e) => setloginpassword(e.target.value)}
                className="w-full p-2 border rounded" />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Login
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-semibold text-center mb-4">Sign Up</h1>

          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setname(e.target.value)}
                className="w-full p-2 border rounded" />
            </div>

            <div>
              <label className="block text-gray-700">Mobile</label>
              <input type="tel" placeholder="Enter your mobile number" value={moblie} onChange={(e) => setmobile(e.target.value)}
                className="w-full p-2 border rounded" />
            </div>

            <div>
              <label className="block text-gray-700">Address</label>
              <input type="text" placeholder="Enter your address" value={address} onChange={(e) => setaddress(e.target.value)}
                className="w-full p-2 border rounded" />
            </div>

            <div>
              <label className="block text-gray-700">City</label>
              <input type="text" placeholder="Enter your city" value={city} onChange={(e) => setcity(e.target.value)}
                className="w-full p-2 border rounded" />
            </div>

            <div>
              <label className="block text-gray-700">Password</label>
              <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setpassword(e.target.value)}
                className="w-full p-2 border rounded" />
            </div>

            <div>
              <label className="block text-gray-700">Confirm Password</label>
              <input type="password" placeholder="Confirm your password" value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)}
                className="w-full p-2 border rounded" />
            </div>

            <button onClick={handlesignup} type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>

  );
};

export default Page;
