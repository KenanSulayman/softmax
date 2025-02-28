var _ = require('lodash');
var debug = require('debug')('softmax:select');

function select() {
  var accum = 0;
  var arm;
  var r = _.random(0, 1, true);
  var temp = _.isNull(this.tau) ? (1 / Math.log(_.sum(this.counts) + 1 + this.gamma)) : this.tau;
  var values;
  var z;

  values = this.values.map(function adjustObservedValue(val) {
    return Math.exp(val / temp);
  });

  z = _.sum(values);

  values = values.map(function scaleAdjustedValue(val) {
    return val / z;
  })
  .forEach(function findBestArm(val, i) {
    accum += val;

    if (accum > r && arm === undefined) {
      arm = i;
    }
  });

  debug('selected arm %s with r %s', arm, r);

  return arm;
}

module.exports = select;
