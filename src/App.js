import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
const App = () =>
{
  const APP_ID = '7da650fc';
  const APP_KEY = 'f371d0832540addf451a069000225e13';
  
  const[recipes, setRecipes]=useState([]);
  const[search, setSearch]=useState("");
  const[query, setQuery]=useState('chicken');
useEffect( () =>{
  getRecipe();
}, [query]);
const getRecipe = async () =>
{
  const response = await fetch( `https://api.edamam.com/search?q=${query}&app_id=${ APP_ID}&app_key=${APP_KEY}`);
  const data = await response.json();
  //console.log(data);
  setRecipes(data.hits);
}
const updateSearch = e =>
{
  setSearch(e.target.value);
};
 const getSearch = e =>
 {
   e.preventDefault();
   setQuery(search);
   setSearch('');
 }
  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-btn" type="submit">search</button>
      </form>
      {recipes.map(recipe =>(
          <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          ingredients={recipe.recipe.ingredients}
          image={recipe.recipe.image}
          />
      ))}
    </div>
  );
}

export default App;
