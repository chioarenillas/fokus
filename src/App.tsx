import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Tasks from './pages/Tasks'

export default function App() {
  return (
    <Routes>
        <Route element={<Layout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/' element={<Tasks/>}/>
            <Route path='/' element={<About/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Route>
    </Routes>
  )
}
