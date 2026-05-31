# React Photo Gallery App 📸

A high-performance, responsive photo gallery web application built with React and Vite. This project demonstrates modern React practices, advanced state management, and component optimization.

## 🚀 Live Demo
[https://hiimanshu028.github.io/Photo-Gallery-Web-App/]

## ✨ Features
* **Dynamic Data Fetching:** Automatically fetches and displays a grid of photos from the Picsum API on initial load.
* **Real-time Search:** Instantly filter photos by author name using a highly optimized search input.
* **Favorites System:** Users can click a heart icon on any photo to add or remove it from their favorites list. A dedicated toggle switch allows viewing only the favorited images.
* **Responsive UI:** Fully responsive grid layout designed with Tailwind CSS, adapting smoothly from mobile screens to large desktop monitors.
* **Loading & Error States:** Includes an animated loading spinner and error handling UI for a better user experience during API calls.
* **Performance Optimized:** Search filtering and handlers are memoized to prevent unnecessary recalculations and re-renders.

## 🛠️ Tech Stack
* **Frontend Framework:** React (with Vite for fast build tooling)
* **Styling:** Tailwind CSS
* **Data Fetching:** Custom React Hook (`useFetchPhotos`)
* **State Management:** `useReducer` (for favorites logic), `useState`
* **Performance Hooks:** `useMemo` (for filtering logic), `useCallback` (for input handling)
* **Deployment:** GitHub Pages via GitHub Actions

## 💻 Local Setup & Installation

To run this project locally on your machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
