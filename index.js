let circles = [];
const sentences = [
  'I think, therefore I am. - René Descartes',
  'The unexamined life is not worth living. - Socrates',
  'In the midst of chaos, there is also opportunity. - Sun Tzu',
  'The only true wisdom is in knowing you know nothing. - Socrates',
  'We are what we repeatedly do. Excellence, then, is not an act, but a habit. - Aristotle',
  'Life must be understood backward. But it must be lived forward. - Søren Kierkegaard',
  'The function of prayer is not to influence God, but rather to change the nature of the one who prays. - Søren Kierkegaard',
  'Man is condemned to be free; because once thrown into the world, he is responsible for everything he does. - Jean-Paul Sartre',
  'The unexamined life is not worth living. - Socrates',
  'To be is to do. - Jean-Paul Sartre',
  'To do is to be. - Friedrich Nietzsche',
  'Do be do be do. - Frank Sinatra',
  'I can control my passions and emotions if I can understand their nature. - Spinoza',
  'You can discover more about a person in an hour of play than in a year of conversation. - Plato',
  'We are what we pretend to be, so we must be careful about what we pretend to be. - Kurt Vonnegut',
  'The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion. - Albert Camus',
  'The mind is everything. What you think you become. - Buddha',
  'The only thing I know is that I know nothing. - Socrates',
  'The man who moves a mountain begins by carrying away small stones. - Confucius',
  'Be yourself; everyone else is already taken. - Oscar Wilde',
  'It is not death that a man should fear, but he should fear never beginning to live. - Marcus Aurelius',
  'There is only one good, knowledge, and one evil, ignorance. - Socrates',
  'Life is the sum of all your choices. - Albert Camus',
  'Wise men speak because they have something to say; fools because they have to say something. - Plato',
  'I cannot teach anybody anything. I can only make them think. - Socrates',
  "A man's worth is no greater than his ambitions. - Marcus Aurelius",
  "Happiness is not the absence of problems, it's the ability to deal with them. - Steve Maraboli",
  'The greatest wealth is to live content with little. - Plato',
  'Life without love is like a tree without blossoms or fruit. - Khalil Gibran',
  'We are all fools in love. - Jane Austen',
  'Where there is love there is life. - Mahatma Gandhi',
  'The more I read, the more I acquire, the more certain I am that I know nothing. - Voltaire',
  'Education is the kindling of a flame, not the filling of a vessel. - Socrates',
  'There is no greatness where there is no simplicity, goodness, and truth. - Leo Tolstoy',
  'A man is but the product of his thoughts what he thinks, he becomes. - Mahatma Gandhi',
  'The true sign of intelligence is not knowledge but imagination. - Albert Einstein',
  'He who is not a good servant will not be a good master. - Plato',
  'The secret of happiness, you see, is not found in seeking more, but in developing the capacity to enjoy less. - Socrates',
  "Freedom is what you do with what's been done to you. - Jean-Paul Sartre",
  'You are never too old to set another goal or to dream a new dream. - C.S. Lewis',
];

const maxSentenceLength = sentences.reduce((max, sentence) => {
  const sentenceLength = sentence.length;
  return Math.max(max, sentenceLength);
}, 0);

const movementDuration = 1;
const movementFrames = movementDuration * 60;

let sound;
function preload() {
  soundFormats('mp3', 'ogg'); // Specify the formats of your music file

  sound = loadSound('/music/bg.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < sentences.length; i++) {
    let xPos = random(width - 200);
    let yPos = random(height - 200);
    circles.push({ x: xPos, y: yPos, targetX: xPos, targetY: yPos });
  }
  sound.play();
}

function draw() {
  background(51);

  for (let i = 0; i < circles.length; i++) {
    let circleData = circles[i];
    let xPos = circleData.x;
    let yPos = circleData.y;
    let targetX = circleData.targetX;
    let targetY = circleData.targetY;
    let radius = map(sentences[i].length, 0, maxSentenceLength, 10, 50);

    let d = dist(mouseX, mouseY, xPos, yPos);
    let fillColor = color(220, 220, 220, 50);

    if (d < radius) {
      textSize(16);
      textAlign(CENTER, CENTER);
      stroke(255);
      fill(255);
      text(sentences[i], xPos - 100, yPos);
      fillColor = color(240, 230, 140, 70);
    }

    fill(fillColor);
    stroke(255);
    circle(xPos, yPos, radius);

    let newX = lerp(xPos, targetX, 0.01);
    let newY = lerp(yPos, targetY, 0.01);

    circleData.x = newX;
    circleData.y = newY;

    if (dist(newX, newY, targetX, targetY) < 1) {
      circleData.targetX = newX + random(-50, 50);
      circleData.targetY = newY + random(-50, 50);
    }
  }
}

function mouseMoved() {
  redraw();
}
