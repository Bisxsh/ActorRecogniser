import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterType } from "@/lib/schemas";
import { useRecogniserStore } from "@/lib/stores";

export function FilterPopup() {
  const { activeFilter, setActiveFilter } = useRecogniserStore();

  return (
    <div className="bg-alt-text p-8 rounded-md flex flex-col gap-4">
      <RadioGroup defaultValue={activeFilter}>
        <div
          className="flex items-center gap-3"
          onClick={() => setActiveFilter(FilterType.ALL)}
        >
          <RadioGroupItem
            value={FilterType.ALL}
            id="r1"
            checked={activeFilter === FilterType.ALL}
          />
          <Label htmlFor="r1">All</Label>
        </div>
        <div
          className="flex items-center gap-3"
          onClick={() => setActiveFilter(FilterType.MOVIE)}
        >
          <RadioGroupItem
            value={FilterType.MOVIE}
            id="r2"
            checked={activeFilter === FilterType.MOVIE}
          />
          <Label htmlFor="r2">Movies</Label>
        </div>
        <div
          className="flex items-center gap-3"
          onClick={() => setActiveFilter(FilterType.SHOW)}
        >
          <RadioGroupItem
            value={FilterType.SHOW}
            id="r3"
            checked={activeFilter === FilterType.SHOW}
          />
          <Label htmlFor="r3">Shows</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
