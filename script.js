const canvasWidth = 300;
const canvasHeight = 150;

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
    console.log({ r, g, b, a });

    r = r / (pix.length / 4);
    g = g / (pix.length / 4);
    b = b / (pix.length / 4);
    a = a / (pix.length / 4);

    console.log({ r, g, b, a });
    document.body.style.backgroundColor =
      "rgba(" + r + "," + g + "," + b + "," + a + ")";
  };
  img.src = URL.createObjectURL(e.target.files[0]);
});
