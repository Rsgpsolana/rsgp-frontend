// pages/api/image.js
import { Dropbox } from 'dropbox';

//const dbx = new Dropbox({ accessToken: process.env.NEXT_PUBLIC_DROPBOX_TOKEN });
const dbx = new Dropbox({
    clientId: 'wflnl7bgmzuihrm',
    clientSecret: '2f6blkdk84bt7da',
    refreshToken: 'ZtYujoiiPIYAAAAAAAAAAU5dTnEhq68-_0mfJjFdcO5Kf5cy46N3DAOI15wty8zh',
});

export default async function handler(req, res) {
  const { path } = req.query;
  if (!path) return res.status(400).send('Missing path');

  try {
    const file = await dbx.filesDownload({ path: decodeURIComponent(path) });

    res.setHeader('Content-Type', file.result.content_type || 'image/jpeg');
    res.setHeader('Cache-Control', 'no-store');

    const buffer = Buffer.from(file.result.fileBinary, 'binary');
    res.status(200).end(buffer);
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
