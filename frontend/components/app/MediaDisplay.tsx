import { useRecogniserStore } from "@/lib/stores";
import { trpc } from "@/trpc/client";
import { ArrowDownUpIcon, FilterIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import IconButton from "../IconButton";
import { PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Popover } from "../ui/popover";
import { FilterPopup } from "./FilterPopup";
import { useEffect } from "react";
import { FilterType, SortType } from "@/lib/schemas";
import { applySortFilter } from "@/lib/utils";
import { SortPopup } from "./SortPopup";

const MediaDisplay = () => {
  const {
    selectedActorId,
    activeFilter,
    activeSort,
    allMedia,
    setAllMedia,
    filteredMedia,
    setFilteredMedia,
  } = useRecogniserStore();

  const {
    data: mediaData,
    isLoading,
    isError,
  } = trpc.getMedia.useQuery(
    { actorId: selectedActorId! },
    { enabled: !!selectedActorId }
  );

  useEffect(() => {
    if (mediaData) {
      setAllMedia(mediaData.media);
    }
    return () => {
      setAllMedia([]);
    };
  }, [mediaData, setAllMedia]);

  useEffect(() => {
    let currMedia = allMedia;

    currMedia = applySortFilter(currMedia, activeFilter, activeSort);

    setFilteredMedia(currMedia);
    return () => {
      setFilteredMedia([]);
    };
  }, [activeFilter, activeSort, allMedia, setFilteredMedia]);

  return (
    <>
      {selectedActorId && (
        <div className="mt-8 lg:px-16">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-alt-text">
              Media for Selected Actor
            </h3>

            <div className="flex flex-center gap-2">
              <Popover>
                <PopoverTrigger>
                  <IconButton icon={<FilterIcon />} onClick={() => {}} />
                </PopoverTrigger>
                <PopoverContent>
                  <FilterPopup />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger>
                  <IconButton icon={<ArrowDownUpIcon />} onClick={() => {}} />
                </PopoverTrigger>
                <PopoverContent>
                  <SortPopup />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center mt-4 text-gray-500">
              <Loader2Icon className="animate-spin mr-2" />
              Loading media...
            </div>
          ) : isError ? (
            <p className="text-red-500 mt-4">Error fetching media.</p>
          ) : mediaData && mediaData.media.length > 0 ? (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredMedia.map((media, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-sm"
                >
                  <h4 className="font-semibold">{media.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Type: {capitaliseFirstLetter(media.media_type)}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Year: {media.release_year ? media.release_year : "Unknown"}
                  </p>

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
