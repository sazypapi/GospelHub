import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AppleMusicTab from "./AppleMusicTab";
import NewGospelFridayTab from "./NewGospelFridayTab";
import SpotifyTab from "./SpotifyTab";

function AdminTab() {
  return (
    <div>
      <Tabs defaultValue="spotify" className="mt-10">
        <TabsList>
          <TabsTrigger value="spotify" className="font-azonix">
            Spotify
          </TabsTrigger>
          <TabsTrigger value="apple-music" className="font-azonix">
            Apple Music
          </TabsTrigger>
          <TabsTrigger value="new-music-friday" className="font-azonix">
            New Music Friday
          </TabsTrigger>
        </TabsList>
        <TabsContent value="spotify">
          <SpotifyTab />
        </TabsContent>
        <TabsContent value="apple-music">
          <AppleMusicTab />
        </TabsContent>
        <TabsContent value="new-music-friday">
          <NewGospelFridayTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AdminTab;
