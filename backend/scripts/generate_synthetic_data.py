import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
import os

# Ahmedabad approx bounds
# Lat: 22.9 to 23.1
# Lng: 72.5 to 72.7
ZONES = ["Navrangpura", "Vastrapur", "Maninagar", "Bapunagar", "Satellite", "Paldi", "Ghatlodia", "SG Highway"]
CRIME_TYPES = ["Theft", "Assault", "Fraud", "Cyber", "Vandalism"]

def generate_data(num_records=5000):
    data = []
    start_date = datetime(2025, 1, 1)
    end_date = datetime(2026, 6, 1)
    
    delta = end_date - start_date
    
    for _ in range(num_records):
        random_days = random.randint(0, delta.days)
        random_seconds = random.randint(0, 86400)
        timestamp = start_date + timedelta(days=random_days, seconds=random_seconds)
        
        zone = random.choice(ZONES)
        crime_type = random.choice(CRIME_TYPES)
        
        # Base Lat Lng
        lat = 22.9 + random.random() * 0.2
        lng = 72.5 + random.random() * 0.2
        
        # Severity
        if crime_type in ["Assault", "Cyber"]:
            severity = random.randint(3, 5)
        elif crime_type == "Fraud":
            severity = random.randint(2, 4)
        else:
            severity = random.randint(1, 3)
            
        data.append({
            "lat": round(lat, 5),
            "lng": round(lng, 5),
            "crime_type": crime_type,
            "severity": severity,
            "timestamp": timestamp.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "zone": zone,
            "source": random.choice(["FIR", "Cyber", "Patrol", "Manual"]),
            "status": random.choice(["Open", "Under Investigation", "Closed"])
        })
        
    df = pd.DataFrame(data)
    
    # Ensure data directory exists
    os.makedirs(os.path.join(os.path.dirname(__file__), '..', 'data'), exist_ok=True)
    out_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'crimes_dataset.csv')
    df.to_csv(out_path, index=False)
    print(f"Generated {num_records} records at {out_path}")

if __name__ == "__main__":
    generate_data(5000)
