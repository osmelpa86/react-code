import { useEffect } from "react";

export default function Search({ routeParams }) {
  useEffect(() => {
    document.title = `Has buscado ${routeParams.query}`;
  }, [routeParams.query]);

  return <h1>Has buscado {routeParams.query}</h1>;
}
