import React from "react";
import { Task } from "./../index";
import { SearchTaskIcon } from "./../../assets/icons";

const TaskView = ({
    allTask,
    selectTask,
    showDelConfirmFunc,
    updateTaskStatusFunc,
    taskSearchFunc,
    search,
}) => {
    return (
        <>
            <div className='flex flex-col justify-center bg-slate-300 dark:bg-slate-600 xp-4 xsm:ml-64 h-screen mt-4'>
                {/* Search area */}
                <div className='flex flex-col justify-center items-center h-[60px] border-b-2 border-slate-400 dark:border-slate-700 pb-4 shadow-lg'>
                    <div className='flex items-center w-[80%]'>
                        <div
                            style={{ padding: "11px 11px 15px 15px" }}
                            className='h-[46px] bg-gray-50 border border-gray-300 text-gray-900 rounded-l-full p-3 dark:bg-gray-700 dark:border-gray-600 '
                        >
                            <SearchTaskIcon className='fill-slate-700 dark:fill-slate-500' />
                        </div>
                        <input
                            type='text'
                            id='search-text'
                            className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-full  w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white '
                            placeholder='Search your task'
                            onChange={(e) => taskSearchFunc(e.target.value)}
                            value={search}
                        />
                    </div>
                </div>

                {/* task mapping */}
                <div className='w-full xadj-h h-[calc(100vh-60px)] flex flex-col xjustify-center align-center overflow-auto pb-5'>
                    {allTask.length === 0 ? (
                        <h2 className='text-center mt-8 text-black dark:text-white'>
                            No Task available
                        </h2>
                    ) : (
                        allTask.map((task) => (
                            <Task
                                key={task.id}
                                task={task}
                                selectTask={selectTask}
                                updateTaskStatusFunc={updateTaskStatusFunc}
                                showDelConfirmFunc={showDelConfirmFunc}
                            />
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default TaskView;
