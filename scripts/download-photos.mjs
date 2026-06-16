import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const galleryDir = path.join(root, 'images', 'gallery');

const PHOTOS = [
  { label: 'Photo - Portrait - Feb 2, 2022, 2:34:41 PM', url: 'https://lh3.googleusercontent.com/pw/AP1GczNV40zc4nPu0fGt42Dh9b7pyGDZgIwp9y573lUuGDtWZuFsR_7XMduTreLcHODwXtDOo9HkYGycojo2bumwN5dGZsSkAXV5HtBMOCRDHOVX9DFHKoy5=w177-h318-no', category: 'charpente' },
  { label: 'Photo - Portrait - Jun 7, 2025, 12:30:49 AM', url: 'https://lh3.googleusercontent.com/pw/AP1GczOeu6OVnBFG1F3IzcFaJWQNYoji9f2xkzw_WKbR-JkXinuD31chjdpqHeOkCEI70Y1NlcHT_YIHHGizBRZh8foncWl7B_T1LC8RM3Ys2fdTiYjLnGP0=w298-h318-no', category: 'charpente' },
  { label: 'Photo - Portrait - Jun 7, 2025, 7:55:11 PM', url: 'https://lh3.googleusercontent.com/pw/AP1GczPWDYHfqUZKB_d_YiApxUxET9n6JQrupwFOAggPbH1FoZgmjmALQspqC8TnwdRyeSQCHz-UUjJHtwf-eMO4h94gFOWwQXyrCdXYItB50_WlAkXNueNq=w236-h318-no', category: 'charpente' },
  { label: 'Photo - Portrait - Jun 24, 2025, 6:08:20 PM', url: 'https://lh3.googleusercontent.com/pw/AP1GczPAJdsKD1Ahd4J6YkhLoCTll6yWZH3zUO6TdPv8rVDxVggA3sL7xPvdpkCJJim8QPfQTpXjKFAyzI7onj57OPQ24Uhwj6B4QsFuW6SnOXJrZAKptmcP=w225-h318-no', category: 'ossature' },
  { label: 'Photo - Landscape - Feb 3, 2026, 6:17:51 PM', url: 'https://lh3.googleusercontent.com/pw/AP1GczN9kkepmHs2v5nt-B_Tqkwhh8rV3EnmjeiCOfP0TC4P7Nc0CvHPhmaeHo2S1-MBDZXHfq70C_ynV8ioes03OdU6Fpe49Pm81GVGJxgMipTKwSK0JKiF=w486-h318-no', category: 'couverture' },
  { label: 'Photo - Portrait - Mar 1, 2026, 12:24:12 PM', url: 'https://lh3.googleusercontent.com/pw/AP1GczODrbZJumA9eUOJas1zOgWgmiQxf5s3B3Fh1RR_qtfgdZYVKDHZztuxYw_lBn6mO3FlD_EDTdFzd6x5zbwx_DtxY4f7EB1en16YkVOnaExaadrqf1qF=w253-h325-no', category: 'charpente' },
  { label: 'Photo - Landscape - Mar 23, 2026, 2:20:46 PM', url: 'https://lh3.googleusercontent.com/pw/AP1GczPpzr2dLcrZCVrwgCNiTSStUk0dkPMIP9xFAymi30CtaV56djKmtAoCUBKPvCBxmQEfFCsV718C7ygCFdHZimpK0IacXvZIEiCdaXBqWAxWc8r8mTCe=w434-h325-no', category: 'couverture' },
  { label: 'Photo - Landscape - Mar 23, 2026, 3:03:06 PM', url: 'https://lh3.googleusercontent.com/pw/AP1GczNdA5KiGXov9BDisAvJB4kRc_Lz23wYy0qX0UrgEGLUAUULKKqoDXYN9M4E_WomjG7S3r5nOcPAD6nIYm-VehEhBb6Ds9uubZcw0X6qJhIrHIqWebi_=w434-h325-no', category: 'ossature' },
  { label: 'Photo - Portrait - May 13, 2026, 9:46:39 PM', url: 'https://lh3.googleusercontent.com/pw/AP1GczMG77E2WO6skqp2tjeeo3qJYq3N07k-wGqnblQ0_2LDmIkD9ls6GmhJvC55syxfE9Be5sthxJjdChdXHjjpgF9T9JYjG99C9_Wdb3nQdYGVZk6oG4Wr=w306-h325-no', category: 'charpente' },
  { label: 'Photo - Landscape - May 13, 2026, 9:52:57 PM', url: 'https://lh3.googleusercontent.com/pw/AP1GczNRTP0OE3F8QUbmxHZNbpFJffr1OwL_yZU1ddOaSlbc71sGw95ZWymsToQupimbtFQKrc7_laQO5tGmSMDArbtaGrBypdkhfLf0Q93CZD06L331F20F=w386-h289-no', category: 'couverture' },
  { label: 'Photo - Portrait - May 13, 2026, 9:54:03 PM', url: 'https://lh3.googleusercontent.com/pw/AP1GczMjyf4COeBA4TnqOCaR3a-Ic_QIfkfjA4T2PvI2pxAGrtjt30-7RlLkDZgVNuiGBtz2BlW7jR89DCmx732CceMcKSUCBWwE_km2aObLGFQKSEjWQL1j=w217-h289-no', category: 'combles' },
  { label: 'Photo - Portrait - May 14, 2026, 9:54:57 AM', url: 'https://lh3.googleusercontent.com/pw/AP1GczO7wqYTmwXOfZillPWhRv0NQwddMjVSf-ExvJFW6xccAnGK3fQtCR8vbde9lpZTPF11vY6y0D8LNZKiUO9GkIbhJDXnoQN-l_TG8U92pMbfB3knPnl5=w217-h289-no', category: 'charpente' },
  { label: 'Photo - Landscape - May 14, 2026, 9:55:25 AM', url: 'https://lh3.googleusercontent.com/pw/AP1GczM_3e-C5cjHyGDBerDfg_M3zXOzmkRL8Z976KzQ2yAa0vg3g9NX4nwDXHPGdUcW4iIcZ4iidMIRYE4rmebj0SHYHhuMBfbA-e7ea2RnLiHPMzyYz42q=w385-h289-no', category: 'ossature' },
  { label: 'Photo - Portrait - May 14, 2026, 3:57:02 PM', url: 'https://lh3.googleusercontent.com/pw/AP1GczP_9z826RxW1UczZWKNCo4XNXxczeriwmj8Rlv44b0tQQrzeFx7oJMB8jBFbti-6ZhzedNz4dE34WQwxx-Wy_RQkg9BZWSaaOZ_mXaybLnqmNnqEWea=w217-h289-no', category: 'menuiseries' },
  { label: 'Photo - Portrait - May 14, 2026, 4:25:36 PM', url: 'https://lh3.googleusercontent.com/pw/AP1GczPwPNg2nWBtg3K2XcHkWvkVQxqYvLNGic_xbeM7Y0GEFR5DXko7Ap3bYT8GTKovj0djzA12Lq1EitC3CkVukuiMF6gz_i6GEMNjBe1n2oXzxN0nvR2_=w216-h288-no', category: 'charpente' },
  { label: 'Photo - Portrait - May 14, 2026, 4:25:52 PM', url: 'https://lh3.googleusercontent.com/pw/AP1GczMGYJIWLWj0bo_jZ3IxFor5F3WT3leb56VvzfxCIf8vXt7TOYk0wELNBJqPKlHHozYMNgqKnqUTAHtXYNn6hm4KVTozSWEqImcQIVxgCBa8iaQC1zef=w216-h288-no', category: 'charpente' },
  { label: 'Photo - Portrait - May 14, 2026, 4:30:59 PM', url: 'https://lh3.googleusercontent.com/pw/AP1GczMDxbFYlOXDi3ue_s0lPDEZ_PHb21z2EyGDlMKXqU7bLFE3tLkWOLCuNynY0GW0znsLoCQKafmN_Oiw_J8lR3IpbvCDN2gck3PoN1mCl6U5sCWA9PgY=w216-h288-no', category: 'charpente' },
  { label: 'Photo - Landscape - May 15, 2026, 2:18:41 PM', url: 'https://lh3.googleusercontent.com/pw/AP1GczOPTZPb-XPa3R_s8zzCQkJniw5V2z4ATKZsDH6E1A9aak28O-5WLsDPa6Ri2ol1iHrkCciG9b2l702iGXkxXY9s5NnjArKihGzTWE4rPl7H_YoXILUJ=w385-h288-no', category: 'couverture' },
  { label: 'Collage - May 15, 2026, 2:40:20 PM', url: 'https://lh3.googleusercontent.com/pw/AP1GczOIsLFpmMNwhfI8GwzGXSPla0O2TOWErTTkA8x_Q23kCnVY2hkzBK-4ImbSm6s4NCDOBTq-hjo1EiA5VmVoDuFvlEfXv038NFEU8xfk0fsQ8QITdhO9=w192-h288-no', category: 'ossature' },
  { label: 'Collage - May 15, 2026, 2:45:41 PM', url: 'https://lh3.googleusercontent.com/pw/AP1GczMnPHhgPjoRkCDZI8YxRYr0ibJElRmYJMESZHy0cGH_8XLjGuIVIVmm4vUmzyQ6dD2vmzu0E05pMDQF9OnGSIHBuDCNIJskYioVWzLUBy34ixNITvtI=w192-h288-no', category: 'combles' },
  { label: 'Collage - May 15, 2026, 2:49:10 PM', url: 'https://lh3.googleusercontent.com/pw/AP1GczNkKACXi3lXKwyb-B3nYH1JedLqocILohYv1XOT4sWoQt3nWtREo1TGROzkYPTDX9pfNiPoI6lVAIchIOyH6rOP7Qxy45hs19nnc4I1oSkKCM9Qqcvb=w162-h291-no', category: 'couverture' },
];

function hiRes(url) {
  const idx = url.indexOf('=w');
  return idx === -1 ? url : `${url.slice(0, idx)}=w1600`;
}

const CATEGORY_LABELS = {
  charpente: 'Charpente',
  combles: 'Aménagement de comble',
  couverture: 'Couverture',
  ossature: 'Ossature bois',
  menuiseries: 'Menuiseries',
};

fs.mkdirSync(galleryDir, { recursive: true });

const manifest = [];

for (let i = 0; i < PHOTOS.length; i++) {
  const photo = PHOTOS[i];
  const id = String(i + 1).padStart(2, '0');
  const filename = `realisation-${id}.webp`;
  const filepath = path.join(galleryDir, filename);
  const src = hiRes(photo.url);

  process.stdout.write(`Downloading ${id}/${PHOTOS.length}... `);
  try {
    const res = await fetch(src);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    await sharp(buffer)
      .resize(1400, 1400, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(filepath);

    manifest.push({
      id,
      file: `images/gallery/${filename}`,
      category: photo.category,
      label: CATEGORY_LABELS[photo.category] || 'Réalisation',
      alt: `Réalisation ETCBC — ${CATEGORY_LABELS[photo.category]}`,
    });
    console.log('ok');
  } catch (err) {
    console.log(`failed (${err.message})`);
  }
}

fs.writeFileSync(
  path.join(root, 'data', 'gallery.json'),
  JSON.stringify(manifest, null, 2),
  'utf8'
);

console.log(`\n${manifest.length} photos saved to images/gallery/`);
