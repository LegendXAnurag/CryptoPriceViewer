import { useState ,useEffect, createContext} from 'react'
import './App.css'
import HomePage from './components/HomePage'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Coin from './components/Coin'
import TitleBar from './components/TitleBar'

export const CurrencyContext = createContext();
function App() {
useEffect(() => {
  const darkModePreference = localStorage.getItem('darkMode');
  
  if (darkModePreference === null) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  } else if (darkModePreference === 'true') {
    document.documentElement.classList.add('dark');
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (e.matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });
}, []);

  const [currency, setCurrency] = useState("usd")
  const router = createHashRouter([
    {
      path: "/",
      element:<> <HomePage/></>
    },
    {
      path: "/:coin",
      element: <> <Coin/></>
    }
  ])
  return (<>
  <CurrencyContext.Provider value={{currency,setCurrency}}>
  <RouterProvider router={router}/>
  </CurrencyContext.Provider>
  </>)
}

export default App
