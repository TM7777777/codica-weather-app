import { screen } from "@testing-library/react";
import { initialTestState } from "../consts/home.const";
import { initialHoursTestState } from "../consts/town.const";
import { Town } from "../pages/pages";
import { renderWithStore } from "../utils/renderWithStore";

describe("Town page tests", () => {
  it("should display full info of town card with Kyiv city and should display hours chart", () => {
    const { getByText } = renderWithStore(
      <Town />,
      {
        townsReducer: initialTestState,
        hoursTownReducer: { lastHoursTown: [] },
      },
      "/town/:id/:name",
      "/town/703448/Kyiv",
    );

    const hoursChart = screen.queryByText("Change in temperature today");

    expect(getByText("Name: Kyiv, UA")).toBeTruthy();
    expect(hoursChart).toBeNull();
  });

  it("should display full info of town card with Kyiv city and should display hours chart", () => {
    const { getByText } = renderWithStore(
      <Town />,
      {
        townsReducer: initialTestState,
        hoursTownReducer: initialHoursTestState,
      },
      "/town/:id/:name",
      "/town/703448/Kyiv",
    );

    expect(getByText("Name: Kyiv, UA")).toBeTruthy();
    expect(getByText("Change in temperature today")).toBeTruthy();
  });
});
