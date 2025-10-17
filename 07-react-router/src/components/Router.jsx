import { useEffect, useState } from "react";
import { EVENTS } from "../utils/consts";
import { match } from "path-to-regexp";
import { Children } from "react";

export default function Router({ children, routes = [], defaultComponent }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => setCurrentPath(window.location.pathname);

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);

  let routeParams = {};

  // add routes from children <Route /> components
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type;
    const isRoute = name === "Route";
    return isRoute ? props : null;
  });

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean);

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true;

    //Detectar rutas dinámicas con path-to-regexp como por ejemplo
    // /search/:query <- :query es una ruta dinámica
    const matcherUrl = match(path, { decode: decodeURIComponent });
    const matched = matcherUrl(currentPath);
    if (!matched) return false;

    //Guardar los parametros de la url que eran dinámicos y
    // que hemos estraido con path-to-regexp por ejemplo
    //si la ruta es /search/:query y la url es /search/javascript
    // matched.params.query === 'javascript'
    routeParams = matched.params; //Ejemplo {query:'javascript'} //Rutas seria asi search/javascript
    return true;
  })?.Component;

  const DefaultComponent = defaultComponent ?? (() => <h1>404</h1>);

  return Page ? (
    <Page routeParams={routeParams} />
  ) : (
    <DefaultComponent routeParams={routeParams} />
  );
}
