import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { join, extname, dirname, basename } from 'path';

const IMAGE_DIR = 'client/public/image';
const WEBP_QUALITY = 85;
const MAX_WIDTH = 1920;

async function convertToWebP(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

  try {
    const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const originalSize = (await stat(filePath)).size;

    // Get original metadata
    const metadata = await sharp(filePath).metadata();

    // Convert to WebP - GIỮ NGUYÊN ORIENTATION
    await sharp(filePath, {
      failOnError: false
    })
      .rotate() // Tự động xoay theo EXIF nhưng GIỮ NGUYÊN trong metadata
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({
        quality: WEBP_QUALITY,
        effort: 4 // Nén tốt hơn nhưng vẫn nhanh
      })
      .toFile(webpPath);

    const webpSize = (await stat(webpPath)).size;
    const savedPercent = ((originalSize - webpSize) / originalSize * 100).toFixed(1);

    console.log(`✓ Converted: ${basename(filePath)}`);
    console.log(`  Original: ${metadata.width}x${metadata.height} ${(originalSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`  WebP: ${(webpSize / 1024 / 1024).toFixed(2)}MB (saved ${savedPercent}%)`);

    // Delete original JPG
    await unlink(filePath);
    console.log(`  ✓ Deleted original`);
  } catch (error) {
    console.error(`✗ Error converting ${filePath}:`, error.message);
  }
}

async function processDirectory(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      await convertToWebP(fullPath);
    }
  }
}

console.log('🖼️  Converting images to WebP...\n');
await processDirectory(IMAGE_DIR);
console.log('\n✅ Conversion complete!');
console.log('\n⚠️  Remember to update image paths from .JPG to .webp in your code!');
