"use client";

import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";

export default function Home() {
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTodo, setMainTodo] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Update existing task
      const updatedTasks = [...mainTodo];
      updatedTasks[editIndex] = { task, desc, completed: mainTodo[editIndex].completed };
      setMainTodo(updatedTasks);
      setEditIndex(null); // Reset edit mode
    } else {
      // Add new task
      setMainTodo([...mainTodo, { task, desc, completed: false }]);
    }
    setTask(""); // Clear input fields
    setDesc("");
  };

  const deleteHandler = (i) => {
    const copyTask = [...mainTodo];
    copyTask.splice(i, 1);
    setMainTodo(copyTask);
  };

  const editHandler = (i) => {
    setTask(mainTodo[i].task); // Populate task input with selected task
    setDesc(mainTodo[i].desc); // Populate description input
    setEditIndex(i); // Set the index for editing
  };

  const toggleCompleteHandler = (i) => {
    const updatedTasks = [...mainTodo];
    updatedTasks[i].completed = !updatedTasks[i].completed;
    setMainTodo(updatedTasks);
  };

  let renderTask = (
    <h2 className="text-xl font-semibold flex justify-center text-gray-500">
      No Task Available
    </h2>
  );

  if (mainTodo.length > 0) {
    renderTask = mainTodo.map((t, i) => {
      return (
        <li key={i}>
          <div className="flex justify-between items-center mb-2 p-3 bg-gray-100 rounded-lg">
            <div className="flex items-center gap-3">
              {/* Checkbox */}
              <div
                className={`w-6 h-6 flex justify-center items-center border-2 rounded-full cursor-pointer ${
                  t.completed ? "bg-green-500 border-green-600" : "bg-blue-200 border-blue-400"
                }`}
                onClick={() => toggleCompleteHandler(i)}
              >
                {t.completed && (
                  <span className="text-white font-bold text-lg">&#10003;</span>
                )}
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h5
                  className={`font-bold text-base sm:text-lg ${
                    t.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {t.task}
                </h5>
                <h6 className="text-sm text-gray-600">{t.desc}</h6>
              </div>
            </div>

            <div className="">
              <button
                onClick={() => editHandler(i)}
                className="bg-yellow-600 text-white rounded-lg px-2 py-2 mx-2 hover:bg-yellow-700"
              >
                <MdEditSquare />
              </button>

              <button
                onClick={() => deleteHandler(i)}
                className="bg-red-600 text-white rounded-lg px-2 py-2 mx-2 hover:bg-red-700"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        </li>
      );
    });
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-center p-4">
        <h1 className="px-4 py-2 bg-black text-white text-lg sm:text-2xl lg:text-3xl font-bold mt-4 rounded-xl">
          Hamza's Todo List
        </h1>
      </div>

      {/* Form Section */}
      <div className="w-[90vw] md:w-[70vw] lg:w-[40vw] bg-slate-900 mx-auto p-6 mt-5 rounded-2xl">
        <form onSubmit={submitHandler}>
          <input
            className="border bg-[#384152] text-gray-100 border-black w-full p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            required
            placeholder="Add a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <input
            className="border bg-[#384152] text-gray-100 border-black w-full p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Task Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <button className="w-full sm:w-auto bg-blue-500 text-white px-5 py-2 rounded-xl hover:bg-blue-600">
            {editIndex !== null ? "Update Task" : "Add Task"}
          </button>
        </form>
      </div>

      {/* Task List Section */}
      <div className="p-6 bg-gray-800 mb-8 w-[95vw] md:w-[80vw] lg:w-[60vw] mx-auto mt-6 rounded-3xl">
        <ul className="space-y-4">{renderTask}</ul>
      </div>
    </>
  );
}
