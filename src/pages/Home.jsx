import Card from "../Components/Card/Card";

export default function Home({
  items,
  cartItems,
  searchValue, 
  searchRemove, 
  searchChange,
  onAddToFavorite, 
  onAddToCart,  
  isLoading}) {
    
  function renderItems() {
    const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
      <Card 
      key={index}
      onPlus={(obj) => onAddToCart(obj)} 
      onFavorite={(obj) => onAddToFavorite(obj)}
      loading={isLoading}
      {...item}
      />
    ))
  }

  return (
        <div className="content">
            <div className="contentTop">
                <h1>{searchValue ? `Поиск по запросу: ${ searchValue}` : 'Все кроссовоки'}</h1>
                <div className="search-block">
                    <img alt="Search" src="/img/Search.svg"/>
                    {searchValue && <img onClick={searchRemove} className="clear" src="img/btn-remove.svg" alt="Clear"/>}
                    <input type="text" placeholder="Поиск ..."  value={searchValue} onChange={searchChange}/>
                </div>
            </div>
        <div className="cardWrapper">
          {renderItems()}
        </div>
      </div>
    )
}