/* This is first

const dataList = document.getElementById("dataList");
const searchBar = document.getElementById("searchBar");
//console.log(dataList);

let dataResults = [];

searchBar.addEventListener("keyup", (e) => {
  console.log(e.target.value);
});

const loadList = async () => {
  try {
    const res = await fetch(".././assets/mockData.json");
    dataResults = await res.json();
    console.log(dataResults);
  } catch (e) {
    console.log(e);
  }
};

loadList();
*/

const dataList = document.getElementById("dataList"); // ul
const searchBar = document.getElementById("searchBar"); // search box

let dataResults = [];
let filteredData = [];

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
  //localStorage.setItem("str", searchString);
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

const displayFilteredData = (items) => {
  const strData = items
    .slice(0, 3) // açılış sayfasında ilk 3 eleman listelenir
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
    .join(""); //liste elemanalrı birleştirildi

  dataList.innerHTML = strData; // hazırlanan liste, ul içine eklendi

  if (items.length > 3) {
    // 3ten uzun listeler için show more alanı eklenir
    let liDOM = document.createElement("li");
    liDOM.style["list-style-type"] = "none";
    liDOM.innerHTML = `<a id="showMore" href="new-page.html">Show more...</a>`;
    dataList.append(liDOM);
    showDataTable(items); //items yani filteredData, new-page e gönderildi
  }

  if (items.length == 0) {
    // eşleşmeyen aramalar için error verilmesi
    searchBar.style["outline"] = "none";
    searchBar.style["border"] = "2px solid red";
    searchBar.style["color"] = "red";
  } else {
    dataList.style["display"] = "block"; //eşleşme varsa listeyi görüntüle
  }
};

loadList(); // sayfa açılınca datalar çekilir

//arama alanı boşsa error kaldırılır
searchBar.addEventListener("keyup", (e) => {
  e.target.value === ""
    ? ((searchBar.style["border-color"] = "black"),
      (searchBar.style["color"] = "black"))
    : "";
});

// ##################### burada kaldım

let tableOk;

const loadTable = function () {
  console.log("click");
  //document.getElementById("searchBar").innerHTML = localStorage.getItem("str");
};

//console.log(tableOk);

// 6 elemanlık tablo sayısı hesaplandı
const sizeOfTable = (size) => {
  console.log(size);
  let numberOfTable = (size / 6) | 0;
  if (size % 6 > 0) {
    numberOfTable++;
  }
  //console.log(numberOfTable);
  return numberOfTable;
};

const showDataTable = (filteredData) => {
  console.log("yes");
  const countTable = sizeOfTable(filteredData.length);

  const tableData = filteredData
    .slice(0, 6)
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

  let pageListDOM = document.createElement("li");
  //pageListDOM.style["list-style-type"] = "none";
  pageListDOM.innerHTML = `
    <li class="page-numbers"> 
      <p>${countTable}</p>
    </li>
  `;
  dataList.append(pageListDOM);
};
