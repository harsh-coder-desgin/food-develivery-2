"use client"

import { useEffect, useState } from "react";
import DeliveryHeader from "../DeliveryHeader";
import { useRouter } from "next/navigation";

const Deliverydashboard = () => {
  const router = useRouter();

  const [myorders, setMyOrders] = useState([]);
  const [status, setstatus] = useState('');


  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    const deliverydata = JSON.parse(localStorage.getItem('delivery'))

    if (deliverydata) {
      let result = await fetch("/api/deliverypartners/orders/" + deliverydata._id);
      result = await result.json();

      if (result.success) {
        setMyOrders(result.result);
      }
    }
  }

  useEffect(() => {
    const delivery = JSON.parse(localStorage.getItem('delivery'))
    if (!delivery) {
      router.push('/deliverypartner')
    }
  })

  return (
    <>
      <DeliveryHeader />

      <h1 className="text-3xl font-bold text-center text-gray-800  p-4 ">
        Order List Dashboard
      </h1>

      <div className="p-4 space-y-4 flex justify-center  min-h-screen">
        <div className="w-3/4 md:w-1/2">
          {myorders.map((item, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4 border border-gray-300"
              onClick={() => router.push('/orderstatus/' + item.id)}>
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
    </>
  )
}
export default Deliverydashboard;