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
      item[0].includes(searchString) ||
      //item[1].includes(searchString) ||
      //item[2].includes(searchString) ||
      //item[3].includes(searchString) ||
      item[4].includes(searchString) ||
      item[5].includes(searchString)
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
    .map((item) => {
      return `
      <li class="list-item">
        <h2>${item[0]}</h2>
        <p>${item[5]} - ${item[4]}</p>
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
