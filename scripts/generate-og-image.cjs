const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const WIDTH = 1200;
const HEIGHT = 630;

const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext('2d');

// Colors
const cream = '#FAF7F2';
const forestGreen = '#1C3A25';
const sage = '#6B8F6E';
const rose = '#C4957A';
const stoneGray = '#6B6560';

// Background
ctx.fillStyle = cream;
ctx.fillRect(0, 0, WIDTH, HEIGHT);

// Bottom accent strip (forest green)
ctx.fillStyle = forestGreen;
ctx.fillRect(0, 590, WIDTH, 40);

// Subtle top accent line (rose)
ctx.fillStyle = rose;
ctx.fillRect(0, 0, WIDTH, 4);

// Logo: "Equivie" with "vie" in sage, then "MED"
const logoY = 280;

// "Equi" in forest green
ctx.font = '72px Georgia, serif';
ctx.fillStyle = forestGreen;
ctx.letterSpacing = '-1px';
ctx.fillText('Equi', 100, logoY);

// Measure "Equi" width
const equiWidth = ctx.measureText('Equi').width;

// "vie" in sage bold
ctx.font = 'bold 72px Georgia, serif';
ctx.fillStyle = sage;
ctx.fillText('vie', 100 + equiWidth, logoY);

const vieWidth = ctx.measureText('vie').width;

// "MED" in forest green, smaller, uppercase style
ctx.font = '500 30px Arial, sans-serif';
ctx.fillStyle = forestGreen;
ctx.fillText('MED', 100 + equiWidth + vieWidth + 16, logoY - 12);

// Tagline
ctx.font = '36px Georgia, serif';
ctx.fillStyle = '#2C2826';
ctx.fillText('Menopause specialists who listen.', 100, 360);

// URL
ctx.font = '22px Arial, sans-serif';
ctx.fillStyle = stoneGray;
ctx.fillText('equiviemed.ch', 100, 430);

// Small sage leaf-like accent circle (decorative)
ctx.beginPath();
ctx.arc(1080, 300, 60, 0, Math.PI * 2);
ctx.fillStyle = sage + '22'; // very subtle
ctx.fill();

ctx.beginPath();
ctx.arc(1080, 300, 35, 0, Math.PI * 2);
ctx.fillStyle = sage + '33';
ctx.fill();

// Save
const outputPath = path.join(__dirname, '..', 'public', 'og-image.png');
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(outputPath, buffer);

console.log(`OG image saved to ${outputPath}`);
console.log(`File size: ${(buffer.length / 1024).toFixed(1)} KB`);
