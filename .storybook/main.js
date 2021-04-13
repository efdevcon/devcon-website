const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(mdx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async config => {
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]

    // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
    config.module.rules[0].use[0].loader = require.resolve("babel-loader")

    // use @babel/preset-react for JSX and env (instead of staged presets)
    config.module.rules[0].use[0].options.presets = [
      require.resolve("@babel/preset-react"),
      require.resolve("@babel/preset-env"),
    ]

    config.module.rules[0].use[0].options.plugins = [
      // use @babel/plugin-proposal-class-properties for class arrow functions
      require.resolve("@babel/plugin-proposal-class-properties"),
      // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
      require.resolve("babel-plugin-remove-graphql-queries"),
    ]

    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
    config.resolve.mainFields = ["browser", "module", "main"];

    // Add TypeScript support
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [["react-app", { flow: false, typescript: true }]],
        plugins: [
          require.resolve("@babel/plugin-proposal-class-properties"),
          // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
          require.resolve("babel-plugin-remove-graphql-queries"),
        ],
      },
    })
    
    // https://github.com/storybookjs/storybook/issues/5708
    config.resolve.extensions.push('.svg')

    config.module.rules = config.module.rules.map(data => {
        if (/svg\|/.test(String(data.test)))
            data.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/

        return data
    })

    config.module.rules.push({
        test: /\.svg$/,
        use: [
            { loader: require.resolve('babel-loader') },
            { loader: require.resolve('react-svg-loader') },
        ],
    })

    // Add sass 
    config.module.rules.push({
      test: /\.scss$/,
      use: [
          { loader: require.resolve('style-loader') },
          {
              loader: require.resolve('css-loader'),
              options: {
                  importLoaders: 1,
                  modules: true,
                  sourceMap: true,
              },
          },
          { loader: require.resolve('sass-loader') },
      ]
    })

    // TS path mapping
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin());
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()];
    }
  
    config.resolve.extensions.push(".ts", ".tsx")

    return config;
  },
}