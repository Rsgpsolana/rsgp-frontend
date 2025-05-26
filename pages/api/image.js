// pages/api/image.js
import { Dropbox } from 'dropbox';

//const dbx = new Dropbox({ accessToken: process.env.NEXT_PUBLIC_DROPBOX_TOKEN });
const dbx = new Dropbox({
    clientId: 'wflnl7bgmzuihrm',
    clientSecret: '2f6blkdk84bt7da',
    accessToken: 'sl.u.AFwrkUsdyQBM7hyUZRWDgbEn5Nd_8z5PTq5Q6LS3teaTnrBwEMXcBWVTELlR_-Q1i5AdC-wg9e1Z99wfrVAHMyXYNQoKLFJ9FO1Xs74nemz2NiqP67rZu_ZW9lP5LwyCuawZqc-Ew8-ITlQoKu3qQWg1m1D5iBLr3Fn5u4RA8gCTWi_bEyaj0iziBB1vmvx83pcq18pm1mFilDJ5rd-JCuQyBsOqU-xB-VnvWiweOiaLQeRn3LeT9fGq1HCOMk1Vy5fQeLLqOdDyzAy48hoa-MQpsLBf6gUaTiGcr_wEoakaRGBqMBFmrDvphRyJTRomLd8faiUArX_Sc6MYaGT60xFgnrlDErTKtqaGBiqoTdBJYMnB9wH3RnKYbTmmYW5HRIrrpdDabzVH1N6Wk2k0YqFJM-ifHx4GXbANgSirMY2tmGVpSSdb6Ig3sRAg7Pr5s7PcSNO592nDVtsjRnDd5gavIESqGEbhKl0R3jRa6q6aDbmjzqRR03deCRLp3teoOdY4bb-FMiNMYBZ4uydX9VI_5H-MQRTcaQ6jt98QpTvdij8c1j_GQWRW7QUqFgbITvQ2bH4D6ZhfKac2B4zWOI7uQTky5INSn6bznu-sAeRfIzA5DWMwa11yyfnojHLxwPzpY3Z6Jt83QcBoMXN92dQ8XpYVAMSO-eL86uhpkuIf6_i-ZnxY16FkbFkw8JHdm8epQhvGJGuHfyMHg8s27rQDGgNmLP1PVyIDJ2v72Eoy66qDiLBjDJ7ZX_tE6SDnhP1pJtZGPPgYl7OMkcZGP4iGGp4fsLFN5wjA-GbHb8nFWdlc_ZQcpRSJNX8vHg_E4zTW4oFymuSTcAVTp-QCMMRg9K8rbense6OpVM4F6qCHnlrOdBoPk1F5XClh2UEw2m02fAsGaoDaZdzMv0WgcmbrzaEwKons0nBH4GxqgQj8-3B8c_gaPblvr4aviJ4biLYpqHrGkQiIszhJdtPWYIeOIvLL7E3LYnoe4cmLDakNnx1kN4f8GUBQoCJjcpTuZk0R9RnVrLgyuBL0hH2MDe04jJYfvJBnVIe1YIPQNrpgudxbQMutWw02gIxFeTCc0jJN1-_Bvkd0cEtEWqjfp0VY6DxkKBOcaIg62NUglQQC45qi9Q0crDCAuMC-aNfUvTjC7N6Gj5OzrgGl3jRRX1FAquIzpjKcXCJaWbYgImjrOhidyA1AHd61scDhjXScVhgTgwY4QFlDzSoY2_orevUEw7brEKTfBC8cCal2j5FGIOCS4iwx13NMcv6ibLXDfHI-1oDFaBkkaZKlO1v6jrxe1TQp-ALvW9k78wiqkBauMEj2CfXV7rbKiLvZRVtoXUZ5hJ3x-n9b9sPjfCHU-i-bQUCOfh-BIm2WyZqiJD6gQJbeWX3mdh7OJJcxg4zxRqwVrbi3QvRX06dZfUqCCvU2'
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
