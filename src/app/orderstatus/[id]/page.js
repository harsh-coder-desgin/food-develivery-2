"use client"

import { use, useEffect, useState } from "react"; 

const Orderstatus = (props) => {
    const [status, setstatus] = useState('')
    const params = use(props.params);
    let name = params.id; 

    useEffect(() => {
        fetchdata();
    }, []);

    const fetchdata = async () => {
        let response = await fetch("/api/deliverypartners/status/" + name);
        let result = await response.json();
        if (response) {
            setstatus(result.result.status)
        }
    }

    const updatedata1 = async () => {
        const newStatus = "on the way"; 
        setstatus(newStatus); 

        let response = await fetch(`/api/deliverypartners/status/${name}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }), 
        });

        let result = await response.json();
    };

    const updatedata2 = async () => {
        const newStatus = "Failed";
        setstatus(newStatus);

        let response = await fetch(`/api/deliverypartners/status/${name}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
        });

        let result = await response.json();
    };

    const updatedata3 = async () => {
        const newStatus = "Delivered";
        setstatus(newStatus);

        let response = await fetch(`/api/deliverypartners/status/${name}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
        });

        let result = await response.json();
    };


    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
                <div className="flex items-center space-x-4">
                    <h1 className="text-3xl font-bold text-gray-800 p-6">Current Order Status:</h1>

                    <h1
                        className={`text-xl font-semibold text-white px-6 py-2 rounded-lg shadow-md 
            ${status === "on the way" ? "bg-blue-500" :
                                status === "Failed" ? "bg-red-500" :
                                    status === "Delivered" ? "bg-green-500" :
                                        "bg-gray-500"}`}
                    >
                        {status || "Loading..."}
                    </h1>
                </div>

                {/* Buttons for status updates */}
                <div className="flex space-x-4">
                    <button
                        onClick={updatedata1}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
                    >
                        On the way
                    </button>

                    <button
                        onClick={updatedata2}
                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
                    >
                        Failed
                    </button>

                    <button
                        onClick={updatedata3}
                        className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
                    >
                        Delivered
                    </button>
                </div>
            </div>
        </>
    )
}
export default Orderstatus;