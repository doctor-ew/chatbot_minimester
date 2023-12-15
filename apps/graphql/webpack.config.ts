import path from 'path';
import slsw from 'serverless-webpack';
import nodeExternals from 'webpack-node-externals';
import { Configuration } from 'webpack';

const webpackConfig: Configuration = {
    context: __dirname,
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    entry: slsw.lib.entries,
    devtool: 'source-map',
    resolve: {
        extensions: ['.js','.mjs', '.json', '.ts'],
        symlinks: false,
        cacheWithContext: false,
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.(tsx?)$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    },
                },
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, '.serverless'),
                    path.resolve(__dirname, '.webpack'),
                ],
            },
        ],
    },
    plugins: [],
};

export default webpackConfig;
