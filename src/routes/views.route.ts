import { Router, Request, Response } from "express";
import ProductManagerDB from "../dao/services/ProductManagerDB";
import DbProduct from "../interfaces/DbProduct";
import QueryParams from "../interfaces/QueryParams";
import validateQueryParams from "../validators/queryParams";

const viewsRouter = Router();

// @@@@
viewsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const productManagerDB: ProductManagerDB = new ProductManagerDB();
    let limitParsed: number = await productManagerDB.getTotalProducts();
    const queryParams: QueryParams = validateQueryParams(req.query);
    if (!queryParams) {
      throw new Error("Query Params inválidos.");
    }
    const { limit } = queryParams;
    if (limit) {
      limitParsed = parseInt(limit);
    }
    const products: DbProduct[] = await productManagerDB.getProducts(
      limitParsed
    );
    res.render("home", {
      title: "Products",
      style: "app.css",
      products: products.splice(0, limitParsed),
    });
  } catch (error) {
    res.render("failure", {
      title: "Products",
      style: "app.css",
      failureMessage: error.message,
    });
  }
});

// @@@@
viewsRouter.get("/realtimeproducts", (req: Request, res: Response) => {
  res.render("realTimeProducts", {});
});

// @@@@
viewsRouter.get("/chat", (req: Request, res: Response) => {
  res.render("chat", {});
});

export default viewsRouter;
