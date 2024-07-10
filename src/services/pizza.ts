import { SortOrder } from "mongoose";
import Pizza from "../models/pizza";
import { Category, QueryParams, SortType } from "../@types/pizza";

export const getTotalPizzaCount = async (
  category: Category,
  search?: string
) => {
  let query = {};
  if (category !== Category.All) {
    query = { ...query, category };
  }

  if (search) {
    query = { ...query, name: { $regex: `^${search}`, $options: "i" } };
  }

  return await Pizza.countDocuments(query);
};

const createQuery = (
  category: Category,
  search?: string
): {
  category?: Category;
  name?: { $regex: string; $options: string };
} => {
  const query: {
    category?: Category;
    name?: { $regex: string; $options: string };
  } = {};
  if (category !== Category.All) {
    query.category = category;
  }
  if (search) {
    query.name = { $regex: `^${search}`, $options: "i" };
  }
  return query;
};

const createSortBy = (sortType: SortType): { [key: string]: SortOrder } => {
  const sortBy: { [key: string]: SortOrder } = {};
  switch (sortType) {
    case SortType.Name:
      sortBy.name = 1;
      break;
    case SortType.Rating:
      sortBy.rating = -1;
      break;
    case SortType.Price:
      sortBy.price = 1;
      break;
    default:
      break;
  }
  return sortBy;
};

export const getPizzaList = async ({
  category,
  search,
  sort,
  page,
  limit,
}: QueryParams) => {
  const query = createQuery(category, search);
  const sortBy = createSortBy(sort);

  const pizzas = await Pizza.find(query)
    .populate("reviews")
    .sort(sortBy)
    .skip((page - 1) * limit)
    .limit(limit);

  return pizzas;
};
