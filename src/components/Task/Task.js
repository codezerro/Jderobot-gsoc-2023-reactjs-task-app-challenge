import React from "react";
import {
    TaskCompleteIconFillSvg,
    TaskPendingIconFillSvg,
    TaskDeleteIconFillSvg,
    TaskDateTimeIconFillSvg,
} from "./../../assets/icons";

const Task = ({
    task,
    selectTask,
    showDelConfirmFunc,
    updateTaskStatusFunc,
}) => {
    return (
        <div className='xh-[200px] w-ful px-4 select-none bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-700 border-b-2 border-slate-400 dark:border-slate-500 duration-700'>
            <div className='h-[100px] flex justify-between items-center py-2  xdark:border-slate-700 '>
                <div className='w-[10%] cursor-pointer'>
                    <div
                        className='flex justify-center items-center h-[40px] w-[40px] xhover:bg-green-500 rounded-full duration-500'
                        onClick={(e) => updateTaskStatusFunc(e, task.id)}
                    >
                        {task.status === "pending" ? (
                            <TaskPendingIconFillSvg className='fill-gray-800 dark:fill-white hover:fill-green-500' />
                        ) : (
                            <TaskCompleteIconFillSvg className='fill-green-500' />
                        )}
                    </div>
                </div>
                {/* body message */}
                <div
                    className='w-[80%] ml-6 text-gray-800 dark:text-white cursor-pointer '
                    onClick={(e) => selectTask(e, task.id)}
                >
                    <div
                        className={`text-xl capitalize  ${
                            task.status === "complete"
                                ? `line-through`
                                : `hover:underline`
                        }`}
                    >
                        {task.title}
                    </div>
                    <div className='flex items-center justify-start  mt-1'>
                        <TaskDateTimeIconFillSvg className='fill-gray-500 dark:fill-gray-400' />
                        <span className='text-gray-500 dark:text-gray-400 text-xs font-medium ml-2'>
                            {task.createAt}
                        </span>
                    </div>
                </div>
                <div className='h-[100px] w-[10%] justify-self-end flex justify-center items-center'>
                    <div
                        className='h-[50px] w-[50px] flex justify-center items-center rounded-full hover:bg-red-600 duration-500 cursor-pointer'
                        onClick={(e) => showDelConfirmFunc(e, task.id)}
                    >
                        <TaskDeleteIconFillSvg className='fill-gray-800 dark:fill-white ' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Task;
