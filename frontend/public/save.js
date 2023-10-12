// Get the canvas element
var canvas = document.getElementById("canvas");

// Get the image data from the canvas
var imageData = canvas.toDataURL();

// Set up the POST request data
var formData = new FormData();
formData.append("image", imageData);

// Send the POST request to the server
fetch("/save-image", {
  method: "POST",
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log(data);
});