/* eslint-disable no-console */
import "@babel/polyfill";
import "./scss/style.scss";

import http from "./js/http";
import ui from "./js/interfaces";

/*
 * on content load , get the english article and render it
 */
document.addEventListener("DOMContentLoaded", getEnglishArticle);

/*
 * this passes the getEnglishArticle and getHindiArticle to the language buttons
 */
ui.showEnglishArticle(getEnglishArticle);
ui.showHindiArticle(getHindiArticle);

/*
 * getEnglishArticle gets the english article
 */
function getEnglishArticle() {
   http
      .Get("./db/english.json")
      .then(data => ui.showArticle(data))
      .catch(err => console.log(err));
}

/*
 * getHindiArticle gets the hindi article
 */
function getHindiArticle() {
   http
      .Get("./db/hindi.json")
      .then(data => ui.showArticle(data))
      .catch(err => console.log(err));
}
