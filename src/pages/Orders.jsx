import { useEffect } from "react";
import axios from "axios";
import Card from "../Components/Card/Card";
import { useState } from "react";

export default function Orders() {

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] =  useState(true);

    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get('https://62d95b199eedb6996359f397.mockapi.io/orders');
                setOrders(data.reduce((aggr, obj) => [...aggr, ...obj.items], []));
                setIsLoading(false);
            }

            catch(err) {
                alert('ошибка запроса заказа');
            }
        })();
    }, [])

    return (
        <div className="content">
            <div className="contentTop">
                <h1>Мои заказы</h1>
            </div>
        <div className="cardWrapper">
            {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                <Card key={index}
                loading={isLoading}
                {...item}/>
            ))}
        </div>
      </div>
    )
}