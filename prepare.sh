cd data

# get data.json
python get_data.py

cd ..
# install webpack
npm install --global webpack
npm install --save-dev webpack
npm install --save-dev webpack-cli

# install depandance
npm install @babel/core @babel/plugin-transform-runtime @babel/preset-env @babel/preset-react babel-loader css-loader file-loader fs html-webpack-plugin react react-dom style-loader

# pack
webpack
