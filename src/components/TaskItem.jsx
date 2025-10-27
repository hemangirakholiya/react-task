function TaskItem({ task, onToggleTask, onDeleteTask }) {
    const isCompleted = task.status === 'Completed';

    return (
        <div
            className={`flex items-start gap-4 p-4 border-2 rounded-lg transition-all hover:shadow-lg ${isCompleted
                ? 'bg-green-50 border-green-300 opacity-85'
                : 'bg-gray-50 border-gray-300'
                }`}
        >
            <div className="flex items-center mt-1">
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => onToggleTask(task.id)}
                    className="w-5 h-5 cursor-pointer accent-purple-600"
                />
            </div>

            <div className="flex-1 min-w-0">
                <h4
                    className={`font-semibold mb-1 ${isCompleted ? 'line-through text-gray-600' : 'text-gray-800'
                        }`}
                >
                    {task.title}
                </h4>
                <p className={`mb-2 ${isCompleted ? 'text-gray-500' : 'text-gray-600'}`}>
                    {task.description}
                </p>
                <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${isCompleted
                        ? 'bg-green-100 text-green-800'
                        : 'bg-orange-100 text-orange-800'
                        }`}
                >
                    {task.status}
                </span>
            </div>

            <button
                onClick={() => onDeleteTask(task.id)}
                className="flex-shrink-0 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-xl"
                title="Delete task"
            >
                🗑️
            </button>
        </div>
    );
}

export default TaskItem;
