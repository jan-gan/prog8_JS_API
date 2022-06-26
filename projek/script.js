let cuaca = {
    "apikey": "e896d4b647b167119793be086cc0ca3f",
    fetchCuaca: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apikey
        )
        .then((response) => response.json())
        .then((data) => this.displayCuaca(data));
    },
    displayCuaca: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        // console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = "Cuaca di " + name;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Kelembapan: " + humidity + "%";
        document.querySelector(".wind").innerText = "Kecepatan angin: " + speed + "km/jam";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    search: function () {
        this.fetchCuaca(document.querySelector(".search-bar").value);
    }
};

document
    .querySelector(".search button")
    .addEventListener("click", function () {
        cuaca.search();
    });

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            cuaca.search();
        }
    });

cuaca.fetchCuaca("Jakarta");