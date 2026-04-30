import sharp from "sharp";
import { mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, "..", "src-tauri", "icons");

mkdirSync(iconsDir, { recursive: true });

// Generate a simple 1024x1024 blue icon with text
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024">
  <rect width="1024" height="1024" fill="#3B82F6" rx="128"/>
  <text x="512" y="580" font-size="400" font-family="Arial" fill="white" text-anchor="middle">漫</text>
</svg>`;

const sizes = {
  "icon.png": 1024,
  "icon.ico": 256,
  "32x32.png": 32,
  "128x128.png": 128,
  "128x128@2x.png": 256,
};

for (const [name, size] of Object.entries(sizes)) {
  const buf = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
  const outPath = join(iconsDir, name);
  if (name.endsWith(".ico")) {
    // For ico, just save as png - tauri will handle it
    await sharp(Buffer.from(svg)).resize(size, size).toFile(outPath.replace(".ico", ".png"));
    // Copy as ico placeholder
    const { copyFileSync } = await import("fs");
    copyFileSync(outPath.replace(".ico", ".png"), outPath);
  } else {
    await sharp(Buffer.from(svg)).resize(size, size).toFile(outPath);
  }
  console.log(`Generated ${name} (${size}x${size})`);
}

// Generate .ico properly
const icoBuf = await sharp(Buffer.from(svg)).resize(256, 256).png().toBuffer();
// Simple ICO header + PNG data
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0); // reserved
icoHeader.writeUInt16LE(1, 2); // type: icon
icoHeader.writeUInt16LE(1, 4); // count: 1
const entry = Buffer.alloc(16);
entry.writeUInt8(0, 0);  // width (0 = 256)
entry.writeUInt8(0, 1);  // height
entry.writeUInt8(0, 2);  // palette
entry.writeUInt8(0, 3);  // reserved
entry.writeUInt16LE(1, 4);  // color planes
entry.writeUInt16LE(32, 6); // bits per pixel
entry.writeUInt32LE(icoBuf.length, 8); // size
entry.writeUInt32LE(22, 12); // offset
const ico = Buffer.concat([icoHeader, entry, icoBuf]);
const { writeFileSync } = await import("fs");
writeFileSync(join(iconsDir, "icon.ico"), ico);
console.log("Generated icon.ico");

console.log("All icons generated!");
