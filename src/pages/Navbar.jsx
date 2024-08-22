import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <nav className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-lg font-semibold">MyApp</div>
                    <div className="space-x-4">
                        <NavLink
                            to="/form-validations"
                            className={({ isActive }) =>
                                `text-white px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-gray-900' : 'hover:bg-gray-700'}`
                            }
                        >
                            Form Validations
                        </NavLink>
                        <NavLink
                            to="/styling-configs"
                            className={({ isActive }) =>
                                `text-white px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-gray-900' : 'hover:bg-gray-700'}`
                            }
                        >
                            Styling Configs
                        </NavLink>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
};

export default Navbar;
