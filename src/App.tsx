import { useRoutes } from "react-router-dom";
import { Home, Town } from "./pages/pages";
import { TOWN_ROUTE } from "./consts/town.const";
import { HOME_ROUTE } from "./consts/home.const";
import { Header } from "./components/Header/Header";
import { NotFound } from "./components/NotFound/NotFound";
import { NOT_FOUND } from "./consts/notfound.const";

const App = () => {
  const routes = useRoutes([
    { path: HOME_ROUTE, element: <Home /> },
    { path: TOWN_ROUTE, element: <Town /> },
    { path: NOT_FOUND, element: <NotFound /> },
  ]);

  return (
    <div className="main-wrapper">
      <Header />
      {routes}
    </div>
  );
};

export default App;
