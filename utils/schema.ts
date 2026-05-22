import { z } from "zod";

export const playlistSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().refine((val) => {
    const words = val.trim().split(/\s+/).filter(Boolean);
    return words.length >= 10 && words.length <= 20;
  }, "Description must be between 10 and 20 words"),
  image: z.string().min(1, "Image is required"),
  link: z.string().check(z.url("Must be a valid URL")),
});

export type PlaylistSchema = z.infer<typeof playlistSchema>;
export const newGospelFridaySchema = z.object({
  text: z.string().refine((val) => {
    const words = val.trim().split(/\s+/).filter(Boolean);
    return words.length >= 5 && words.length <= 15;
  }, "Text must be between 5 and 15 words"),
  spotifyLink: z.string().url("Must be a valid Spotify URL"),
  appleMusicLink: z.string().url("Must be a valid Apple Music URL"),
  image: z.string().min(1, "Image is required"),
  backgroundImage: z.string().min(1, "Background image is required"),
});

export type NewGospelFridaySchema = z.infer<typeof newGospelFridaySchema>;
