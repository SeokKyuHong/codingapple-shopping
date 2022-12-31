import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { setCount } from '../store'


const Cart = () => {

  let cart = useSelector((state)=> state.cart)
  let dispatch = useDispatch()

  return (
    <Table striped bordered hover variant="dark">
    <thead>
      <tr>
        <th>No</th>
        <th>상품명</th>
        <th>수량</th>
        <th>변경하기</th>
      </tr>
    </thead>
    <tbody> 
      { 
      cart.map((carts, index) => {
      return (
        <tr key={ index }>
          <td>{ carts.id+1 }</td>
          <td>{ carts.name }</td>
          <td>{ carts.count }</td>
          <td>
            <button onClick={ () => {
              dispatch(setCount(carts.id))
            } }>+</button>
          </td>
        </tr>
      )}) 
      } 
    </tbody>

  </Table>
  )
}

export default Cart
