import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import RecipeIngredientItem from "./RecipeIngredientItem";
import { addIngredientToRecipe } from "../../store/recipeingredients/recipeingredients-slice";

const RecipeIngredientList = () => {
  const dispatch = useDispatch();

  const { recipeIngredients } = useSelector((state) => state.recipeIngredient);

  const handleAddClick = () => {
    dispatch(
      addIngredientToRecipe({ ingredientId: "", quantity: 0, unit: "" })
    );
  };

  return (
    <>
      {recipeIngredients.map((ingredient, i) => (
        <div key={ingredient.id}>
          <RecipeIngredientItem recipeIngredient={ingredient} index={i} />
          {recipeIngredients.length - 1 === i && (
            <Button size="sm" variant="success" onClick={handleAddClick}>
              Add
            </Button>
          )}
        </div>
      ))}
    </>
  );
};

export default RecipeIngredientList;
