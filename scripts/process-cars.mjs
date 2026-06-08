import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const INPUT_DIR = 'app/assets/images/cars'
const OUTPUT_DIR = 'app/assets/images/cars-processed'

async function processImage(inputPath, outputPath) {
  await sharp(inputPath)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(outputPath)
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true })

  const files = (await fs.readdir(INPUT_DIR))
    .filter((f) => f.endsWith('.jpeg') || f.endsWith('.jpg'))
    .sort()

  for (const [index, file] of files.entries()) {
    const outputName = `car-${String(index + 1).padStart(2, '0')}.webp`
    const inputPath = path.join(INPUT_DIR, file)
    const outputPath = path.join(OUTPUT_DIR, outputName)

    await processImage(inputPath, outputPath)

    const inputStat = await fs.stat(inputPath)
    const outputStat = await fs.stat(outputPath)
    console.log(
      `${file} → ${outputName} (${Math.round(inputStat.size / 1024)}KB → ${Math.round(outputStat.size / 1024)}KB)`,
    )
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
