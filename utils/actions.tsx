"use server";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import z, { ZodError } from "zod";
import { newGospelFridaySchema, playlistSchema } from "./schema";
import { backendClient } from "@/lib/edgestore-server";
import { cookies } from "next/headers";

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  if (error instanceof ZodError) {
    const firstMessage = error.issues[0]?.message;
    return { message: firstMessage };
  }
  return {
    message: error instanceof Error ? error.message : "an error occured",
  };
};

export const getSpotifyPlaylist = async () => {
  const spotifyPlalists = await db.spotifyPlaylist.findMany({});
  return spotifyPlalists;
};

export const updateSpotifyPlaylist = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const rawData = formData.get("currentPlaylists");
    let playLists;
    try {
      playLists = JSON.parse(rawData as string);
    } catch {
      return { message: "Invalid playlist data" };
    }
    const validatedFields = z.array(playlistSchema).parse(playLists);
    const currentPlaylists = await db.spotifyPlaylist.findMany({});
    const toBeDeleted = currentPlaylists.filter(
      (playlist) => !validatedFields.some((field) => field.id === playlist.id),
    );
    if (toBeDeleted.length > 0) {
      await Promise.all(
        toBeDeleted.map((playlist) =>
          db.spotifyPlaylist.delete({ where: { id: playlist.id } }),
        ),
      );
      await Promise.all(
        toBeDeleted.map((playlist) =>
          backendClient.publicFiles.deleteFile({ url: playlist.image }),
        ),
      );
    }
    const names = validatedFields.map((p) => p.name);
    const links = validatedFields.map((p) => p.link);
    const duplicateNames = names.filter((name, i) => names.indexOf(name) !== i);
    const duplicateLinks = links.filter((link, i) => links.indexOf(link) !== i);
    if (duplicateNames.length > 0) {
      return { message: `Duplicate playlist name: ${duplicateNames[0]}` };
    }
    if (duplicateLinks.length > 0) {
      return { message: `Duplicate playlist link: ${duplicateLinks[0]}` };
    }
    await Promise.all(
      validatedFields.map((playlist) =>
        backendClient.publicFiles.confirmUpload({ url: playlist.image }),
      ),
    );
    await Promise.all(
      validatedFields.map((playlist) =>
        db.spotifyPlaylist.upsert({
          where: { id: playlist.id },
          update: {
            name: playlist.name,
            description: playlist.description,
            image: playlist.image,
            link: playlist.link,
          },
          create: {
            name: playlist.name,
            description: playlist.description,
            image: playlist.image,
            link: playlist.link,
          },
        }),
      ),
    );
  } catch (error) {
    return renderError(error);
  }
  redirect("/admin");
};

export const getAppleMusicPlaylist = async () => {
  const appleMusicPlaylists = await db.appleMusicPlaylist.findMany({});
  return appleMusicPlaylists;
};

export const updateAppleMusicPlaylist = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const rawData = formData.get("currentPlaylists");
    let playLists;
    try {
      playLists = JSON.parse(rawData as string);
    } catch {
      return { message: "Invalid playlist data" };
    }
    const validatedFields = z.array(playlistSchema).parse(playLists);
    const currentPlaylists = await db.appleMusicPlaylist.findMany({});
    const toBeDeleted = currentPlaylists.filter(
      (playlist) => !validatedFields.some((field) => field.id === playlist.id),
    );
    if (toBeDeleted.length > 0) {
      await Promise.all(
        toBeDeleted.map((playlist) =>
          db.appleMusicPlaylist.delete({ where: { id: playlist.id } }),
        ),
      );
      await Promise.all(
        toBeDeleted.map((playlist) =>
          backendClient.publicFiles.deleteFile({ url: playlist.image }),
        ),
      );
    }
    const names = validatedFields.map((p) => p.name);
    const links = validatedFields.map((p) => p.link);
    const duplicateNames = names.filter((name, i) => names.indexOf(name) !== i);
    const duplicateLinks = links.filter((link, i) => links.indexOf(link) !== i);
    if (duplicateNames.length > 0) {
      return { message: `Duplicate playlist name: ${duplicateNames[0]}` };
    }
    if (duplicateLinks.length > 0) {
      return { message: `Duplicate playlist link: ${duplicateLinks[0]}` };
    }
    await Promise.all(
      validatedFields.map((playlist) =>
        backendClient.publicFiles.confirmUpload({ url: playlist.image }),
      ),
    );
    await Promise.all(
      validatedFields.map((playlist) =>
        db.appleMusicPlaylist.upsert({
          where: { id: playlist.id },
          update: {
            name: playlist.name,
            description: playlist.description,
            image: playlist.image,
            link: playlist.link,
          },
          create: {
            name: playlist.name,
            description: playlist.description,
            image: playlist.image,
            link: playlist.link,
          },
        }),
      ),
    );
  } catch (error) {
    return renderError(error);
  }
  redirect("/admin");
};

export const getNewGospelFridayPlaylist = async () => {
  const newGospelFridayPlaylist = await db.newGospelFriday.findFirst({});
  return newGospelFridayPlaylist;
};

export const updateNewGospelFridayPlaylist = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = newGospelFridaySchema.parse(rawData);
    const currentPlaylist = await db.newGospelFriday.findFirst({});
    if (currentPlaylist) {
      if (currentPlaylist.image !== validatedFields.image) {
        await backendClient.publicFiles.confirmUpload({
          url: validatedFields.image,
        });
        await backendClient.publicFiles.deleteFile({
          url: currentPlaylist.image,
        });
      }
      if (currentPlaylist.backgroundImage !== validatedFields.backgroundImage) {
        await backendClient.publicFiles.confirmUpload({
          url: validatedFields.backgroundImage,
        });
        await backendClient.publicFiles.deleteFile({
          url: currentPlaylist.backgroundImage,
        });
      }
      await db.newGospelFriday.update({
        where: { id: currentPlaylist.id },
        data: {
          text: validatedFields.text,
          spotifyLink: validatedFields.spotifyLink,
          appleMusicLink: validatedFields.appleMusicLink,
          image: validatedFields.image,
          backgroundImage: validatedFields.backgroundImage,
        },
      });
    } else {
      await backendClient.publicFiles.confirmUpload({
        url: validatedFields.image,
      });
      await backendClient.publicFiles.confirmUpload({
        url: validatedFields.backgroundImage,
      });
      await db.newGospelFriday.create({
        data: {
          text: validatedFields.text,
          spotifyLink: validatedFields.spotifyLink,
          appleMusicLink: validatedFields.appleMusicLink,
          image: validatedFields.image,
          backgroundImage: validatedFields.backgroundImage,
        },
      });
    }
  } catch (error) {
    return renderError(error);
  }
  redirect("/admin");
};

export async function logoutAdmin() {
  (await cookies()).delete("admin_auth");
  redirect("/");
}
