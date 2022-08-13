import ContentLoader from 'react-content-loader';
import AppContext from "../../context";
import { useContext } from "react";
import {useState} from 'react';
import styles from './Card.module.scss';

export default function Card({
  id, 
  title, 
  price, 
  imageUrl, 
  onPlus, 
  onFavorite, 
  favorited = false,
  loading = false
}) {


  const {isItemAdded} = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);
  const obj = {id, parentId: id, title, imageUrl, price};


  const onClickPlus = () =>  {
    onPlus(obj);
  }

  const onClickFavorte = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  }

  return (
    <div className={styles.card}>
      {
        loading ? <ContentLoader 
        speed={2}
        width={155}
        height={250}
        viewBox="0 0 155 265"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <rect x="1" y="0" rx="10" ry="10" width="155" height="155" /> 
        <rect x="0" y="167" rx="5" ry="5" width="155" height="15" /> 
        <rect x="0" y="187" rx="5" ry="5" width="100" height="15" /> 
        <rect x="1" y="234" rx="5" ry="5" width="80" height="25" /> 
        <rect x="124" y="230" rx="10" ry="10" width="32" height="32" /> 
    </ContentLoader> : <> 
      {onFavorite && <div className={styles.favorite}>
          <img onClick={onClickFavorte} src={isFavorite ? "img/heart-liked.svg" : "img/heart-unliked.svg"} alt="unliked"/>
      </div>}
      <img width="133px" height="112px" src={imageUrl}  alt="sneakers"/>
      <h5>{title}</h5>
      <div className={styles.cardBottom}>
        <div className={styles.cardBottomLeft}>
          <span>Цена:</span>
          <b>{price + ' руб.'}</b>
        </div>
        {onPlus && <img onClick={onClickPlus} src={isItemAdded(id) ? "img/cheched.svg" : "img/plus.svg"} alt="plus"/>}
      </div>
      </>
      }
    </div>
    )
}

