const temperatureEl = document.getElementById('temperature');
const humidityEl = document.getElementById('humidity');
const cryingEl = document.getElementById('crying');
const movementEl = document.getElementById('movement');
const alertEl = document.getElementById('alert');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const buzzerSound = document.getElementById('buzzerSound');

function simulateSensorData() {
    // Simulate temperature between 18 and 35 °C (increase max to 35 for alert testing)
    const temperature = getRandomInt(18, 35);
    temperatureEl.textContent = temperature + ' °C';

    // Simulate humidity between 30 and 70 %
    const humidity = getRandomInt(30, 70);
    humidityEl.textContent = humidity + ' %';

    // Simulate crying detection (random true/false)
    const cryingDetected = Math.random() < 0.1; // 10% chance
    cryingEl.textContent = cryingDetected ? 'Yes' : 'No';

    // Simulate movement detection (random true/false)
    const movementDetected = Math.random() < 0.15; // 15% chance
    movementEl.textContent = movementDetected ? 'Yes' : 'No';

    // Determine alert conditions
    const humidityAlert = humidity >= 50;
    const temperatureAlert = temperature > 30;
    const cryingAlert = cryingDetected;
    const movementAlert = movementDetected;

    if (humidityAlert || temperatureAlert || cryingAlert || movementAlert) {
        let alertMessages = [];
        if (humidityAlert) alertMessages.push('Humidity is 50% or above');
        if (temperatureAlert) alertMessages.push('Temperature is above 30°C');
        if (cryingAlert) alertMessages.push('Baby is crying');
        if (movementAlert) alertMessages.push('Baby is moving');

        const alertMessage = 'Alert! ' + alertMessages.join(' and ') + '.';
        showAlert(alertMessage);
        playBuzzer();
    } else {
        hideAlert();
        stopBuzzer();
    }
}

function playBuzzer() {
    buzzerSound.play().catch(e => {
        console.log('Buzzer play prevented:', e);
    });
}

function stopBuzzer() {
    buzzerSound.pause();
    buzzerSound.currentTime = 0;
}

function showAlert(message) {
    alertEl.textContent = message;
    alertEl.classList.remove('hidden');

    // Send alert message to backend server to trigger SMS via Twilio
    fetch('http://localhost:3001/send-alert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('SMS alert sent successfully, SID:', data.sid);
        } else {
            console.error('Failed to send SMS alert:', data.error);
        }
    })
    .catch(error => {
        console.error('Error sending SMS alert:', error);
    });
}

function hideAlert() {
    alertEl.textContent = '';
    alertEl.classList.add('hidden');
}

let simulationInterval = null;

function startSimulation() {
    if (!simulationInterval) {
        simulationInterval = setInterval(simulateSensorData, 5000);
        simulateSensorData();
        console.log('Simulation started');
    }
}

function stopSimulation() {
    if (simulationInterval) {
        clearInterval(simulationInterval);
        simulationInterval = null;
        console.log('Simulation stopped');
        // Reset sensor values to zero or No
        temperatureEl.textContent = '0 °C';
        humidityEl.textContent = '0 %';
        cryingEl.textContent = 'No';
        movementEl.textContent = 'No';
        hideAlert();
        stopBuzzer();
    }
}

document.getElementById('startBtn').addEventListener('click', startSimulation);
document.getElementById('stopBtn').addEventListener('click', stopSimulation);

// Initialize sensor values to zero or No before simulation starts
temperatureEl.textContent = '0 °C';
humidityEl.textContent = '0 %';
cryingEl.textContent = 'No';
movementEl.textContent = 'No';

// Start simulation initially
// startSimulation();  // Disabled to start only on user click
