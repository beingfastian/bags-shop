module.exports = {
  apps: [
    {
      name: 'bag-shop-server',
      script: 'dist/server.js', // Ensure this points to your compiled server file
      watch: true, // Optionally enable auto-restart when files change
      env: {
        NODE_ENV: 'production', // Environment set to production
        TZ: 'Asia/Karachi', // Set the timezone to Pakistan Standard Time (PKT)
        PORT: 4001, // Set your application to run on port 4001
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 4001, // Ensure the production environment uses the correct port
      },
    },
  ],
};
