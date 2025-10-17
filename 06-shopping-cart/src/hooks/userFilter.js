import { useContext } from "react";
import { FiltersContext } from "../context/filter/filter-context";

export function useFilter() {
  const { filters, setFilters } = useContext(FiltersContext);
  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        product.price >= filters.minPrice &&
        (filters.category === "all" || product.category === filters.category)
      );
    });
  };
  return { filterProducts, setFilters };
}
