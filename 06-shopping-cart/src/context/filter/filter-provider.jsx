import { useState } from "react";
import { FiltersContext } from "./filter-context";
//1 Crear el contexto

//2. Crear el Provider para proveer el contexto a los componentes
export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 0,
  });

  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilters,
      }}>
      {children}
    </FiltersContext.Provider>
  );
}
