import { z } from "zod";

export type apiIdentifiedActorsType = {
  id: string;
  name: string;
  image_url: string;
  match_confidence: number;
};

export const identifiedActorSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  imageUrl: z.string().url(),
  matchConfidence: z.number().min(0).max(1),
});

export const identifyActorsResponseSchema = z.object({
  matches: z.array(identifiedActorSchema),
});

export const mediaSchema = z.object({
  title: z.string().min(1),
  media_type: z.string().min(1),
  release_year: z.string().nullable(),
  image_url: z.string().url().nullable(),
});

export const actorMediaSchema = z.object({
  media: z.array(mediaSchema),
});

export type IdentifiedActor = z.infer<typeof identifiedActorSchema>;
export type IdentifyActorsResponse = z.infer<
  typeof identifyActorsResponseSchema
>;
export type Media = z.infer<typeof mediaSchema>;
export type ActorMedia = z.infer<typeof actorMediaSchema>;

export enum SortType {
  RELEVANCE = "RELEVANCE",
  DATE_ASC = "DATE_ASC",
  DATE_DESC = "DATE_DESC",
  TITLE_ASC = "TITLE_ASC",
  TITLE_DESC = "TITLE_DESC",
}

export enum FilterType {
  MOVIE = "MOVIE",
  SHOW = "SHOW",
  ALL = "ALL",
}
