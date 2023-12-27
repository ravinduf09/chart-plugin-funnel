var o = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
var u = o((n, i) => {
  var r = require("chart.js");
  r = typeof r == "function" ? r : window.Chart;
  require("./elements/element.trapezium.js")(r);
  require("./controllers/controller.funnel.js")(r);
  i.exports = r;
});
export default u();
