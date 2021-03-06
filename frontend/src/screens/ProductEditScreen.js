import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form,Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listProductDetails,updateProduct} from '../actions/productActions'
import FormContainer from '../components/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import axios from 'axios'

const ProductEditScreen = ({match,history}) => {
   
    const productId = match.params.id 

   const [name,setName] = useState('')
   const [price,setPrice] = useState(0)
   const [image,setImage] = useState('')
   const [category,setCategory] = useState('')
   const [countInStock,setCountInStock] = useState(0)
   const [description,setDescription] = useState('')
   const [uploading,setUploading] = useState(false)



   const dispatch= useDispatch()

   const productDetails = useSelector(state=>state.productDetails)
   const {loading,error,product} = productDetails

   const productUpdate = useSelector(state=>state.productUpdate)
   const {loading:loadingUpdate,error:errorUpdate,success} = productUpdate


  
   
   useEffect(()=>{
   
    if(success) {

        dispatch({type: PRODUCT_UPDATE_RESET})
        
    }
   
        if(!product.name || product._id!==productId)
        {
                dispatch(listProductDetails(productId))
        } else 
        {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)

    
        }
    
        
    
   },[dispatch,product,success])
   
   

const uploadFileHandler = async (e) =>
{
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
        const config = {
            headers: {
                'Content-Type' : 'multipart/form-data',
            },
        }
        const {data} = await axios.post('/api/upload',formData,config)
        setImage(data)
        setUploading(false)
    } catch(error) 
    {
        console.error(error)
        setUploading(false)
    }
}

   const submitHandler = (e) =>
   {
  
        dispatch(updateProduct({

            _id: productId,
            name,
            price,
            image,
            category,
            countInStock,
            description
        }))

        history.push('/admin/productlist')
 
        
   }


    return (

        <>
        <Link to='/admin/productlist' className='btn btn-light my-3'>

            Vrati se

        </Link>
        <FormContainer>
            <h1> Izmeni proizvod </h1> 
          
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
           {loading ? <Loader/> : error ? <Message variant='danger'> {error}
           </Message>:(
            <Form onSubmit={submitHandler}>

<Form.Group controlId='name'>
        <Form.Label>Ime</Form.Label>
        <Form.Control type='name' placeholder='Unesite ime' value={name}
        onChange={(e)=> setName(e.target.value)}></Form.Control>

    </Form.Group>


    <Form.Group controlId='price'>
        <Form.Label>Cena</Form.Label>
        <Form.Control type='number' placeholder='Unesite cenu proizvoda' value={price}
        onChange={(e)=> setPrice(e.target.value)}></Form.Control>

    </Form.Group>


    <Form.Group controlId='image'>
        <Form.Label>Slika</Form.Label>
        <Form.Control type='text' 
        placeholder='Unesite URL slike'
         value={image}
        onChange={(e)=> setImage(e.target.value)}></Form.Control>


<Form.File id="image-file" label="Izaberite sliku" onChange={uploadFileHandler}/> 
            {uploading && <Loader/>}
    </Form.Group>

    <Form.Group controlId='category'>
        <Form.Label>Kategorija</Form.Label>
        <Form.Control type='text' placeholder='Unesite kategoriju' value={category}
        onChange={(e)=> setCategory(e.target.value)}></Form.Control>

    </Form.Group>

    <Form.Group controlId='countInStock'>
        <Form.Label>Kolicina</Form.Label>
        <Form.Control type='number' placeholder='Unesite koliko je na raspolaganju proizvoda' value={countInStock}
        onChange={(e)=> setCountInStock(e.target.value)}></Form.Control>

    </Form.Group>

    <Form.Group controlId='description'>
        <Form.Label>Opis</Form.Label>
        <Form.Control type='text' placeholder='Unesite opis proizvoda' value={description}
        onChange={(e)=> setDescription(e.target.value)}></Form.Control>

    </Form.Group>



   


    <Button type='submit' variant='primary'> 
    
        Promeni
    </Button>

</Form>
           )}
            

           
        </FormContainer>
        </>
       
    )
}

export default ProductEditScreen
