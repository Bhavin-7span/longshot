const path = require("path");

module.exports = {
    publicPath: "",
    // outputDir: path.resolve(__dirname, "../public/admin"),
    css: {
        extract: true,
        loaderOptions: {
            sass: {
                prependData: '@import "shilp/scss/_globals.scss";',
            },
        },
    },

    configureWebpack: {
        devtool: "source-map",
        resolve: {
            symlinks: false,
            alias: {
                "@icon": "vue-material-design-icons",
                "@utils": path.resolve(__dirname, "utils/"),
            },
        },
    },
};