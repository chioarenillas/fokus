import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Login from './pages/Login'

export default function App() {
  return (
    <Routes>
        <Route element={<Layout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='about' element={<About/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Route>
    </Routes>
  )
}
