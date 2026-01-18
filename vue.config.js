const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  publicPath:
    process.env.NODE_ENV === "production" ? "/WebBanGheMassage/" : "/",

  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 5173,
  },
});
