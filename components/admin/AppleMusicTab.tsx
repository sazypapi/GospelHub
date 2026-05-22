import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { getAppleMusicPlaylist } from "@/utils/actions";
import AppleMusicForm from "./AppleMusicForm";

async function AppleMusicTab() {
  const appleMusicPlaylists = await getAppleMusicPlaylist();
  return (
    <div>
      <Card className="p-2">
        <CardContent className="flex flex-col w-full p-0">
          <AppleMusicForm playlists={appleMusicPlaylists} />
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

export default AppleMusicTab;
