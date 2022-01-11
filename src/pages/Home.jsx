import React from 'react';

import { fetchPizzas } from '../redux/action/pizzas';
import {Categories, SortPoup, PizzaBlock, PizzaLoadingBlock} from '../components'
import {useSelector, useDispatch} from 'react-redux';
import {setCategory, setSortBy} from '../redux/action/filter';
import {addPizzaToCart} from '../redux/action/cart';


  const categoryNames = [ 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const sortItems = [
        {name :'популярности', type: 'popular', order: 'desc'}, 
        {name: 'цене', type: 'price', order: 'desc'}, 
        {name:'алфавиту', type: 'name', order: 'asc'}];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);
  const cartItems = useSelector(({ cart }) => cart.items);

  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  React.useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));
  }, [category, sortBy]);

  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);
  const handelPizzaToCart = obj => {
    dispatch(addPizzaToCart(obj))
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
        
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
         
        />
        <SortPoup
          activeSortType={sortBy.type}
          items={sortItems}
          onClickSortType={onSelectSortType}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? items.map((obj) => 
          (<PizzaBlock 
            onClickAddPizza={handelPizzaToCart} 
            key={obj.id} 
             addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
             {...obj} /> 
             ))
          : Array(12)
              .fill(0)
              .map((_, index) => <PizzaLoadingBlock key={index} />)}
      </div>
    </div>
  );
}

export default Home;