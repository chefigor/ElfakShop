import {Card}  from 'react-bootstrap'
import React from 'react'
import {Link} from 'react-router-dom'

const Product = ({product}) => {
    return (
        
        <Card className='my-3 p-3 rounded'>
       
            <Link to = {`/product/${product._id}`}> 
        <Card.Img src={product.image} variant='top'/>
       </Link>

       <Card.Body>
       <Link to = {`/product/${product._id}`}> 
        <Card.Title as="div"><strong>  {product.name} </strong> </Card.Title>
        </Link>
       </Card.Body>


        <Card.Text as="h3">  {product.price} din   </Card.Text>
        </Card>
    )
}

export default Product
