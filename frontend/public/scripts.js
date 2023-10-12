// Ref: https://developer.mozilla.org/fr/docs/Web/API/Canvas_API
const canvas = document.getElementById("canvas");
const increaseButton = document.getElementById("increase");
const decreaseButton = document.getElementById("decrease");
const sizeElement = document.getElementById("size");
const colorElement = document.getElementById("color");
const clearElement = document.getElementById("clear");
const saveButton = document.getElementById("save");
const loadButton = document.getElementById("load");
const ctx = canvas.getContext("2d");

let size = 1;
let color = "black";
let x;
let y;
let isPressed = false;

const drawCircle = (x, y) => {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
};

const drawLine = (x1, y1, x2, y2) => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
};

const updateSizeOnScreen = () => (sizeElement.innerText = size);

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    x2 = e.offsetX;
    y2 = e.offsetY;
    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;

  }
});

canvas.addEventListener("touchstart", (e) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("touchend", (e) => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);

increaseButton.addEventListener("click", () => {
  size += 1;
  if (size > 15) size = 15;
  updateSizeOnScreen();
});

decreaseButton.addEventListener("click", () => {
  size -= 1;
  if (size < 1) size = 1;
  updateSizeOnScreen();
});

colorElement.addEventListener("change", (e) => (color = e.target.value));

clearElement.addEventListener("click", () =>
  ctx.clearRect(0, 0, canvas.width, canvas.height)
);

if (localStorage.getItem("imgCanvas")!= null){
  var img = new Image();
  img.onload = function(){
      ctx.drawImage(img, 0,0);
  }
}

saveButton.addEventListener("click", () => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("imgCanvas", canvas.toDataURL());
    console.log("Image saved to local storage.");
  } else {
    window.alert("Your browser does not support local storage");
  }
});

loadButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
  };
  img.src = localStorage.getItem("imgCanvas");
});
var formData = new FormData();
formData.append("image", canvas.toDataURL());

//gygies
const downloadButton = document.getElementById("download");

downloadButton.addEventListener("click", () => {
  const imageDataURI = localStorage.getItem("imgCanvas");
  if (imageDataURI) {
    const link = document.createElement("a");
    link.href = imageDataURI;
    link.download = "my_image.png"; // Specify the filename for the downloaded image
    link.click();
  } else {
    window.alert("No image found in local storage to download.");
  }
});
// ...

// Save the image to the backend
// saveButton.addEventListener("click", () => {
//   const imageData = canvas.toDataURL(); // Get the image data from the canvas
//   const formData = new FormData();
//   formData.append("image", imageData);

//   // Send the POST request to the server
//   fetch("/save-image", {
//     method: "POST", 
//     body: formData,
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       // You can handle the response from the server here.
//     });
// });

// // Load the image from the backend
// loadButton.addEventListener("click", () => {
//   fetch("/get-image") // Replace with the correct endpoint for fetching the image
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.blob();
//     })
//     .then((imageBlob) => {
//       const imageUrl = URL.createObjectURL(imageBlob);
//       const img = new Image();
//       img.onload = () => {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.drawImage(img, 0, 0);
//         URL.revokeObjectURL(imageUrl);
//       };
//       img.src = imageUrl;
//     })
//     .catch((error) => {
//       console.error("Error loading image:", error);
//     });
// });

// ...


