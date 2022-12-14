import React, { }  from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from '../components/Navbar';
import { } from 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemListContainers from '../containers/ItemListContainer';
import ItemDetailContainer from '../containers/ItemDetailContainer';
import NotFound from '../components/NotFound/';
import Cart  from '../containers/cartContainer';
import ShopProvider from '../context/ShopProvider';
import Footer from '../components/Footer/Footer';
import Formulario from '../containers/formularioContainer/Formulario';


export const  Routing = () => {

  return (
    <ShopProvider>
      <BrowserRouter>
        <Navbar/>        
        <Routes>
            <Route path='/' element={<ItemListContainers/>}/>
            <Route path='/category/:categoryId' element={<ItemListContainers/>}/>
            <Route path='/detail/:productId' element={<ItemDetailContainer/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/Formulario' element = {<Formulario/>}/> 
            <Route path='*' element={<NotFound/>}/>
        </Routes>
        <Footer/>

      </BrowserRouter>
    </ShopProvider>
    
  );
};
  

