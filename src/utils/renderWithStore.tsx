import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { townsReducer } from "../redux/slices/townsSlice";
import { hoursTownReducer } from "../redux/slices/hoursTownSlice";
import { AppState } from "./redux.utils";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

export const renderWithStore = (
  component: React.ReactElement,
  initialState: AppState,
  path: string,
  initialEntries: string,
) => {
  const testStore = configureStore({
    reducer: {
      townsReducer,
      hoursTownReducer,
    },
    preloadedState: initialState,
  });

  const ReduxRouterWrapper = ({ children }: React.PropsWithChildren<{}>) => {
    return (
      <Provider store={testStore}>
        <MemoryRouter initialEntries={[initialEntries]}>
          <Routes>
            <Route path={path} element={children} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  return render(component, {
    wrapper: ReduxRouterWrapper,
  });
};
