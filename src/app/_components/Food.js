
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Food = (props) => {

    const router = useRouter();

    const [names, setNames] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        let jsonString = localStorage.getItem("restaurantUser");

        let userData = JSON.parse(jsonString);
        let rest_id;

        if (jsonString) {
            rest_id = userData._id
        }
        let response = await fetch("/api/restaurant/food/" + rest_id);
        let result = await response.json();

        if (result.data) {
            setNames(result.data);
        } else {
            setNames([]);
        }
    };

    const Deletefood = async (_id) => {
        let response = await fetch("/api/restaurant/food/" + _id, {
            method: "delete",
        });
        response = await response.json();
        if (response) {
            fetchData();
        }
    }
    const handleEdit = (_id) => {
        router.push(`/restaurants/dashboard/${_id}`);
    };

    return (
        <div className="overflow-x-auto p-4">
            <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b text-left">Image</th>
                        <th className="py-2 px-4 border-b text-left">Food Name</th>
                        <th className="py-2 px-4 border-b text-left">Price</th>
                        <th className="py-2 px-4 border-b text-left">Description</th>
                        <th className="py-2 px-4 border-b text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {names.map(name => (
                        <tr key={name._id} className="border-b hover:bg-gray-100">
                            <td className="py-2 px-4">
                                <img src={name.image} alt={name.food} className="w-16 h-16 object-cover rounded" />
                            </td>
                            <td className="py-2 px-4">{name.food}</td>
                            <td className="py-2 px-4">{name.price}</td>
                            <td className="py-2 px-4">{name.description}</td>
                            <td className="py-2 px-4">
                                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleEdit(name._id)}>Edit</button>
                                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => { Deletefood(name._id) }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Food;



