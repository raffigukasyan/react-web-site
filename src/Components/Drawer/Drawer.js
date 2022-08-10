import axios from 'axios';
import { useState } from 'react';

import Info from '../Info';
import useCart from '../../hooks/useCart';

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function Drawer({ onClose, onRemove, opened}) {

    const {cartItems, setcartItems, totalPrice} = useCart()
    const [orderId, setOrderId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOrderComplete, setIsOrderComplete] = useState(false);

    const onClickOrder = async() => {
        try {
            setIsLoading(true);
            const {data} = await axios.post('https://62d95b199eedb6996359f397.mockapi.io/orders', {
                items: cartItems
            });
            setOrderId(data.id);
            setIsOrderComplete(true);
            setcartItems([]);

            for(let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://62d95b199eedb6996359f397.mockapi.io/cart/' + item.id);
                await delay(1000);
            }
        }
        catch {
            alert('Не удалось оформить заказ');
        }
        setIsLoading(false);
    }   

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : '' }`}>
            <div className={styles.drawer}>
            <h2>Корзина <img onClick={onClose} className="removeBtn" src="img/btn-remove.svg" alt="remove"/></h2>
            
            {cartItems.length ? <div>
                <div className="items">

                {cartItems.map((item) => {
                return <div key={item.id} className="cartItem">
                        <div style={{backgroundImage: `url(${item.imageUrl})`}} className="cartItemImg">
                        </div>
                        <div>
                            <p>{item.title}</p>
                            <b>{item.price + ' руб.'}</b>
                        </div>
                        <img onClick={() => {
                            onRemove(item.id);
                        }} className="removeBtn" src="img/btn-remove.svg" alt="remove"/>
                    </div>
                })}
                </div>
                <div className="cartTotalBlock">
                <ul>
                <li>
                    <span>Итого:</span>
                    <div></div>
                    <b>{totalPrice} руб. </b>
                </li>
                <li>
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>{totalPrice / 100 * 5} руб. </b>
                </li>
                </ul>
                <button disabled={isLoading} onClick={onClickOrder} className="greenBtn">Оформить заказ <img src="img/arrow.svg" alt="arrow"/></button>
                </div>
            </div> : <Info 
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая" }
            image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.png"}
            description={isOrderComplete ? `Ваш заказ ${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}/>}
            </div>
        </div>
    )
}