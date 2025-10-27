function ProductivityScore({ score }) {
    const emojis = ['😴', '😊', '😎', '🚀', '💪', '🔥'];

    const getEmoji = () => {
        if (score === 0) return emojis[0];
        if (score < 5) return emojis[1];
        if (score < 10) return emojis[2];
        if (score < 15) return emojis[3];
        if (score < 20) return emojis[4];
        return emojis[5];
    };

    const getMessage = () => {
        if (score === 0) return 'Start completing tasks to build your productivity score!';
        if (score < 5) return 'Keep going! You are building momentum.';
        if (score < 10) return 'Excellent progress! Keep up the good work.';
        if (score < 15) return 'You are on fire! Keep the streak going.';
        if (score < 20) return 'Incredible! You are a productivity master!';
        return 'Legendary! You are unstoppable!';
    };

    return (
        <div className="bg-white rounded-xl shadow-xl p-6 text-center max-w-2xl mx-auto">
            <div className="flex justify-center items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-purple-600">Productivity Score</h3>
                <span className="text-2xl">{getEmoji()}</span>
            </div>
            <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                {score}
            </div>
            <p className="text-gray-600 mb-4">{getMessage()}</p>
            <div className="text-xs text-gray-500">
                Score increases when you complete tasks • Resets every 7 days
            </div>
        </div>
    );
}

export default ProductivityScore;
