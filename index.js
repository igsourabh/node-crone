const cron = require("node-cron");
const { exec } = require("child_process");

// Schedule a Git commit to run every day at 1:00 AM

cron.schedule("*/10 * * * * *", () => {
  const filePath="example.txt"
  // Compress the file using tar and gzip
  const compressedFilePath = `${filePath}.tar.gz`;
  const compressCommand = `tar -czf ${compressedFilePath} ${filePath}`;

  exec(compressCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error compressing file: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`Error compressing file: ${stderr}`);
      return;
    }
    exec(
      'git add . && git commit -m "Automated commit" && git push origin main',
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error}`);
          return;
        }
        console.log(`Git commit successful1: ${stdout}`);
      }
    );
  });
});
