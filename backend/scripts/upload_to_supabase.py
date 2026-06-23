import os
import pandas as pd
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def upload_crimes():
    print("Loading crimes dataset...")
    df = pd.read_csv(os.path.join(os.path.dirname(__file__), '..', 'data', 'crimes_dataset.csv'))
    
    # Supabase allows bulk inserts, but there's usually a payload limit.
    # We will upload in chunks of 500.
    records = df.to_dict(orient='records')
    chunk_size = 500
    
    for i in range(0, len(records), chunk_size):
        chunk = records[i:i + chunk_size]
        print(f"Uploading chunk {i//chunk_size + 1}/{(len(records) + chunk_size - 1)//chunk_size}...")
        
        try:
            data, count = supabase.table('crimes').insert(chunk).execute()
        except Exception as e:
            print(f"Error uploading chunk: {e}")
            
    print("Upload complete!")

if __name__ == "__main__":
    upload_crimes()
