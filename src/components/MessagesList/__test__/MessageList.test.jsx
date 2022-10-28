import { render, screen } from "@testing-library/react";
import { MessagesList } from "../MessagesList";

describe("MessagesList tests", () => {
  it("renders author", () => {
    render(<MessagesList messages={{ author: "User" }} />);

    const authorText = screen.getByText("User");
    expect(authorText).toBeInTheDocument();
  });
});
