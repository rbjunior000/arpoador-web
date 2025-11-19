import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

type QueryParams = {
  page: number;
  limit: number;
  search: string;
};

const DEFAULT_PARAMS: QueryParams = {
  page: 1,
  limit: 10,
  search: "",
};

export const useSearch = (initialParams?: Partial<QueryParams>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => {
    const mergedInitialParams = { ...DEFAULT_PARAMS, ...initialParams };

    const page = Number(searchParams.get("page")) || mergedInitialParams.page;
    const limit =
      Number(searchParams.get("limit")) || mergedInitialParams.limit;
    const search = searchParams.get("search") || mergedInitialParams.search;

    return { page, limit, search };
  }, [searchParams, initialParams]);

  const updateParams = useCallback(
    (newParams: Partial<QueryParams>) => {
      const currentParams = new URLSearchParams(searchParams);

      Object.entries(newParams).forEach(([key, value]) => {
        if (
          value === undefined ||
          value === null ||
          String(value).trim() === ""
        ) {
          // Remove o parâmetro se o valor for nulo, indefinido ou vazio
          currentParams.delete(key);
        } else {
          currentParams.set(key, String(value));
        }
      });
      setSearchParams(currentParams);
    },
    [searchParams, setSearchParams]
  );

  return { ...params, setParams: updateParams };
};
