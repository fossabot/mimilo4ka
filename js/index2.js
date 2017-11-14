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

// Get canvas
var cvs = document.getElementById('cvs');

// Canvas fills window
cvs.height = window.innerHeight;
cvs.width = window.innerWidth;

// Get canvas context
var ctx = cvs.getContext('2d');

// Set font, size & number of columns
var font = 'arial';
var fontSize = 10;
ctx.font = fontSize + 'px ' + font;
var cols = cvs.width / fontSize;

// Characters
var charSet;
charSet = '0123456789ABCDEF'; // Hex
charSet = charSet.split(''); // Convert string to array

// One drop per column, row set randomly
var drops = [];
for (var col = 0; col < cols; col++)
  drops[col] = Math.floor(Math.random() * cvs.height);

// Call rain() every 25ms
setInterval(rain, 25);

function rain() {
  // Background, black, translucent
  /* This is key to the fade effect, clear the window with an alpha of 0.05, which doesn't clear it entirely but leaves existing text progressively dimmed with each subsequent call to rain()
   */
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  
  // For each column / drop
  for (var col = 0; col < drops.length; col++) {
    // Pick a random char
    var char = charSet[Math.floor(Math.random() * charSet.length)];
    // Pick a random colour
    ctx.fillStyle = randColour();
    // Draw the char
    ctx.fillText(char, col * fontSize, drops[col] * fontSize);
    // Randomly reset drop back to top row
    if (Math.random() > 0.99)
      drops[col] = 0;

    drops[col]++; // Move drop down a row
  }
}

function randColour()
{
  return'rgb(' + 
    Math.floor(Math.random() * 256) + ',' + 
    Math.floor(Math.random() * 256) + ',' + 
    Math.floor(Math.random() * 256) + ')';
}