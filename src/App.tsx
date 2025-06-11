import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import Home from './page/home/component/Home'
import ProductDetail from './page/products/component/ProductDetail'
import Login from './components/User/Login'
import Profile from './components/User/Profile'
import ProtectedRouter from './router/ProtectedRouter'
import { useEffect } from 'react'
import { loadUserFromStorage } from './redux/actions/userAction'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './redux/store'

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
      dispatch(loadUserFromStorage())
  }, [dispatch])
  

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRouter />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
