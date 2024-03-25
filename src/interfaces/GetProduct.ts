import DbProduct from "./DbProduct";

interface GetProduct {
  status: "success" | "error";
  payload: DbProduct[];
  totalPages: number;
  prevPage: number | null;
  nextPage: number | null;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export default GetProduct;
