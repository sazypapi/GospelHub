/* eslint-disable @next/next/no-img-element */
"use client";
import { SpotifyPlaylist } from "@prisma/client";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import { Button } from "../ui/button";
type Props = {
  playlist: SpotifyPlaylist;
  onChange: (
    id: string,
    field: "name" | "link" | "image" | "description",
    value: any,
  ) => void;
};

function SingleItem({ playlist, onChange }: Props) {
  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const handleFileSelection = (file: File | null) => {
    if (!file) return;
    setFile(file);
    setFilePreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);

    const uploaded = await edgestore.publicFiles.upload({
      file,
      onProgressChange: (p) => console.log("progress", p),
      options: { temporary: true },
    });

    setUploadedUrl(uploaded.url);
    onChange(playlist.id, "image", uploaded.url);
    setIsUploading(false);
    setFile(null);
    setFilePreview(null);
  };
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10">
        <div>
          <Label
            htmlFor={`${playlist.id}name`}
            className="capitalize mb-1 text-xs sm:text-sm font-nexa font-semibold">
            Playlist Name
          </Label>
          <Input
            id={`${playlist.id}name`}
            type="text"
            onChange={(e) => onChange(playlist.id, "name", e.target.value)}
            name="name"
            placeholder="Playlist Name"
            required
            className="shadow-gray-300 shadow-sm/30 border-2 border-gray-300 placeholder:text-[16px] sm:placeholder:text-sm sm:text-sm text-[16px]"
            value={playlist.name ?? ""}
          />
        </div>
        <div>
          <Label
            htmlFor={`${playlist.id}link`}
            className="capitalize mb-1 text-xs sm:text-sm font-nexa font-semibold">
            Playlist Link
          </Label>
          <Input
            id={`${playlist.id}link`}
            type="text"
            onChange={(e) => onChange(playlist.id, "link", e.target.value)}
            name="link"
            placeholder="Playlist Link"
            required
            className="shadow-gray-300 shadow-sm/30 border-2 border-gray-300 placeholder:text-[16px] sm:placeholder:text-sm sm:text-sm text-[16px]"
            value={playlist.link ?? ""}
          />
        </div>
      </div>
      <div className="mt-5">
        <Label
          htmlFor={`${playlist.id}description`}
          className="capitalize mb-1 text-xs sm:text-sm font-nexa font-semibold">
          Playlist Description
        </Label>
        <Textarea
          id={`${playlist.id}description`}
          onChange={(e) => onChange(playlist.id, "description", e.target.value)}
          name="description"
          value={playlist.description ?? ""}
          rows={5}
          placeholder="Playlist Description"
          required
          className="leading-loose border-2 border-gray-300 text-[16px] sm:text-sm placeholder:text-[16px] sm:placeholder:text-sm"
        />
      </div>
      <div className="py-3 flex flex-col gap-3">
        {playlist.image ? (
          <>
            <Label className="capitalize mb-1 sm:mb-2 text-xs sm:text-sm">
              Current Playlist Image
            </Label>
            <img
              src={playlist.image}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg"
            />
          </>
        ) : (
          ""
        )}
        {uploadedUrl ? (
          <>
            <p className="font-semibold text-green-600">Image uploaded ✔</p>
            <img
              src={uploadedUrl}
              alt="Uploaded"
              className="w-32 h-32 object-cover rounded-lg"
            />
          </>
        ) : (
          <>
            <div className="flex flex-col">
              <Label className="capitalize mb-1 sm:mb-2 text-xs sm:text-sm">
                Playlist Image
              </Label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileSelection(e.target.files?.[0] || null)
                  }
                  className="border-2 border-gray-300 w-full p-2 text-xs rounded-md text-black"
                />
                <Button
                  variant="default"
                  type="button"
                  onClick={handleUpload}
                  disabled={isUploading || !file}
                  className="bg-white text-black border-2 border-black hover:bg-black hover:text-white transition duration-500">
                  {isUploading ? "Uploading..." : "Upload"}
                </Button>
              </div>
            </div>
            {filePreview && (
              <img
                src={filePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg mt-2"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SingleItem;
