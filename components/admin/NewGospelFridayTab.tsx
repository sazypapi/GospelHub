import { getNewGospelFridayPlaylist } from "@/utils/actions";
import { Card, CardContent } from "../ui/card";
import NewGospelFridayForm from "./NewGospelFridayForm";

async function NewGospelFridayTab() {
  const newGospelFriday = await getNewGospelFridayPlaylist();
  return (
    <div>
      <Card className="p-2">
        <CardContent className="flex flex-col w-full p-0">
          <NewGospelFridayForm newGospelFriday={newGospelFriday} />
        </CardContent>
      </Card>
    </div>
  );
}

export default NewGospelFridayTab;
