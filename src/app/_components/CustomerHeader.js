"use client"

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const CustomerHeader = (props) => {

    const [login, setLogin] = useState('login');
    const [username, setuserName] = useState('')
    const [cartNumber, setCartNumber] = useState(0);
    const [cartItem, setCartItem] = useState([]);

    useEffect(() => {
        const jsonString = localStorage.getItem("cart");
        const userData = JSON.parse(jsonString);

        const cartStorage = userData || [];
        setCartNumber(cartStorage.length);
        setCartItem(cartStorage);

        if (props.cart) {

            if (cartStorage.length > 0) {
                if (cartStorage[0].rest_id !== props.cart.rest_id) {
                    localStorage.removeItem('cart');
                    setCartNumber(1);
                    setCartItem([props.cart]);
                    localStorage.setItem('cart', JSON.stringify([props.cart]));
                } else {
                    const localCartItem = [...cartStorage, JSON.parse(JSON.stringify(props.cart))];
                    setCartItem(localCartItem);
                    setCartNumber(localCartItem.length);
                    localStorage.setItem('cart', JSON.stringify(localCartItem));
                }
            } else {
                setCartNumber(1);
                setCartItem([props.cart]);
                localStorage.setItem('cart', JSON.stringify([props.cart]));
            }
        }

    }, [props.cart]);
    useEffect(() => {
        if (props.removecart) {
            let localCartItem = cartItem.filter((item) => {
                return item._id != props.removecart
            });
            setCartItem(localCartItem);
            setCartNumber(cartNumber - 1);
            localStorage.setItem('cart', JSON.stringify(localCartItem))
            if (localCartItem.length == 0) {
                localStorage.removeItem("cart")
            }
        }
    }, [props.removecart])

    useEffect(() => {
        let data = localStorage.getItem("user");
        const userData = JSON.parse(data);
        if (userData) {
            setuserName(userData.name)
        }

        if (data) {
            setLogin("Logout")
        }

    }, []);

    useEffect(() => {
        if (props.removecartdata) {
            setCartItem({})
            setCartNumber(0);
            localStorage.removeItem('cart');
        }

    }, [props.removecartdata])
    const handleLogout = () => {
        if (login === "login") {
        } else {
            localStorage.removeItem("user");
        }
    }

    const navigation = [
        { name: 'Home', href: '/', current: false },
        // { name: login , href: '#', current: false},
        // { name: username, href: '/', current: false },
        { name: 'Cart', href: '/cart', current: false, count: cartNumber }, // Cart count is updated based on value
        { name: 'ADD Restaurants', href: '/restaurants', current: false },
        { name: 'Delivery Partner', href: '/deliverypartner', current: false },

    ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }


    return (
        <>
            <Disclosure as="nav" className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button */}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                            </DisclosureButton>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center">
                                <img
                                    alt="Your Company"
                                    src="https://thumbs.dreamstime.com/b/food-delivery-bike-icon-isolated-black-background-food-delivery-bike-icon-isolated-black-background-simple-vector-logo-163522315.jpg"
                                    className="h-8 w-auto"
                                />
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            aria-current={item.current ? 'page' : undefined}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'rounded-md px-3 py-2 text-sm font-medium',
                                            )}
                                        >
                                            {item.name}
                                            {item.name === 'Cart' && item.count !== undefined && ` (${item.count})`}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <Link href="/user-auth" className="mr-2 bg-indigo-600 text-white font-semibold py-1.5 px-3 rounded hover:bg-indigo-500" onClick={handleLogout}>{login}</Link>
                            {username && (<Link href="/myprofile" className=" mr-2 bg-indigo-600 text-white font-semibold py-1.5 px-3 rounded hover:bg-indigo-500" >{username}</Link>)}
                        </div>
                    </div>
                </div>
                <DisclosurePanel className="sm:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        {navigation.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                aria-current={item.current ? 'page' : undefined}
                                className={classNames(
                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium',
                                )}
                            >
                                {item.name}
                                {item.name === 'Cart' && item.count !== undefined && ` (${item.count})`}
                            </DisclosureButton>
                        ))}
                    </div>
                </DisclosurePanel>
            </Disclosure>
        </>
    );
};

export default CustomerHeader;
