"use client"

import React, { useState } from 'react'

const Addfooditem = (props) => {
  
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

      let jsonString = localStorage.getItem("restaurantUser");
      let userData = JSON.parse(jsonString);
      let rest_id;

      if (jsonString) {
        rest_id = userData._id

      }
      let response = await fetch("/api/restaurant/food", {
        method: "POST",
        body: JSON.stringify({ food, price, image, description, rest_id })
      })
      response = await response.json()

      if (response.success) {
        props.addasboard(true)
      } else {
        alert("some Erorr")
      }

    }
  }
  return (
    <>
      <form className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 mt-5">
        <h2 className="text-2xl font-bold text-center">Add Food Item</h2>

        {/* Food Name */}
        <div>
          <label className="block text-gray-700 font-medium">Food Name</label>
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
          <label className="block text-gray-700 font-medium">Food Price</label>
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
          <label className="block text-gray-700 font-medium">Image Path</label>
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
          <label className="block text-gray-700 font-medium">Description</label>
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
          Add Food
        </button>
      </form>
    </>
  )
}



export default Addfooditem;
