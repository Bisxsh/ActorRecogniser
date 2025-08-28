"use client";

import Image from "next/image";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRecogniserStore } from "@/lib/stores";
import { trpc } from "@/trpc/client";

export default function ActorDisplay() {
  const { identifiedActors, selectedActorId, setSelectedActorId } =
    useRecogniserStore();

  const {
    data: mediaData,
    isLoading,
    isError,
  } = trpc.getMedia.useQuery(
    { actorId: selectedActorId! },
    { enabled: !!selectedActorId }
  );

  const handleActorClick = (actorId: string) => {
    setSelectedActorId(actorId.toString());
  };

  if (!identifiedActors) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mt-8">
      <h2 className="text-2xl font-bold">Identified Actors</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {identifiedActors.map((actor) => (
          <div
            key={actor.id}
            onClick={() => handleActorClick(actor.id)}
            className={cn(
              "cursor-pointer p-2 rounded-lg transition-all",
              "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600",
              selectedActorId === actor.id && "ring-2 ring-blue-500"
            )}
          >
            <Image
              src={actor.imageUrl}
              alt={actor.name}
              width={100}
              height={100}
              className="rounded-sm w-24 h-24 object-cover mx-auto"
            />
            <p className="mt-2 text-center text-sm font-medium">{actor.name}</p>
            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
              {Math.round(actor.matchConfidence)}% Match
            </p>
          </div>
        ))}
      </div>

      {selectedActorId && (
        <div className="mt-8">
          <h3 className="text-xl font-bold">Media for Selected Actor</h3>
          {isLoading ? (
            <div className="flex items-center justify-center mt-4 text-gray-500">
              <Loader2Icon className="animate-spin mr-2" />
              Loading media...
            </div>
          ) : isError ? (
            <p className="text-red-500 mt-4">Error fetching media.</p>
          ) : mediaData && mediaData.media.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {mediaData.media.map((media, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-sm"
                >
                  <h4 className="font-semibold">{media.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Type: {media.media_type}
                  </p>
                  {media.release_year && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Year: {media.release_year}
                    </p>
                  )}
                  {media.image_url && (
                    <Image
                      src={media.image_url}
                      alt={media.title}
                      width={100}
                      height={150}
                      className="mt-2 rounded-lg"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-4">
              No actors could be identified. Please try another image.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
