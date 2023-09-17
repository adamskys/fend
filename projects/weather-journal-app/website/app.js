/* Global Variables */
const apiKey = "YOUR_API_KEY";
const baseURL = "http://api.weatherapi.com/v1/current.json?key=";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
const performAction = (e) => {
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  getWeather(baseURL, apiKey, zipCode).then((data) => {
    postData("/", {
      temp: data.current.feelslike_c,
      feelings: feelings,
      date: newDate,
    }).then(updateUI());
  });
};
document.getElementById("generate").addEventListener("click", performAction);

const getWeather = async (baseURL, apiKey, zip) => {
  const res = await fetch(`${baseURL}${apiKey}&q=${zip}`);
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

const postData = async (url, data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();
    return newData;
  } catch (err) {
    console.log("error", err);
  }
};

const updateUI = async () => {
  const req = await fetch("/all");
  try {
    const allData = await req.json();
    console.log(allData);
    document.getElementById("date").innerHTML = `Date: ${allData[0].date}`;
    document.getElementById(
      "temp"
    ).innerHTML = `Temperature: ${allData[0].temp}C`;
    document.getElementById(
      "content"
    ).innerHTML = `My feel: ${allData[0].feelings}`;
  } catch (err) {
    console.log("error", err);
  }
};
