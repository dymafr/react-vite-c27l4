import { useFetchRecipes } from "@/hooks";
import styles from "./AdminRecipesList.module.scss";
import { deleteRecipe as deleteR } from "@/apis";
import { NavLink } from "react-router";

function AdminRecipesList() {
  const [[recipes, setRecipes]] = useFetchRecipes();

  async function deleteRecipe(_id: string) {
    await deleteR(_id);
    setRecipes(recipes.filter((r) => r._id !== _id));
  }

  return (
    <ul className={styles.list}>
      {recipes.length
        ? recipes.map((r) => (
            <li key={r._id} className="d-flex align-items-center">
              <span className="flex-fill">{r.title}</span>
              <NavLink to={`../edit/${r._id}`}>
                <button className="btn btn-primary mr-15">Editer</button>
              </NavLink>
              <button
                onClick={() => deleteRecipe(r._id)}
                className="btn btn-danger"
              >
                Supprimer
              </button>
            </li>
          ))
        : null}
    </ul>
  );
}

export default AdminRecipesList;
