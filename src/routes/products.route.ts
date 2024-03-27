import { Router, Request, Response } from "express";
import ProductManagerDB from "../dao/services/ProductManagerDB";
import QueryParams from "../interfaces/QueryParams";
import UpdateProduct from "../interfaces/UpdateProduct";
import { successStatus, failureStatus } from "../utils/statuses";
import validateQueryParams from "../validators/queryParams";
import validateUpdateProduct from "../validators/updateProduct";
import Product from "../interfaces/Product";
import DbProduct from "../interfaces/DbProduct";
import GetProduct from "../interfaces/GetProduct";

const productsRouter: Router = Router();

/** GET ENDPOINTS */
productsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const productManagerDB: ProductManagerDB = new ProductManagerDB();
    let limitParsed: number = 10;
    let pageParsed: number = 1;
    const queryParams: QueryParams = validateQueryParams(req.query);
    const { limit, page, sort, query } = queryParams;
    // @@@@ Pendiente: Validar que el parseo a entero de limit y page de un número válido.
    if (limit) {
      limitParsed = parseInt(limit);
    }
    if (page) {
      pageParsed = parseInt(page);
    }
    const products: GetProduct = await productManagerDB.getProducts(
      limitParsed,
      pageParsed,
      sort,
      query
    );
    res.json(products);
  } catch (error) {
    const products: GetProduct = {
      status: "error",
      payload: [],
      totalPages: 0,
      prevPage: null,
      nextPage: null,
      page: 0,
      hasPrevPage: false,
      hasNextPage: false,
    };
    res.json(products);
  }
});

productsRouter.get("/:pid", async (req: Request, res: Response) => {
  try {
    const productManagerDB: ProductManagerDB = new ProductManagerDB();
    const pid: string = req.params.pid;
    const product = await productManagerDB.getProductById(pid);
    res.json(product);
  } catch (error) {
    res.status(404).json(failureStatus(error.message));
  }
});

/** POST ENDPOINT */
productsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const productManagerDB: ProductManagerDB = new ProductManagerDB();
    const product: Product = req.body;
    await productManagerDB.addProduct(product);
    res.json(successStatus);
  } catch (error) {
    res.status(500).json(failureStatus(error.message));
  }
});

/** PUT ENDPOINT */
productsRouter.put("/:pid", async (req: Request, res: Response) => {
  try {
    const productManagerDB: ProductManagerDB = new ProductManagerDB();
    const pid: string = req.params.pid;
    const updateProperties: UpdateProduct = validateUpdateProduct(req.body);
    await productManagerDB.updateProduct(pid, updateProperties);
    res.json(successStatus);
  } catch (error) {
    res.json(failureStatus(error.message));
  }
});

/** DELETE ENDPOINT */
productsRouter.delete("/:pid", async (req: Request, res: Response) => {
  try {
    const productManagerDB: ProductManagerDB = new ProductManagerDB();
    const pid: string = req.params.pid;
    await productManagerDB.deleteProduct(pid);
    res.json(successStatus);
  } catch (error) {
    res.json(failureStatus(error.message));
  }
});

export default productsRouter;
