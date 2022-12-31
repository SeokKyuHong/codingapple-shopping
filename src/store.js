import { configureStore, createSlice } from '@reduxjs/toolkit';

let cart = createSlice({
    name: 'cart',
    initialState:
    [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers: {
        setCount(state, action) { 
            let num = state.findIndex((a)=>{return a.id === action.payload})
           state[num].count++
        },
        addItem(state, action) {
            state.push(action.payload)
        }
    } 
})

export let { setCount, addItem } = cart.actions

export default configureStore({
    reducer: {
        cart: cart.reducer
    }
})
