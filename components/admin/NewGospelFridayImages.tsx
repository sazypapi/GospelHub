"use client";
/* eslint-disable @next/next/no-img-element */
import { NewGospelFriday } from "@prisma/client";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useEdgeStore } from "@/lib/edgestore";
import { useEffect, useState } from "react";

function NewGospelFridayImages({
  newGospelFriday,
  imagesUploadedState,
}: {
  newGospelFriday: NewGospelFriday | null;
  imagesUploadedState: (value: boolean) => void;
}) {
  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(
    newGospelFriday?.image || null,
  );
  const [hasAdminUploaded, setHasAdminUploaded] = useState(false);
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);
  const [backgroundFilePreview, setBackgroundFilePreview] = useState<
    string | null
  >(null);
  const [isBackgroundUploading, setIsBackgroundUploading] = useState(false);
  const [backgroundUploadedUrl, setBackgroundUploadedUrl] = useState<
    string | null
  >(newGospelFriday?.backgroundImage || null);
  const [hasAdminBackgroundUploaded, setHasAdminBackgroundUploaded] =
    useState(false);
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
    setHasAdminUploaded(true);
    setIsUploading(false);
    setFile(null);
    setFilePreview(null);
  };
  const handleBackgroundFileSelection = (file: File | null) => {
    if (!file) return;
    setBackgroundFile(file);
    setBackgroundFilePreview(URL.createObjectURL(file));
  };
  const handleBackgroundUpload = async () => {
    if (!backgroundFile) return;
    setIsBackgroundUploading(true);

    const uploaded = await edgestore.publicFiles.upload({
      file: backgroundFile,
      onProgressChange: (p) => console.log("progress", p),
      options: { temporary: true },
    });

    setBackgroundUploadedUrl(uploaded.url);
    setHasAdminBackgroundUploaded(true);
    setIsBackgroundUploading(false);
    setBackgroundFile(null);
    setBackgroundFilePreview(null);
  };
  useEffect(() => {
    if (uploadedUrl && backgroundUploadedUrl) {
      imagesUploadedState(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedUrl, backgroundUploadedUrl]);
  return (
    <div>
      <input
        type="hidden"
        name="image"
        value={uploadedUrl || newGospelFriday?.image || ""}
      />
      <input
        type="hidden"
        name="backgroundImage"
        value={backgroundUploadedUrl || newGospelFriday?.backgroundImage || ""}
      />
      <div className="flex flex-col gap-3 mt-3">
        {newGospelFriday?.image ? (
          <>
            <Label className="capitalize mb-1 sm:mb-2 text-xs sm:text-sm">
              Current Playlist Image
            </Label>
            <img
              src={newGospelFriday.image}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg"
            />
          </>
        ) : (
          ""
        )}
        {hasAdminUploaded ? (
          <>
            <p className="font-semibold text-green-600">Image uploaded ✔</p>
            <img
              src={uploadedUrl!}
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
      <div className="flex flex-col gap-3 mt-3">
        {newGospelFriday?.backgroundImage ? (
          <>
            <Label className="capitalize mb-1 sm:mb-2 text-xs sm:text-sm">
              Current Background Image
            </Label>
            <img
              src={newGospelFriday.backgroundImage}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg"
            />
          </>
        ) : (
          ""
        )}
        {hasAdminBackgroundUploaded ? (
          <>
            <p className="font-semibold text-green-600">Image uploaded ✔</p>
            <img
              src={backgroundUploadedUrl!}
              alt="Uploaded"
              className="w-32 h-32 object-cover rounded-lg"
            />
          </>
        ) : (
          <>
            <div className="flex flex-col">
              <Label className="capitalize mb-1 sm:mb-2 text-xs sm:text-sm">
                Background Image
              </Label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleBackgroundFileSelection(e.target.files?.[0] || null)
                  }
                  className="border-2 border-gray-300 w-full p-2 text-xs rounded-md text-black"
                />
                <Button
                  variant="default"
                  type="button"
                  onClick={handleBackgroundUpload}
                  disabled={isBackgroundUploading || !backgroundFile}
                  className="bg-white text-black border-2 border-black hover:bg-black hover:text-white transition duration-500">
                  {isBackgroundUploading ? "Uploading..." : "Upload"}
                </Button>
              </div>
            </div>
            {backgroundFilePreview && (
              <img
                src={backgroundFilePreview}
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

export default NewGospelFridayImages;
