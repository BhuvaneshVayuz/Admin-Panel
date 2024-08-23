import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useTitleUpdater from '../hooks/titleUpdate';

const Navbar = () => {
    useTitleUpdater()

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const storedPreference = localStorage.getItem('theme');
        if (storedPreference === 'dark') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => {
            const newMode = !prevMode;
            if (newMode) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            return newMode;
        });
    };

    return (
        <>
            <nav className="bg-gray-800 dark:bg-black text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-lg font-semibold">
                        <NavLink to={'/'}>
                            MyApp
                        </NavLink>
                    </div>
                    <div className="space-x-4">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded"
                        >
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
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
