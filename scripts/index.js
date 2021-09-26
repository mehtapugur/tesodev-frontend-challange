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

searchBar.addEventListener("keyup", (e) => {
  console.log(e.target.value);
  const searchString = e.target.value.toLowerCase();
  //console.log(searchString);

  const filteredData = dataResults.data.filter((item) => {
    return item.data;
  });

  displayFilteredData(filteredData);
});

const loadList = async () => {
  try {
    const res = await fetch(".././assets/mockData.json");
    dataResults = await res.json();
    console.log(dataResults.data);
  } catch (e) {
    console.log(e);
  }
};

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

loadList();
