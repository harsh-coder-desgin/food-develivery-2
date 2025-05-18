"use client"

import { useEffect, useState } from "react";
import CustomerHeader from "@/app/_components/CustomerHeader";
import { use } from "react";

const Page = (props) => {

  const params = use(props.params);
  const searchParams = use(props.searchParams);
  let name = params.name;
  let mainid = searchParams.id;

  const [details, setDetails] = useState("");
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState();
  const [cartStorage, setCartStorage] = useState(() => {
    return JSON.parse(localStorage.getItem('cart')) || [];
  });

  const [cartIds, setCartIds] = useState(() => cartStorage ? cartStorage.map(item => item._id) : []);
  const [removecart, setremoveCart] = useState()

  useEffect(() => {
    loadDetails();
  }, []);


  const loadDetails = async () => {
    let response = await fetch("/api/customer/" + mainid);
    let result = await response.json(); 
    setDetails(result.detail);
    setFoods(result.fooditems);
  };

  const handlecart = (item) => {
    setCart(item);
    let localCartIds = cartIds;
    localCartIds.push(item._id);
    setCartIds(localCartIds);
    setremoveCart();
  };

  const removeFromcart = (id) => {
    setremoveCart(id);
    var localIds = cartIds.filter(item => item != id);
    setCart();
    setCartIds(localIds)
  }
  
  return (
    <>
      <CustomerHeader cart={cart} removecart={removecart} />
      <div
        className="relative w-full bg-cover bg-center h-96"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=scseGeDCjSghwD2RELSaaT2Pn2NQz0gflEQ4BuiTSjs=')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Centered Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold">{decodeURI(name)}</h1>
        </div>
      </div>
      <div className="flex bg-orange-500 text-white p-4 justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Contact:</span>
          <span>{details.contact}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">City:</span>
          <span>{details.city}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Address:</span>
          <span>{details.address}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Email:</span>
          <span>{details.email}</span>
        </div>
      </div>
      <div>
        {foods.length > 0 ? foods.map((item) => (
          <div key={item._id} className="flex items-center space-x-4 mt-6 ml-9 border-b-2 border-orange-500 pb-4">
            <img className="w-32 h-32 object-cover" src={item.image} alt={item.food} />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{item.food}</h2>
              <p className="text-lg text-green-600 font-bold">₹{item.price}</p>
              <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
              {
                cartIds.includes(item._id) ?
                  <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded" onClick={() => removeFromcart(item._id)}>Remove Cart</button>
                  : <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded" onClick={() => handlecart(item)}>Order Now</button>
              }
            </div>
          </div>
        ))
          : <h1>No Food Add</h1>
        }
      </div>
    </>
  );
};

export default Page;
