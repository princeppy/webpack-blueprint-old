class WebpackInfoPlugin {

  apply(compiler) {
    compiler.hooks.done.tap('WebpackInfoPlugin', stats => {
      console.log('....completing Webpack Info Plugin!');
      console.log(require('util').inspect(compiler.options));
    });

    // compiler.hooks.emit.tapAsync(
    //   'WebpackInfoPlugin',
    //   (compilation, callback) => {
    //     // Do something async...
    //     setTimeout(function() {
    //       console.log('Done with async work...');
    //       callback();
    //     }, 1000);
    //   }
    // );

    // // Tap into compilation hook which gives compilation as argument to the callback function
    // compiler.hooks.compilation.tap(
    //   'WebpackInfoPlugin',
    //   (compilation, callback) => {
    //     // Now we can tap into various hooks available through compilation
    //     compilation.hooks.optimize.tap('WebpackInfoPlugin', () => {
    //       console.log('Assets are being optimized.');
    //     });
    //   }
    // );
  }
}

module.exports = WebpackInfoPlugin;
