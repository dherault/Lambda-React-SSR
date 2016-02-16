/**
 * Lib
 */

module.exports.respond = function(event, cb) {
  
  const {x, y, ...z} = { x: 51, y: 49, a: 3, b: 5 };
  
  var response = {
    message: "Your Serverless function ran successfully!" + (z.a + z.b)
  };

  return cb(null, response);
};
