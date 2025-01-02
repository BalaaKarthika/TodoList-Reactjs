import React, { useState } from 'react';
const TodoManager = () => {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('low');
    const [estimatedTime, setEstimatedTime] = useState('');

    const addTask = () => {
        if (!taskName || !dueDate || !priority) {
            alert('Please fill in all fields!');
            return;
        }

        const newTask = {
            id: Date.now(),
            taskName,
            dueDate,
            priority,
            estimatedTime: priority === 'high' ? estimatedTime : '',
            status: 'Pending',
        };

        setTasks([...tasks, newTask]);
        setTaskName('');
        setDueDate('');
        setPriority('low');
        setEstimatedTime('');
    };

    const markComplete = (id) => {
        setTasks(tasks.map(task => (
            task.id === id ? { ...task, status: 'Completed' } : task
        )));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className="container">
            <h1>Todo Manager</h1>
            <div className="todo-form">
                <label htmlFor="task-name">Task Name: </label>
                <input
                    type="text"
                    id="task-name"
                    placeholder="Task name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />

                <label htmlFor="due-date">Due Date: </label>
                <input
                    type="date"
                    id="due-date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />

                <label htmlFor="priority">Priority: </label>
                <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                {priority === 'high' && (
                    <label htmlFor="estimated-time">Estimated Time (hrs): </label>
                )}

                {priority === 'high' && (
                    <input
                        type="number"
                        id="estimated-time"
                        placeholder="Estimated time (hrs)"
                        min="1"
                        value={estimatedTime}
                        onChange={(e) => setEstimatedTime(e.target.value)}
                    />
                )}

                <button onClick={addTask}>Add Task</button>
            </div>

            <table className="todo-list">
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th>Estimated Time (hrs)</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id} className={task.status === 'Completed' ? 'completed' : ''}>
                            <td>{task.taskName}</td>
                            <td>{task.dueDate}</td>
                            <td className={`${task.priority}-priority`}>
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </td>
                            <td>{task.estimatedTime}</td>
                            <td>{task.status}</td>
                            <td>
                                <button
                                    className="button-complete"
                                    onClick={() => markComplete(task.id)}
                                >
                                    Complete
                                </button>
                                <button
                                    className="button-delete"
                                    onClick={() => deleteTask(task.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TodoManager;
