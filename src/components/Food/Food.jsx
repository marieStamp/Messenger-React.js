import React from "react";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFoodError,
  selectFoodList,
  selectFoodLoading,
} from "../../store/food/selectors";
import { getFood } from "../../store/food/actions";
import "./food.scss";

export const Food = () => {
  const dispatch = useDispatch();
  const food = useSelector(selectFoodList);
  const isLoading = useSelector(selectFoodLoading);
  const error = useSelector(selectFoodError);

  const requestFood = async () => {
    dispatch(getFood());
  };

  // useEffect(() => {
  //   requestFood();
  // }, []);

  return (
    <>
      <h3>Breweries</h3>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <button className="foodBtn" onClick={requestFood}>
            REQUEST
          </button>
          {!!error && <h4>ERROR: {error}</h4>}
          <ul>
            {food.map((fd) => (
              <li className="foodList" key={fd.id}>
                {fd.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
