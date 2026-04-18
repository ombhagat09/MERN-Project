import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(Array.isArray(res.data) ? res.data : res.data.tasks || []);
    } catch (error) {
      console.log(error);
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async () => {
    if (!title.trim()) return;

    try {
      if (editId) {
        await API.put(`/tasks/${editId}`, { title });
        setEditId(null);
      } else {
        await API.post("/tasks/createtask", { title });
      }

      setTitle("");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setEditId(task._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100">
      <Navbar />

      <div className="flex justify-center px-3 py-4 sm:px-4 sm:py-6">
        <div className="w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8">
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-5 sm:mb-8 text-blue-600">
            Task Dashboard
          </h2>

          {/* Input */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8">
            <input
              type="text"
              placeholder="Enter your task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={handleAdd}
              className="w-full sm:w-auto min-w-[140px] bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-md"
            >
              {editId ? "Update" : "Add Task"}
            </button>
          </div>

          {/* Task List */}
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500 text-sm sm:text-lg">
              No tasks yet. Add your first task 🚀
            </p>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {tasks.map((task, index) => (
                <div
                  key={task._id}
                  className="bg-white border border-gray-200 rounded-2xl p-3 sm:px-5 sm:py-4 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center shadow-md hover:shadow-xl transition duration-300"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>

                    <span className="font-semibold text-gray-800 text-sm sm:text-lg break-words">
                      {task.title}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 w-full sm:w-auto sm:flex">
                    <button
                      onClick={() => handleEdit(task)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-xl text-sm shadow"
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl text-sm shadow"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;