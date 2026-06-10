import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const DIR = 'app/assets/images/cars-processed'
const PREVIEW = process.env.PREVIEW === '1'
const PREVIEW_DIR = '/tmp/plate-preview'

/**
 * Plate regions as fractions of the image: { x, y, w, h }.
 * Cars without a visible plate are simply omitted.
 */
const MASKS = {
  // car-01.webp уже замазан
  'car-02.webp': [{ x: 0.595, y: 0.673, w: 0.235, h: 0.062 }],
  'car-03.webp': [{ x: 0.075, y: 0.602, w: 0.215, h: 0.072 }],
  'car-05.webp': [{ x: 0.04, y: 0.705, w: 0.21, h: 0.078 }],
  'car-06.webp': [{ x: 0.375, y: 0.705, w: 0.225, h: 0.09 }],
  'car-07.webp': [{ x: 0.772, y: 0.662, w: 0.185, h: 0.07 }],
  'car-08.webp': [{ x: 0.035, y: 0.553, w: 0.215, h: 0.072 }],
  'car-09.webp': [
    { x: 0.09, y: 0.618, w: 0.215, h: 0.07 },
    { x: 0.045, y: 0.275, w: 0.14, h: 0.055 },
  ],
  'car-10.webp': [{ x: 0.01, y: 0.635, w: 0.24, h: 0.062 }],
  'car-11.webp': [{ x: 0.04, y: 0.653, w: 0.21, h: 0.062 }],
  'car-12.webp': [{ x: 0.625, y: 0.625, w: 0.225, h: 0.055 }],
  'car-14.webp': [{ x: 0.715, y: 0.555, w: 0.175, h: 0.05 }],
  'car-15.webp': [{ x: 0.175, y: 0.58, w: 0.23, h: 0.055 }],
  'car-16.webp': [
    { x: 0.155, y: 0.6, w: 0.23, h: 0.055 },
    { x: 0.075, y: 0.365, w: 0.135, h: 0.045 },
  ],
  'car-20.webp': [
    { x: 0.335, y: 0.665, w: 0.23, h: 0.06 },
    { x: 0.02, y: 0.3, w: 0.135, h: 0.045 },
  ],
}

async function maskRegions(buffer, regions) {
  if (!regions?.length) return buffer

  const meta = await sharp(buffer).metadata()
  const { width, height } = meta
  if (!width || !height) return buffer

  const composites = []
  for (const r of regions) {
    const left = Math.max(0, Math.round(r.x * width))
    const top = Math.max(0, Math.round(r.y * height))
    const w = Math.min(width - left, Math.round(r.w * width))
    const h = Math.min(height - top, Math.round(r.h * height))
    if (w <= 0 || h <= 0) continue

    const blurred = await sharp(buffer)
      .extract({ left, top, width: w, height: h })
      .blur(25)
      .toBuffer()

    composites.push({ input: blurred, left, top })
  }

  if (!composites.length) return buffer
  return sharp(buffer).composite(composites).toBuffer()
}

async function main() {
  if (PREVIEW) await fs.mkdir(PREVIEW_DIR, { recursive: true })

  const files = (await fs.readdir(DIR)).filter((f) => f.endsWith('.webp')).sort()

  for (const file of files) {
    const regions = MASKS[file]
    if (!regions?.length) {
      console.log(`${file} — нет номера, пропуск`)
      continue
    }

    const src = path.join(DIR, file)
    const buffer = await fs.readFile(src)
    const masked = await maskRegions(buffer, regions)

    if (PREVIEW) {
      await sharp(masked).resize({ width: 560 }).png().toFile(path.join(PREVIEW_DIR, file.replace('.webp', '.png')))
    } else {
      const tmp = path.join(DIR, `.tmp-${file}`)
      await sharp(masked).webp({ quality: 80, effort: 6 }).toFile(tmp)
      await fs.rename(tmp, src)
    }
    console.log(`${file} — ${regions.length} маск(а)`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
