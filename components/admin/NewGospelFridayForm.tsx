"use client";
import { NewGospelFriday } from "@prisma/client";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import NewGospelFridayImages from "./NewGospelFridayImages";
import FormContainer from "../global/FormContainer";
import { updateNewGospelFridayPlaylist } from "@/utils/actions";
import { SubmitButton } from "../global/Buttons";

function NewGospelFridayForm({
  newGospelFriday,
}: {
  newGospelFriday: NewGospelFriday | null;
}) {
  const [text, setText] = useState(newGospelFriday?.text || "");
  const [appleMusicLink, setAppleMusicLink] = useState(
    newGospelFriday?.appleMusicLink || "",
  );
  const [spotifyLink, setSpotifyLink] = useState(
    newGospelFriday?.spotifyLink || "",
  );
  const [imagesUploaded, setImagesUploaded] = useState(false);
  return (
    <div>
      <h3 className="font-azonix text-xs mb-5 sm:text-sm text-neutral-400">
        Edit New Gospel Friday Playlist
      </h3>
      <FormContainer action={updateNewGospelFridayPlaylist}>
        <div>
          <Label
            htmlFor="text"
            className="capitalize mb-1 text-xs sm:text-sm font-nexa font-semibold">
            Playlist Text
          </Label>
          <Input
            id="text"
            type="text"
            onChange={(e) => setText(e.target.value)}
            name="text"
            placeholder="New Gospel Friday Playlist Text"
            required
            className="shadow-gray-300 shadow-sm/30 border-2 border-gray-300 placeholder:text-[16px] sm:placeholder:text-sm sm:text-sm text-[16px]"
            value={text}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 sm:gap-10">
          <div>
            <Label
              htmlFor="appleMusicLink"
              className="capitalize mb-1 text-xs sm:text-sm font-nexa font-semibold">
              Apple Music Link
            </Label>
            <Input
              id="appleMusicLink"
              type="text"
              onChange={(e) => setAppleMusicLink(e.target.value)}
              name="appleMusicLink"
              placeholder="Apple Music Link"
              required
              className="shadow-gray-300 shadow-sm/30 border-2 border-gray-300 placeholder:text-[16px] sm:placeholder:text-sm sm:text-sm text-[16px]"
              value={appleMusicLink}
            />
          </div>
          <div>
            <Label
              htmlFor="spotifyLink"
              className="capitalize mb-1 text-xs sm:text-sm font-nexa font-semibold">
              Spotify Link
            </Label>
            <Input
              id="spotifyLink"
              type="text"
              onChange={(e) => setSpotifyLink(e.target.value)}
              name="spotifyLink"
              placeholder="Spotify Link"
              required
              className="shadow-gray-300 shadow-sm/30 border-2 border-gray-300 placeholder:text-[16px] sm:placeholder:text-sm sm:text-sm text-[16px]"
              value={spotifyLink}
            />
          </div>
        </div>
        <NewGospelFridayImages
          newGospelFriday={newGospelFriday}
          imagesUploadedState={setImagesUploaded}
        />{" "}
        <div className="flex justify-end w-full mt-5">
          {imagesUploaded ? (
            <SubmitButton
              text="Update New Gospel Friday Playlist"
              loadingText="Updating..."
              className="text-xs bg-transparent px-2 py-1"
            />
          ) : (
            <p className="text-xs text-neutral-600 font-semibold font-nexa sm:text-sm">
              Upload Images to update New Gospel Friday
            </p>
          )}
        </div>
      </FormContainer>
    </div>
  );
}

export default NewGospelFridayForm;
