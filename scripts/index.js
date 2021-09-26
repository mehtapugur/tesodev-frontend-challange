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
