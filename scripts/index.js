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
const dataList = document.getElementById("dataList");
const searchBar = document.getElementById("searchBar");
//console.log(dataList);
let dataResults = [];
/*
searchBar.addEventListener("keyup", (e) => {
  console.log(e.target.value);
  const searchString = e.target.value.toLowerCase();
  //console.log(searchString);

  const filteredData = dataResults.data.filter((item) => {
    return item.data;
  });

  displayFilteredData(filteredData);
}); */

searchBar.addEventListener("keyup", (e) => {
  console.log(e.target.value);
  const searchString = e.target.value.toLowerCase();
  //console.log(searchString);

  const filteredData = dataResults.data.filter((item) => {
    //console.log(item[0]);
    return (
      item[0].toLowerCase().includes(searchString) ||
      //item[1].includes(searchString) ||
      //item[2].includes(searchString) ||
      //item[3].includes(searchString) ||
      item[4].toLowerCase().includes(searchString) ||
      item[5].toLowerCase().includes(searchString)
    );
  });

  displayFilteredData(filteredData);
});

// json dosyasına ulaşıp datanın yazdırılması
const loadList = async () => {
  try {
    const res = await fetch(".././assets/mockData.json");
    dataResults = await res.json();
    //displayFilteredData(dataResults.data);
    console.log(dataResults);
  } catch (e) {
    console.log(e);
  }
};

const displayFilteredData = (items) => {
  const strData = items
    .slice(0, 3)
    .map((item) => {
      return `
      <li class="list-item">
      <div>
        <h2>${item[5]} - ${item[4]}</h2>
        <p>${item[0]} - ${item[3].slice(6, 10)}</p>
      </div>
        <h2>Email: ${item[2]}</h2>
      </li>
    `;
      //dataList.append(li);
    })
    .join("");

  dataList.innerHTML = strData;

  if (items.length > 3) {
    //console.log(items.length);
    let liDOM = document.createElement("li");
    liDOM.style["list-style-type"] = "none";
    liDOM.innerHTML = `<a id="showMore" href="">Show more...</a>`;
    dataList.append(liDOM);
  }

  if (items.length == 0) {
    searchBar.style["outline"] = "none";
    searchBar.style["border"] = "2px solid red";
    searchBar.style["color"] = "red";
  } else {
    dataList.style["border"] = "1px solid var(--clr-black2)";
  }

  //var li = document.createElement("li");
  //dataList.append(strData);

  //<h2>${item.name}</h2>
};

/*
const displayFilteredData = (items) => {
  const strData = items
    .map((item) => {
      return `
      <li class="list-item">
        <h2>ok</h2>
        <p>yes</p>
      </li>
    `;
      //dataList.append(li);
    })
    .join("");

  //var li = document.createElement("li");
  //dataList.append(strData);
  dataList.innerHTML = strData;
  //<h2>${item.name}</h2>
};
*/
loadList();
