const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.static('public'));

app.get('/api/sensors', (req, res) => {
  // Simulated sensor data
  const temp = (25 + Math.random() * 5).toFixed(1);
  const humidity = (40 + Math.random() * 20).toFixed(1);
  const sound = (30 + Math.random() * 20).toFixed(1);

  let alert = null;
  if (sound > 45) alert = "Baby Crying Detected!";
  else if (temp > 30) alert = "High Temperature!";
  
  res.json({
    temperature: temp,
    humidity: humidity,
    soundLevel: sound,
    alert
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
