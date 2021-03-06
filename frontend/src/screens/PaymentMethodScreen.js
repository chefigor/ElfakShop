import React, {useState} from 'react'
import {Form,Button, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import {savePaymentMethod} from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'



const PaymentMethodScreen = ({history}) => {



    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart

    if (!shippingAddress)
    {
        history.push('/shipping')
    }

    const [paymentMethod,setPaymentMethod] = useState("PayPal")
    


    const dispatch = useDispatch()

    const submitHandler = (e) =>
    {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
    }
    return (
        <FormContainer >

<CheckoutSteps step1 step2 step3>

</CheckoutSteps>
        
        
        <Form onSubmit={submitHandler}>
        
        <Form.Group>

            <Form.Label as='legend'> Izaberite Metodu placanja</Form.Label>
     

        <Col>
        
            <Form.Check type='radio'
             label='PayPal ili Kreditna Kartica'
              id='PayPal'
            name='paymentMethod'
             value='PayPal' 
             checked onChange={(e)=>
            
            setPaymentMethod(e.target.value)}>

    

          
            </Form.Check>

          
        </Col>
        </Form.Group>

                <Button type='submit' variant='primary'> Nastavi</Button>

        </Form>
        </FormContainer>
        
    )
}

export default PaymentMethodScreen
