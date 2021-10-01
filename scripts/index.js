const dataList = document.getElementById("dataList"); // ul
const searchBar = document.getElementById("searchBar"); // search box

let dataResults = [];
let filteredData = [];
const countTable = [];

//klavye girişine göre dinamik arama yapılması
searchBar.addEventListener("keyup", (e) => {
  //case sensitive olmaması için toLowarCase kullandık
  const searchString = e.target.value.toLowerCase();
  //eşleşen elemanlar alındı
  filteredData = dataResults.data.filter((item) => {
    return (
      //ad-soyad, ülke veya şehir, girilen karakterleri içeriyor mu
      item[0].toLowerCase().includes(searchString) ||
      item[4].toLowerCase().includes(searchString) ||
      item[5].toLowerCase().includes(searchString)
    );
  });

  //filtrelenmiş dizi ekrana yazdırılmak için gönderildi
  displayFilteredData(filteredData);
});

// json dosyasına ulaşıp datanın yazdırılması
const loadList = async () => {
  try {
    const res = await fetch(".././assets/mockData.json");
    dataResults = await res.json();
  } catch (e) {
    console.log(e);
  }
};

// İlk 3 elemanın görüntülenmesi
const displayFilteredData = (items) => {
  const strData = items
    .slice(0, 3)
    .map((item) => {
      // elemanlar listelendi
      return ` 
      <li class="list-item">
      <div>
        <h2>${item[5]} - ${item[4]}</h2>
        <p>${item[0]} - ${item[3].slice(6, 10)}</p>
      </div>
        <h2>Email: ${item[2]}</h2>
      </li>
    `;
    })
    .join(""); //liste elemanları birleştirildi

  dataList.innerHTML = strData; // hazırlanan liste, ul içine eklendi

  if (items.length > 3) {
    // 3ten uzun listeler için show more alanı eklenir
    let liDOM = document.createElement("li");
    liDOM.style["list-style-type"] = "none";
    liDOM.innerHTML = `<button id="showMore" onclick="start(this.id)">Show more...</button>`;
    dataList.append(liDOM);
  }

  if (items.length == 0) {
    // eşleşmeyen aramalar için error verilmesi
    searchBar.style["outline"] = "none";
    searchBar.style["border"] = "2px solid red";
    searchBar.style["color"] = "red";
    dataList.style["display"] = "none";
  } else {
    dataList.style["display"] = "block"; //eşleşme varsa listeyi görüntüle
  }
};

loadList(); // sayfa açılınca datalar çekilir

const start = function (id) {
  //show more tıklanınca sayfanın stili değiştirildi
  document.body.style["flex-direction"] = "row";
  document.body.style["align-items"] = "flex-start";
  const myLogoDOM = document.getElementById("img-id");
  myLogoDOM.classList.add("img-new");
  dataList.style["border"] = "none";
  dataList.style["margin"] = "4em 0";
  dataList.style["padding"] = "0";
  document.getElementById("search-p").style["display"] = "none";
  document.getElementById("search-btn").style["background-color"] =
    "var(--clr-blue)";
  showDataTable(filteredData); //arama sonucu yeniden listelendi
};

//arama alanı boşsa error kaldırılır
searchBar.addEventListener("keyup", (e) => {
  e.target.value === ""
    ? ((searchBar.style["border-color"] = "black"),
      (searchBar.style["color"] = "black"),
      (dataList.style["display"] = "none"))
    : "";
});

const showDataTable = (filteredData) => {
  const tableData = filteredData
    .slice(0, 10) //ilk 10 sonuç listelendi
    .map((dt) => {
      return `
        <li class="list-item">
        <div>
          <h2>${dt[5]} - ${dt[4]}</h2>
          <p>${dt[0]} - ${dt[3].slice(6, 10)}</p>
        </div>
          <h2>Email: ${dt[2]}</h2>
        </li>
      `;
    })
    .join("");

  dataList.innerHTML = tableData;

  //Arama sonuçları bilgisi için 2 liste elemanı oluşturuldu
  let pageListDOM = document.createElement("li");
  let pageSizeDOM = document.createElement("li");
  pageListDOM.setAttribute("class", "result-list");

  if (filteredData.length >= 10) {
    pageListDOM.innerHTML = `İlk <b>10</b> arama sonucu listelendi.`;
    //Arama sonucu 10dan büyükse 2. li eklendi
    pageSizeDOM.innerHTML = `Toplam <b>${filteredData.length}</b> arama sonucu bulundu.`;
    pageSizeDOM.setAttribute("class", "result-list");
  } else {
    pageListDOM.innerHTML = "Tüm arama sonuçları listelendi.";
  }
  dataList.append(pageListDOM);
  if (filteredData.length > 10) {
    dataList.append(pageSizeDOM);
  }
};

// search button
function search() {
  displayFilteredData(filteredData);
}
