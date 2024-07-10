import { RequestHandler } from "express";
import Pizza from "../models/pizza";

import { getPizzaList, getTotalPizzaCount } from "../services/pizza";
import {
  getPageCount,
  validateQueryParams,
} from "../utils/validation/queryParams";

const getPizzasByQS: RequestHandler = async (req, res) => {
  try {
    console.log(req.query);
    const { category, sort, page, limit, search } = await validateQueryParams(
      req.query
    );

    const totalCount = await getTotalPizzaCount(category, search);
    const pageCount = getPageCount(totalCount, limit);

    const filter = {
      category,
      sortBy: sort,
      currentPage: page,
      search,
    };

    const pizzas = await getPizzaList({ category, sort, page, limit, search });

    res.json({ pizzas, pageCount, filter });
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
    res.status(400).send(errorMessage);
  }
};

const getPizzaById: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const pizzaById = await Pizza.findById(id).populate({
      path: "reviews",
      populate: {
        path: "user",
        select: "name",
      },
    });
    res.json(pizzaById);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
    res.status(404).send(errorMessage);
  }
};

export default { getPizzasByQS, getPizzaById };
