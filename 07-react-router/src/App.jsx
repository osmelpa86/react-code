import "./App.css";
import Router from "./components/Router.jsx";
import Search from "./pages/Search.jsx";
import {Route} from "./components/Route.jsx";
import {lazy, Suspense} from "react";

const LazyAboutPage = lazy(() => import ('./pages/About.jsx'));
const LazyHomePage = lazy(() => import ('./pages/Home.jsx'));
const LazyPage404 = lazy(() => import ('./pages/404.jsx'));

const routes = [{path: "/search/:query", Component: Search}];

function App() {
    return (
        <main>
            <Suspense fallback={<h1>Cargando...</h1>}>
                <Router routes={routes} defaultComponent={LazyPage404}>
                    <Route path="/" Component={LazyHomePage}/>
                    <Route path="/about" Component={LazyAboutPage}/>
                </Router>
            </Suspense>
        </main>
    );
}

export default App;