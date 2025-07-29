import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import Home from './page/home/component/Home'
import ProductDetail from './page/products/component/ProductDetail'
import Login from './components/User/Login'
import ProtectedRouter from './router/ProtectedRouter'
import ProfilePage from './page/user/ProfilePage'
import Carts from './page/carts/Carts'
import Dashboard from './components/Admin/Dashboard'
import ProductAdmin from './components/Admin/ProductAdmin'
import OrderAdmin from './components/Admin/OrderAdmin'
import UserAdmin from './components/Admin/UserAdmin'
import NewProductAdmin from './components/Admin/NewProductAdmin'
import NotFoundPage from './page/NotFoundPage'
import Register from './components/User/Register'
import Payment from './components/Order/Payment'

function App() {
  // const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   dispatch(loadUserFromStorage())
  // }, [dispatch])


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route element={<ProtectedRouter />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route element={<ProtectedRouter />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<ProtectedRouter />}>
            <Route path="/admin/products" element={<ProductAdmin />} />
          </Route>
          <Route element={<ProtectedRouter />}>
            <Route path="/admin/orders" element={<OrderAdmin />} />
          </Route>
          <Route element={<ProtectedRouter />}>
            <Route path="/admin/users" element={<UserAdmin />} />
          </Route>
          <Route element={<ProtectedRouter />}>
            <Route path="/admin/product" element={<NewProductAdmin />} />
          </Route>
          <Route path="/cart" element={<Carts/>} />
          <Route path="/cart/payment" element={<Payment/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
