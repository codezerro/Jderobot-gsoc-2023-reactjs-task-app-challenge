import React, { useEffect, useRef, useState } from "react";
import {
    EditIconFillSvg,
    TaskCompleteSmallIconFillSvg,
    TaskPendingSmallIconFillSvg,
    CalenderIconFillSvg,
    SaveTaskIconFillSvg,
} from "./../../assets/icons";

const saveIconState = {
    0: "fill-green-400",
    1: "fill-green-400",
    2: "fill-black dark:fill-white",
};

const DetailView = ({
    setTitle,
    setDesc,
    //input erorr
    titleError,
    // state
    detailState,
    // func
    updateTask,
    editTask,
    addNewTask,
    //view  only
    selectTitle,
    selectDesc,
    selectDate,
    selectStatus,
}) => {
    const [tmpTitle, setTmpTitle] = useState(null);
    const [tmpDesc, setTmpDesc] = useState(null);
    const [tmpDisabled, setTmpDisabled] = useState(true);
    const titleRef = useRef(null);
    const descRef = useRef(null);

    useEffect(() => {
        if (detailState === 0) {
            setTmpTitle({ defaultValue: "" });
            setTmpDesc({ defaultValue: "" });
            setTmpDisabled(false);

            titleRef.current.value = "";
            descRef.current.value = "";
        } else if (detailState === 1) {
            setTmpTitle({ defaultValue: `${selectTitle}` });
            setTmpDesc({ defaultValue: `${selectDesc}` });
            setTmpDisabled(false);
        } else if (detailState === 2) {
            setTmpTitle({ defaultValue: `${selectTitle}` });
            setTmpDesc({ defaultValue: `${selectDesc}` });
            setTmpDisabled(true);
        }

        setTitle(selectTitle);
        setDesc(selectDesc);
    }, [selectTitle, selectDesc, detailState]);

    const setTitleFunc = (text) => {
        const tmpText = text.trim();

        setTmpTitle({ defaultValue: `${text}` });

        setTitle(tmpText);
    };
    const setDescFunc = (text) => {
        const tmpText = text.trim();

        setTmpDesc({ defaultValue: `${text}` });

        setDesc(tmpText);
    };
    return (
        <>
            <div className='w-full xbg-blue-700'>
                <div className='flex flex-col justify-center '>
                    {/* action */}
                    <div className='flex justify-between items-center border-b border-slate-400 dark:border-white '>
                        <h2 className='font-bold text-3xl pl-8 font-lg text-gray-800 dark:text-white'>
                            {detailState === 2
                                ? "Task Details"
                                : detailState === 1
                                ? "Update Task"
                                : "Add New Task"}
                        </h2>
                        <div className='flex justify-center items-center mt-4 pr-8  p-4 space-x-8 space-y-0'>
                            <div
                                className='flex justify-center items-center h-[35px] w-[35px] hover:bg-gray-600 rounded-full cursor-pointer'
                                title='edit'
                                onClick={(e) => editTask(e)}
                            >
                                <EditIconFillSvg className='fill-black dark:fill-white' />
                            </div>
                            <div
                                className={`flex justify-center items-center h-[35px] w-[35px] hover:bg-gray-600 rounded-full ${
                                    detailState === 2
                                        ? `cursor-not-allowed`
                                        : `cursor-pointer`
                                }`}
                                onClick={(e) =>
                                    detailState === 0
                                        ? addNewTask(e)
                                        : detailState === 1
                                        ? updateTask(e)
                                        : ""
                                }
                                title='save'
                            >
                                <SaveTaskIconFillSvg
                                    className={saveIconState[detailState]}
                                />
                            </div>
                        </div>
                    </div>
                    {/* details */}
                    <div className='w-full mt-4'>
                        <div className='flex flex-col justify-start items-start mx-6 space-x-0 space-y-8'>
                            {/* title */}
                            <div className='w-full mt-4 flex justify-start items-start'>
                                <div className='mr-2 mt-1'>
                                    {selectStatus === "complete" &&
                                    detailState ? (
                                        <TaskCompleteSmallIconFillSvg className='fill-green-500' />
                                    ) : (
                                        <TaskPendingSmallIconFillSvg className='fill-black dark:fill-white' />
                                    )}
                                </div>
                                <div className='flex justify-start flex-col w-full'>
                                    <div className=''>
                                        <input
                                            type='text'
                                            id='title'
                                            className={`w-full  border  text-gray-800 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ${
                                                !tmpDisabled
                                                    ? `bg-slate-300 dark:bg-slate-600 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500`
                                                    : "bg-slate-300 dark:bg-slate-700 border-gray-200 dark:border-gray-500 "
                                            } `}
                                            disabled={tmpDisabled}
                                            onChange={(e) =>
                                                setTitleFunc(e.target.value)
                                            }
                                            {...tmpTitle}
                                            ref={titleRef}
                                        />
                                        {titleError ? (
                                            <p className='mt-2 text-sm text-red-600 dark:text-red-500 duration-500'>
                                                <span className='font-medium'>
                                                    Task title
                                                </span>{" "}
                                                can't empty.
                                            </p>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <div>
                                        <div className='flex justify-start items-center mt-2'>
                                            <CalenderIconFillSvg className='fill-gray-500 dark:fill-gray-400' />
                                            <span className='text-gray-500 dark:text-gray-400 text-sm font-medium ml-2'>
                                                {detailState === 0
                                                    ? new Date().toLocaleString()
                                                    : selectDate}
                                            </span>
                                        </div>
                                        {/* due date */}
                                    </div>
                                </div>
                            </div>
                            {/* detail text */}
                            <div className='w-full ml-4'>
                                <label
                                    htmlFor='dsec'
                                    className='ml-4 block mb-2 text-sm font-medium text-gray-800 dark:text-white'
                                >
                                    Task description
                                </label>
                                <textarea
                                    id='dsec'
                                    rows='8'
                                    ref={descRef}
                                    className={`w-full  border  text-gray-800 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ${
                                        !tmpDisabled
                                            ? `bg-slate-300 dark:bg-slate-600 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500`
                                            : "bg-slate-300 dark:bg-slate-700 border-gray-200 dark:border-gray-500 "
                                    } `}
                                    placeholder='Write your task description here...'
                                    disabled={tmpDisabled ? true : ""}
                                    {...tmpDesc}
                                    onChange={(e) =>
                                        setDescFunc(e.target.value)
                                    }
                                ></textarea>
                                {/* // onChange={(e) => setDesc(e.target.value)} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailView;
