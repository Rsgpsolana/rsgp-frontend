// pages/api/images.js
import { Dropbox } from 'dropbox';

export default async function handler(req, res) {
  const dbx = new Dropbox({ accessToken: process.env.NEXT_PUBLIC_DROPBOX_TOKEN});

  try {
    const folderPath = '/apps/rsgp2'; // if App Folder type, leave this as '' (root of app folder)
    const response = await dbx.filesListFolder({ path: folderPath });

    const imageFiles = response.result.entries.filter(
      (entry) => entry[".tag"] === "file"
    );

    const images = await Promise.all(
      imageFiles.map(async (file) => {
        let sharedLink;

        try {
          // Try to find an existing shared link
          const existingLinks = await dbx.sharingListSharedLinks({
            path: file.path_lower,
            direct_only: true,
          });

          if (existingLinks.result.links.length > 0) {
            sharedLink = existingLinks.result.links[0];
          } else {
            // If no link, create one
            sharedLink = await dbx.sharingCreateSharedLinkWithSettings({
              path: file.path_lower,
            });
          }
        } catch (linkError) {
          console.error(`Failed to get or create shared link for ${file.name}`, linkError);
          return null; // Skip this file if error
        }

        return {
            name: file.name.replace(/\.[^/.]+$/, ''),
            url: `/api/image?path=${encodeURIComponent(file.path_lower)}`
        };
      })
    );

    // Filter out nulls
    const filteredImages = images.filter((img) => img !== null);

    res.status(200).json(filteredImages);
  } catch (error) {
    console.error('Error fetching Dropbox images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
}
