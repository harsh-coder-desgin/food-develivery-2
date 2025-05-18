"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [locations, setLocations] = useState([]);
  const [selectLocation, setSelectLocation] = useState([]);
  const [show, setShow] = useState(false);
  const [displays, setDisplays] = useState([])

  useEffect(() => {
    fetchData();
    restaurantload();
  }, []);

  const fetchData = async () => {
    let response = await fetch("api/customer/locations");
    let result = await response.json();
    setLocations(result.result);
  }

  const restaurantload = async () => {
    let response = await fetch("api/customer");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let result = await response.json();
    setDisplays(result.result)
  }
  const handleListitem = async (item) => {
    setSelectLocation(item);
    let response = await fetch(`/api/customer?location=${item}`);
    let result = await response.json();
    setDisplays(result.result)
    setShow(false);
  }

  const handleInputChange = (event) => {
    setSelectLocation(event.target.value);
  };

  const handleFood = async () => {
    // let response = await fetch("http://localhost:3000/api/customer?restaurant=kfc");
    // let result = await response.json();
    // console.log(result);
    // setDisplays(result.result)
  }

  const handlewrite = async (e) => {
    let response = await fetch(`/api/customer?restaurant=${event.target.value}`);
    let result = await response.json();
    setDisplays(result.result)
  }

  
  return (
    <>
      <CustomerHeader />
      <div>
        {/* Banner Section */}
        <div
          className="w-full bg-cover bg-center h-96"
          style={{
            backgroundImage:
              "url('https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=scseGeDCjSghwD2RELSaaT2Pn2NQz0gflEQ4BuiTSjs=')",
          }}
        >
          <div className="flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <div className="text-center space-y-6">
              <h1 className="text-white text-4xl font-semibold mb-4">Welcome to My Restaurant</h1>

              {/* Form Container */}
              <div className="flex space-x-4">
                {/* Div for Place Input */}
                <div className="relative">
                  <input
                    type="text"
                    value={selectLocation}
                    onChange={handleInputChange}
                    onClick={() => setShow(true)}
                    className="px-4 py-2 rounded-lg text-black w-48"
                    placeholder="Select Place"
                  />
                  {show && (
                    <ul className="absolute mt-2 bg-gray-800 rounded-lg shadow-lg w-full">
                      {locations.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => handleListitem(item)}
                          className="text-white px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-200 rounded-md"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Div for Food or Restaurant Input */}
                <div>
                  <input
                    onChange={handlewrite}
                    onClick={handleFood}

                    type="text"
                    placeholder="Enter Food or Restaurant"
                    className="px-4 py-2 rounded-lg text-black w-96" // Larger width for "Enter Food or Restaurant"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Restaurant List</h1>

        {/* Grid layout for 2 items per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" >
          {/* Mapping over the restaurant array */}
          {displays.map((display, index) => (
            <div
              key={index}
              className="border rounded-lg p-6 bg-orange-500 text-white"
              onClick={() => router.push('explore/' + display.name + "?id=" + display._id)}
            >
              {/* First Line */}
              <div className="flex items-center mb-3">
                <div className="font-semibold text-white mr-4">{display.name}</div>
                <div className="text-sm text-white">{display.contact}</div>
              </div>

              {/* Second Line */}
              <div className="flex space-x-6 text-sm text-white">
                <div>{display.city}</div>
                <div>{display.address}</div>
                <div>{display.email}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
