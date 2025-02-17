import { useState ,useEffect} from 'react'
import './App.css'
import HomePage from './components/HomePage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Coin from './components/Coin'
import TitleBar from './components/TitleBar'
import Test from './components/test'

function App() {
  // In your main layout or App component
useEffect(() => {
  // Check if the user has a preference stored in localStorage
  const darkModePreference = localStorage.getItem('darkMode');
  
  // If no preference is stored, check the system preference
  if (darkModePreference === null) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  } else if (darkModePreference === 'true') {
    document.documentElement.classList.add('dark');
  }

  // Listen for changes in the system color scheme
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (e.matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });
}, []);

  const [currency, setCurrency] = useState("usd")
  const router = createBrowserRouter([
    {
      path: "/",
      element:<> <TitleBar currency={currency} setCurrency={setCurrency}/>  <HomePage currency={currency}/></>
    },
    {
      path: "/:coin",
      element: <> <TitleBar currency={currency} setCurrency={setCurrency}/> <Coin currency={currency}/></>
    }
  ])
  return (<>
  <RouterProvider router={router}/>
  {/* <Test/> */}
  </>)
}

export default App
