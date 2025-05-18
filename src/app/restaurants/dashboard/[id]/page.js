"use client"
import React, { use, useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

const Updatefooditem = (props) => {

  const params = use(props.params);
  const router = useRouter();
  const [food, setFood] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const handleclick = async (e) => {
    e.preventDefault(); 
    if (!food || !price || !image || !description) {
      setError(true)
    } else {
      setError(false)
      let result = await fetch("/api/restaurant/food/edit/" + params.id, {
        method: "PUT",
        body: JSON.stringify({ food, price, image, description })
      });
      result = await result.json();
      if (result) {
        router.push("/restaurants/dashboard");

      }
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let response = await fetch("/api/restaurant/food/edit/" + params.id)
    response = await response.json()
    setFood(response.data.food)
    setPrice(response.data.price)
    setImage(response.data.image)
    setDescription(response.data.description)
  }

  const handleclick2 = () => {
    router.push("/restaurants/dashboard");
  }

  return (
    <>
      <form className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 mt-5">
        <h2 className="text-2xl font-bold text-center">Update Food Item</h2>
        {/* Food Name */}
        <div>
          <label className="block text-gray-700 font-medium">Update Food Name</label>
          <input
            value={food}
            onChange={(e) => setFood(e.target.value)}
            type="text"
            placeholder="Enter food name"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {
            error && !food && <span style={{ color: "red" }}> Please fill out all required fields</span>
          }
        </div>
        {/* Food Price */}
        <div>
          <label className="block text-gray-700 font-medium">Update Food Price</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Enter price"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {
            error && !price && <span style={{ color: "red" }}> Please fill out all required fields</span>
          }
        </div>
        {/* Image Path */}
        <div>
          <label className="block text-gray-700 font-medium">Update Image Path</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="text"
            placeholder="Enter image URL"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {
            error && !image && <span style={{ color: "red" }}> Please fill out all required fields</span>
          }
        </div>
        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium"> Update Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          {
            error && !description && <span style={{ color: "red" }}> Please fill out all required fields</span>
          }
        </div>
        {/* Submit Button */}
        <button
          onClick={handleclick}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Update Food
        </button>
        <button
          onClick={handleclick2}
          type="button"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Back to Fooditem List
        </button>
      </form>
    </>
  )
}



export default Updatefooditem;
