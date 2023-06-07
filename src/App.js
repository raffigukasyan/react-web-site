import axios from "axios";
import {Route} from "react-router-dom";
import {useState, useEffect} from "react";
import Header from "./Components/Header";
import Drawer from "./Components/Drawer/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";


function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setcartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCardOpened] = useState(false);
  
  useEffect(() => {
    async function fetchData() {

      try {

        const [cartResponse, favoriteResponse, itemsResponse] = await Promise.all([
        axios.get('https://62d95b199eedb6996359f397.mockapi.io/cart'),
        axios.get('https://62d95b199eedb6996359f397.mockapi.io/favorites'),
        axios.get('https://62d95b199eedb6996359f397.mockapi.io/items')
        ]);
      
        setIsLoading(false);
        setcartItems(cartResponse.data);
        setFavorites(favoriteResponse.data);
        setItems(itemsResponse.data);
      }
      catch(error) {
        alert('Ошибка при запросе данных');
      }

    }
    fetchData();
    console.log(cartItems);
    
  }, []);


  const onRemoveItem = async (id) => {
    try {
      setcartItems(cartItems.filter((item) => item.id !== id));
      await axios.delete(`https://62d95b199eedb6996359f397.mockapi.io/cart/${id}`);
    }
    catch(error) {
      alert('Не удалось удалить товар');
    }
  }


  const onAddToCart = async (item) => {
    try {
      const findItems = cartItems.find((obj) => obj.parentId === item.parentId);
      if(findItems) {
        setcartItems(cartItems.filter((val) => val.parentId !== item.parentId));
        await axios.delete(`https://62d95b199eedb6996359f397.mockapi.io/cart/${findItems.id}`);
      }
      else {
        setcartItems([
          ...cartItems,
          item
        ]);
        const {data} = await axios.post('https://62d95b199eedb6996359f397.mockapi.io/cart', item);
        setcartItems((prev) => prev.map((item) => {
          if(item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item
        }));
      }
    }

    catch(error) {
      alert('Ошибка при добавлении в корзину');
    }
  }

  const onAddToFavorite = async (item) => {
    try {
      if(favorites.find(obj => obj.parentId === item.parentId)) {
        axios.delete(`https://62d95b199eedb6996359f397.mockapi.io/favorites/${item.id}`);
        setFavorites(favorites.filter(val => val.parentId !== item.parentId));
      }
      else {
        const {data} = await axios.post('https://62d95b199eedb6996359f397.mockapi.io/favorites', item);
        setFavorites([
          ...favorites,
          data
        ]);
      }
    }

    catch(error) {
      alert('Не удалось добавить в закладки');
    }
  } 

  const isItemAdded = (id) => {
    return cartItems.some((obj) => obj.parentId === Number(id));
  }
  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, setCardOpened, setcartItems, onAddToCart, onAddToFavorite}}>
      <div className="wrapper">
        <Drawer 
        onClose={() => setCardOpened(false)} 
        onRemove={onRemoveItem} 
        opened={cartOpened}/>
        
        <Header onClickCard={() => setCardOpened(true)}/>
      
        <Route path="/" exact>
          <Home items={items} 
                cartItems={cartItems} 
                searchValue={searchValue}
                searchRemove={() => setSearchValue("")}
                searchChange={(evt) => setSearchValue(evt.target.value)} 
                onAddToCart={onAddToCart} onAddToFavorite={onAddToFavorite}
                isLoading={isLoading}/>
        </Route>
        <Route path="/favorites" exact>
          <Favorites onAddToFavorite={onAddToFavorite} />
        </Route>
        <Route path="/orders" exact>
            <Orders />
        </Route>
      </div>
    </AppContext.Provider>
    
  );
}

export default App;
