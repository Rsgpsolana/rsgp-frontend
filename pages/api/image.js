// pages/api/image.js
import { Dropbox } from 'dropbox';

const dbx = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN });

export default async function handler(req, res) {
  const { path } = req.query;
  if (!path) return res.status(400).send('Missing path');

  try {
    const file = await dbx.filesDownload({ path: decodeURIComponent(path) });

    res.setHeader('Content-Type', file.result.content_type || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000');

    res.send(file.result.fileBinary);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to proxy image');
  }
}

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
};
