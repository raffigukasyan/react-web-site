import { useContext } from "react";
import AppContext from "../context";
import Card from "../Components/Card/Card";

export default function Favorites() {

  const {favorites, onAddToFavorite} = useContext(AppContext);

    return (
        <div className="content">
            <div className="contentTop">
                <h1>Мои закладки</h1>
            </div>
        <div className="cardWrapper">
        {favorites.map((item) => {
            return <Card key={item.id} favorited={true} onFavorite={() => onAddToFavorite(item)} {...item}/>
          })}
        </div>
      </div>
    )
}