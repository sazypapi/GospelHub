"use client";
import { SpotifyPlaylist } from "@prisma/client";
import { useMemo, useState } from "react";
import SingleItem from "./SingleItem";
import FormContainer from "../global/FormContainer";
import { SubmitButton } from "../global/Buttons";
import { updateSpotifyPlaylist } from "@/utils/actions";

function SpotifyForm({ playlists }: { playlists: SpotifyPlaylist[] }) {
  const [currentPlaylists, setCurrentPlaylists] = useState<SpotifyPlaylist[]>(
    playlists.length > 0
      ? playlists
      : [
          {
            id: "initial",
            name: "",
            link: "",
            description: "",
            image: "",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
  );
  const updatePlaylist = (
    id: string,
    field: keyof SpotifyPlaylist,
    value: string,
  ) => {
    setCurrentPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === id ? { ...playlist, [field]: value } : playlist,
      ),
    );
  };
  const removePlaylist = (id: string) => {
    if (currentPlaylists.length === 1) {
      alert("At least one playlist is required.");
      return;
    }
    setCurrentPlaylists((prev) =>
      prev.filter((playlist) => playlist.id !== id),
    );
  };
  const addPlaylist = () => {
    setCurrentPlaylists((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        link: "",
        name: "",
        description: "",
        image: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  };

  const imageUploaded = useMemo(
    () =>
      currentPlaylists.length > 0 &&
      currentPlaylists.every(
        (playlist) => playlist.image && playlist.image.length > 0,
      ),
    [currentPlaylists],
  );
  const currentPlaylistJson = useMemo(
    () => JSON.stringify(currentPlaylists),
    [currentPlaylists],
  );
  return (
    <div>
      <h3 className="font-azonix text-xs mb-5 sm:text-sm text-neutral-400">
        Edit Spotify Playlists
      </h3>
      <FormContainer action={updateSpotifyPlaylist}>
        <input
          type="hidden"
          name="currentPlaylists"
          value={currentPlaylistJson}
        />
        {currentPlaylists.map((playlist, index) => {
          return (
            <div
              key={playlist.id}
              className={`${index < currentPlaylists.length - 1 ? "border-b-2 border-neutral-400 last:border-none py-5" : "py-5"}`}>
              <SingleItem playlist={playlist} onChange={updatePlaylist} />
              <div className="w-full flex justify-end gap-2 mt-2">
                <button
                  onClick={() => removePlaylist(playlist.id)}
                  className="text-red-500 bg-transparent px-2 py-1 text-xs hover:bg-red-500 hover:text-white border-2 border-red-500 transition duration-500 rounded-md"
                  type="button">
                  Remove
                </button>
                {index === currentPlaylists.length - 1 && (
                  <button
                    onClick={addPlaylist}
                    className="text-neutral-950 bg-transparent px-2 py-1 hover:bg-black text-xs hover:text-white border-2 border-black transition duration-500 rounded-md"
                    type="button">
                    + Add New Playlist
                  </button>
                )}
              </div>
            </div>
          );
        })}
        <div className="flex justify-end w-full mt-5">
          {imageUploaded ? (
            <SubmitButton
              text="Update Spotify Playlists"
              loadingText="Updating..."
              className="text-xs bg-transparent px-2 py-1"
            />
          ) : (
            <p className="text-xs text-neutral-600 font-semibold font-nexa sm:text-sm">
              Upload Images to update Playlists
            </p>
          )}
        </div>
      </FormContainer>
    </div>
  );
}

export default SpotifyForm;
