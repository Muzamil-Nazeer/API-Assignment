import React, { useState }  from 'react'
import {meals} from './data'
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function App(){
  const mealsList = meals;
  const [recipeName,setRecipeName] = useState();
  const [recipeDetails,setRecipeDetails] =useState([]);
  // const [flag , setFlag] = useState(false);
  const [aiResponse, setResponse] = useState('');

  // console.log(mealsList);
  const genAI = new GoogleGenerativeAI('AIzaSyAT03Fv88DiO_C4s2FGN9RSaAEZau7AHfU');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
 
  const searchRecipe = async()=>{
    const recipeDetail = mealsList.filter(item =>
      item.name === recipeName
    );

    async function aiRun(prompt) {
      // const prompt = `random meals related to ${search} category with images and prices`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setResponse(text);
      console.log(text);
    }
    // recipeDetail.length <=0 ? setFlag(true) : setFlag(false) 
    if (recipeDetail.length <=0 ){
      const prompt =`Provide recipe for ${recipeName}`
      const aiResponse = await aiRun (prompt);
      setRecipeDetails(recipeDetail);
    // console.log(recipeDetail);
    }
    
  } 

 return(
 <>
    <input type="text" name="todo" id="_todo" 
    
    onChange={(e)=>{
      const val= e.target.value.toLocaleLowerCase();
      setRecipeName(val)
    }} />    

    <button onClick={()=>{searchRecipe()}}>Search Recipe</button>
    
    {
 recipeDetails.length > 0 ?
<>
<h3>Recipe Details</h3>
  <ul>
   <li>{recipeDetails[0].name}</li>
   <li>{recipeDetails[0].recipe}</li>
</ul>
</>
:null
}
{/* {
 flag && 
 <p> Recipe not found </p> 
} */}



  </>
  )
}