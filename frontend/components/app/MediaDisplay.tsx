import { useRecogniserStore } from "@/lib/stores";
import { trpc } from "@/trpc/client";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

const MediaDisplay = () => {
  const { selectedActorId } = useRecogniserStore();

  const {
    data: mediaData,
    isLoading,
    isError,
  } = trpc.getMedia.useQuery(
    { actorId: selectedActorId! },
    { enabled: !!selectedActorId }
  );

  return (
    <>
      {selectedActorId && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-alt-text">
            Media for Selected Actor
          </h3>
          {isLoading ? (
            <div className="flex items-center justify-center mt-4 text-gray-500">
              <Loader2Icon className="animate-spin mr-2" />
              Loading media...
            </div>
          ) : isError ? (
            <p className="text-red-500 mt-4">Error fetching media.</p>
          ) : mediaData && mediaData.media.length > 0 ? (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              {mediaData.media.map((media, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-sm"
                >
                  <h4 className="font-semibold">{media.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Type: {capitaliseFirstLetter(media.media_type)}
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
                      className="mt-2 rounded-lg w-full"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-4">
              No media could be found for this actor.
            </p>
          )}
        </div>
      )}
    </>
  );
};

function capitaliseFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export default MediaDisplay;
