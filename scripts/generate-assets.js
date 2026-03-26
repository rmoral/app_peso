const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ASSETS_DIR = path.join(__dirname, '..', 'assets');
const STORE_DIR = path.join(ASSETS_DIR, 'store');

// Brand colors
const PRIMARY = '#0D9488';
const PRIMARY_DARK = '#0F766E';
const ACCENT = '#F59E0B';
const BG_LIGHT = '#F0FDF4';
const WHITE = '#FFFFFF';

// ===== SVG TEMPLATES =====

function appIconSVG(size) {
  const s = size;
  const cx = s / 2;
  const cy = s / 2;
  const r = s * 0.42;
  const scaleW = s * 0.18;
  const figH = s * 0.3;
  const figW = s * 0.08;

  return `<svg width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${PRIMARY}"/>
      <stop offset="100%" stop-color="${PRIMARY_DARK}"/>
    </linearGradient>
    <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${ACCENT}"/>
      <stop offset="100%" stop-color="#F97316"/>
    </linearGradient>
  </defs>
  <!-- Background rounded square -->
  <rect width="${s}" height="${s}" rx="${s * 0.22}" fill="url(#bg)"/>

  <!-- Circular progress ring -->
  <circle cx="${cx}" cy="${cy * 0.85}" r="${r}" fill="none" stroke="${WHITE}" stroke-width="${s * 0.025}" opacity="0.2"/>
  <circle cx="${cx}" cy="${cy * 0.85}" r="${r}" fill="none" stroke="url(#ring)" stroke-width="${s * 0.035}"
    stroke-linecap="round" stroke-dasharray="${2 * Math.PI * r * 0.75} ${2 * Math.PI * r * 0.25}"
    transform="rotate(-90 ${cx} ${cy * 0.85})"/>

  <!-- Stylized person / fitness figure -->
  <!-- Head -->
  <circle cx="${cx}" cy="${cy * 0.52}" r="${s * 0.07}" fill="${WHITE}"/>
  <!-- Body -->
  <line x1="${cx}" y1="${cy * 0.62}" x2="${cx}" y2="${cy * 1.0}" stroke="${WHITE}" stroke-width="${figW * 0.6}" stroke-linecap="round"/>
  <!-- Arms raised (victory pose) -->
  <line x1="${cx}" y1="${cy * 0.72}" x2="${cx - scaleW}" y2="${cy * 0.55}" stroke="${WHITE}" stroke-width="${figW * 0.5}" stroke-linecap="round"/>
  <line x1="${cx}" y1="${cy * 0.72}" x2="${cx + scaleW}" y2="${cy * 0.55}" stroke="${WHITE}" stroke-width="${figW * 0.5}" stroke-linecap="round"/>
  <!-- Legs -->
  <line x1="${cx}" y1="${cy * 1.0}" x2="${cx - s * 0.1}" y2="${cy * 1.2}" stroke="${WHITE}" stroke-width="${figW * 0.5}" stroke-linecap="round"/>
  <line x1="${cx}" y1="${cy * 1.0}" x2="${cx + s * 0.1}" y2="${cy * 1.2}" stroke="${WHITE}" stroke-width="${figW * 0.5}" stroke-linecap="round"/>

  <!-- Star accent on ring -->
  <polygon points="${cx + r * 0.7},${cy * 0.85 - r * 0.7} ${cx + r * 0.75},${cy * 0.85 - r * 0.58} ${cx + r * 0.87},${cy * 0.85 - r * 0.58} ${cx + r * 0.77},${cy * 0.85 - r * 0.48} ${cx + r * 0.81},${cy * 0.85 - r * 0.35} ${cx + r * 0.7},${cy * 0.85 - r * 0.43} ${cx + r * 0.59},${cy * 0.85 - r * 0.35} ${cx + r * 0.63},${cy * 0.85 - r * 0.48} ${cx + r * 0.53},${cy * 0.85 - r * 0.58} ${cx + r * 0.65},${cy * 0.85 - r * 0.58}"
    fill="${ACCENT}"/>

  <!-- App name -->
  <text x="${cx}" y="${cy * 1.55}" font-family="Arial, Helvetica, sans-serif" font-size="${s * 0.11}" font-weight="800" fill="${WHITE}" text-anchor="middle">PesoFit</text>
</svg>`;
}

function adaptiveForegroundSVG(size) {
  const s = size;
  const cx = s / 2;
  const cy = s / 2;
  const r = s * 0.25;
  const scaleW = s * 0.11;
  const figW = s * 0.05;

  return `<svg width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${ACCENT}"/>
      <stop offset="100%" stop-color="#F97316"/>
    </linearGradient>
  </defs>

  <!-- Circular progress ring -->
  <circle cx="${cx}" cy="${cy * 0.9}" r="${r}" fill="none" stroke="${WHITE}" stroke-width="${s * 0.015}" opacity="0.3"/>
  <circle cx="${cx}" cy="${cy * 0.9}" r="${r}" fill="none" stroke="url(#ring)" stroke-width="${s * 0.022}"
    stroke-linecap="round" stroke-dasharray="${2 * Math.PI * r * 0.75} ${2 * Math.PI * r * 0.25}"
    transform="rotate(-90 ${cx} ${cy * 0.9})"/>

  <!-- Person -->
  <circle cx="${cx}" cy="${cy * 0.6}" r="${s * 0.045}" fill="${WHITE}"/>
  <line x1="${cx}" y1="${cy * 0.67}" x2="${cx}" y2="${cy * 0.9}" stroke="${WHITE}" stroke-width="${figW * 0.5}" stroke-linecap="round"/>
  <line x1="${cx}" y1="${cy * 0.74}" x2="${cx - scaleW}" y2="${cy * 0.62}" stroke="${WHITE}" stroke-width="${figW * 0.4}" stroke-linecap="round"/>
  <line x1="${cx}" y1="${cy * 0.74}" x2="${cx + scaleW}" y2="${cy * 0.62}" stroke="${WHITE}" stroke-width="${figW * 0.4}" stroke-linecap="round"/>
  <line x1="${cx}" y1="${cy * 0.9}" x2="${cx - s * 0.065}" y2="${cy * 1.05}" stroke="${WHITE}" stroke-width="${figW * 0.4}" stroke-linecap="round"/>
  <line x1="${cx}" y1="${cy * 0.9}" x2="${cx + s * 0.065}" y2="${cy * 1.05}" stroke="${WHITE}" stroke-width="${figW * 0.4}" stroke-linecap="round"/>

  <!-- Text -->
  <text x="${cx}" y="${cy * 1.3}" font-family="Arial, Helvetica, sans-serif" font-size="${s * 0.065}" font-weight="800" fill="${WHITE}" text-anchor="middle">PesoFit</text>
</svg>`;
}

function splashSVG(w, h) {
  const cx = w / 2;
  const cy = h / 2;
  const iconSize = Math.min(w, h) * 0.15;

  return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${w}" height="${h}" fill="${BG_LIGHT}"/>

  <!-- Central icon circle -->
  <circle cx="${cx}" cy="${cy - 40}" r="${iconSize}" fill="${PRIMARY}"/>

  <!-- Person inside circle -->
  <circle cx="${cx}" cy="${cy - 40 - iconSize * 0.2}" r="${iconSize * 0.12}" fill="${WHITE}"/>
  <line x1="${cx}" y1="${cy - 40 - iconSize * 0.08}" x2="${cx}" y2="${cy - 40 + iconSize * 0.2}" stroke="${WHITE}" stroke-width="${iconSize * 0.07}" stroke-linecap="round"/>
  <line x1="${cx}" y1="${cy - 40 + iconSize * 0.0}" x2="${cx - iconSize * 0.22}" y2="${cy - 40 - iconSize * 0.15}" stroke="${WHITE}" stroke-width="${iconSize * 0.06}" stroke-linecap="round"/>
  <line x1="${cx}" y1="${cy - 40 + iconSize * 0.0}" x2="${cx + iconSize * 0.22}" y2="${cy - 40 - iconSize * 0.15}" stroke="${WHITE}" stroke-width="${iconSize * 0.06}" stroke-linecap="round"/>
  <line x1="${cx}" y1="${cy - 40 + iconSize * 0.2}" x2="${cx - iconSize * 0.15}" y2="${cy - 40 + iconSize * 0.42}" stroke="${WHITE}" stroke-width="${iconSize * 0.06}" stroke-linecap="round"/>
  <line x1="${cx}" y1="${cy - 40 + iconSize * 0.2}" x2="${cx + iconSize * 0.15}" y2="${cy - 40 + iconSize * 0.42}" stroke="${WHITE}" stroke-width="${iconSize * 0.06}" stroke-linecap="round"/>

  <!-- Ring around circle -->
  <circle cx="${cx}" cy="${cy - 40}" r="${iconSize * 1.15}" fill="none" stroke="${ACCENT}" stroke-width="${iconSize * 0.06}"
    stroke-linecap="round" stroke-dasharray="${2 * Math.PI * iconSize * 1.15 * 0.75} ${2 * Math.PI * iconSize * 1.15 * 0.25}"
    transform="rotate(-90 ${cx} ${cy - 40})"/>

  <!-- App name -->
  <text x="${cx}" y="${cy + iconSize * 1.5}" font-family="Arial, Helvetica, sans-serif" font-size="48" font-weight="800" fill="${PRIMARY_DARK}" text-anchor="middle">PesoFit</text>
  <text x="${cx}" y="${cy + iconSize * 1.5 + 30}" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#64748B" text-anchor="middle">Tu compañero fitness</text>
</svg>`;
}

function featureGraphicSVG() {
  const w = 1024;
  const h = 500;
  const cx = w / 2;
  const cy = h / 2;

  return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${PRIMARY}"/>
      <stop offset="100%" stop-color="${PRIMARY_DARK}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>

  <!-- Decorative circles -->
  <circle cx="100" cy="100" r="200" fill="${WHITE}" opacity="0.03"/>
  <circle cx="900" cy="400" r="250" fill="${WHITE}" opacity="0.03"/>

  <!-- Icons row -->
  <text x="${cx - 200}" y="${cy - 20}" font-size="60" text-anchor="middle">💪</text>
  <text x="${cx - 67}" y="${cy - 20}" font-size="60" text-anchor="middle">⚖️</text>
  <text x="${cx + 67}" y="${cy - 20}" font-size="60" text-anchor="middle">🍽️</text>
  <text x="${cx + 200}" y="${cy - 20}" font-size="60" text-anchor="middle">🏆</text>

  <!-- App name -->
  <text x="${cx}" y="${cy + 70}" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="800" fill="${WHITE}" text-anchor="middle">PesoFit</text>
  <text x="${cx}" y="${cy + 110}" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="${WHITE}" opacity="0.8" text-anchor="middle">Control de peso · Ejercicio · Nutrición · Gamificación</text>
</svg>`;
}

function screenshotFrameSVG(w, h, title, subtitle, emoji, bgColor) {
  return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${w}" height="${h}" fill="${bgColor || BG_LIGHT}"/>

  <!-- Top bar area -->
  <rect x="0" y="0" width="${w}" height="${h * 0.35}" fill="${PRIMARY}" rx="0"/>

  <!-- Emoji -->
  <text x="${w / 2}" y="${h * 0.15}" font-size="${w * 0.12}" text-anchor="middle">${emoji}</text>

  <!-- Title -->
  <text x="${w / 2}" y="${h * 0.25}" font-family="Arial, Helvetica, sans-serif" font-size="${w * 0.055}" font-weight="800" fill="${WHITE}" text-anchor="middle">${title}</text>

  <!-- Subtitle -->
  <text x="${w / 2}" y="${h * 0.31}" font-family="Arial, Helvetica, sans-serif" font-size="${w * 0.03}" fill="${WHITE}" opacity="0.8" text-anchor="middle">${subtitle}</text>

  <!-- Phone frame placeholder -->
  <rect x="${w * 0.15}" y="${h * 0.38}" width="${w * 0.7}" height="${h * 0.58}" rx="${w * 0.03}" fill="${WHITE}" stroke="#E2E8F0" stroke-width="2"/>

  <!-- Inner content hint lines -->
  <rect x="${w * 0.22}" y="${h * 0.44}" width="${w * 0.56}" height="${h * 0.04}" rx="6" fill="#E2E8F0"/>
  <rect x="${w * 0.22}" y="${h * 0.52}" width="${w * 0.4}" height="${h * 0.04}" rx="6" fill="#E2E8F0"/>
  <rect x="${w * 0.22}" y="${h * 0.60}" width="${w * 0.56}" height="${h * 0.04}" rx="6" fill="#E2E8F0"/>
  <rect x="${w * 0.22}" y="${h * 0.68}" width="${w * 0.35}" height="${h * 0.04}" rx="6" fill="#E2E8F0"/>
  <rect x="${w * 0.22}" y="${h * 0.76}" width="${w * 0.56}" height="${h * 0.04}" rx="6" fill="#E2E8F0"/>
  <rect x="${w * 0.22}" y="${h * 0.84}" width="${w * 0.48}" height="${h * 0.04}" rx="6" fill="#E2E8F0"/>
</svg>`;
}

// ===== GENERATION =====

async function generate() {
  console.log('Generating PesoFit assets...\n');

  // 1. Main app icon (1024x1024)
  console.log('  → App icon 1024x1024');
  await sharp(Buffer.from(appIconSVG(1024)))
    .png()
    .toFile(path.join(ASSETS_DIR, 'icon.png'));

  // 2. Adaptive icon foreground (1024x1024 with safe zone)
  console.log('  → Adaptive icon foreground');
  await sharp(Buffer.from(adaptiveForegroundSVG(1024)))
    .png()
    .toFile(path.join(ASSETS_DIR, 'adaptive-icon-foreground.png'));

  // 3. Adaptive icon background (solid color)
  console.log('  → Adaptive icon background');
  await sharp({
    create: { width: 1024, height: 1024, channels: 4, background: { r: 13, g: 148, b: 136, alpha: 1 } }
  }).png().toFile(path.join(ASSETS_DIR, 'adaptive-icon-background.png'));

  // 4. Monochrome icon for Android 13+
  console.log('  → Monochrome icon');
  await sharp(Buffer.from(adaptiveForegroundSVG(1024)))
    .greyscale()
    .png()
    .toFile(path.join(ASSETS_DIR, 'adaptive-icon-monochrome.png'));

  // Renamed versions for android config compatibility
  console.log('  → Android icon variants');
  await sharp(Buffer.from(adaptiveForegroundSVG(1024)))
    .png()
    .toFile(path.join(ASSETS_DIR, 'android-icon-foreground.png'));
  await sharp({
    create: { width: 1024, height: 1024, channels: 4, background: { r: 13, g: 148, b: 136, alpha: 1 } }
  }).png().toFile(path.join(ASSETS_DIR, 'android-icon-background.png'));
  await sharp(Buffer.from(adaptiveForegroundSVG(1024)))
    .greyscale()
    .png()
    .toFile(path.join(ASSETS_DIR, 'android-icon-monochrome.png'));

  // 5. Splash screen icon (used by Expo splash)
  console.log('  → Splash icon');
  await sharp(Buffer.from(splashSVG(1284, 2778)))
    .resize(1284, 2778)
    .png()
    .toFile(path.join(ASSETS_DIR, 'splash-icon.png'));

  // 6. Favicon
  console.log('  → Favicon 48x48');
  await sharp(Buffer.from(appIconSVG(512)))
    .resize(48, 48)
    .png()
    .toFile(path.join(ASSETS_DIR, 'favicon.png'));

  // 7. Store icon 512x512 (Google Play)
  console.log('  → Store icon 512x512 (Google Play)');
  await sharp(Buffer.from(appIconSVG(512)))
    .png()
    .toFile(path.join(STORE_DIR, 'icon-512.png'));

  // 8. Store icon 1024x1024 (Apple App Store)
  console.log('  → Store icon 1024x1024 (Apple)');
  await sharp(Buffer.from(appIconSVG(1024)))
    .png()
    .toFile(path.join(STORE_DIR, 'icon-1024.png'));

  // 9. Feature graphic 1024x500 (Google Play)
  console.log('  → Feature graphic 1024x500 (Google Play)');
  await sharp(Buffer.from(featureGraphicSVG()))
    .png()
    .toFile(path.join(STORE_DIR, 'feature-graphic.png'));

  // 10. Promotional screenshots (1290x2796 for iPhone 6.7", also works for Android)
  const screenshots = [
    { title: 'Control de Peso', subtitle: 'Registra y visualiza tu progreso diario', emoji: '⚖️' },
    { title: 'Rutinas de Ejercicio', subtitle: '9 rutinas para hacer en casa con timer', emoji: '💪' },
    { title: 'Control Nutricional', subtitle: 'Registra calorías y macronutrientes', emoji: '🍽️' },
    { title: 'Gamificación', subtitle: 'XP, niveles, logros y retos diarios', emoji: '🏆' },
    { title: 'Motivación Diaria', subtitle: 'Frases, rachas y desafíos para no parar', emoji: '🔥' },
  ];

  // iPhone 6.7" (1290x2796)
  for (let i = 0; i < screenshots.length; i++) {
    const ss = screenshots[i];
    console.log(`  → Screenshot ${i + 1}/5: ${ss.title} (iPhone 6.7")`);
    await sharp(Buffer.from(screenshotFrameSVG(1290, 2796, ss.title, ss.subtitle, ss.emoji)))
      .png()
      .toFile(path.join(STORE_DIR, `screenshot-iphone67-${i + 1}.png`));
  }

  // iPhone 5.5" (1242x2208)
  for (let i = 0; i < screenshots.length; i++) {
    const ss = screenshots[i];
    console.log(`  → Screenshot ${i + 1}/5: ${ss.title} (iPhone 5.5")`);
    await sharp(Buffer.from(screenshotFrameSVG(1242, 2208, ss.title, ss.subtitle, ss.emoji)))
      .png()
      .toFile(path.join(STORE_DIR, `screenshot-iphone55-${i + 1}.png`));
  }

  // Android phone (1080x1920)
  for (let i = 0; i < screenshots.length; i++) {
    const ss = screenshots[i];
    console.log(`  → Screenshot ${i + 1}/5: ${ss.title} (Android)`);
    await sharp(Buffer.from(screenshotFrameSVG(1080, 1920, ss.title, ss.subtitle, ss.emoji)))
      .png()
      .toFile(path.join(STORE_DIR, `screenshot-android-${i + 1}.png`));
  }

  console.log('\n✅ All assets generated!\n');
  console.log('Assets location:');
  console.log(`  App icons:    ${ASSETS_DIR}/`);
  console.log(`  Store assets: ${STORE_DIR}/`);
  console.log('\nStore assets summary:');
  console.log('  Google Play:');
  console.log('    - icon-512.png (512x512) - Store listing icon');
  console.log('    - feature-graphic.png (1024x500) - Feature graphic');
  console.log('    - screenshot-android-*.png (1080x1920) - Phone screenshots x5');
  console.log('  Apple App Store:');
  console.log('    - icon-1024.png (1024x1024) - App Store icon');
  console.log('    - screenshot-iphone67-*.png (1290x2796) - iPhone 6.7" x5');
  console.log('    - screenshot-iphone55-*.png (1242x2208) - iPhone 5.5" x5');
}

generate().catch(console.error);
