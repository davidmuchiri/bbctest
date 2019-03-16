/**
 * @author Muchiri njugi
 * @license MIT
 */

/*
 * UserInteface is a constructor function is in charge of everything rendered on the dom
 */
function UserInteface() {
   this.article = document.getElementById("article");
   this.articletop = document.getElementById("top");
   this.articlebottom = document.getElementById("bottom");
   this.hindiBtn = document.getElementById("hindi");
   this.englishBtn = document.getElementById("english");
   this.selectOption = document.getElementById("select");
}

/*
 * Show article is a function that renders the article to the screen
 * The article is derived from the json files
 */
UserInteface.prototype.showArticle = function(article) {
   let outputTop = "";
   let outputBottom = "";

   const div = document.createElement("div");
   div.id = "articletable";

   const select = this.createSelect(article, ({ cigg, aqi }) =>
      this.renderCityData(div, { cigg, aqi })
   );

   this.article.insertBefore(select, this.articlebottom);

   outputTop += `
         <h1 class="article--title">
            ${article["hero_1_title"]}
         </h1>
         <div>
            <p>
               ${article["article-info_1_byline"]}
               ${article["article-info_1_date"]}
            </p>
            <a  href="${
               article["article-info_1_category_url"]
            }" class="article--tag">
               <p>${article["article-info_1_category"]}</p>
            </a>
         </div>
         <div class="article--content">
            <p class="article--paragraph">${article["p_2_value"]}</p>
         </div>
         <div class="article--hero">
            <img src="${article["hero_1_image"]}" alt="smog image" />
         </div>
         <div class="article--content">
            <p class="article--paragraph">${article["p_3_value"]}</p>
            <p class="article--paragraph">${article["p_4_value"]}</p>
            <p class="article--paragraph">${article["p_5_value"]}</p>
         </div>`;

   outputBottom = `

         <div class="article--content">
            <p class="article--paragraph">${article["p_6_value"]}</p>
            <p class="article--paragraph">${article["p_7_value"]}</p>
            <p class="article--paragraph">${article["p_8_value"]}</p>
            <p class="article--paragraph">${article["p_9_value"]}</p>
            <p class="article--paragraph">${article["p_10_value"]}</p>
         </div>
          `;

   this.articletop.innerHTML = outputTop;
   this.articlebottom.innerHTML = outputBottom;
};

/*
 * CreateSelect create a select element
 * The function takes in the article and a callback function
 * The callback function gets a city name from the select element and the article
 */
UserInteface.prototype.createSelect = function(article, func) {
   /*
    * get any element with an id select and any element with an id articletable
    * if the element exists in the DOM then remove it from the dom if infotable exists also remove it
    */
   const domselect = document.getElementById("select");
   const infotable = document.getElementById("articletable");

   if (domselect !== null) {
      this.article.removeChild(domselect);
   }
   if (infotable !== null) {
      this.article.removeChild(infotable);
   }

   /*
    * Create a select element add a class to it and an ID
    */
   var select = document.createElement("select");
   select.className = "article--select";
   select.id = "select";

   /*
    * GetCities function gets the names of cities from the article.
    * The map through them creating option elements which are then appended to the select element
    */
   this.GetCities(article).map(city => {
      let option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      option.className = "article--select-option";
      select.appendChild(option);
   });

   /*
    * Listens for changes to the select element and passes the selected value and article t0 the getCity data function
    */
   select.addEventListener("change", () => {
      func(this.getCityData(select[select.selectedIndex].value, article));
      select.size = 0;
   });

   /*
    * Listen to mousedown event and is the select options length is greater than eight then set the select size to 8 else set the select size to the options length
    */
   select.addEventListener("mousedown", () =>
      select.options.length > 8
         ? (select.size = 8)
         : (select.size = select.options.length)
   );

   /*
    * Listen for the blur event if the select element is out of focus then set its size to zero
    */
   select.addEventListener("blur", () => (select.size = 0));

   return select;
};

/*
 * The get cities function takes in an ariticle and extracts cityNames from it
 * It then returns an array of city names
 */
UserInteface.prototype.GetCities = function(article) {
   const cities = [];
   for (let i = 1; i <= parseInt(article["total_cities_1_value"]); i++) {
      const city = article[`compare-tabs_1_city_${i}_name`];
      cities.push(city);
   }
   return cities;
};

/*
 * The getCityData function takes in a cityName and an article and extracts the   PMI and ciggarate data based on the city name
 * It returns an object with the cityname and its aqi and ciggarate data
 */
UserInteface.prototype.getCityData = function(cityName, article) {
   let indentifier = "";
   Object.keys(article).forEach(key => {
      if (article[key] == cityName) {
         indentifier = key.split("_")[3];
      }
   });

   return {
      cityName,
      aqi: article[`compare-tabs_1_city_${indentifier}_aqi`],
      cigg: article[`compare-tabs_1_city_${indentifier}_cigg`]
   };
};

/*
 * RenderCityData renders a table with a city's data in the dom
 */
UserInteface.prototype.renderCityData = function(div, { aqi, cigg }) {
   if (div.children.length > 0) {
      div.innerHTML = "";
   }

   div.innerHTML = `
       <div class="article--table">
            <div class="article--table-left">
               <h3>Particulate matter (PM2.5)</h3>
               <p>${aqi}</p>
               </div>
               <div class="article--table-right">
               <h3>Ciggarate</h3>
               <p>${cigg}</p>
            </div>
         </div>
      `;

   this.article.insertBefore(div, this.articlebottom);
};

/*
 * showEnglishArticle if a function that takes a callback function.
 * The callback fetches the english article
 */
UserInteface.prototype.showEnglishArticle = function(func) {
   this.englishBtn.addEventListener("click", func);
};

/*
 * showHindiArticle if a function that takes a callback function.
 * The callback fetches the hindi article
 */
UserInteface.prototype.showHindiArticle = function(func) {
   this.hindiBtn.addEventListener("click", func);
};

/*
 * Create an instance of the userInterface and export it
 */
const ui = new UserInteface();

// Export the userInterface factory function
export default ui;
