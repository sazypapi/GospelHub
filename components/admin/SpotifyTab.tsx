import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import SpotifyForm from "./SpotifyForm";
import { getSpotifyPlaylist } from "@/utils/actions";

async function SpotifyTab() {
  const spotifyPlaylists = await getSpotifyPlaylist();
  return (
    <div>
      <Card className="p-2">
        <CardContent className="flex flex-col w-full p-0">
          <SpotifyForm playlists={spotifyPlaylists} />
        </CardContent>
        <CardFooter className="w-full flex justify-center items-center">
          <p className="text-center text-xs sm:text-sm text-neutral-600">
            Total Playlist(s):
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SpotifyTab;
