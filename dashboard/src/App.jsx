import { Route, Routes } from 'react-router-dom'
import Error404 from './components/errors/Error404'
import Home from './pages/home/Home'
import Main from './pages/Main'
import AddProduct from './pages/products/add/AddProduct'
import Products from './pages/products/Products'
import Categories from './pages/categories/Categories'
import AddCategory from './pages/categories/add/AddCategory'
import EditCategory from './pages/categories/edit/EditCategory'

function App() {


  return (
      <div className="flex flex-col min-h-screen">
        <Routes>

          <Route path="/*" element={<Error404 />} />

          <Route element={<Main />} >

            <Route path="/" element={<Home />}></Route>

            <Route path="/products" element={<Products />}></Route>
            {/* <Route path="/products/:id/edit" element={<EditProduct />}></Route> */}
            <Route path="/products/:id/edit" element={<AddProduct />}></Route>
            <Route path="/products/add" element={<AddProduct />}></Route>


            <Route path="/categories" element={<Categories />}></Route>
            <Route path="/categories/add" element={<AddCategory />}></Route>
            <Route path="/categories/:id/edit" element={<EditCategory />}></Route>

          </Route>

        </Routes>
      </div>
  )
}

export default App