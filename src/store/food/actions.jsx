import { apiUrl } from "../../utils/constants";

export const REQUEST_FOOD_LOADING = "FOOD::REQUEST_LOADING";
export const REQUEST_FOOD_FAILURE = "FOOD::REQUEST_FAILURE";
export const REQUEST_FOOD_SUCCESS = "FOOD::REQUEST_SUCCESS";

export const getFoodLoading = () => ({
  type: REQUEST_FOOD_LOADING,
});
export const getFoodSuccess = (food) => ({
  type: REQUEST_FOOD_SUCCESS,
  payload: food,
});
export const getFoodFailure = (err) => ({
  type: REQUEST_FOOD_FAILURE,
  payload: err,
});

export const getFood = () => async (dispatch) => {
  dispatch(getFoodLoading());

  try {
    const response = await fetch(apiUrl);
    console.log(response);

    if (!response.ok) {
      throw new Error("not ok");
    }

    const result = await response.json();

    dispatch(getFoodSuccess(result));
  } catch (err) {
    console.log(err);
    dispatch(getFoodFailure(err.message));
  }
};

export const foo = () => {
  throw new Error("newerr");
};
