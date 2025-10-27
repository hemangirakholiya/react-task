# Task Management App

A modern, feature-rich task management application built with React, Vite, and Tailwind CSS.

## 🎯 Features

### Core Features
- ✅ **Add Tasks** - Create tasks with title and description
- ✅ **Toggle Status** - Toggle tasks between Pending and Completed states with checkboxes (bidirectional)
- ✅ **Delete Tasks** - Remove tasks from the list
- ✅ **Visual Status** - Distinct styling for Pending vs Completed tasks
- ✅ **Local Persistence** - All data saved to localStorage
- ✅ **Productivity Score** - Unique feature that tracks completions and resets every 7 days
- ✅ **Drag & Drop** - Reorder pending tasks (HTML5 drag-and-drop API)
- ✅ **Responsive Design** - Works beautifully on mobile, tablet, and desktop
- ✅ **Tailwind CSS** - Modern, utility-first styling

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Running the App

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
react-task/
├── src/
│   ├── components/
│   │   ├── AddTask.jsx          # Form component for adding new tasks
│   │   ├── TaskList.jsx         # List display with drag-and-drop
│   │   ├── TaskItem.jsx         # Individual task card component
│   │   └── ProductivityScore.jsx # Productivity tracker widget
│   ├── App.jsx                   # Main app component with state management
│   ├── main.jsx                  # Application entry point
│   └── index.css                 # Tailwind CSS imports
├── index.html                    # HTML template
├── package.json                   # Project dependencies
├── tailwind.config.js            # Tailwind configuration
└── vite.config.js                # Vite configuration
```

## 🎨 Tech Stack

- **React 18** - UI library with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **localStorage** - Browser-based data persistence

## 💡 Approach & Architecture

### State Management
The app uses React hooks (`useState`, `useEffect`) for state management. All data is stored in the main `App` component and passed down as props to child components, following the React best practice of lifting state up. Data persistence is handled through localStorage API, saving state changes automatically.

### Component Structure
Following single responsibility principle, each component has a clear purpose:
- **App.jsx**: Manages global state, business logic, and localStorage sync
- **AddTask.jsx**: Handles form submission and validation
- **TaskList.jsx**: Displays tasks, manages drag-and-drop reordering
- **TaskItem.jsx**: Renders individual task with interactive elements
- **ProductivityScore.jsx**: Calculates and displays user's productivity metric

### Productivity Score Logic
This unique feature increments by 1 when a task is marked as completed. The score automatically resets every 7 days by tracking the last reset date in localStorage and comparing it with the current date using JavaScript Date API.

### Drag-and-Drop Implementation
Native HTML5 drag-and-drop API is used to reorder pending tasks. The implementation tracks task order in local state and updates the visual order without modifying the underlying data structure.

## 🎯 CRUD Operations

All CRUD operations are fully functional:
- **Create**: Add new tasks via the form
- **Read**: Display tasks in categorized lists
- **Update**: Toggle completion status
- **Delete**: Remove tasks permanently

## 📊 Task Status

Tasks are categorized by status:
- **Pending** (Orange badge) - Tasks awaiting completion
- **Completed** (Green badge) - Finished tasks with strikethrough styling

## 🌟 Bonus Features

### Drag-and-Drop Reordering
Pending tasks can be reordered by dragging and dropping. This allows users to prioritize their work according to their needs.

### Productivity Score with 7-Day Reset
The productivity score increases when you complete tasks and decreases when you mark tasks back as pending (minimum score: 0). It provides motivational feedback through emojis and messages. The score automatically resets every 7 days to encourage consistent productivity.

## 📱 Browser Support

Works in all modern browsers that support:
- ES6+ JavaScript features
- localStorage API
- HTML5 drag-and-drop API
- CSS Grid and Flexbox

## 🎨 UI/UX Features

- **Gradient Background** - Beautiful purple-to-blue gradient
- **Card-based Design** - Clean white cards with shadows
- **Hover Effects** - Interactive feedback on all clickable elements
- **Responsive Grid** - Adapts to different screen sizes
- **Color-coded Status** - Visual distinction between task states
- **Motivational Messages** - Dynamic feedback based on productivity score

## 📝 How to Use

1. **Add a Task**: Fill in the title and description fields, then click "Add Task"
2. **Toggle Task Status**: Check the checkbox to mark as completed, uncheck to mark as pending
3. **Delete a Task**: Click the trash icon (🗑️) on any task
4. **Reorder Tasks**: Click and drag pending tasks to reorder them
5. **Track Progress**: Watch your productivity score increase as you complete tasks and decrease when you revert tasks to pending!

## 🔧 Development Notes

- All components use functional components with hooks
- CSS modules and inline styles replaced with Tailwind utilities
- Data persists across browser sessions via localStorage
- No external state management library needed (useState sufficient for this scope)
- Clean, readable code with descriptive variable names

## ✨ Future Enhancements

Potential improvements for a production version:
- Backend API integration with React Query
- User authentication
- Task categories and tags
- Due dates and reminders
- Search and filter functionality
- Undo/redo functionality
- Export/import features
