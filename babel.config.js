module.exports = function(api) {
  api.cache(true);
  return {
    plugins: [
      "@babel/plugin-proposal-private-methods",
      "@babel/plugin-proposal-private-property-in-object",
      "@babel/plugin-proposal-class-properties",
    ],
    presets: ['babel-preset-expo'],
  };
};
