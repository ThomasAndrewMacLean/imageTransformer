const canvasWidth = 300;
const canvasHeight = 150;

const getAverageColour = (pix) => {
  let r = 0,
    g = 0,
    b = 0,
    a = 0;
  for (var i = 0, n = pix.length; i < n; i += 4) {
    r += pix[i];
    g += pix[i + 1];
    b += pix[i + 2];
    a += pix[i + 3];
  }

  r = r / (pix.length / 4);
  g = g / (pix.length / 4);
  b = b / (pix.length / 4);
  a = a / (pix.length / 4);

  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
};

document.querySelector("input").addEventListener("change", (e) => {
  console.log(e.target.files);

  var ctx = document.querySelector("canvas").getContext("2d");
  var img = new Image();
  img.onload = function () {
    console.log(img.width);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      0,
      0,
      canvasWidth,
      canvasHeight
    );

    const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let pix = imageData.data;

    document.body.style.backgroundColor = getAverageColour(pix);
  };
  img.src = URL.createObjectURL(e.target.files[0]);
});

document.getElementById("draw").addEventListener("click", () => {
  var ctx = document.querySelector("canvas").getContext("2d");

  const imageData = ctx.getImageData(0, 0, 100, 100);
  const avgColour = getAverageColour(imageData.data);

  ctx.fillStyle = avgColour;
  ctx.fillRect(0, 0, 100, 100);
});
