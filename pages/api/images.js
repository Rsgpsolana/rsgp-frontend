// pages/api/images.js
import { Dropbox } from 'dropbox';

export default async function handler(req, res) {
  // const dbx = new Dropbox({ accessToken: process.env.NEXT_PUBLIC_DROPBOX_TOKEN});
  const dbx = new Dropbox({ accessToken: 'sl.u.AFyndTFO6L40iz8PNNz_eU9l__MUukR-CaiqsshjavyRqdsUvroniUdlrr-V8z_ZANeouL8L8aBZWpDe082VWewQQ9gufXPUVipC0m35M_pkvtC4t1v2VPgu4c3GmsaysJkpuo8pC9ImQtwtHeXfi1nFjnGWhnJW932Gqw7iXRiO9u485Yrho8gxNkKEvVcXn9pMFqM_wukxcDUdI3ccyAIpKzr02a2no4bmLm6fU5aN3BIyEedoH0qZthZ76BP5UpntqcWClSYMr8D_SynlFiYpQS63FYy78sBQMRVnGbhVP75IS2rV2bJnRTd8TDKa8Q-oAPpxucl-prPUPXko-4TEGmMLSvX-cEM1_VPb-T_p0vIHCTcY9NjHYWFC3G7CBjYSClsdZJ_tP_mqEudHomiAYTmLH38P020t2lzqFD_fmpP1o5xBSnGCll8bTqjiWmmM86EQvwTcslwpWJUau0uk_cfNfkPtx0Z5GJ5ctV7nzgJXki2XDdQC6uDsAjhdkDvXWNkGHKP20tUFx9LDAXXdyqwmBe3AxieNGga6j_o0TYFZldSw8PF1-7ov9DKPcMkCk3qTs6Ji3r-2QGiJZnW1wHU9UfRTisoKQBQ_X4l30JpySjJktJhGGriX3NSj-XKEu7e02UPEiZ_8grM09ILnIe8n4qC7Ycyf-04YY4OkyZ-Z2H7baD3Dangsvh_3zxT1WJcZ0gKAILMh-DL74wBvAkmJs_9KGv29gWA5LPWPWwBTlf67l6eVZ1I5oK0MmqI6PQHLr12UJiPSuTJPmFTxeQc3cXeSAoJdpex7W81PI9KnFfXuhd0XosfWeABCGP0J2ohrHKKjNybmpVlVgaKC21wO8tVEUErsAZ7N-4d9mfsw9MI8snpprD92vdn0vi8hFWetPHlYffJCbtMBeogl5lXz18pfanKRvC-v9XPGHJW1S1RWUMzC2xhQDWA-wsF0OZkwHGo3ctAyk-pxDOM6Ub-pg6asnVnKA3eta2-6hU6t9mJlCaDKmcLcsRNq2oWDQC31ePE5kyeF1uK6iwLm75UdJu3ETOe_qr-bNvBEJnGSc6BXduWQS6HF3hkTr8bw3s3PUkU2qIdsNE9Mvh3n22TNU966yML2jsaSsSuUpAsky1ywVi-K3VrnzcgmiYX4muiFRkj8FmhGdJzajUpSbtwOFXBMTuvZwRL0CWWb2-f0TW0YouR5A-QeCqAxoam8jugbQQ6xkjzhad2Y2sim3n1MJAyM9jXVsi1VQhHDBTn2yg0QWv_h0OZpCpxGuTPmeGZUvRAGodTBGQ4ulP5Cv4dXoXFgdKoKqdkUdIm4GpnyFI-bdEhC4x6XUHfS-JTmoKwOT7u9MvEJP0XvmGM1qVjANf_nOE7rzYFw8zXhC5UvYGJhipgGrvhhDYe_Z7T1RZ5WqqzTA4Q8k_zcMLIa'});

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
