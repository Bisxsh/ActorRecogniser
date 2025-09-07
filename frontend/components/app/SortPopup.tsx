import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SortType } from "@/lib/schemas";
import { useRecogniserStore } from "@/lib/stores";

export function SortPopup() {
  const { activeSort, setActiveSort } = useRecogniserStore();

  return (
    <div className="bg-alt-text p-8 rounded-md flex flex-col gap-4">
      <RadioGroup defaultValue={activeSort}>
        <div
          className="flex items-center gap-3"
          onClick={() => setActiveSort(SortType.RELEVANCE)}
        >
          <RadioGroupItem
            value={SortType.RELEVANCE}
            id="r1"
            checked={activeSort === SortType.RELEVANCE}
          />
          <Label htmlFor="r1">Relevance</Label>
        </div>
        <div
          className="flex items-center gap-3"
          onClick={() => setActiveSort(SortType.DATE_ASC)}
        >
          <RadioGroupItem
            value={SortType.DATE_ASC}
            id="r2"
            checked={activeSort === SortType.DATE_ASC}
          />
          <Label htmlFor="r2">Date Ascending</Label>
        </div>
        <div
          className="flex items-center gap-3"
          onClick={() => setActiveSort(SortType.DATE_DESC)}
        >
          <RadioGroupItem
            value={SortType.DATE_DESC}
            id="r3"
            checked={activeSort === SortType.DATE_DESC}
          />
          <Label htmlFor="r3">Date Descending</Label>
        </div>
        <div
          className="flex items-center gap-3"
          onClick={() => setActiveSort(SortType.TITLE_ASC)}
        >
          <RadioGroupItem
            value={SortType.TITLE_ASC}
            id="r4"
            checked={activeSort === SortType.TITLE_ASC}
          />
          <Label htmlFor="r4">Title Ascending</Label>
        </div>
        <div
          className="flex items-center gap-3"
          onClick={() => setActiveSort(SortType.TITLE_DESC)}
        >
          <RadioGroupItem
            value={SortType.TITLE_DESC}
            id="r5"
            checked={activeSort === SortType.TITLE_DESC}
          />
          <Label htmlFor="r5">Title Descending</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
