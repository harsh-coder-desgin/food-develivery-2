"use client";

import { useState, useEffect } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { useRouter } from "next/navigation";

const Page = () => {

  const router = useRouter();

  const [bills, setBills] = useState([]);
  const [demo, setDemo] = useState('');
  const [charge, setCharge] = useState('');
  const [user, setUser] = useState('');
  const [removecartdata, setremoveCartData] = useState(false)

  useEffect(() => {
    const jsonString = localStorage.getItem("cart");
    const userData = JSON.parse(jsonString);
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

  useEffect(() => {
    const jsonString = localStorage.getItem("user");
    const userDetail = JSON.parse(jsonString);
    setUser(userDetail)
  }, []);

  const handlebill = (price) => {
    if (price) {
      setDemo(price[0])
    }
  }

  const handleplace = async () => {
    let user_Id = JSON.parse(localStorage.getItem('user'))._id;
    let city = JSON.parse(localStorage.getItem('user')).city;
    let cart = JSON.parse(localStorage.getItem('cart'));
    let foodItemIds = cart.map((item) => item._id).toString();
    let deliveryboyResponse = await fetch("/api/deliverypartners/" + city);
    deliveryboyResponse = await deliveryboyResponse.json();
    let deliveryBoysIds = deliveryboyResponse.result.map((item) => item._id);
    let deliveryboy_id = deliveryBoysIds[Math.floor(Math.random() * deliveryBoysIds.length)]
    if (!deliveryboy_id) {
      alert("Delivery Partner Not available")
      return false;
    }
    let rest_id = cart[0].rest_id;
    let collection = {
      user_Id,
      foodItemIds,
      rest_id,
      deliveryboy_id,
      status: 'pending',
      amount: charge,
    }
    let response = await fetch("api/order", {
      method: "POST",
      body: JSON.stringify(collection)
    });
    response = await response.json();
    if (response.success) {
      setremoveCartData(true);
      alert("ORDER DONE");
      router.push('/myprofile')
    } else {
      alert("FAILED");
    }
  }

  return (
    <>
      <CustomerHeader removecartdata={removecartdata} />

      <div className="max-w-xs mx-auto mt-16 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        {/* User Details */}
        <div className="mb-6 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">User Details</h2>
          <p className="text-sm text-gray-600">Name: {user.name}</p>
          <p className="text-sm text-gray-600">Phone: {user.moblie}</p>
          <p className="text-sm text-gray-600">Address: {user.address}</p>
        </div>

        {/* Bill Items */}
        {bills && bills.map((bill, index) => (
          <div key={index} className="flex justify-between mb-4 text-sm">
            <span className="text-gray-600">{bill.food}</span>
            <span className="text-gray-800" onClick={() => handlebill(bill.price)}>
              {bill.price}
            </span>
          </div>
        ))}

        {/* Bill Summary */}
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
            <span>Delivery Charge</span>
            <span className="text-teal-600">100</span>
          </div>
        </div>

        {/* Total Amount */}
        <div className="flex justify-between mb-4 text-sm font-semibold">
          <span>Total Amount</span>
          <span className="text-teal-600">{charge}</span>
        </div>

        {/* Payment Method */}
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-md font-semibold text-gray-800 mb-2">Payment Method</h2>
          <p className="text-sm text-gray-600">
            <span className="px-3 py-1 bg-teal-100 text-teal-700 font-medium rounded-lg">
              Cash on Delivery
            </span>
          </p>
        </div>

        {/* Thank You Message */}
        <div className="text-center text-xs text-gray-500 mt-6">
          Thank you for dining with us!
        </div>

        {/* Order Button */}
        <div className="mt-6 text-center">
          <button
            className="w-full py-2 px-4 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            onClick={handleplace}
          >
            Place Your Order Now
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;



