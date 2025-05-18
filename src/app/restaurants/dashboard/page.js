"use client"

import Addfooditem from "@/app/_components/Addfooditem";
import Food from "@/app/_components/Food";
import RestaurantHeader from "@/app/_components/RestaurantsHeader";
import { useState } from "react";

const Dashboard = () => {
  const [run, setRun] = useState(false);

  const addasboard = () => {
    setRun(false)
  }

  const addfood = () => {
    setRun(true)
  }

  return (
    <>
      <RestaurantHeader />
      <div className="flex justify-center items-center space-x-4 mt-4">
        <button onClick={addfood} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
          ADD FOOD
        </button>
        <button onClick={addasboard} className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition">
          Dashboard
        </button>
      </div>
      {
        run ? (<Addfooditem addasboard={addasboard} />) : <h1><Food addfood={addfood} /></h1>
      }
    </>
  )
}
export default Dashboard;