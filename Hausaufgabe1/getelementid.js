let toadColor = "blue"; // Variable für die Textfarbe definieren
let marioColor = "red";
let louigiColor = "green";
let peachColor = "pink";

// Funktionen für die Button-Clicks definieren
function greetToad() {
  document.getElementById('textfeld_id').value = 'Hallo Toad!';
  document.getElementById('textfeld_id').style.color = toadColor; // Farbe setzen
}
function greetMario() {
  document.getElementById('textfeld_id').value = 'Hallo Mario!';
  document.getElementById('textfeld_id').style.color = marioColor; // Farbe setzen
}
function greetLuigi() {
  document.getElementById('textfeld_id').value = 'Hallo Luigi!';
  document.getElementById('textfeld_id').style.color = louigiColor; // Farbe setzen
}
function greetPeach() {
  document.getElementById('textfeld_id').value = 'Hallo Peach!';
  document.getElementById('textfeld_id').style.color = peachColor; // Farbe setzen
}
