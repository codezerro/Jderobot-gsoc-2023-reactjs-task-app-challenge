import React from "react";
import { Link, NavLink } from "react-router-dom";
import "flowbite";
import { MdTaskAlt } from "react-icons/md";
import {
    AppLogoFillSvg,
    DarkModeIconFillSvg,
    LightModeIconFillSvg,
    AddTaskIconFillSvg,
    TaskIconFillSvg,
    AllTaskIconFillSvg,
    FilterIconFillSvg,
} from "./../../assets/icons";

const SideBar = ({
    setTheme,
    theme,
    setDetailState,
    allTaskLen,
    sidebarNav,
    setSidebarNav,
    taskLen,
    completeTaskLen,
    sortByNameFunc,
}) => {
    return (
        <>
            <button
                data-drawer-target='default-sidebar'
                data-drawer-toggle='default-sidebar'
                aria-controls='default-sidebar'
                type='button'
                className='inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            >
                <span className='sr-only'>Open sidebar</span>
                <svg
                    className='w-6 h-6'
                    aria-hidden='true'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        clipRule='evenodd'
                        fillRule='evenodd'
                        d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
                    ></path>
                </svg>
            </button>

            <aside
                id='default-sidebar'
                className='fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0'
                aria-label='Sidebar'
            >
                <div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
                    <div className='flex flex-col justify-between h-full'>
                        <ul className='space-y-2'>
                            <li
                                className='mb-8'
                                onClick={() => setSidebarNav(0)}
                            >
                                <Link
                                    to='/'
                                    className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                >
                                    <AppLogoFillSvg className='fill-slate-800 dark:fill-slate-200' />
                                    <span
                                        className='text-3xl ml-3 underline'
                                        style={{
                                            fontFamily: "Lobster",
                                        }}
                                    >
                                        Task App
                                    </span>
                                </Link>
                            </li>
                            <li onClick={() => setSidebarNav(0)}>
                                <NavLink
                                    to='/'
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center p-2 text-base font-norma text-gray-900 rounded-lg dark:text-white  bg-slate-300 dark:bg-slate-600 xhover:bg-gray-300 xdark:hover:text-gray-600 xdark:hover:bg-gray-700"
                                            : "flex items-center p-2 text-base font-norma text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:text-gray-200 dark:hover:bg-gray-700"
                                    }
                                    end
                                >
                                    <AllTaskIconFillSvg className='fill-black dark:fill-white' />
                                    <span className='flex-1 ml-3 whitespace-nowrap'>
                                        All Tasks
                                    </span>
                                    <span className='inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300'>
                                        {allTaskLen}
                                    </span>
                                </NavLink>
                            </li>
                            <li onClick={() => setSidebarNav(1)}>
                                <NavLink
                                    to='/task'
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center p-2 text-base font-norma text-gray-900 rounded-lg dark:text-white  bg-slate-300 dark:bg-slate-600 xhover:bg-gray-300 xdark:hover:text-gray-600 xdark:hover:bg-gray-700"
                                            : "flex items-center p-2 text-base font-norma text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:text-gray-200 dark:hover:bg-gray-700"
                                    }
                                    end
                                >
                                    <TaskIconFillSvg className='fill-black dark:fill-white' />
                                    <span className='flex-1 ml-2 whitespace-nowrap'>
                                        Tasks
                                    </span>
                                    <span className='inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300'>
                                        {taskLen}
                                    </span>
                                </NavLink>
                            </li>
                            <li onClick={() => setSidebarNav(2)}>
                                <NavLink
                                    to='/complete'
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center p-2 text-base font-norma text-gray-900 rounded-lg dark:text-white  bg-slate-300 dark:bg-slate-600 xhover:bg-gray-300 xdark:hover:text-gray-600 xdark:hover:bg-gray-700"
                                            : "flex items-center p-2 text-base font-norma text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:text-gray-200 dark:hover:bg-gray-700"
                                    }
                                    end
                                >
                                    <MdTaskAlt />
                                    <span className='flex-1 ml-3 whitespace-nowrap'>
                                        Complete
                                    </span>
                                    <span className='inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300'>
                                        {completeTaskLen}
                                    </span>
                                </NavLink>
                            </li>
                        </ul>
                        <div className='flex justify-center mb-4 mx-12 py-2 px-2 bg-slate-200 dark:bg-slate-700 rounded-full select-none'>
                            {/* add new task */}
                            <div
                                className='pr-3 ml-2 border-r-2 border-r-gray-500 cursor-pointer'
                                onClick={() => setDetailState(0)}
                                title='add new task'
                            >
                                <AddTaskIconFillSvg className=' fill-slate-700 dark:fill-slate-300' />
                            </div>
                            {/* filter */}
                            <div
                                className='px-2 mr-2 border-r-2 border-r-gray-500 cursor-pointer'
                                onClick={(e) => sortByNameFunc(e)}
                                title='filter by name'
                            >
                                <FilterIconFillSvg className=' fill-slate-700 dark:fill-slate-300' />
                            </div>
                            {/* theme */}
                            <div
                                className='mx-3 cursor-pointer'
                                onClick={() => {
                                    setTheme(
                                        theme === "light" ? "dark" : "light"
                                    );
                                }}
                                title='theme'
                            >
                                {theme === "light" ? (
                                    <LightModeIconFillSvg className=' fill-slate-700 dark:fill-slate-300' />
                                ) : (
                                    <DarkModeIconFillSvg className=' fill-slate-700 dark:fill-slate-300' />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default SideBar;
