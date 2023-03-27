import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "flowbite";
import uniqid from "uniqid";
import { useLocation } from "react-router-dom";

import {
    SideBar,
    TaskView,
    DetailView,
    AddTaskModal,
    DeleteConfirmModal,
    LoadingSpinning,
} from "./components";

const PathNavigation = ["/", "/task", "/complete"];

const App = () => {
    // Theme
    const element = document.documentElement;

    // useState
    const [isDark, setIsDark] = useState(true);
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
    );

    useEffect(() => {
        if (theme === "dark") {
            element.classList.add("dark");
            setIsDark(true);
            localStorage.setItem("theme", "dark");
        } else if (theme === "light") {
            element.classList.remove("dark");
            setIsDark(false);
            localStorage.setItem("theme", "light");
        }
    }, [theme, isDark]);

    // details view state
    const [detailState, setDetailState] = useState(2);

    // modal status
    //confirm delete modal status
    const [delModalStatus, setDelModalStatus] = useState(false);
    const [modalStatus, setModalStatus] = useState(false);
    const usrLoc = useLocation().pathname;
    const [sidebarNav, setSidebarNav] = useState(
        PathNavigation.findIndex((d) => d === usrLoc)
    );

    // add new task
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    // add new task error
    const [titleError, setTitleError] = useState(false);
    const [descError, setDescError] = useState(false);

    // view only select title & desc
    const [selectTitle, setSelectTitle] = useState("");
    const [selectDate, setSelectDate] = useState("");
    const [selectDesc, setSelectDesc] = useState("");
    const [selectStatus, setSelectStatus] = useState("");
    const [selectId, setSelectId] = useState(1);
    const [deleteId, setDeleteId] = useState("");

    // task
    const [allTaskData, setAllTaskData] = useState([]);
    const [allTask, setAllTask] = useState([]);
    const [pendingTask, setPendingTask] = useState([]);
    const [completeTask, setCompleteTask] = useState([]);
    const [loading, setLoading] = useState(true);
    const [allTaskLen, setAllTaskLen] = useState(0);
    const [taskLen, setTaskLen] = useState(0);
    const [completeTaskLen, setCompleteTaskLen] = useState(0);

    // sort by
    const [sortByName, setSortByName] = useState(false);

    useEffect(() => {
        const taskData = JSON.parse(localStorage.getItem("taskData"));
        if (taskData === null) return;

        setLoading(false);
        setAllTaskData(taskData);

        const taskData2 = taskData.filter((el) => el.status === "pending");
        const taskData3 = taskData.filter((el) => el.status === "complete");

        if (sidebarNav === -1) setSidebarNav(0);
        if (sidebarNav === 0) {
            setAllTask(taskData);

            if (!taskData.length) return;

            setSelectId(taskData[0].id);
            setSelectTitle(taskData[0].title);
            setSelectDesc(taskData[0].description);
            setSelectStatus(taskData[0].status);
            setSelectDate(taskData[0].createAt);
        } else if (sidebarNav === 1) {
            setAllTask(taskData2);

            if (!taskData2.length) return;

            setSelectId(taskData2[0].id);
            setSelectTitle(taskData2[0].title);
            setSelectDesc(taskData2[0].description);
            setSelectStatus(taskData2[0].status);
            setSelectDate(taskData2[0].createAt);
        } else if (sidebarNav === 2) {
            setAllTask(taskData3);

            if (!taskData3.length) return;

            setSelectId(taskData3[0].id);
            setSelectTitle(taskData3[0].title);
            setSelectDesc(taskData3[0].description);
            setSelectStatus(taskData3[0].status);
            setSelectDate(taskData3[0].createAt);
        }

        setAllTaskLen(taskData.length);
        setTaskLen(taskData2.length);
        setCompleteTaskLen(taskData3.length);
    }, [sidebarNav]);

    // save a task func
    const updateTask = (e) => {
        e.preventDefault();
        const tmpTitle = title.trim();

        if (tmpTitle.length === 0) {
            setTitleError(true);

            setTimeout(() => {
                setTitleError(false);
            }, 2500);
            return;
        }
        //copy all task
        const tmpTask = [...allTaskData];

        const indexId = allTaskData.findIndex((d, i) => {
            return d.id === selectId;
        });
        tmpTask[indexId].title = `${title}`;
        tmpTask[indexId].description = `${desc}`;

        setAllTaskData(tmpTask);

        //save on browser storage
        localStorage.setItem("taskData", JSON.stringify(tmpTask));

        // change details view state
        setDetailState(2);
    };

    // update task view only
    const selectTask = (e, id) => {
        allTaskData.forEach((data, i) => {
            if (data.id === id) {
                setSelectTitle(data.title);
                setSelectDesc(data.description);
                setSelectStatus(data.status);
                setSelectDate(data.createAt);
                setSelectId(data.id);
                return;
            }
        });
        setDetailState(2);
    };

    // edit task by id
    const editTask = (e) => {
        allTaskData.forEach((data, i) => {
            if (data.id === selectId) {
                setSelectTitle(data.title);
                setSelectDesc(data.description);
                setSelectStatus(data.status);
                setSelectDate(data.createAt);
                setSelectId(data.id);
                return;
            }
        });
        setDetailState(1);
    };
    // add new task
    const addNewTask = (e) => {
        e.preventDefault();

        const tmpTask = {};

        tmpTask["id"] = uniqid();
        tmpTask["title"] = `${title}`;
        tmpTask["description"] = `${desc}`;
        tmpTask["status"] = `pending`;
        tmpTask["createAt"] = new Date().toLocaleString();

        if (sidebarNav < 2) {
            const tmp = [...allTask];
            tmp.unshift(tmpTask);
            setAllTask(tmp);
        }

        const task = [...allTaskData];

        task.unshift(tmpTask);
        setAllTaskData(task);

        setAllTaskLen((prev) => prev + 1);
        setTaskLen((prev) => prev + 1);
        setDetailState(2);

        // reset
        setTitle("");
        setDesc("");

        setSelectTitle(allTask.length > 0 ? allTask[0].title : "");
        setSelectDesc(allTask.length > 0 ? allTask[0].description : "");
        setSelectStatus(allTask.length > 0 ? allTask[0].status : "");
        setSelectDate(allTask.length > 0 ? allTask[0].createAt : "");
        setSelectId(allTask.length > 0 ? allTask[0].id : "");

        localStorage.setItem("taskData", JSON.stringify(task));
    };

    // update task status
    const updateTaskStatusFunc = (e, id) => {
        const indexId = allTaskData.findIndex((d, i) => {
            return d.id === id;
        });
        const tmpTask = [...allTaskData];

        if (tmpTask[indexId].status === "pending") {
            tmpTask[indexId].status = "complete";
            setSelectStatus("complete");
            setTaskLen((prev) => prev - 1);
            setCompleteTaskLen((prev) => prev + 1);

            if (sidebarNav) {
                // const tmp = [...allTask];
                const task = allTask.filter((el) => el.id != id);
                setAllTask(task);
            }
        } else {
            setSelectStatus("pending");
            tmpTask[indexId].status = "pending";
            setTaskLen((prev) => prev + 1);
            setCompleteTaskLen((prev) => prev - 1);

            if (sidebarNav) {
                // const tmp = [...allTask];
                const task = allTask.filter((el) => el.id != id);
                setAllTask(task);
            }
        }

        setAllTaskData(tmpTask);

        localStorage.setItem("taskData", JSON.stringify(tmpTask));
    };

    // show modal
    const showDelConfirmFunc = (e, id) => {
        setDelModalStatus(true);
        setDeleteId(id);
    };

    // confirm delete func
    const deleteConfirmFunc = (e) => {
        const tmpTask = [...allTaskData];
        const stateTask = [...allTask];

        const tmpTask2 = tmpTask.filter((el) => el.id != deleteId);

        setAllTaskData(tmpTask2);
        setAllTask(stateTask.filter((el) => el.id != deleteId));

        if (sidebarNav < 2) setTaskLen((prev) => prev - 1);
        else if (sidebarNav === 2) setCompleteTaskLen((prev) => prev - 1);
        setAllTaskLen((prev) => prev - 1);

        localStorage.setItem("taskData", JSON.stringify(tmpTask2));
        // reset state
        setDeleteId("");
        setDelModalStatus(false);
    };

    // search task func
    const [search, setSearch] = useState("");

    const taskSearchFunc = (text) => {
        if (text.length < 2) {
            if (sidebarNav === 0) {
                setAllTask(allTaskData);
            } else if (sidebarNav === 1) {
                setAllTask(allTaskData.filter((el) => el.status === "pending"));
            } else if (sidebarNav === 2) {
                setAllTask(
                    allTaskData.filter((el) => el.status === "complete")
                );
            }
            setSearch(text);

            return;
        }

        if (sidebarNav === 0) {
            const task = allTaskData.filter((el) => {
                if (el.title.search(text) != -1) return el;
            });
            setAllTask(task);
        } else if (sidebarNav === 1) {
            setAllTask(
                allTaskData.filter((el) => {
                    if (
                        el.title.search(text) != -1 &&
                        el.status === "pending"
                    ) {
                        return el;
                    }
                })
            );
        } else if (sidebarNav === 2) {
            setAllTask(
                allTaskData.filter((el) => {
                    if (
                        el.title.search(text) != -1 &&
                        el.status === "complete"
                    ) {
                        return el;
                    }
                })
            );
        }

        setSearch(text);
    };

    const sortByNameFunc = (e) => {
        e.preventDefault();

        if (sortByName) {
            setSortByName(false);

            if (sidebarNav === 0) {
                setAllTask(allTaskData);
            } else if (sidebarNav === 1) {
                setAllTask(allTaskData.filter((el) => el.status === "pending"));
            } else {
                setAllTask(
                    allTaskData.filter((el) => el.status === "complete")
                );
            }
            return;
        }

        const tmp = [...allTask];
        const task = tmp.sort((a, b) => {
            const first = a.title.toLowerCase(),
                second = b.title.toLowerCase();

            if (first > second) return 1;
            else if (first < second) return -1;

            return 0;
        });

        setAllTask(task);
        setSortByName(true);
    };
    return (
        <>
            <div className='w-full xh-screen xbg-red-900 xoverflow-hidden'>
                {/* sidebar */}
                <SideBar
                    setTheme={setTheme}
                    theme={theme}
                    setDetailState={setDetailState}
                    allTaskLen={allTaskLen}
                    taskLen={taskLen}
                    completeTaskLen={completeTaskLen}
                    sidebarNav={sidebarNav}
                    setSidebarNav={setSidebarNav}
                    sortByNameFunc={sortByNameFunc}
                />
                <div className='w-screen sm:w-[calc(100vw-256px)] h-[100vh] grid grid-rows-2 sm:grid-cols-2 sm:ml-64 overflow-hidden'>
                    <div className='h-screen bg-gray-300 dark:bg-slate-600 '>
                        <Routes>
                            <Route
                                path='/'
                                element={
                                    <TaskView
                                        allTask={allTask}
                                        selectTask={selectTask}
                                        updateTaskStatusFunc={
                                            updateTaskStatusFunc
                                        }
                                        showDelConfirmFunc={showDelConfirmFunc}
                                        search={search}
                                        taskSearchFunc={taskSearchFunc}
                                    />
                                }
                            />
                            <Route
                                path='/task'
                                element={
                                    <TaskView
                                        allTask={allTask}
                                        selectTask={selectTask}
                                        updateTaskStatusFunc={
                                            updateTaskStatusFunc
                                        }
                                        showDelConfirmFunc={showDelConfirmFunc}
                                        search={search}
                                        taskSearchFunc={taskSearchFunc}
                                    />
                                }
                            />
                            <Route
                                path='/complete'
                                element={
                                    <TaskView
                                        allTask={allTask}
                                        selectTask={selectTask}
                                        updateTaskStatusFunc={
                                            updateTaskStatusFunc
                                        }
                                        showDelConfirmFunc={showDelConfirmFunc}
                                        search={search}
                                        taskSearchFunc={taskSearchFunc}
                                    />
                                }
                            />
                            <Route path='*' element={<Navigate to='/' />} />
                        </Routes>
                    </div>
                    <div className='xhidden z-50 sm:flex bg-slate-200 dark:bg-slate-700 h-[100vh] sm:h-[100vh]'>
                        <DetailView
                            setTitle={setTitle}
                            setDesc={setDesc}
                            // input error
                            titleError={titleError}
                            // state status
                            detailState={detailState}
                            // task fun
                            updateTask={updateTask}
                            editTask={editTask}
                            addNewTask={addNewTask}
                            // detail view
                            selectTitle={selectTitle}
                            selectDesc={selectDesc}
                            selectStatus={selectStatus}
                            selectDate={selectDate}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
