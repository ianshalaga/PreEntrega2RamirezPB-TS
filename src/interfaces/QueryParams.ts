import query from "../types/query";

interface QueryParams {
  limit?: string;
  page?: string;
  sort?: string;
  query?: query;
}

export default QueryParams;
