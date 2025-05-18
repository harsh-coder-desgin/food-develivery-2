"use client"

import { useState } from "react"
import RestaurantsLogin from "../_components/restaurantsLogin"
import RestaurantsSignin from "../_components/restaurantsSignin"
import RestaurantHeader from "../_components/RestaurantsHeader"
import Footer from "../_components/Footer"

const restaurants = () => {
    const [login, setlogin] = useState(true);
    const [text, settext] = useState("Do not have account? create account");
    const account = () => {
        setlogin(login ? false : true)
        settext(text === "Do not have account? create account" ? "Already have account? Login" : "Do not have account? create account")
    }
    return (
        <>
            <RestaurantHeader />
            {
                login ? <RestaurantsLogin /> : <RestaurantsSignin />
            }
            <div className="flex justify-center">
                <button onClick={account} className="text-indigo-600 hover:text-indigo-800 font-semibold underline">
                    {text}
                </button>
            </div>
            <Footer />
        </>
    )
}

export default restaurants;