-- CrimeShield Supabase Schema

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the crimes table
CREATE TABLE IF NOT EXISTS public.crimes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lat FLOAT NOT NULL,
    lng FLOAT NOT NULL,
    crime_type TEXT NOT NULL,
    severity INT NOT NULL CHECK (severity BETWEEN 1 AND 5),
    timestamp TIMESTAMPTZ NOT NULL,
    zone TEXT NOT NULL,
    source TEXT NOT NULL,
    status TEXT NOT NULL,
    description TEXT
);

-- Enable Realtime for the crimes table
alter publication supabase_realtime add table public.crimes;

-- Create patrol_routes table
CREATE TABLE IF NOT EXISTS public.patrol_routes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    officer_id UUID, -- Would be FK to auth.users in production
    route_geojson JSONB NOT NULL,
    zones_covered TEXT[] NOT NULL,
    shift_date DATE NOT NULL,
    shift_start TIME NOT NULL,
    shift_end TIME NOT NULL,
    risk_score_avg FLOAT NOT NULL
);

-- Note: We are allowing public read/write access for the hackathon prototype.
-- In production, Row Level Security (RLS) policies should be strictly enforced.
ALTER TABLE public.crimes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON public.crimes FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.crimes FOR INSERT WITH CHECK (true);

ALTER TABLE public.patrol_routes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON public.patrol_routes FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.patrol_routes FOR INSERT WITH CHECK (true);
