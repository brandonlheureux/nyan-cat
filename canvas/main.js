import { Engine } from "./Engine.js";

const canvas = document.getElementById("app");
canvas.addEventListener("contextmenu", (event) => event.preventDefault());
const canvasCtx = canvas.getContext("2d");

const audioCtx = new AudioContext();

const video = document.getElementById("video");

const gameEngine = new Engine(canvasCtx, audioCtx);

gameEngine.start();
