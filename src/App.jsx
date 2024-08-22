import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import './App.css'
import RoutesAll from './routes/RoutesAll'

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    RoutesAll
  ))

  return (

    <div className='h-screen'>
      <>
        <RouterProvider router={router} />
      </>
    </div>
  )
}

export default App
