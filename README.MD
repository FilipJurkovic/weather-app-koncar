# Weather App — Končar

Web aplikacija za prikaz vremenske prognoze s autentikacijom, pretragom gradova, poviješću pretraga i statistikama.

**Stack:** Next.js, .NET 8, PostgreSQL, Docker

---

## Pokretanje

```bash
docker compose up -d --build
```

- Frontend: http://localhost:3000
- Swagger: http://localhost:8080/swagger

---

## Napomena

Aplikacija koristi OpenWeather API ključ koji je poslan emailom. Prije pokretanja upiši ga u `docker-compose.yaml`:

```yaml
OpenWeather__ApiKey: UPIŠI_OVDJE
```