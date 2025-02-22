import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./common.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
    const navigate = useNavigate();
    const [searchTask, setSearchTask] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [todoTasks, setTodoTasks] = useState(["Task 1", "Task 2", "Task 3", "Task 4"]);
    const [inProgressTasks, setInProgressTasks] = useState(["Task 1", "Task 2", "Task 3", "Task 4"]);
    const [completedTasks, setCompletedTasks] = useState(["Task 1", "Task 2", "Task 3", "Task 4"]);
    const [draggedTask, setDraggedTask] = useState(null);
    const [sourceCategory, setSourceCategory] = useState(null);

    const handleAddTask = (category) => {
        const newTask = prompt("Enter a new task:");
        if (newTask) {
            if (category === "todo") setTodoTasks([...todoTasks, newTask]);
            if (category === "inProgress") setInProgressTasks([...inProgressTasks, newTask]);
            if (category === "completed") setCompletedTasks([...completedTasks, newTask]);
        }
    };

    const handleDeleteTask = (category, index) => {
        if (category === "todo") setTodoTasks(todoTasks.filter((_, i) => i !== index));
        else if (category === "inProgress") setInProgressTasks(inProgressTasks.filter((_, i) => i !== index));
        else if (category === "completed") setCompletedTasks(completedTasks.filter((_, i) => i !== index));
    };

    const handleDragStart = (task, category) => {
        setDraggedTask(task);
        setSourceCategory(category);
    };

    const handleDrop = (categorySetter, category) => {
        if (draggedTask && sourceCategory) {
            if (sourceCategory === todoTasks) setTodoTasks(todoTasks.filter(task => task !== draggedTask));
            if (sourceCategory === inProgressTasks) setInProgressTasks(inProgressTasks.filter(task => task !== draggedTask));
            if (sourceCategory === completedTasks) setCompletedTasks(completedTasks.filter(task => task !== draggedTask));

            categorySetter([...category, draggedTask]);

            setDraggedTask(null);
            setSourceCategory(null);
        }
    };

    const filterTasks = (tasks) => tasks.filter(task => task.toLowerCase().includes(searchTask.toLowerCase()));
    
 
    return (
        <div className="dashboard-container">
            <div className="nav">
            <h3 className="welcome">TO Do</h3>
                <div className="nav_main_contents">
                    <input 
                        type="search"
                        id="search"
                        value={searchTask}
                        placeholder="Search your tasks"
                        onChange={(e) => setSearchTask(e.target.value)}
                    />
                    <div className="userf">
                        <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: '33px' }}  onClick={()=>navigate('/')} />
                        
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
                        <h5 onClick={() => navigate('/projects')}>Projects</h5>
                        <h5 onClick={() => navigate('/analytics')}>Analytics</h5>
                        <h5 onClick={() => navigate('/settings')}>Settings</h5>
                    </div>
                </div>

                <div className="task-section">
                    <div className="task-category"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(setTodoTasks, todoTasks)}
                    >
                        <div className="top">
                            <h1>To Do</h1>
                            <div className="add_sym" onClick={() => handleAddTask("todo")} style={{ cursor: "pointer" }}>
                                <h2>➕</h2>
                            </div>
                        </div>
                        <div className="task-list">
                            {filterTasks(todoTasks).map((task, index) => (
                                <div key={index} 
                                    className="task-item" 
                                    draggable="true"
                                    onDragStart={() => handleDragStart(task, todoTasks)}
                                >
                                    <h2>{task}</h2>
                                    <span className="delete-btn" onClick={() => handleDeleteTask("todo", index)}>❌</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="task-category"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(setInProgressTasks, inProgressTasks)}
                    >
                        <div className="top">
                            <h1>In Progress</h1>
                            <div className="add_sym" onClick={() => handleAddTask("inProgress")} style={{ cursor: "pointer" }}>
                                <h2>➕</h2>
                            </div>
                        </div>
                        <div className="task-list">
                            {filterTasks(inProgressTasks).map((task, index) => (
                                <div key={index} 
                                    className="task-item" 
                                    draggable="true"
                                    onDragStart={() => handleDragStart(task, inProgressTasks)}
                                >
                                    <h2>{task}</h2>
                                    <span className="delete-btn" onClick={() => handleDeleteTask("inProgress", index)}>❌</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="task-category"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(setCompletedTasks, completedTasks)}
                    >
                        <div className="top">
                            <h1>Completed</h1>
                            <div className="add_sym" onClick={() => handleAddTask("completed")} style={{ cursor: "pointer" }}>
                                <h2>➕</h2>
                            </div>
                        </div>
                        <div className="task-list">
                            {filterTasks(completedTasks).map((task, index) => (
                                <div key={index} 
                                    className="task-item" 
                                    draggable="true"
                                    onDragStart={() => handleDragStart(task, completedTasks)}
                                >
                                    <h2>{task}</h2>
                                    <span className="delete-btn" onClick={() => handleDeleteTask("completed", index)}>❌</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
