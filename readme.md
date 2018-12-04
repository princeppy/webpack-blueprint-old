# Webpack BluePrint
* `yarn add -D http-server eslint`
* `yarn add -D webpack webpack-dev-server webpack-cli`
* `yarn add -D clean-webpack-plugin`
* `yarn add -D nodemon` -or- `npm i -g nodemon`
* `npm i -g webpack-stats-graph`
***
> **Edit Needed on webpack-stats-graph v(0.2.1)**
> * run  `npm root -g`
> * navagate to '\webpack-stats-graph\'
> * open 'index.js'
> * add line (#325) `.filter(d => d.moduleId !== null)` before line `.map(d => ({ graphId: d.moduleId.toString(), type: d.type, }))`
>```
> issuers: m.reasons
>    .filter(d => d.moduleId !== null)
>    .map(d => ({
>        graphId: d.moduleId.toString(),
>        type: d.type,
>    })),
>```
> * replace line (#414) `const clusterDetails = parseClusterDetails(chunkIds.map(c => stats.chunks[c]));`  to  `const clusterDetails = parseClusterDetails(chunkIds.filter(id => stats.chunks[id]).map(c => stats.chunks[c]));`
>```
>const clusterDetails = parseClusterDetails(chunkIds.filter(id => stats.chunks[id]).map(c => stats.chunks[c]));
>```
****
##### Enabling hot Reloading instead of reloading page.
```js
//console.log(ENV_IS);
//if (ENV_IS_DEVELOPMENT) { console.log('[scoring] evaluating'); }

if (module.hot) {

  module.hot.accept(console.log.bind(console));

  const doc = angular.element(document);
  const injector = doc.injector();

  if (injector) {
    const actualService = Object.getPrototypeOf(injector.get("scoring"));
    const newScoringService = Object.getPrototypeOf(new Scoring());
    // note: just replaces functions
    Object.getOwnPropertyNames(actualService)
      .filter(key => typeof actualService[key] === "function")
      .forEach(key => actualService[key] = newScoringService[key]);
    doc.find('html').scope().$apply();
    console.info('[scoring] Hot Swapped!!');
  }
}
```
****
* `yarn add -D webpack-merge cross-env dotenv-extended`
* `yarn add -D @babel/cli @babel/core @babel/polyfill @babel/preset-env @babel/preset-react @babel/runtime @babel/plugin-transform-runtime babel-loader` 
* `yarn add -D html-webpack-plugin babel-minify-webpack-plugin mini-css-extract-plugin uglifyjs-webpack-plugin`
* `yarn add -D react-hot-loader`
* `yarn add -D ts-loader file-loader extract-loader`
* `yarn add -D style-loader css-loader sass-loader node-sass`
* `yarn add -D eslint eslint-loader babel-eslint eslint-plugin-react`
* `yarn add -D eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y`
* `yarn add -D autoprefixer postcss-loader`

****

* `yarn add react react-dom prop-types`






-------------------

## [Pluralsight - Webpack: Transpiling and Bundling JavaScript](https://app.pluralsight.com/library/courses/transpiling-bundling-javascript-webpack)

* `yarn add -D webpack webpack-cli`
  
 



```
npx webpack app\app.js -o app\dist\app.bundle.js --mode development
```
* `yarn add -D webpack-merge`


* `yarn add numeral @babel/runtime`

### source-maps
use `{devtools : 'nosources-source-map'}`


## [Udemy - Webpack 4: Made simple for Beginners](https://www.udemy.com/webpack-4-made-simple-for-beginners)

* `yarn add -D html-webpack-plugin`
* `yarn add -D `
