import { REQUEST_STATUS } from "../../../utils/constants";
import { getFoodLoading, getFoodSuccess, getFoodFailure } from "../actions";
import { foodReducer } from "../reducer";

describe("should return definite status after requested action", () => {
  it("should return LOADING status after requested action", () => {
    const expected = {
      foodList: [],
      request: {
        error: "",
        status: REQUEST_STATUS.LOADING,
      },
    };
    const received = foodReducer(undefined, getFoodLoading());
    expect(received).toEqual(expected);
  });
  it("should return FAILURE status after requested action", () => {
    const expected = {
      foodList: [],
      request: {
        error: true,
        status: REQUEST_STATUS.FAILURE,
      },
    };
    const received = foodReducer(undefined, getFoodFailure(true));
    expect(received).toEqual(expected);
  });

  it("should return SUCCESS status after requested action", () => {
    const expected = {
      foodList: [],
      request: {
        error: "",
        status: REQUEST_STATUS.SUCCESS,
      },
    };
    const received = foodReducer(undefined, getFoodSuccess([]));
    expect(received).toEqual(expected);
  });
});
