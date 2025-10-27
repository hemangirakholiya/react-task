import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggleTask, onDeleteTask }) {
    const [draggedTask, setDraggedTask] = useState(null);
    const [taskOrder, setTaskOrder] = useState(() => {
        return tasks.map(task => task.id);
    });

    useEffect(() => {
        setTaskOrder(prevOrder => {
            const existingTaskIds = new Set(tasks.map(t => t.id));
            const validOrder = prevOrder.filter(id => existingTaskIds.has(id));
            const newTasks = tasks.filter(t => !prevOrder.includes(t.id));
            return [...validOrder, ...newTasks.map(t => t.id)];
        });
    }, [tasks.length]);

    const pendingTasks = tasks.filter((task) => task.status === 'Pending');
    const completedTasks = tasks.filter((task) => task.status === 'Completed');

    const handleDragStart = (e, taskId) => {
        setDraggedTask(taskId);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.currentTarget);
        e.currentTarget.style.opacity = '0.5';
    };

    const handleDragEnd = (e) => {
        e.currentTarget.style.opacity = '1';
        setDraggedTask(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, dropTaskId) => {
        e.preventDefault();
        e.currentTarget.style.borderColor = 'transparent';

        if (draggedTask && draggedTask !== dropTaskId) {
            const newOrder = [...taskOrder];
            const draggedIndex = newOrder.indexOf(draggedTask);
            const dropIndex = newOrder.indexOf(dropTaskId);

            newOrder.splice(draggedIndex, 1);
            newOrder.splice(dropIndex, 0, draggedTask);

            setTaskOrder(newOrder);
        }

        setDraggedTask(null);
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.currentTarget.style.borderColor = '#9f7aea';
    };

    const handleDragLeave = (e) => {
        e.currentTarget.style.borderColor = 'transparent';
    };

    const getOrderedTasks = (taskList) => {
        return taskList.sort((a, b) => {
            return taskOrder.indexOf(a.id) - taskOrder.indexOf(b.id);
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-6">Task List</h2>

            {tasks.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <p className="text-lg">No tasks yet. Add a new task to get started!</p>
                </div>
            ) : (
                <>
                    {pendingTasks.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-orange-600 mb-4 pb-2 border-b-2 border-orange-400">
                                Pending Tasks ({pendingTasks.length})
                            </h3>
                            <div className="space-y-3">
                                {getOrderedTasks([...pendingTasks]).map((task, index) => (
                                    <div
                                        key={task.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, task.id)}
                                        onDragEnd={handleDragEnd}
                                        onDragOver={handleDragOver}
                                        onDrop={(e) => handleDrop(e, task.id)}
                                        onDragEnter={handleDragEnter}
                                        onDragLeave={handleDragLeave}
                                        className="cursor-move"
                                        style={{ border: '2px dashed transparent', borderRadius: '8px', padding: '2px' }}
                                    >
                                        <TaskItem
                                            task={task}
                                            onToggleTask={onToggleTask}
                                            onDeleteTask={onDeleteTask}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {completedTasks.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-green-600 mb-4 pb-2 border-b-2 border-green-400">
                                Completed Tasks ({completedTasks.length})
                            </h3>
                            <div className="space-y-3">
                                {completedTasks.map((task) => (
                                    <TaskItem
                                        key={task.id}
                                        task={task}
                                        onToggleTask={onToggleTask}
                                        onDeleteTask={onDeleteTask}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default TaskList;
