const functions = require("firebase-functions");
const { Nuxt, Builder } = require("nuxt-edge");
const express = require("express");
const app = express();
const config = {
  dev: false,
  buildDir: "nuxt",
  build: {
    publicPath: "/assets/"
  }
};
const nuxt = new Nuxt(config);

function handleRequest(req, res) {
  console.log("IN New Nuxt Trial: ");
  const isProduction = process.env.NODE_ENV === "development" ? false : true;
  if (isProduction)
    res.set("Cache-Control", "public, max-age=150, s-maxage=150");

  try {
    nuxt.render(req, res);
  } catch (err) {
    console.error(err);
  }
}

app.use(handleRequest);
exports.nuxtssr = functions.https.onRequest(app);
