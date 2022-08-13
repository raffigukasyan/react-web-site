import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";


export default function Header({onClickCard}) {

  const {totalPrice} = useCart()

    return (
        <header>
          <Link to="/">
            <div className="headerLeft">
                <img width="40px" height="40px" src="img/logo.png" alt="logo"/>
                <div className="headerInfo">
                  <h3>React Sneakers</h3>
                  <p>Магазин лучших кроссовок</p>
                </div>
            </div>
          </Link>
        <ul className="headerRight">
          <li onClick={onClickCard}>
            <img src="img/cat.svg" alt="cat"/>
            <span>{totalPrice } руб.</span>
          </li>
          <li>
            <Link to="/favorites">
            <img src="img/favorite.svg" alt="Favorite"/>
            </Link>
          </li>
          <li>
            <Link to="/orders">
              <img src="img/user.svg" alt="User"/>
            </Link>
          </li>
        </ul>
      </header>
    )
}