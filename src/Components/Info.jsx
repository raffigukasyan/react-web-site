import { useContext } from 'react';
import AppContext from '../context';



export default function Info({title, image, description}) {

    const {setCardOpened} = useContext(AppContext);

    return (
        <div className="cartEmpty">
            <img className="cartEmptyImg"
                width="120px"
                src={image}
                alt="Empty" 
            />
            <h2>{title}</h2>
            <p>{description}</p>
            <button onClick={() => setCardOpened(false)} className="greenBtn">
                <img src="img/arrow.svg" alt="Arrow"/>
                Вернуться назад
            </button>
        </div>
    )
}
