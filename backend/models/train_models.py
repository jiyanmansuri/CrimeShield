import os
import pandas as pd
import numpy as np
from sklearn.cluster import DBSCAN
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import IsolationForest
import xgboost as xgb
import joblib
from datetime import datetime

def train_models():
    print("Loading data...")
    data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'crimes_dataset.csv')
    df = pd.read_csv(data_path)
    
    # 1. Train DBSCAN for Spatial Clustering (Hotspots)
    print("Training DBSCAN...")
    # Weights could be added but standard DBSCAN on coords is fine for clustering
    coords = df[['lat', 'lng']].values
    db = DBSCAN(eps=0.005, min_samples=5).fit(coords)
    df['cluster'] = db.labels_
    
    # 2. Feature Engineering for XGBoost & Isolation Forest
    print("Engineering features...")
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df['hour_of_day'] = df['timestamp'].dt.hour
    df['day_of_week'] = df['timestamp'].dt.dayofweek
    
    # Label encode zone
    le_zone = LabelEncoder()
    df['zone_encoded'] = le_zone.fit_transform(df['zone'])
    
    # Synthesize a target 'risk_score' (0-100) for XGBoost based on severity and density
    # In a real scenario, this is historical crime volume
    df['risk_score'] = (df['severity'] * 15) + (np.random.rand(len(df)) * 25)
    df['risk_score'] = df['risk_score'].clip(0, 100)
    
    # XGBoost Features: zone, hour, day
    X_xgb = df[['zone_encoded', 'hour_of_day', 'day_of_week']]
    y_xgb = df['risk_score']
    
    print("Training XGBoost Risk Predictor...")
    xgb_model = xgb.XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=5)
    xgb_model.fit(X_xgb, y_xgb)
    
    print("Training Isolation Forest (Anomaly Detection)...")
    # For IF, we'll train on the frequency of crimes per zone/day to find volume spikes
    # Group by date and zone to get daily counts
    df['date'] = df['timestamp'].dt.date
    daily_counts = df.groupby(['date', 'zone_encoded']).size().reset_index(name='daily_count')
    
    iso_forest = IsolationForest(contamination=0.05, random_state=42)
    iso_forest.fit(daily_counts[['zone_encoded', 'daily_count']])
    
    # 3. Save Models
    print("Saving models...")
    models_dir = os.path.dirname(__file__)
    joblib.dump(db, os.path.join(models_dir, 'dbscan_model.pkl'))
    joblib.dump(xgb_model, os.path.join(models_dir, 'xgboost_risk_model.pkl'))
    joblib.dump(iso_forest, os.path.join(models_dir, 'isolation_forest.pkl'))
    joblib.dump(le_zone, os.path.join(models_dir, 'label_encoder_zone.pkl'))
    
    print("Training complete. Models saved to backend/models/")

if __name__ == "__main__":
    train_models()
