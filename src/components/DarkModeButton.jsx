// import useDarkMode from "../hooks/useDarkMode";

// export default function DarkModeButton(){
//   const {theme,toggleTheme} = useDarkMode();
//   return(<>
//   <button
//           onClick={toggleTheme}
//           className="mt-6 px-6 py-2 bg-gray-800 text-white dark:bg-gray-200 dark:text-black rounded-md"
//           >
//           Toggle Dark Mode
//   </button>
//   </>)

// }
import useDarkMode from "../hooks/useDarkMode";

export default function DarkModeButton() {
  const { theme, toggleTheme } = useDarkMode();
  
  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {theme === 'dark' ? (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}
