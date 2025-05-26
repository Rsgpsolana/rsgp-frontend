const nextConfig = {
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: true, // Optional: optimize SVGs
            },
          },
        ],
      });
      return config;
    },
  };

  module.exports = nextConfig;
