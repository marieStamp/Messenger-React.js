import {
  foo,
  getFood,
  getFoodFailure,
  getFoodLoading,
  getFoodSuccess,
  REQUEST_FOOD_LOADING,
  REQUEST_FOOD_SUCCESS,
} from "../actions";

describe("getFoodLoading", () => {
  it("should return obj with certain type", () => {
    const expected = {
      type: REQUEST_FOOD_LOADING,
    };

    const received = getFoodLoading();

    expect(received).toEqual(expected);
  });
});

describe("getFoodSuccess", () => {
  it("should return obj with type and payload", () => {
    const payload = [];
    const expected = {
      type: REQUEST_FOOD_SUCCESS,
      payload,
    };

    const received = getFoodSuccess(payload);

    expect(received).toEqual(expected);
  });
});

describe("getFood", () => {
  it("dispatches getFoodLoading", () => {
    const mockDispatch = jest.fn();

    getFood()(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(getFoodLoading());
  });

  it("dispatches success action on successfull fetch", async () => {
    const result = { food: [] };
    fetch.mockResponseOnce(JSON.stringify(result));
    const mockDispatch = jest.fn();
    await getFood()(mockDispatch);

    expect(mockDispatch).toHaveBeenLastCalledWith(getFoodSuccess(result));
  });

  it("dispatches failure action on error in fetch", async () => {
    fetch.mockRejectOnce(new Error("test"));
    const mockDispatch = jest.fn();
    await getFood()(mockDispatch);

    expect(mockDispatch).toHaveBeenLastCalledWith(getFoodFailure("test"));
  });
});

it("throws error", () => {
  expect(() => foo()).toThrow();
});
