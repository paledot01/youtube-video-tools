// ==UserScript==
// @name         Youtube Video Tools
// @namespace    http://tampermonkey.net/
// @version      2024-11-27
// @description  try to take over the world!
// @author       github.com/paledot01
// @match        https://www.youtube.com/watch*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  var buttonZoomIn;
  var buttonZoomOut;
  var buttonRotate;
  var buttonFulltHeight;

  setTimeout(function () {
    console.log("Ejecutando script.js");
    createZoomButton("+", 1.1);
    createZoomButton("-", 0.9);
    createRotateButton();
    createFitHeightButton();
    addButtons();
  }, 3500);

  function addButtons() {
    var contenedor = document.getElementById("owner");
    contenedor.appendChild(buttonZoomIn);
    contenedor.appendChild(buttonZoomOut);
    contenedor.appendChild(buttonRotate);
    contenedor.appendChild(buttonFulltHeight);
  }

  // --------------- Zoom ----------------
  function createZoomButton(text, scale) {
    var button = document.createElement("button");
    button.appendChild(document.createTextNode(text));

    button.addEventListener("click", function () {
      zoomVideo(scale);
    });

    if (scale > 1) {
      buttonZoomIn = button;
    } else if (scale < 1) {
      buttonZoomOut = button;
    }
  }

  function zoomVideo(scale) {
    var video = document.querySelector("video");
    var altoContenedor = document.querySelector("#ytd-player").offsetHeight;
    var leftValue = parseFloat(video.style.left) || 0;

    var anchoVideo = video.clientWidth;
    var altoVideo = video.clientHeight;

    var top = (altoContenedor - altoVideo * scale) / 2 + "px";
    var left = leftValue - ((scale - 1) / 2) * anchoVideo + "px";

    anchoVideo *= scale;
    altoVideo *= scale;
    video.style.width = anchoVideo + "px";
    video.style.height = altoVideo + "px";
    video.style.top = top;
    video.style.left = left;
  }

  // --------------- Rotate ----------------
  function createRotateButton() {
    buttonRotate = document.createElement("button");
    buttonRotate.appendChild(document.createTextNode("⟳"));

    var rotation = 0;

    buttonRotate.addEventListener("click", rotateVideo);

    function rotateVideo() {
      var video = document.querySelector("video");
      rotation += 90;
      video.style.transform = "rotate(" + rotation + "deg)";
    }
  }

  // --------------- Full Height ----------------
  function createFitHeightButton() {
    buttonFulltHeight = document.createElement("button");
    buttonFulltHeight.appendChild(document.createTextNode("⇵"));

    buttonFulltHeight.addEventListener("click", function () {
      fullHeight();
    });
  }

  function fullHeight() {
    var conteinerOfVideo = document.querySelector("#player");
    conteinerOfVideo.style.height = "calc(100vh - 80px)";
  }
})();
