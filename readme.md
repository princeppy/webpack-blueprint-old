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
* `yarn add -D url-loader file-loader extract-loader`
* `yarn add -D style-loader css-loader sass-loader node-sass`
* `yarn add -D eslint eslint-loader babel-eslint eslint-plugin-react`
* `yarn add -D eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y`
* `yarn add -D autoprefixer postcss-loader`
* `yarn add -D webpack-isomorphic-tools` __[optional](https://github.com/catamphetamine/webpack-isomorphic-tools))__
* `yarn add -D extract-text-webpack-plugin`
* `yarn add -D webpack-dashboard webpack-bundle-analyzer`
* `yarn add -D duplicate-package-checker-webpack-plugin`
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
```
git add . && git commit -am Initial && git push origin master
```
or
```
 git add . ; git commit -am 'Initial' ; git push origin master ; git status ;
```


## Resources
* https://github.com/wbkd/webpack-starter
* react-for-beginners 
  * https://blog.codingbox.io/react-for-beginners-part-1-setting-up-repository-babel-express-web-server-webpack-a3a90cc05d1e
  * https://blog.codingbox.io/react-for-beginners-creating-isomorphic-react-redux-app-and-deploying-it-on-heroku-6a313f8f3693
  * https://blog.codingbox.io/react-for-beginners-adding-assets-to-your-isomorphic-application-using-webpack-isomorphic-tools-b6b636a79d96
  * https://github.com/codingbox/isomorphic-react-redux-tutorial
* https://medium.com/javascript-training/beginner-s-guide-to-webpack-b1f1a3638460
* https://www.valentinog.com/blog/react-redux-tutorial-beginners/
* https://www.robinwieruch.de/
  * https://www.robinwieruch.de/minimal-react-webpack-babel-setup/
  * https://www.robinwieruch.de/react-eslint-webpack-babel/
  * https://github.com/rwieruch/minimal-react-webpack-babel-setup
* https://medium.freecodecamp.org/part-1-react-app-from-scratch-using-webpack-4-562b1d231e75
* https://www.sitepoint.com/beginners-guide-webpack-module-bundling/
* https://github.com/lifenautjoe/webpack-starter-basic
* https://medium.com/dailyjs/webpack-4-splitchunks-plugin-d9fbbe091fd0
* https://codeburst.io/top-webpack-plugins-for-faster-development-a2f6accb7a3e
* https://survivejs.com/webpack/extending/plugins/
* https://medium.com/front-end-hacking/how-to-write-your-first-webpack-plugin-c5d6a175f2dc
* https://css-tricks.com/introduction-webpack-entry-output-loaders-plugins/