import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FilterType, Media, SortType } from "./schemas";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function applySortFilter(
  media: Media[],
  filter: FilterType,
  sort: SortType
) {
  switch (filter) {
    case FilterType.MOVIE:
      media = media.filter((media) => media.media_type === "movie");
      break;
    case FilterType.SHOW:
      media = media.filter((media) => media.media_type === "tv");
      break;
    case FilterType.ALL:
    default:
      break;
  }

  switch (sort) {
    case SortType.DATE_ASC:
      media = media.slice().sort((a, b) => {
        if (a.release_year && b.release_year) {
          return (
            parseInt(a.release_year.toString()) -
            parseInt(b.release_year.toString())
          );
        } else if (a.release_year) {
          return -1;
        } else if (b.release_year) {
          return 1;
        } else {
          return 0;
        }
      });
      break;
    case SortType.DATE_DESC:
      media = media.slice().sort((a, b) => {
        if (a.release_year && b.release_year) {
          return (
            parseInt(b.release_year.toString()) -
            parseInt(a.release_year.toString())
          );
        } else if (a.release_year) {
          return -1;
        } else if (b.release_year) {
          return 1;
        } else {
          return 0;
        }
      });
      break;
    case SortType.TITLE_ASC:
      media = media.slice().sort((a, b) => a.title.localeCompare(b.title));
      break;
    case SortType.TITLE_DESC:
      media = media.slice().sort((a, b) => b.title.localeCompare(a.title));
      break;
    case SortType.RELEVANCE:
    default:
      break;
  }

  return media;
}
