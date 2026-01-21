import { useEffect, useState } from "react";

export default function App() {
  const [city, setCity] = useState("Stuttgart");
  const [query, setQuery] = useState("Stuttgart");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [data, setData] = useState(null);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setErr("");
    setData(null);

    try {
      // 1) Geocoding: şehir -> lat/lon
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          cityName,
        )}&count=1&language=en&format=json`,
      );
      const geo = await geoRes.json();
      if (!geo.results || geo.results.length === 0) {
        throw new Error("City not found");
      }

      const { latitude, longitude, name, country } = geo.results[0];

      // 2) Weather: lat/lon -> hava durumu
      const wRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`,
      );
      const w = await wRes.json();

      setData({
        place: `${name}, ${country}`,
        temp: w.current?.temperature_2m,
        wind: w.current?.wind_speed_10m,
        code: w.current?.weather_code,
        daily: w.daily,
      });
    } catch (e) {
      setErr(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setCity(query.trim());
    fetchWeather(query.trim());
  };

  const codeToText = (code) => {
    // basit mapping örneği
    if (code === 0) return "Clear";
    if ([1, 2, 3].includes(code)) return "Partly cloudy";
    if ([45, 48].includes(code)) return "Fog";
    if ([51, 53, 55].includes(code)) return "Drizzle";
    if ([61, 63, 65].includes(code)) return "Rain";
    if ([71, 73, 75].includes(code)) return "Snow";
    if ([95, 96, 99].includes(code)) return "Thunderstorm";
    return "Cloudy";
  };

  return (
    <div className="wrap">
      <div className="card">
        <h1>Weather App</h1>

        <form onSubmit={onSubmit} className="row">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city..."
          />
          <button type="submit">Search</button>
        </form>

        {loading && <p className="muted">Loading...</p>}
        {err && <p className="error">{err}</p>}

        {data && (
          <div className="forecast">
            {data.daily?.time?.slice(0, 5).map((day, i) => (
              <div className="day" key={day}>
                <p className="day-name">
                  {new Date(day).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </p>
                <p className="day-temp">
                  {Math.round(data.daily.temperature_2m_max[i])}° /{" "}
                  {Math.round(data.daily.temperature_2m_min[i])}°
                </p>
                <p className="day-desc">
                  {codeToText(data.daily.weather_code[i])}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
