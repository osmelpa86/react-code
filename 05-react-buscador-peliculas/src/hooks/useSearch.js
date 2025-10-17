import { useEffect, useRef, useState } from "react";

export function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("Campo vacio");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede realizar busquedas con números");
      return;
    }

    if (search.length < 3) {
      setError("Debe introducir almenos 3 caracteres");
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}
