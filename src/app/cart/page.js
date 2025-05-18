"use client";

import { useState, useEffect } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { useRouter } from "next/navigation";

const Page = () => {

  const router = useRouter();

  const [fooditems, setFooditems] = useState([]);
  const [bills, setBills] = useState([]);
  const [demo, setDemo] = useState('');
  const [charge, setCharge] = useState('');

  useEffect(() => {
    const jsonString = localStorage.getItem("cart");
    const userData = JSON.parse(jsonString);
    setFooditems(userData);
    setBills(userData);
    if (!userData) {
      router.push('/')
    } else {

      let totalPrice = userData.reduce((acc, item) => acc + item.price, 0);

      if (totalPrice) {
        setDemo(totalPrice);
        const Tax = 0.05;
        const taxAmount = totalPrice * Tax;
        const final = totalPrice + taxAmount
        const delivery = 100
        const payment = final + delivery
        setCharge(payment);
      }
    }
  }, []); 

  const handlebill = (price) => {
    if (price) {
      setDemo(price[0])
    }
  }

  const handleorder = () => {
    if (JSON.parse(localStorage.getItem('user'))) {
      router.push('/order')
    } else {
      router.push('/user-auth?order=true')
    }
  }

  return (
    <>
      <CustomerHeader />
      <div>
        <div>
          {fooditems && fooditems.map((item) => (
            <div key={item._id} className="flex items-center space-x-4 mt-6 ml-9 border-b-2 border-orange-500 pb-4">
              <img className="w-32 h-32 object-cover" src={item.image} alt={item.food} />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{item.food}</h2>
                <p className="text-lg text-green-600 font-bold">₹{item.price}</p>
                <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
        
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-xs mx-auto mt-16 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        {bills && bills.map((bill, index) => (
          <div key={index} className="flex justify-between mb-4 text-sm">
            <span className="text-gray-600">{bill.food}</span>
            <span className="text-gray-800" onClick={() => handlebill(bill.price)}>
              {bill.price}
            </span>
          </div>
        ))}

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between mb-4 text-sm font-semibold">
            <span>Food Charge</span>
            <span>{demo}</span>
          </div>

          <div className="flex justify-between mb-4 text-sm font-semibold">
            <span>Tax</span>
            <span className="text-teal-600">5%</span>
          </div>
          <div className="flex justify-between mb-4 text-sm font-semibold">
            <span>Delivery charge</span>
            <span className="text-teal-600">100</span>
          </div>
        </div>
        <div className="flex justify-between mb-4 text-sm font-semibold">
          <span>Total Amount</span>
          <span className="text-teal-600">{charge}</span>
        </div>

        <div className="text-center text-xs text-gray-500 mt-6">
          Thank you for dining with us!
        </div>

        {/* Order Button */}
        <div className="mt-6 text-center">
          <button
            className="w-full py-2 px-4 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            onClick={handleorder}
          >
            Place Order
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;



