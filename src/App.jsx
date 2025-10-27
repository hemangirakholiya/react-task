import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import ProductivityScore from './components/ProductivityScore';

function App() {
    const [tasks, setTasks] = useState([]);
    const [productivityScore, setProductivityScore] = useState(0);
    const [lastResetDate, setLastResetDate] = useState(() => {
        return localStorage.getItem('lastResetDate') || new Date().toISOString();
    });

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }

        const savedScore = localStorage.getItem('productivityScore');
        if (savedScore) {
            setProductivityScore(parseInt(savedScore));
        }
    }, []);

    useEffect(() => {
        const today = new Date();
        const resetDate = new Date(lastResetDate);
        const daysDiff = (today - resetDate) / (1000 * 60 * 60 * 24);

        if (daysDiff >= 7) {
            setProductivityScore(0);
            setLastResetDate(today.toISOString());
            localStorage.setItem('productivityScore', '0');
            localStorage.setItem('lastResetDate', today.toISOString());
        }
    }, [lastResetDate]);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = (newTask) => {
        const task = {
            id: Date.now(),
            title: newTask.title,
            description: newTask.description,
            status: 'Pending',
            createdAt: new Date().toISOString(),
        };
        setTasks([...tasks, task]);
    };

    const handleToggleTask = (taskId) => {
        setTasks(
            tasks.map((task) => {
                if (task.id === taskId) {
                    const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';

                    // Update productivity score based on status change
                    if (newStatus === 'Completed') {
                        // Increase score when marking as completed
                        const newScore = productivityScore + 1;
                        setProductivityScore(newScore);
                        localStorage.setItem('productivityScore', newScore.toString());
                    } else {
                        // Decrease score when marking back as pending (min 0)
                        const newScore = Math.max(0, productivityScore - 1);
                        setProductivityScore(newScore);
                        localStorage.setItem('productivityScore', newScore.toString());
                    }

                    return { ...task, status: newStatus };
                }
                return task;
            })
        );
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const handleReorderTasks = (reorderedTasks) => {
        setTasks(reorderedTasks);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="text-center text-white mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">
                        Task Management App
                    </h1>
                    <p className="text-lg md:text-xl opacity-90">Stay organized and productive</p>
                </header>

                {/* Productivity Score */}
                <ProductivityScore score={productivityScore} />

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    {/* Add Task Section */}
                    <div className="bg-white rounded-xl shadow-xl p-6">
                        <AddTask onAddTask={handleAddTask} />
                    </div>

                    {/* Task List Section */}
                    <div className="bg-white rounded-xl shadow-xl p-6 max-h-[600px] lg:max-h-[700px] overflow-y-auto">
                        <TaskList
                            tasks={tasks}
                            onToggleTask={handleToggleTask}
                            onDeleteTask={handleDeleteTask}
                            onReorderTasks={handleReorderTasks}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
