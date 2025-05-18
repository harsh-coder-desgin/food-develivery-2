'use client'

import { useState, useEffect } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { useRouter } from "next/navigation";

const Page = () => {

  const router = useRouter();
  const [myorders, setMyOrders] = useState([]);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    const userstorage = JSON.parse(localStorage.getItem('user'))
    let result = await fetch("/api/order?id=" + userstorage._id);
    result = await result.json();

    if (result.success) {
      setMyOrders(result.result);
    }
  }

  return (
    <>
      <CustomerHeader />
      <div className="p-4 space-y-4 flex justify-center  min-h-screen">
        <div className="w-3/4 md:w-1/2">
          {myorders.map((item, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4 border border-gray-300">
              <div className="space-y-2">
                <h1 className="text-lg font-semibold text-gray-800">{item.data.name}</h1>
                <h1 className="text-md font-medium text-gray-700">Amount: <span className="text-green-600 font-bold">₹{item.amount}</span></h1>
                <h1 className="text-md text-gray-600">Address: {item.data.address}</h1>
                <h1 className={`text-md font-medium ${item.status === 'Delivered' ? 'text-green-600' : 'text-red-600'}`}>
                  {item.status}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Page;
