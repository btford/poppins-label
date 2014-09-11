# poppins-label

A [Mary Poppins](https://github.com/btford/mary-poppins) plugin for auto-labeling new issues and PRs on GitHub.


## Install

`npm install poppins-label`


## Configure

To use this plugin, you need to load it in your config file with `couldYouPlease`:


```javascript
// config.js
module.exports = function (poppins) {

  poppins.config = { /*...*/ };

  // load label plugin
  poppins.couldYouPlease('label');

  // map tag name -> predicate fn
  poppins.plugins.labels = {

    // tag even numbered issues
    'even': function (issue) {
      return issue.number % 2 === 0;
    },

    // ...
  }
};
```


## License
MIT
