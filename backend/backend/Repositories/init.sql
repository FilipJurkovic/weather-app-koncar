-- Kreiranje tablice korisnika
CREATE TABLE IF NOT EXISTS users (
                                     id SERIAL PRIMARY KEY,
                                     username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

-- Kreiranje tablice povijesti pretraga
CREATE TABLE IF NOT EXISTS search_history (
                                              id SERIAL PRIMARY KEY,
                                              user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    city VARCHAR(100) NOT NULL,
    weather_condition VARCHAR(50) NOT NULL,
    temperature DOUBLE PRECISION NOT NULL,
    period_from TIMESTAMPTZ NOT NULL,
    period_to TIMESTAMPTZ NOT NULL,
    searched_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

-- Indeks za brže dohvaćanje povijesti po korisniku
CREATE INDEX IF NOT EXISTS idx_search_history_user_id ON search_history(user_id);