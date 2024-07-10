import { Category, QueryParams, SortType } from "../../@types/pizza";
import { getTotalPizzaCount } from "../../services/pizza";

import {
  isCategory,
  isInt,
  isNumber,
  isPage,
  isPositive,
  isSortType,
  isString,
} from "./typeGuards";

export const validateCategory = (category: unknown): Category => {
  if (!category || !isString(category) || !isCategory(category)) {
    throw new Error("Incorrect or missing category");
  }
  return category;
};

const validateSort = (sort: unknown): SortType => {
  if (!isString(sort) || !isSortType(sort)) {
    throw new Error("Incorrect or missing sort type");
  }
  return sort;
};

const validatePage = (page: unknown, maxPageCount: number): number => {
  if (
    !isString(page) ||
    !isNumber(page) ||
    !isInt(page) ||
    !isPositive(page) ||
    !isPage(page, maxPageCount)
  ) {
    throw new Error("Incorrect or missing page");
  }
  return Number(page);
};

const validateLimit = (limit: unknown): number => {
  if (!isNumber(limit) || !isInt(limit) || !isPositive(limit)) {
    return 3;
  }
  return Number(limit);
};

const validateSearch = (search: unknown): string => {
  if (!search || !isString(search)) {
    return "";
  }
  return search;
};

export const getPageCount = (totalCount: number, limit: number) => {
  // console.log(totalCount, limit);
  return Math.ceil(totalCount / limit);
};

export const validateQueryParams = async (
  object: unknown
): Promise<QueryParams> => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing query params");
  }

  if (
    "category" in object &&
    "sort" in object &&
    "page" in object &&
    "limit" in object &&
    "search" in object
  ) {
    const limit = validateLimit(object.limit);
    console.log(limit, "limit");

    const category = validateCategory(object.category);
    console.log(category, "category");

    const totalCount = await getTotalPizzaCount(category);
    console.log(totalCount, "totalCount");

    const pageCount = getPageCount(totalCount, limit);
    console.log(pageCount, "pageCount");

    const validatedParams = {
      category,
      sort: validateSort(object.sort),
      page: validatePage(object.page, pageCount),
      limit,
      search: validateSearch(object.search),
    };

    return validatedParams;
  }
  throw new Error("Incorrect data: a field missing, sfdfsdfsd");
};
