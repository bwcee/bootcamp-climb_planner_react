import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import CreateRoute from "./pages/CreateRoute";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import LocRoutes from "./pages/LocRoutes";

function App() {
  return (
    <Router>
      <Layout>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/create">
          <CreateRoute />
        </Route>
        <Route path="/loc/:loc">
          <LocRoutes />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      </Layout>
    </Router>
  );
}

export default App;
