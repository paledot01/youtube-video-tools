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
    createFullHeightButton();
    addButtons();
  }, 3500);

  function addButtons() {
    var containerButtons = document.querySelector(".ytp-right-controls");
    containerButtons.style.display = "flex";

    var contenedor = document.querySelector(".ytp-right-controls");
    contenedor.insertBefore(buttonFulltHeight, contenedor.firstChild);
    contenedor.insertBefore(buttonRotate, contenedor.firstChild);
    contenedor.insertBefore(buttonZoomOut, contenedor.firstChild);
    contenedor.insertBefore(buttonZoomIn, contenedor.firstChild);
  }

  // ================================ Zoom ================================
  function createZoomButton(text, scale) {
    var button = createButton(text);

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

  // ================================ Rotate ================================
  function createRotateButton() {
    buttonRotate = createButton("⟳");

    var rotation = 0;

    buttonRotate.addEventListener("click", rotateVideo);

    function rotateVideo() {
      var video = document.querySelector("video");
      rotation += 90;
      video.style.transform = "rotate(" + rotation + "deg)";
    }
  }

  // ================================ Full Height ================================
  function createFullHeightButton() {
    buttonFulltHeight = createButton("⇵");

    buttonFulltHeight.addEventListener("click", function () {
      fullHeight();
      addRemoveFullHeightFeatureToYoutubeButton();
    });
  }

  function fullHeight() {
    // contenedor del video en modo normal que determina el alto es #player. En modo extendido su estilo de este contenedor cambia a display: none
    var containerOfVideoNormal = document.querySelector("#player");
    if (window.getComputedStyle(containerOfVideoNormal).display === "none") {
      // contenedor del video en modo extendido (no fullscreen) que determina el alto es #full-bleed-container
      var containerOfVideoFull = document.querySelector(
        "#full-bleed-container"
      );
      containerOfVideoFull.style.height = "calc(100vh - 56px)";
      containerOfVideoFull.style.maxHeight = "none";
    } else {
      containerOfVideoNormal.style.height = "calc(100vh - 80px)";
    }
  }

  // cuando se cambia modo extendido a normal, el contenedor del video en modo extendido debe tener un alto de 0, por eso se limpia.
  // igual cuando se cambia de modo extendido a fullscreen, necesita limpirse los estilos.
  function addRemoveFullHeightFeatureToYoutubeButton() {
    // bug con el boton de modo extendido
    var buttonYoutubeSize = document.querySelector(".ytp-size-button");
    buttonYoutubeSize.addEventListener("click", removeFullHeight);
    // bug con el boton de modo fullscreen
    var buttonYoutubeFullscreen = document.querySelector(
      ".ytp-fullscreen-button"
    );
    buttonYoutubeFullscreen.addEventListener("click", removeFullHeight);

    function removeFullHeight() {
      var containerOfVideoNormal = document.querySelector("#player");
      if (window.getComputedStyle(containerOfVideoNormal).display === "none") {
        var containerOfVideoFull = document.querySelector(
          "#full-bleed-container"
        );
        containerOfVideoFull.style.height = "";
        containerOfVideoFull.style.maxHeight = "";
      }
    }
  }

  // ================================ Create Button ================================

  function createButton(text) {
    var button = document.createElement("button");
    button.appendChild(document.createTextNode(text));
    button.className = "custom-button";
    return button;
  }

  // ================================ CSS ================================
  var css = `
    .custom-button {
      background-color: transparent;
      color: white;
      width: 30px;
      height: 100%;
      text-align: center;
      display: inline-block;
      font-size: 24px;
      font-family: inherit;
      line-height: inherit;
      border: none;
      cursor: pointer;
      opacity: 0.7;
    }

    .custom-button:hover {
      opacity: 1;
    }
  `;
  var style = document.createElement("style");
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
})();
