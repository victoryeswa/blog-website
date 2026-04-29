const fs = require('fs');
const path = require('path');
const distDir = path.join(__dirname, '..', 'dist');

(async () => {
  try {
    if (fs.existsSync(distDir)) {
      await fs.promises.rm(distDir, { recursive: true, force: true });
      console.log('Clean complete. Removed dist/.');
    } else {
      console.log('Nothing to clean. dist/ does not exist.');
    }
  } catch (error) {
    console.error('Clean failed:', error);
    process.exit(1);
  }
})();
