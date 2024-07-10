export enum Category {
  All = "all",
  Neapolitan = "neapolitan",
  Italian = "italian",
  American = "american",
  Canadian = "canadian",
  Mexican = "mexican",
}

export enum SortType {
  Name = "name",
  Price = "price",
  Rating = "rating",
}

export interface QueryParams {
  category: Category;
  sort: SortType;
  page: number;
  limit: number;
  search: string;
}
