import random

def get_sensor_data():
    return {
        "temperature": random.randint(25, 35),
        "humidity": random.randint(40, 60),
        "sound_level": random.randint(30, 100)
    }
