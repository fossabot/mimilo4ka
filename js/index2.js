var $text = $('.editor-text');

function set(txt) {
  $text.html(txt);
}

function slicer(str) {
  var sliced = [];
  for (var i = 0; i <= str.length; i++) {
    sliced.push(str.slice(0, i));
  }
  
  return sliced;
}

function pause (str, time) {
  // Return an array with time copies of str
  
  var strings = [];
  for (var i = 0; i < time; i++) {
    strings.push(str);
  }
  return strings;
}

function assemble(statements) {
  var slices = [];
  
  statements.forEach(function (stmt) {
    var sliced = slicer(stmt);
    var interstatementPause = pause("", 3);
    slices = slices.concat(sliced);
    
    // Pause on the completed statement
    slices = slices.concat(pause(stmt, 30));
    
    // Backspace it away
    // slices = slices.concat(sliced.reverse());
    slices = slices.concat(interstatementPause);
  });
  return slices;
}

var statements = [
  "Knock, Knock, Lu...",
  "Happy Birthday to you...",
  "Wish the best of luck to you...",
  ""
]

function rand(min, max) {
  return min + Math.random() * (max - min) | 0;
}

var slices = assemble(statements);

function animate() {
  var current = slices.shift();
  set(current);
  slices.push(current);
  setTimeout(animate, rand(50, 250));
}

animate()