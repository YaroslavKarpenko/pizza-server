import { Category, SortType } from "../../@types/pizza";

export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const isCategory = (text: string): text is Category => {
  return Object.values(Category)
    .map((v) => v.toString())
    .includes(text);
};

export const isSortType = (text: string): text is SortType => {
  return Object.values(SortType)
    .map((v) => v.toString())
    .includes(text);
};

export const isNumber = (text: unknown): text is number => {
  return typeof Number(text) === "number" || !isNaN(Number(text));
};

export const isInt = (num: number): boolean => {
  return Number.isInteger(Number(num));
};

export const isPositive = (num: number): boolean => {
  return Number(num) > 0;
};

export const isPage = (num: number, maxPageCount: number): boolean => {
  return Number(num) <= maxPageCount;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(email: string): boolean {
  return emailPattern.test(email);
}

export const isPassword = (password: string): boolean => {
  const minLength = 6;
  const maxLength = 32;
  return password.length >= minLength && password.length <= maxLength;
};

export const isRating = (rating: number): boolean => {
  return rating >= 1 && rating <= 5;
};

export const isName = (text: string): boolean => {
  return text.length >= 3 && text.length <= 32;
};
