function fetchSensorData() {
  fetch("http://localhost:5000/api/data")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("temperature").textContent = `${data.temperature} °C`;
      document.getElementById("humidity").textContent = `${data.humidity} %`;
      document.getElementById("sound").textContent = `${data.sound_level} dB`;
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Refresh every 2 seconds
setInterval(fetchSensorData, 2000);
window.onload = fetchSensorData;
