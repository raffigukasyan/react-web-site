import { useContext } from 'react';
import AppContext from '../context';

export default function useCart() {
    const {cartItems, setcartItems} = useContext(AppContext);
    const totalPrice = cartItems.reduce((aggr, obj) => aggr + obj.price, 0);
    
    return {cartItems, setcartItems, totalPrice}
}