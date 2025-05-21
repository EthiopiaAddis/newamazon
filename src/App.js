import React from 'react'
import Header from "./components/Header/Header.jsx"
import Carousel from "./components/Carousel/Carousel.jsx"
import Catagory from './components/Catagory/Catagory.js'
import Product from './components/Product/Product.jsx'


const App = () => {
  return (
    <div>
      <Header />
      <Carousel />
      <Catagory />
      <Product />
    </div>
  );
}

export default App