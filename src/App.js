import React, { useState, useEffect } from "react";

const VIBES = [
  { label: "🎉 Feest", value: "Feest" },
  { label: "💍 Bruiloft", value: "Bruiloft" },
  { label: "🍔 BBQ", value: "BBQ" },
  { label: "🎂 Verjaardag", value: "Verjaardag" },
  { label: "🍹 Zomeravond", value: "Zomeravond" },
  { label: "🕺 Danceparty", value: "Danceparty" },
  { label: "🎃 Halloween", value: "Halloween" },
  { label: "🎄 Kerst", value: "Kerst" },
  { label: "🏖️ Strandfeest", value: "Strandfeest" },
  { label: "🍷 Dinnerparty", value: "Dinnerparty" },
];

const THEMES = [
  { label: "🎵 Alle muziek", value: "alle muziek" },
  { label: "🇳🇱 Nederlands", value: "Nederlandstalige muziek" },
  { label: "80s Retro", value: "jaren 80 muziek" },
  { label: "90s Classics", value: "jaren 90 muziek" },
  { label: "Y2K / 00s", value: "jaren 2000 muziek" },
  { label: "🌴 Latin", value: "Latin & Reggaeton" },
  { label: "🎸 Rock", value: "Rock & Alternative" },
  { label: "🎷 Jazz & Soul", value: "Jazz, Soul & R&B" },
  { label: "🔊 Hip-Hop", value: "Hip-Hop & Rap" },
  { label: "⚡ Electronic", value: "Electronic & Dance" },
  { label: "🍀 Irish / Folk", value: "Irish Folk & Celtic muziek" },
  { label: "🤠 Country", value: "Country & Western muziek" },
  { label: "🎌 K-Pop & J-Pop", value: "K-Pop en J-Pop muziek" },
  { label: "🎹 Piano Bar", value: "Piano Bar & Lounge muziek" },
];

const AGES = ["Kinderen (5-12)", "Tieners (13-19)", "Twintigers (20-29)", "Dertigers (30-39)", "Veertigers (40-49)", "Mix van alles"];
const DURATIONS = ["1 uur", "2 uur", "3 uur", "4+ uur"];

const C = {
  bg: "#fdf6ee", card: "#fff8f0", dark: "#1a1208",
  accent: "#e8631a", accent2: "#f5b942", muted: "#9a8870",
  border: "#ede0cc", tag: "#fff0dc",
};

function searchUrl(platform, query) {
  const q = encodeURIComponent(query);
  if (platform === "spotify") return `https://open.spotify.com/search/${q}`;
  if (platform === "apple") return `https://music.apple.com/search?term=${q}`;
  if (platform === "youtube") return `https://www.youtube.com/results?search_query=${q}`;
}

function StreamLinks({ nummer }) {
  return (
    <div style={{ display: "flex", gap: "0.3rem", flexShrink: 0 }}>
      {[
        { platform: "spotify", emoji: "🟢", title: "Spotify" },
        { platform: "apple", emoji: "🍎", title: "Apple Music" },
        { platform: "youtube", emoji: "▶️", title: "YouTube" },
      ].map(({ platform, emoji, title }) => (
        <a key={platform} href={searchUrl(platform, nummer)} target="_blank" rel="noopener noreferrer"
          title={title} style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 24, height: 24, borderRadius: "6px",
            background: "#fff", border: `1px solid ${C.border}`,
            fontSize: "0.7rem", textDecoration: "none",
            transition: "all 0.15s", cursor: "pointer",
          }}>{emoji}</a>
      ))}
    </div>
  );
}

function Tag({ children, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: active ? C.accent : C.tag,
      color: active ? "#fff" : C.dark,
      border: `1.5px solid ${active ? C.accent : C.border}`,
      borderRadius: "30px", padding: "0.45rem 1rem",
      fontFamily: "'Lora', serif", fontSize: "0.82rem",
      cursor: "pointer", transition: "all 0.15s",
      fontWeight: active ? 700 : 400, whiteSpace: "nowrap",
    }}>{children}</button>
  );
}

function Step({ number, title, subtitle, children }) {
  return (
    <div style={{ marginBottom: "1.6rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.65rem" }}>
        <div style={{
          width: 26, height: 26, borderRadius: "50%", background: C.accent, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Playfair Display', serif", fontSize: "0.8rem", fontWeight: 700, flexShrink: 0,
        }}>{number}</div>
        <div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: C.dark }}>{title}</span>
          {subtitle && <span style={{ fontFamily: "'Lora', serif", fontSize: "0.78rem", color: C.muted, marginLeft: "0.5rem" }}>{subtitle}</span>}
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>{children}</div>
    </div>
  );
}

function WeatherBanner({ weather, onUse }) {
  if (!weather) return null;
  const emoji = weather.temp > 22 ? "☀️" : weather.temp > 14 ? "⛅" : weather.temp > 5 ? "🌧️" : "❄️";
  const vibe = weather.temp > 22 ? "zomers & energiek" : weather.temp > 14 ? "lekker & ontspannen" : weather.temp > 5 ? "gezellig & warm" : "winters & knus";
  return (
    <div style={{
      background: "linear-gradient(135deg, #fff8e6, #fff0d0)",
      border: `1.5px solid ${C.accent2}`, borderRadius: "12px",
      padding: "0.9rem 1.1rem", marginBottom: "1.4rem",
      display: "flex", alignItems: "center", gap: "0.8rem",
    }}>
      <span style={{ fontSize: "2rem" }}>{emoji}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.9rem", color: C.dark }}>{weather.temp}°C · {weather.city}</div>
        <div style={{ fontFamily: "'Lora', serif", fontSize: "0.75rem", color: C.muted }}>Suggestie: een <strong>{vibe}</strong> playlist past perfect</div>
      </div>
      <button onClick={onUse} style={{
        background: C.accent2, border: "none", borderRadius: "8px",
        padding: "0.4rem 0.8rem", fontFamily: "'Lora', serif",
        fontSize: "0.75rem", fontWeight: 700, color: C.dark, cursor: "pointer",
      }}>Gebruik dit</button>
    </div>
  );
}

function TrackItem({ nummer, faseIndex, trackIndex, onSwap, swappingKey }) {
  const isSwapping = swappingKey === `${faseIndex}-${trackIndex}`;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0", borderBottom: `1px solid ${C.border}` }}>
      <span style={{ color: C.accent, fontSize: "0.65rem", flexShrink: 0 }}>♪</span>
      <span style={{
        fontFamily: "'Lora', serif", fontSize: "0.82rem", color: C.dark, flex: 1,
        opacity: isSwapping ? 0.4 : 1, transition: "opacity 0.2s",
      }}>{nummer}</span>
      <StreamLinks nummer={nummer} />
      <button onClick={() => onSwap(faseIndex, trackIndex, nummer)} disabled={isSwapping}
        title="Wissel dit nummer" style={{
          background: "none", border: `1px solid ${C.border}`, borderRadius: "6px",
          padding: "0.15rem 0.4rem", color: C.muted,
          cursor: isSwapping ? "not-allowed" : "pointer",
          fontSize: "0.7rem", fontFamily: "'Lora', serif", flexShrink: 0,
        }}>{isSwapping ? "..." : "↻"}</button>
    </div>
  );
}

function PlaylistCard({ block, faseIndex, onSwap, swappingKey }) {
  return (
    <div style={{
      background: faseIndex % 2 === 0 ? C.tag : "#fff",
      border: `1px solid ${C.border}`, borderRadius: "12px",
      padding: "1rem 1.1rem",
      animation: `fadeUp 0.4s ${faseIndex * 0.08}s both ease-out`,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.7rem" }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.95rem", color: C.dark }}>{block.fase}</div>
          <div style={{ fontFamily: "'Lora', serif", fontSize: "0.72rem", color: C.muted, marginTop: "0.1rem" }}>{block.tijd}</div>
        </div>
        <span style={{ fontSize: "1.3rem" }}>{block.emoji}</span>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.3rem", marginBottom: "0.4rem" }}>
        {[{ e: "🟢", t: "Spotify" }, { e: "🍎", t: "Apple" }, { e: "▶️", t: "YouTube" }].map(({ e, t }) => (
          <span key={t} style={{ fontSize: "0.6rem", color: C.muted, fontFamily: "'Lora', serif" }}>{e} {t}</span>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {block.nummers.map((n, i) => (
          <TrackItem key={`${faseIndex}-${i}-${n}`} nummer={n} faseIndex={faseIndex} trackIndex={i} onSwap={onSwap} swappingKey={swappingKey} />
        ))}
      </div>
      <div style={{ marginTop: "0.7rem", fontFamily: "'Lora', serif", fontSize: "0.75rem", color: C.muted, fontStyle: "italic" }}>{block.tip}</div>
    </div>
  );
}

function printPlaylist(playlist, vibe, theme, duration, weather) {
  const win = window.open("", "_blank");
  const content = `<!DOCTYPE html><html><head>
    <meta charset="utf-8"><title>Feest Playlist</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Lora', serif; background: #fff; color: #1a1208; padding: 2.5rem; max-width: 620px; margin: 0 auto; }
      h1 { font-family: 'Playfair Display', serif; font-size: 2rem; color: #e8631a; margin-bottom: 0.3rem; }
      .meta { color: #9a8870; font-size: 0.85rem; margin-bottom: 2rem; }
      .fase { margin-bottom: 1.5rem; border-left: 3px solid #e8631a; padding-left: 1rem; }
      .fase-title { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 1.05rem; }
      .fase-tijd { color: #9a8870; font-size: 0.75rem; margin-bottom: 0.5rem; }
      .track { font-size: 0.85rem; padding: 0.25rem 0; border-bottom: 1px solid #ede0cc; display: flex; justify-content: space-between; align-items: center; }
      .track-name::before { content: "♪ "; color: #e8631a; }
      .links { display: flex; gap: 0.5rem; font-size: 0.75rem; }
      .links a { color: #e8631a; text-decoration: none; }
      .tip { font-style: italic; color: #9a8870; font-size: 0.78rem; margin-top: 0.5rem; }
      .footer { margin-top: 2rem; color: #9a8870; font-size: 0.75rem; text-align: center; border-top: 1px solid #ede0cc; padding-top: 1rem; }
    </style></head><body>
    <h1>🎵 Jouw Feest Playlist</h1>
    <div class="meta">${vibe} · ${theme} · ${duration}${weather ? ` · 🌤️ ${weather.temp}°C in ${weather.city}` : ""}</div>
    ${playlist.map(b => `<div class="fase">
      <div class="fase-title">${b.emoji} ${b.fase}</div>
      <div class="fase-tijd">${b.tijd}</div>
      ${b.nummers.map(n => {
        const q = encodeURIComponent(n);
        return `<div class="track">
          <span class="track-name">${n}</span>
          <span class="links">
            <a href="https://open.spotify.com/search/${q}" target="_blank">🟢 Spotify</a>
            <a href="https://music.apple.com/search?term=${q}" target="_blank">🍎 Apple</a>
            <a href="https://www.youtube.com/results?search_query=${q}" target="_blank">▶️ YouTube</a>
          </span>
        </div>`;
      }).join("")}
      <div class="tip">${b.tip}</div>
    </div>`).join("")}
    <div class="footer">Gemaakt met Feest Playlist Planner · ${new Date().toLocaleDateString("nl-NL")}</div>
    </body></html>`;
  win.document.write(content);
  win.document.close();
  setTimeout(() => win.print(), 500);
}

function sharePlaylist(playlist, vibe, theme) {
  const text = `🎵 Mijn feestplaylist voor ${vibe} (${theme}):\n\n` +
    playlist.map(b => `${b.emoji} ${b.fase} (${b.tijd})\n${b.nummers.map(n => `  ♪ ${n}`).join("\n")}`).join("\n\n") +
    `\n\nGemaakt met Feest Playlist Planner 🎉`;
  if (navigator.share) {
    navigator.share({ title: "Mijn Feest Playlist", text });
  } else {
    navigator.clipboard.writeText(text).then(() => alert("Playlist gekopieerd naar klembord! 📋"));
  }
}

export default function FeestPlanner() {
  const [vibe, setVibe] = useState(null);
  const [themes, setThemes] = useState([]);
  const [ages, setAges] = useState([]);
  const [duration, setDuration] = useState(null);
  const [artists, setArtists] = useState("");
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState(null);
  const [error, setError] = useState(false);
  const [swappingKey, setSwappingKey] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        const geoData = await geoRes.json();
        const city = geoData.address?.city || geoData.address?.town || geoData.address?.village || "jouw stad";
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`);
        const weatherData = await weatherRes.json();
        const temp = Math.round(weatherData.current?.temperature_2m);
        setWeather({ temp, city });
      } catch {}
      finally { setWeatherLoading(false); }
    }, () => setWeatherLoading(false));
  }, []);

  function applyWeatherSuggestion() {
    if (!weather) return;
    if (weather.temp > 22) setVibe(VIBES.find(v => v.value === "Strandfeest"));
    else if (weather.temp > 14) setVibe(VIBES.find(v => v.value === "BBQ"));
    else if (weather.temp > 5) setVibe(VIBES.find(v => v.value === "Dinnerparty"));
    else setVibe(VIBES.find(v => v.value === "Kerst"));
  }

  const canGenerate = vibe && themes.length > 0 && ages.length > 0 && duration;

  async function generatePlaylist() {
    setLoading(true); setError(false); setPlaylist(null);
    const weatherContext = weather ? `Het is buiten ${weather.temp}°C in ${weather.city}. Houd hier rekening mee in de sfeer.` : "";
    const themeStr = themes.map(t => t.value).join(", ");
    const ageStr = ages.join(", ");
    const prompt = `Je bent een professionele feest-playlist samensteller. Maak een playlist tijdlijn voor:
- Sfeer: ${vibe.value}
- Muziekthema: ${themeStr}
- Leeftijdsgroep: ${ageStr}
- Duur: ${duration}
- Favoriete artiesten/genres: ${artists || "geen voorkeur"}
${weatherContext}

Geef een tijdlijn terug als JSON array (geen markdown, alleen pure JSON):
[{"fase":"naam","emoji":"emoji","tijd":"bijv. 0:00 - 0:30","nummers":["Artiest - Nummer","Artiest - Nummer","Artiest - Nummer"],"tip":"sfeer-tip"}]

Zorg voor 4-6 fases. Gebruik échte nummers passend bij de muziekthema's en leeftijdsgroepen. Nederlandstalig antwoord. Alleen JSON.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] })
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type === "text")?.text || "";
      setPlaylist(JSON.parse(text.replace(/```json|```/g, "").trim()));
    } catch { setError(true); }
    finally { setLoading(false); }
  }

  async function swapTrack(faseIndex, trackIndex, currentTrack) {
    const key = `${faseIndex}-${trackIndex}`;
    setSwappingKey(key);
    const fase = playlist[faseIndex];
    const prompt = `Geef één alternatief nummer voor "${currentTrack}" dat past bij: sfeer ${vibe.value}, muziekthema ${themes.map(t=>t.value).join(", ")}, leeftijd ${ages.join(", ")}, fase "${fase.fase}". Geef ALLEEN de vervanging terug als: Artiest - Nummer. Geen uitleg.`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 100, messages: [{ role: "user", content: prompt }] })
      });
      const data = await res.json();
      const newTrack = data.content?.find(b => b.type === "text")?.text?.trim();
      if (newTrack) {
        setPlaylist(prev => prev.map((f, fi) => {
          if (fi !== faseIndex) return f;
          const newNummers = [...f.nummers];
          newNummers[trackIndex] = newTrack;
          return { ...f, nummers: newNummers };
        }));
      }
    } catch {}
    finally { setSwappingKey(null); }
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Lora', serif", paddingBottom: "3rem" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        * { box-sizing: border-box; }
        button:hover:not(:disabled) { opacity: 0.88; }
        a:hover { opacity: 0.75; }
      `}</style>

      {/* Header */}
      <div style={{ background: C.dark, padding: "2.2rem 1.5rem 1.8rem", marginBottom: "1.8rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: C.accent, opacity: 0.12 }} />
        <div style={{ position: "absolute", bottom: -30, left: -20, width: 120, height: 120, borderRadius: "50%", background: C.accent2, opacity: 0.1 }} />
        <div style={{ maxWidth: 500, margin: "0 auto", position: "relative" }}>
          <div style={{ fontFamily: "'Lora', serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: C.accent2, textTransform: "uppercase", marginBottom: "0.5rem" }}>✦ De slimme playlist maker</div>
          <h1 style={{ margin: 0, color: "#fff", fontFamily: "'Playfair Display', serif", fontSize: "2.1rem", fontWeight: 900, lineHeight: 1.1 }}>Jouw perfecte<br />feestplaylist</h1>
          <p style={{ color: "#a09070", margin: "0.7rem 0 0", fontSize: "0.85rem", lineHeight: 1.6 }}>Vertel ons over je feest — wij regelen de muziek.</p>
        </div>
      </div>

      <div style={{ maxWidth: 500, margin: "0 auto", padding: "0 1.2rem" }}>

        {weather && <WeatherBanner weather={weather} onUse={applyWeatherSuggestion} />}
        {weatherLoading && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.2rem", color: C.muted, fontSize: "0.78rem", fontFamily: "'Lora', serif" }}>
            <div style={{ width: 14, height: 14, border: `2px solid ${C.border}`, borderTop: `2px solid ${C.accent}`, borderRadius: "50%", animation: "spin 0.8s linear infinite", flexShrink: 0 }} />
            Weer ophalen...
          </div>
        )}

        {/* Form */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "18px", padding: "1.5rem", marginBottom: "1.2rem", boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}>
          <Step number="1" title="Wat voor feest?">
            {VIBES.map(v => <Tag key={v.value} active={vibe?.value === v.value} onClick={() => setVibe(v)}>{v.label}</Tag>)}
          </Step>
          <Step number="2" title="Muziekthema?" subtitle="(meerdere mogelijk)">
            {THEMES.map(t => <Tag key={t.value} active={themes.some(x => x.value === t.value)} onClick={() => setThemes(prev => prev.some(x => x.value === t.value) ? prev.filter(x => x.value !== t.value) : [...prev, t])}>{t.label}</Tag>)}
          </Step>
          <Step number="3" title="Wie komen er?" subtitle="(meerdere mogelijk)">
            {AGES.map(a => <Tag key={a} active={ages.includes(a)} onClick={() => setAges(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])}>{a}</Tag>)}
          </Step>
          <Step number="4" title="Hoe lang?">
            {DURATIONS.map(d => <Tag key={d} active={duration === d} onClick={() => setDuration(d)}>{d}</Tag>)}
          </Step>
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.65rem" }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: artists ? C.accent : C.border, color: artists ? "#fff" : C.muted, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontSize: "0.8rem", fontWeight: 700, flexShrink: 0, transition: "all 0.2s" }}>5</div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: C.dark }}>Favoriete artiesten? <span style={{ color: C.muted, fontWeight: 400, fontSize: "0.82rem" }}>(optioneel)</span></span>
            </div>
            <input value={artists} onChange={e => setArtists(e.target.value)} placeholder="bijv. Stromae, ABBA, Marco Borsato..."
              style={{ width: "100%", padding: "0.7rem 1rem", border: `1.5px solid ${C.border}`, borderRadius: "10px", fontFamily: "'Lora', serif", fontSize: "0.88rem", color: C.dark, background: "#fff", outline: "none" }} />
          </div>
          <button onClick={generatePlaylist} disabled={!canGenerate || loading} style={{
            width: "100%", padding: "0.95rem",
            background: canGenerate ? C.accent : C.border,
            color: canGenerate ? "#fff" : C.muted,
            border: "none", borderRadius: "12px",
            fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700,
            cursor: canGenerate ? "pointer" : "not-allowed", transition: "all 0.2s",
          }}>{loading ? "⏳ Playlist samenstellen..." : "✦ Maak mijn playlist"}</button>
          {!canGenerate && <p style={{ textAlign: "center", color: C.muted, fontSize: "0.75rem", margin: "0.6rem 0 0", fontStyle: "italic" }}>Kies sfeer, thema, leeftijd en duur om verder te gaan</p>}
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <div style={{ width: 32, height: 32, border: `3px solid ${C.border}`, borderTop: `3px solid ${C.accent}`, borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 1rem" }} />
            <p style={{ color: C.muted, fontSize: "0.85rem", fontStyle: "italic" }}>De perfecte playlist wordt samengesteld...</p>
          </div>
        )}

        {error && (
          <div style={{ background: "#fff0ec", border: "1px solid #ffd0c0", borderRadius: "12px", padding: "1rem 1.2rem", color: C.accent, fontSize: "0.85rem", textAlign: "center" }}>
            ⚠️ Er ging iets mis. Probeer het opnieuw.
          </div>
        )}

        {playlist && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1rem" }}>
              <button onClick={() => printPlaylist(playlist, vibe.label, themes.map(t=>t.label).join(", "), duration, weather)} style={{ flex: 1, padding: "0.65rem", background: C.dark, color: "#fff", border: "none", borderRadius: "10px", fontFamily: "'Lora', serif", fontSize: "0.82rem", cursor: "pointer", fontWeight: 600 }}>⬇ Download PDF</button>
              <button onClick={() => sharePlaylist(playlist, vibe.label, themes.map(t=>t.label).join(", "))} style={{ flex: 1, padding: "0.65rem", background: C.accent2, color: C.dark, border: "none", borderRadius: "10px", fontFamily: "'Lora', serif", fontSize: "0.82rem", cursor: "pointer", fontWeight: 600 }}>↗ Delen</button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <div style={{ flex: 1, height: 1, background: C.border }} />
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.82rem", color: C.muted, whiteSpace: "nowrap" }}>{vibe.label} · {themes.map(t=>t.label).join(", ")} · {duration}</span>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>

            {weather && <div style={{ textAlign: "center", marginBottom: "0.8rem", fontFamily: "'Lora', serif", fontSize: "0.75rem", color: C.muted, fontStyle: "italic" }}>🌤️ Playlist afgestemd op {weather.temp}°C in {weather.city}</div>}

            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {playlist.map((block, i) => (
                <PlaylistCard key={i} block={block} faseIndex={i} onSwap={swapTrack} swappingKey={swappingKey} />
              ))}
            </div>

            <div style={{ marginTop: "1.5rem", background: C.dark, borderRadius: "14px", padding: "1.1rem 1.3rem", textAlign: "center" }}>
              <p style={{ color: C.accent2, fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.95rem", margin: "0 0 0.3rem" }}>Wil je de playlist op Spotify?</p>
              <p style={{ color: "#a09070", fontFamily: "'Lora', serif", fontSize: "0.78rem", margin: "0 0 0.8rem", fontStyle: "italic" }}>Pro maakt de playlist automatisch aan in jouw Spotify</p>
              <button style={{ background: C.accent, color: "#fff", border: "none", borderRadius: "8px", padding: "0.6rem 1.5rem", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>✦ Probeer Pro — €3,99/maand</button>
            </div>

            <button onClick={() => { setPlaylist(null); setVibe(null); setThemes([]); setAges([]); setDuration(null); setArtists(""); }}
              style={{ width: "100%", marginTop: "0.8rem", background: "transparent", border: `1px solid ${C.border}`, borderRadius: "10px", padding: "0.7rem", color: C.muted, fontFamily: "'Lora', serif", fontSize: "0.82rem", cursor: "pointer" }}>
              ↩ Nieuw feest plannen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
