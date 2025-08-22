import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLastNews = (News: News[]): News => {
  const normalizedNews: News[] = News.map((item) => ({
    ...item,
    StartDate: new Date(item.startDate),
    EndDate: new Date(item.endDate),
  }));
  const lastNews = normalizedNews.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.endDate).getTime()
  )[0];
  return lastNews;
};
