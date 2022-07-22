
import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

const APP_ID = "a52b4d43";
const APP_KEY = "e0e5c667605f5e91d8275c973531b80a";



const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 300px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color:#181D29;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 220px;
`;
const RecipeName = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: White;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
 
 padding:10px
`;
const SeeMoreText = styled.span`
  color:white;
  font-size: 18px;
  text-align: center;
  border: solid 1px #eb3300;
  border-radius: 3px;
  padding: 10px 15px;
  cursor: pointer;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) -70.45%, rgba(255, 255, 255, 0.02) 100%);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0px 4px 24px -1px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(40px);
  border-radius: 5px;
`;
const IngredientsText = styled(SeeMoreText)`
  
  background: rgba(235, 45, 78, 0.8);
  box-shadow: 1px 1px 4px 4px rgba(235, 45, 78, 0.2);
  border-radius: 5px;
  margin-bottom: 12px;
`;
const SeeNewTab = styled(SeeMoreText)`
border: 1px solid #EB2D4E;
box-shadow: 1px 1px 4px 4px rgba(235, 45, 78, 0.2);
border-radius: 5px;

color:Black;
`;

const Tab = styled(SeeMoreText)`
background: rgba(235, 45, 78, 0.8);
box-shadow: 1px 1px 4px 4px rgba(235, 45, 78, 0.2);
border-radius: 5px;
color:White;
`;

const RecipeComponent = (props) => {
  const [show, setShow] = useState("");

  const { label, image, ingredients, url } = props.recipe;
  return (
    <RecipeContainer>
      <Dialog
        onClose={() => console.log("Close")}
        aria-labelledby="simple-dialog-title"
        open={!!show}
       
      >
        <DialogTitle>Ingredients 
          
          
        </DialogTitle>
        <DialogContent>
          <RecipeName>{label}</RecipeName>
          <table>
            <thead>
              <th>Ingredient</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index} className="ingredient-list">
                  <td>{ingredient.text}</td>
                  <td>{ingredient.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <Tab onClick={() => window.open(url)}>See More</Tab>
          <SeeNewTab onClick={() => setShow("")}>Close</SeeNewTab>
        </DialogActions>
      </Dialog>
      <CoverImage src={image} alt={label} />
      <RecipeName>{label}</RecipeName>
      <IngredientsText onClick={() => setShow(!show)}>
        Ingredients
      </IngredientsText>
      <SeeMoreText onClick={() => window.open(url)}>
        See Complete Recipe
      </SeeMoreText>
    </RecipeContainer>
  );
};

const Background = styled.div`
background-color:#252B3B;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size:30px;
`;
const Header = styled.div`
   background: linear-gradient(180deg, rgba(255, 255, 255, 0.4) -70.45%, rgba(255, 255, 255, 0.1) 100%);
   box-shadow: 0px 4px 24px -1px rgba(0, 0, 0, 0.25);
   backdrop-filter: blur(40px);
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const Placeholder = styled.div`
  
  height: 120px;
  margin: 220px;
  font-size:36px;
  color:White;
  font-weight:700;
 
  
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;
  justify-content: space-evenly;
`;
const AppComponent = () => {
  const [searchQuery, updateSearchQuery] = useState("");
  const [recipeList, updateRecipeList] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`,
    );
    updateRecipeList(response.data.hits);
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Background>
    <Container>
      <Header>
        <AppName>
         
          Recipe Finder
        </AppName>
        <SearchBox>
          <SearchIcon src="/1.svg" />
          <SearchInput
            placeholder="Search Recipe"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      <RecipeListContainer>
        {recipeList?.length ? (
          recipeList.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe.recipe} />
          ))
        ) : (
          <Placeholder >
            Search For The Recipe.
          </Placeholder>
        )}
      </RecipeListContainer>
    </Container>
    </Background>
    
  );
};

export default AppComponent;
