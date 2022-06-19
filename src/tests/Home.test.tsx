import { fireEvent } from "@testing-library/react";
import Home from "../components/Home/Home";
import { initialTestState } from "../consts/home.const";
import { renderWithStore } from "../utils/renderWithStore";

describe("Home page tests", () => {
  it("should display town card with Kyiv city", () => {
    const { getByText } = renderWithStore(
      <Home />,
      {
        townsReducer: initialTestState,
        hoursTownReducer: { lastHoursTown: [] },
      },
      "/",
      "/"
    );

    expect(getByText("Name: Kyiv, UA")).toBeTruthy();
  });

  it("should not display town card with Kyiv city after click remove btn", () => {
    const { getByText, getByTestId } = renderWithStore(
      <Home />,
      {
        townsReducer: initialTestState,
        hoursTownReducer: { lastHoursTown: [] },
      },
      "/",
      "/"
    );

    const button = getByTestId("CloseIcon");

    expect(button).toBeVisible();

    fireEvent.click(button);

    expect(getByText("You don't have any towns yet. You can add a new one")).toBeTruthy();
  });
});
