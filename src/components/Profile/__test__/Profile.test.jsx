import { render } from "@testing-library/react";
import { Profile } from "../Profile";
import { Provider } from "react-redux";
import { mockStore } from "jest-fetch-mock";

describe("snapshot tests", () => {
  it("matches snapshot with profile", () => {
    const component = render(
      <Provider store={mockStore}>
        <Profile />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
