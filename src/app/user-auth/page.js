"use client"


import { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import UserLogin from "../_components/UserLogin";
import UserSignup from "../_components/UserSignup";
import { use } from "react"; 

const UserAuth = (props) => {

  const searchParams = use(props.searchParams);

  const [login, setLogin] = useState(true);
  const [text, settext] = useState("Do not have account? create account");
  const account = () => {
    setLogin(login ? false : true)
    settext(text === "Do not have account? create account" ? "Already have account? Login" : "Do not have account? create account")
  }
  
  return (
    <>
      <CustomerHeader />
      {
        login == true ? <UserLogin redirect={searchParams} /> : <UserSignup redirect={searchParams} />
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
export default UserAuth;