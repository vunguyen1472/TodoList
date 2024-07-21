module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    // ['react-native-paper/babel'],
    ["@babel/plugin-proposal-decorators", {"version": "2023-11" }],
    ["@babel/plugin-transform-class-static-block"]
  ],
  "assumptions": {
    "setPublicClassFields": false,
  }
};