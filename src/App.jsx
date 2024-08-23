import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './pages/Navbar'
import RoutesAll from './routes/RoutesAll'

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    RoutesAll
  ))

  return (

    <div className='min-h-screen dark:bg-slate-700'>
      <>
        <RouterProvider router={router} />
      </>
    </div>
  )
}

export default App
