"use client";

import Image from "next/image";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRecogniserStore } from "@/lib/stores";
import { trpc } from "@/trpc/client";
import { useMediaQuery } from "react-responsive";

export default function ActorDisplay() {
  const { identifiedActors, selectedActorId, setSelectedActorId } =
    useRecogniserStore();

  const isMobile = useMediaQuery({ maxWidth: 768 });

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
      {identifiedActors.length === 0 && (
        <p className="text-p">No actors found.</p>
      )}
      {identifiedActors.length > 0 && (
        <>
          <p className="text-p">Click on an actor to see their filmography.</p>
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
                <p className="mt-2 text-center text-sm font-medium">
                  {actor.name}
                </p>
                <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                  {Math.round(actor.matchConfidence)}% Match
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
