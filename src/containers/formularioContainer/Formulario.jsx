import { useContext, useState } from 'react';
import './Formulario.css';
import {Shop} from '../../context/ShopProvider'
import generarOrden from '../../services/generarOrden';
import { db } from '../../firebase/config';
import { collection, addDoc, getDoc ,doc, updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';


const Formulario = () => {
   const {cart,totalPrice,clearCart} = useContext(Shop);
   const precioFinal = totalPrice();
   const navigate = useNavigate()
   
   const [datos, setDatos] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    items: cart,
    total:precioFinal
   })   

   const capturarDatos = (e) => {
    setDatos({...datos ,[e.target.name] : e.target.value})
   }  

   const guardarDatos =  async (e) => {
    e.preventDefault()
    const orden = generarOrden(datos.name, datos.email,datos.address,datos.phone,datos.items,datos.total)

    const docRef = await addDoc(collection(db, "orders"), orden)
    alert(`La compra se realizo con exito, el número de compra es: ${docRef.id}`) 

    cart.forEach( async (productoOrden) => {
        const productoRef = doc(db, "products" , productoOrden.id)
        const docSnap = await getDoc(productoRef)

        await updateDoc(productoRef, {
            stock: docSnap.data().stock - productoOrden.quantity
        })
        
    });
    setDatos({})
    clearCart()
    swal('Le enviaremos los datos de la compra a su casilla de correo')
    navigate('/')
   }   

   //BUSCAR UN FORMtO DE FORMULARIO MAS CHETO!

   return(
    <>
        <form onSubmit={guardarDatos}>
            <input type="text" placeholder='Nombre' name='name' onChange={capturarDatos} />
            <input type="email" placeholder='Direccion E-mail' name='email' onChange={capturarDatos}/>
            <input type="text" placeholder='Direccion de entrega' name='address' onChange={capturarDatos}/>
            <input type="number" placeholder='Telefono' name='phone' onChange={capturarDatos}/>
            <button className='btn-danger'>Finalizar compra</button>
        </form>
    </>
   )
}

export default Formulario;