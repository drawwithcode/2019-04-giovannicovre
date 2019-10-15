var audio;
var buttonplay;
var buttonpause;
var sw = 1;
var txtBass = "BASS";
var txtMid = "MID";
var txtTreble = "TREBLE";
var txtSong = "Song Credits: Niwel - Bad Love";
var txtColor = "rgba(255,255,255,0.9)";

function preload() {
  audio = loadSound("./assets/suonds/niwel-bad_love.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  fft = new p5.FFT(0.6, 1024);
  fft.setInput(audio);

  // Button Play
  buttonplay = createImg("./assets/img/play.svg");
  buttonplay.style("width", "32px");
  buttonplay.position(width / 2 - 16, height / 2 - 16);
  buttonplay.mousePressed(playpause);
  // Button Pause
  buttonpause = createImg("./assets/img/pause.svg");
  buttonpause.style("width", "32px");
  buttonpause.position(width / 2 - 16, height / 2 - 16);
  buttonpause.mousePressed(playpause);

  buttonpause.style("visibility", "hidden"); // Button Pause Hidden
}

function draw() {
  background("black");

  var dOne;
  var dTwo;
  var dThree;

  fft.analyze();

  //BASSI MEDI ALTI
  var bass = fft.getEnergy("bass");
  var mid = fft.getEnergy("mid");
  var treble = fft.getEnergy("treble");

  //BASSI MEDI ALTI - RIMAPPATI
  var mapBass = map(bass, 0, 255, 50, 250);
  var mapMid = map(mid, 0, 255, 250, 450);
  var mapTreble = map(treble, 0, 255, 450, 650);

  strokeWeight(2);
  noFill();

  stroke(color(bass, bass, bass));
  ellipse(width / 2, height / 2, mapBass, mapBass);

  stroke(color(mid, mid, mid));
  ellipse(width / 2, height / 2, mapMid, mapMid);

  stroke(color(treble, treble, treble));
  ellipse(width / 2, height / 2, mapTreble, mapTreble);

  //LEGENDA
  strokeWeight(sw);
  stroke("rgba(180,180,180,1)");
  if (audio.isPlaying() == true) {
    dOne = 0;
    dTwo = 0;
    dThree = 0;
    sw = 0;
    txtColor = "rgba(255,255,255,0)";
  } else {
    dOne = 50;
    dTwo = 250;
    dThree = 450;
    sw = 1;
    txtColor = "rgba(255,255,255,0.9)";
  }
  ellipse(width / 2, height / 2, dThree, dThree);
  ellipse(width / 2, height / 2, dTwo, dTwo);
  ellipse(width / 2, height / 2, dOne, dOne);

  line(width / 2, height / 2 - 25, width / 2 + 290, height / 2 - 25);
  line(width / 2, height / 2 - 125, width / 2 + 290, height / 2 - 125);
  line(width / 2, height / 2 - 225, width / 2 + 290, height / 2 - 225);

  strokeWeight(0);
  fill(txtColor);
  textFont("Work Sans");
  textSize(12);
  textAlign(RIGHT);
  text(txtBass, width / 2 + 290, height / 2 - 28);
  text(txtMid, width / 2 + 290, height / 2 - 128);
  text(txtTreble, width / 2 + 290, height / 2 - 228);

  //CREDITS
  textFont("Source Code Pro");
  text(txtSong, width - 20, height - 20);
}

function playpause() {
  if (audio.isPlaying() == true) {
    audio.pause();
    buttonpause.style("visibility", "hidden");
    buttonplay.style("visibility", "visible");
  } else {
    audio.loop();
    buttonplay.style("visibility", "hidden")
    buttonpause.style("visibility", "visible");
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  buttonplay.position(width / 2 - 16, height / 2 - 16);
  buttonpause.position(width / 2 - 16, height / 2 - 16);
}
