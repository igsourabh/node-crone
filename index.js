const cron = require('node-cron');
const { exec } = require('child_process');

// Schedule a Git commit to run every day at 1:00 AM
cron.schedule('*/10 * * * * *', () => {
  exec('git add . && git commit -m "Automated commit" && git push origin main', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      return;
    }
    console.log(`Git commit successful: ${stdout}`);
  });
});     