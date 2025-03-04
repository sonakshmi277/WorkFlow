import React, { useState ,useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "./common.css";

export default function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const userName = location.state?.userName || "Guest";

    const [searchTask, setSearchTask] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [todoTasks, setTodoTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [draggedTask, setDraggedTask] = useState(null);
    const [sourceCategory, setSourceCategory] = useState(null);
    const [open, setOpen] = useState(false);

    const menus = ["My account", "Logout"];


    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:5000/task_show", {
                userName: userName,
                Todo: [...todoTasks],  
                In_Progress: [...inProgressTasks],
                Completed: [...completedTasks]
            });
    
            console.log("Tasks saved successfully!", { todoTasks, inProgressTasks, completedTasks });
            navigate("/");  
        } catch (error) {
            console.error("Error saving tasks before logout", error);
        }
    };
    
    
    
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.post("http://localhost:5000/get_tasks", { userName });
                
                if (response.data) {
                    setTodoTasks(response.data.Todo);
                    setInProgressTasks(response.data.In_Progress);
                    setCompletedTasks(response.data.Completed);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, [userName]);

    const handleAddTask = async (category) => {
        const newTask = prompt("Enter a new task:");
        if (newTask) {
            if (category === "todo") setTodoTasks([...todoTasks, newTask]);
            if (category === "inProgress") setInProgressTasks([...inProgressTasks, newTask]);
            if (category === "completed") setCompletedTasks([...completedTasks, newTask]);

        }
    };

    const handleDeleteTask = (category, index) => {
        if (category === "todo") setTodoTasks(todoTasks.filter((_, i) => i !== index));
        if (category === "inProgress") setInProgressTasks(inProgressTasks.filter((_, i) => i !== index));
        if (category === "completed") setCompletedTasks(completedTasks.filter((_, i) => i !== index));
    };

    const handleDragStart = (task, category) => {
        setDraggedTask(task);
        setSourceCategory(category);
    };

    const handleDrop = (categorySetter) => {
        if (draggedTask && sourceCategory) {
            if (sourceCategory === "todo") setTodoTasks(todoTasks.filter(task => task !== draggedTask));
            if (sourceCategory === "inProgress") setInProgressTasks(inProgressTasks.filter(task => task !== draggedTask));
            if (sourceCategory === "completed") setCompletedTasks(completedTasks.filter(task => task !== draggedTask));

            categorySetter(prevTasks => [...prevTasks, draggedTask]);

            setDraggedTask(null);
            setSourceCategory(null);
        }
    };

    const filterTasks = (tasks) => tasks.filter(task => task.toLowerCase().includes(searchTask.toLowerCase()));

    

    return (
        <div className="dashboard-container">
            <div className="nav">
                <h3 className="welcome">Hello, {userName}</h3>
                <div className="nav_main_contents">
                    <input 
                        type="search"
                        value={searchTask}
                        placeholder="Search your tasks"
                        onChange={(e) => setSearchTask(e.target.value)}
                    />
                    <div className="userf">
                        <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: '33px' }} onClick={() => setOpen(!open)} />
                    </div>
                </div>
            </div>

            <div className="dash">
                <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
                    <button className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
                        {isCollapsed ? "☰" : "✖"}
                    </button>
                    <div className="menu-items">
                        <h5 onClick={() => navigate('/dashboard')}>Home</h5>
                        <h5 onClick={() => navigate('/analytics')}>Analytics</h5>
                        <h5 onClick={() => navigate('/settings')}>Settings</h5>
                        <h5 onClick={handleLogout}>Logout</h5>
                    </div>
                </div>

                <div className="task-section">
                    {["todo", "inProgress", "completed"].map(category => (
                        <div className="task-category"
                            key={category}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => handleDrop(category === "todo" ? setTodoTasks :
                                                      category === "inProgress" ? setInProgressTasks :
                                                      setCompletedTasks)}
                        >
                            <div className="top">
                                <h1>{category === "todo" ? "To Do" : category === "inProgress" ? "In Progress" : "Completed"}</h1>
                                <div className="add_sym" onClick={() => handleAddTask(category)} style={{ cursor: "pointer" }}>
                                    <h2>➕</h2>
                                </div>
                            </div>
                            <div className="task-list">
                                {filterTasks(category === "todo" ? todoTasks :
                                            category === "inProgress" ? inProgressTasks :
                                            completedTasks).map((task, index) => (
                                    <div key={index} 
                                        className="task-item" 
                                        draggable="true"
                                        onDragStart={() => handleDragStart(task, category)}
                                    >
                                        <h2>{task}</h2>
                                        <span className="delete-btn" onClick={() => handleDeleteTask(category, index)}>❌</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {open && (
                <div className="absolute">
                    <ul>
                        {menus.map(menu => (
                            <li key={menu} onClick={() => setOpen(false)} className="cursor-pointer p-2 text-lg hover:bg-gray-200">
                                {menu}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
