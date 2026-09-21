# Sources and Concepts App

The app provides a focused interface for the repository's two content layers.

```text
npm install
npm run dev
```

Open <http://localhost:3000>.

Main views:

- `/sources` - original source documents and reference maps.
- `/concepts` - concepts grouped by chapter.
- `/concepts/C006` - one concept with its supporting extracts.
- `/concepts/depth-map` - the Abhidhamma teaching-depth analysis.
- `/ideas` - candidate ideas, each with Chathura's confirm / pending / reject verdict.
- `/locations` - the places the confirmed ideas use, on a map.
- `/search` - search concept identifiers, titles, chapters, and source documents.
- `/docs` - direct file browser for the two content folders.

## Locations map

The Locations page draws its pins with the Google Maps JavaScript API. Copy `.env.local.example`
to `.env.local` and set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` to a key restricted to the Maps
JavaScript API. Without a key the page still lists every place with a link out to Google Maps.

Places are created on the idea that uses them, never on the Locations page: an idea holds one
location, coordinates are typed in by hand, and a location record is removed once no idea points
at it.
