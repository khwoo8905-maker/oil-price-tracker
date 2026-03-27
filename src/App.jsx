import { useState, useEffect } from "react";

// ─── Data ───
const PRICES = [
  { round: 1, start: "3/13", end: "3/26", gasoline: 1724, diesel: 1713, kerosene: 1320 },
  { round: 2, start: "3/27", end: "4/9", gasoline: 1934, diesel: 1923, kerosene: 1530 },
];
const OIL = [
  { name: "WTI", price: 92.36, chg: +1.44 },
  { name: "브렌트", price: 104.4, chg: -0.5 },
  { name: "두바이", price: 98.2, chg: +0.8 },
];
const NEWS = [
  { d: "3/27", t: "2차 최고가격 시행 — 210원 인상", c: "#ff6b4a" },
  { d: "3/26", t: "유류세 인하폭 2배 확대 (휘발유 15%, 경유 25%)", c: "#ff6b4a" },
  { d: "3/25", t: "이란, 미국 휴전 제안 거부 — 호르무즈 긴장", c: "#ffaa33" },
  { d: "3/23", t: "산업연구원: 최고가격제 장기 시행 시 시장 왜곡 경고", c: "#8b5cf6" },
  { d: "3/19", t: "전국 휘발유 평균 1,829원 (전주 -72원)", c: "#28c864" },
  { d: "3/13", t: "1차 석유 최고가격제 시행 — 28년 만에 처음", c: "#ff6b4a" },
];

function getDaysLeft() {
  const d = new Date("2026-04-10T00:00:00+09:00") - new Date();
  return Math.max(0, Math.ceil(d / 864e5));
}

// ─── Styles ───
const F = "'Noto Sans KR',sans-serif";
const M = "'JetBrains Mono',monospace";
const card = {
  background: "rgba(255,255,255,0.03)",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.06)",
};

// ─── Hero ───
function Hero() {
  const cur = PRICES[1], prev = PRICES[0];
  const diff = cur.gasoline - prev.gasoline;
  return (
    <div style={{
      background: "linear-gradient(135deg,#0a0a0a,#1a0a0a,#0a0a0a)",
      borderRadius: 14, padding: "18px 16px", position: "relative", overflow: "hidden",
      border: "1px solid rgba(255,60,60,0.15)",
    }}>
      <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120,
        background: "radial-gradient(circle,rgba(255,60,40,0.12),transparent 70%)", borderRadius: "50%" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <div>
          <span style={{ fontFamily: F, fontSize: 10, color: "#ff6b4a", fontWeight: 700, letterSpacing: 1.5 }}>
            제{cur.round}차 최고가격
          </span>
          <span style={{ fontFamily: F, fontSize: 10, color: "rgba(255,255,255,0.3)", marginLeft: 8 }}>
            {cur.start}~{cur.end}
          </span>
        </div>
        <span style={{
          background: "rgba(255,60,40,0.15)", color: "#ff6b4a",
          padding: "3px 8px", borderRadius: 12, fontSize: 11, fontWeight: 700, fontFamily: M,
        }}>▲{diff}원</span>
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "10px 0 2px" }}>
        <span style={{ fontFamily: M, fontSize: 42, fontWeight: 800, color: "#fff", lineHeight: 1,
          textShadow: "0 0 30px rgba(255,60,40,0.25)" }}>{cur.gasoline.toLocaleString()}</span>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: F }}>원/ℓ</span>
      </div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: F, marginBottom: 12 }}>
        보통휘발유 정유사 공급가 상한
      </div>

      <div style={{ display: "flex", gap: 6 }}>
        {[
          { l: "경유", p: cur.diesel },
          { l: "등유", p: cur.kerosene },
        ].map(f => (
          <div key={f.l} style={{ ...card, flex: 1, padding: "8px 10px" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: F }}>{f.l}</div>
            <div style={{ fontFamily: M, fontSize: 17, fontWeight: 700, color: "#fff" }}>
              {f.p.toLocaleString()}<span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>원</span>
            </div>
          </div>
        ))}
        <div style={{
          flex: 1, padding: "8px 10px", borderRadius: 12,
          background: "rgba(255,107,74,0.08)", border: "1px solid rgba(255,107,74,0.12)",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: F }}>다음 조정</div>
          <div style={{ fontFamily: M, fontSize: 17, fontWeight: 800, color: "#ff6b4a" }}>D-{getDaysLeft()}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Nearby ───
function Nearby() {
  const [loading, setLoading] = useState(false);
  const go = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      window.open("https://m.search.naver.com/search.naver?query=내+주변+주유소+최저가", "_blank");
      setLoading(false); return;
    }
    navigator.geolocation.getCurrentPosition(
      p => {
        const lat = p.coords.latitude;
        const lng = p.coords.longitude;
        window.open(`https://map.kakao.com/?q=주유소&lat=${lat}&lng=${lng}`, "_blank");
        setLoading(false);
      },
      () => {
        window.open("https://map.kakao.com/?q=주유소", "_blank");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };
  return (
    <div style={{ marginTop: 12 }}>
      <div onClick={go} style={{
        ...card, padding: "14px 16px", cursor: "pointer",
        background: "linear-gradient(135deg,rgba(255,107,74,0.1),rgba(255,60,40,0.04))",
        border: "1px solid rgba(255,107,74,0.15)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: "#fff" }}>
            {loading ? "위치 확인 중..." : "📍 주변 싼 주유소 찾기"}
          </div>
          <div style={{ fontFamily: F, fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>
            GPS → 카카오맵 주유소 검색
          </div>
        </div>
        <span style={{ fontSize: 20, color: "rgba(255,255,255,0.3)" }}>{loading ? "⏳" : "→"}</span>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
        {[
          { l: "오피넷", u: "https://www.opinet.co.kr/user/main/mainView.do" },
          { l: "App Store", u: "https://apps.apple.com/kr/app/id373670219" },
          { l: "Google Play", u: "https://play.google.com/store/apps/details?id=com.lge.opinet" },
        ].map(a => (
          <a key={a.l} href={a.u} target="_blank" rel="noopener noreferrer" style={{
            ...card, flex: 1, padding: "8px 6px", textDecoration: "none", textAlign: "center",
          }}>
            <div style={{ fontFamily: F, fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>{a.l}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── Prediction ───
function Prediction() {
  const cur = PRICES[1];
  const tax = 900;
  const sc = [
    { l: "안정", r: 0, c: "#28c864" },
    { l: "현추세", r: 5, c: "#ffaa33" },
    { l: "급등", r: 12, c: "#ff4444" },
  ];
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 8, paddingLeft: 2 }}>
        🔮 3차 최고가격 예측
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {sc.map(s => {
          const p = Math.round((cur.gasoline - tax) * (1 + s.r / 100) + tax);
          const d = p - cur.gasoline;
          return (
            <div key={s.l} style={{
              flex: 1, borderRadius: 12, padding: "10px 10px",
              background: `${s.c}11`, border: `1px solid ${s.c}22`, textAlign: "center",
            }}>
              <div style={{ fontFamily: F, fontSize: 10, fontWeight: 600, color: s.c, marginBottom: 4 }}>{s.l}</div>
              <div style={{ fontFamily: M, fontSize: 16, fontWeight: 700, color: "#fff" }}>{p.toLocaleString()}</div>
              <div style={{ fontFamily: M, fontSize: 10, color: s.c, marginTop: 2 }}>
                {d > 0 ? "+" : ""}{d}원
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ fontFamily: F, fontSize: 9, color: "rgba(255,255,255,0.25)", marginTop: 4, paddingLeft: 2 }}>
        국제 석유제품 가격 변동률 기반 시나리오 · 참고용
      </div>
    </div>
  );
}

// ─── Calculator ───
function Calc() {
  const [km, setKm] = useState(1000);
  const [fuel, setFuel] = useState("gasoline");
  const [eff, setEff] = useState("");
  const cur = PRICES[1], prev = PRICES[0];
  const defEff = fuel === "gasoline" ? 12 : 14;
  const e = eff ? parseFloat(eff) || defEff : defEff;
  const liters = km / e;
  const cost = Math.round(liters * cur[fuel]);
  const diffPrev = Math.round(liters * (cur[fuel] - prev[fuel]));
  const diff3m = Math.round(liters * (cur[fuel] - 1600));

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 8, paddingLeft: 2 }}>
        💰 내 주유비 계산기
      </div>
      <div style={{ ...card, padding: "14px 14px" }}>
        {/* Fuel toggle + efficiency */}
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          {["gasoline", "diesel"].map(f => (
            <button key={f} onClick={() => setFuel(f)} style={{
              flex: 1, padding: "7px 0", borderRadius: 8, fontSize: 12, fontWeight: 600, fontFamily: F,
              border: fuel === f ? "1px solid rgba(255,107,74,0.4)" : "1px solid rgba(255,255,255,0.08)",
              background: fuel === f ? "rgba(255,107,74,0.12)" : "transparent",
              color: fuel === f ? "#ff6b4a" : "rgba(255,255,255,0.4)", cursor: "pointer",
            }}>
              {f === "gasoline" ? "⛽ 휘발유" : "🛢️ 경유"}
            </button>
          ))}
          <div style={{
            display: "flex", alignItems: "center", gap: 3,
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "0 8px",
          }}>
            <input type="number" inputMode="decimal" placeholder={String(defEff)} value={eff}
              onChange={e => setEff(e.target.value)}
              style={{
                width: 36, padding: "7px 0", border: "none", background: "transparent",
                color: "#fff", fontFamily: M, fontSize: 13, fontWeight: 700, textAlign: "right", outline: "none",
              }}
            />
            <span style={{ fontFamily: F, fontSize: 9, color: "rgba(255,255,255,0.35)" }}>km/ℓ</span>
          </div>
        </div>

        {/* KM slider */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
          <span style={{ fontFamily: F, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>월 주행거리</span>
          <span style={{ fontFamily: M, fontSize: 16, fontWeight: 700, color: "#fff" }}>
            {km.toLocaleString()}<span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginLeft: 3 }}>km</span>
          </span>
        </div>
        <input type="range" min={200} max={3000} step={100} value={km}
          onChange={e => setKm(Number(e.target.value))}
          style={{ width: "100%", accentColor: "#ff6b4a", height: 4 }}
        />

        {/* Result */}
        <div style={{
          marginTop: 12, padding: "12px", borderRadius: 10,
          background: "rgba(255,107,74,0.06)", border: "1px solid rgba(255,107,74,0.1)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontFamily: F, fontSize: 10, color: "rgba(255,255,255,0.35)", marginBottom: 2 }}>예상 주유비</div>
            <div style={{ fontFamily: M, fontSize: 24, fontWeight: 800, color: "#fff" }}>
              {cost.toLocaleString()}<span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>원</span>
            </div>
            <div style={{ fontFamily: M, fontSize: 9, color: "rgba(255,255,255,0.25)", marginTop: 1 }}>
              월 {Math.round(liters)}ℓ · 연비 {e}km/ℓ
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, textAlign: "right" }}>
            <div>
              <div style={{ fontFamily: F, fontSize: 9, color: "rgba(255,255,255,0.3)" }}>전차 대비</div>
              <div style={{ fontFamily: M, fontSize: 13, fontWeight: 700, color: "#ff6b4a" }}>+{diffPrev.toLocaleString()}원</div>
            </div>
            <div>
              <div style={{ fontFamily: F, fontSize: 9, color: "rgba(255,255,255,0.3)" }}>3개월 전</div>
              <div style={{ fontFamily: M, fontSize: 13, fontWeight: 700, color: "#ff6b4a" }}>+{diff3m.toLocaleString()}원</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Chart ───
function Chart() {
  const mn = 1200, mx = 2100, rng = mx - mn;
  const colors = { gasoline: "#ff6b4a", diesel: "#4a9fff", kerosene: "#8b5cf6" };
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 8, paddingLeft: 2 }}>
        📊 최고가격 변동
      </div>
      <div style={{ ...card, padding: "14px" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 90 }}>
          {PRICES.map(d => (
            <div key={d.round} style={{ flex: 1, display: "flex", gap: 3, alignItems: "flex-end" }}>
              {["gasoline", "diesel", "kerosene"].map(k => {
                const h = ((d[k] - mn) / rng) * 75;
                return (
                  <div key={k} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ fontFamily: M, fontSize: 8, color: colors[k], marginBottom: 2, fontWeight: 600 }}>{d[k]}</div>
                    <div style={{
                      width: "100%", height: h,
                      background: `linear-gradient(180deg,${colors[k]},${colors[k]}44)`,
                      borderRadius: "4px 4px 1px 1px",
                    }} />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
          {PRICES.map(d => (
            <div key={d.round} style={{ flex: 1, textAlign: "center", fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: F }}>
              {d.round}차
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 8 }}>
          {[["휘발유", "#ff6b4a"], ["경유", "#4a9fff"], ["등유", "#8b5cf6"]].map(([l, c]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: 1, background: c }} />
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", fontFamily: F }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── International Oil ───
function IntlOil() {
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 8, paddingLeft: 2 }}>
        🌍 국제유가
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {OIL.map(o => (
          <div key={o.name} style={{ ...card, flex: 1, padding: "10px 10px", textAlign: "center" }}>
            <div style={{ fontFamily: F, fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{o.name}</div>
            <div style={{ fontFamily: M, fontSize: 16, fontWeight: 700, color: "#fff" }}>${o.price}</div>
            <div style={{
              fontFamily: M, fontSize: 10, fontWeight: 600, marginTop: 2,
              color: o.chg > 0 ? "#ff6b4a" : "#28c864",
            }}>
              {o.chg > 0 ? "+" : ""}{o.chg}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── News ───
function News() {
  const [expanded, setExpanded] = useState(false);
  const items = expanded ? NEWS : NEWS.slice(0, 3);
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 8, paddingLeft: 2 }}>
        📰 유가 뉴스
      </div>
      <div style={{ ...card, padding: "10px 12px" }}>
        {items.map((n, i) => (
          <div key={i} style={{
            display: "flex", gap: 8, alignItems: "flex-start",
            padding: "7px 0",
            borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
          }}>
            <div style={{
              width: 4, height: 4, borderRadius: "50%", background: n.c,
              marginTop: 6, flexShrink: 0, boxShadow: `0 0 6px ${n.c}66`,
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: F, fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>{n.t}</div>
            </div>
            <span style={{ fontFamily: M, fontSize: 10, color: "rgba(255,255,255,0.2)", flexShrink: 0, marginTop: 2 }}>{n.d}</span>
          </div>
        ))}
        {NEWS.length > 3 && (
          <div onClick={() => setExpanded(!expanded)} style={{
            textAlign: "center", padding: "6px 0 2px", cursor: "pointer",
            fontFamily: F, fontSize: 11, color: "rgba(255,255,255,0.3)",
          }}>
            {expanded ? "접기 ▲" : `더보기 ▼ (${NEWS.length - 3}건)`}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── App ───
export default function App() {
  const [ok, setOk] = useState(false);
  useEffect(() => { setTimeout(() => setOk(true), 80); }, []);

  return (
    <div style={{
      minHeight: "100vh", background: "#050505", color: "#fff",
      maxWidth: 440, margin: "0 auto", padding: "16px 14px",
      opacity: ok ? 1 : 0, transition: "opacity 0.4s",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        @keyframes spin{to{transform:rotate(360deg)}}
        input[type="range"]{-webkit-appearance:none;background:rgba(255,255,255,0.1);border-radius:3px;outline:none}
        input[type="range"]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:#ff6b4a;cursor:pointer;box-shadow:0 0 8px rgba(255,107,74,0.4)}
        *{box-sizing:border-box}
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, padding: "0 2px" }}>
        <div>
          <h1 style={{ fontFamily: F, fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>오늘의 기름값</h1>
          <div style={{ fontFamily: F, fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 1 }}>석유 최고가격제 실시간 트래커</div>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 4,
          background: "rgba(255,60,40,0.1)", borderRadius: 8, padding: "5px 8px",
        }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#ff4444",
            boxShadow: "0 0 6px #ff4444", animation: "pulse 2s infinite" }} />
          <span style={{ fontFamily: M, fontSize: 9, color: "rgba(255,255,255,0.4)" }}>LIVE</span>
        </div>
      </div>

      <Hero />
      <Nearby />
      <Prediction />
      <Calc />
      <Chart />
      <IntlOil />
      <News />

      <Footer />
    </div>
  );
}

function Footer() {
  const [visitors, setVisitors] = useState(null);
  useEffect(() => {
    // GoatCounter API로 총 방문자 수 가져오기
    fetch("https://oil-price-tracker.goatcounter.com/counter/TOTAL.json")
      .then(r => r.json())
      .then(d => setVisitors(d.count_unique || d.count))
      .catch(() => {});
  }, []);

  return (
    <div style={{
      textAlign: "center", padding: "16px 0 30px", fontSize: 9,
      color: "rgba(255,255,255,0.15)", fontFamily: F, lineHeight: 1.6,
    }}>
      {visitors !== null && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "5px 10px",
          marginBottom: 8, border: "1px solid rgba(255,255,255,0.06)",
        }}>
          <span style={{ fontSize: 11 }}>👀</span>
          <span style={{ fontFamily: M, fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>
            {Number(visitors).toLocaleString()}
          </span>
          <span style={{ fontFamily: F, fontSize: 9, color: "rgba(255,255,255,0.25)" }}>명 방문</span>
        </div>
      )}
      <div>
        데이터: 산업통상부 · 한국석유공사 오피넷 · Trading Economics<br />
        ※ 예측값은 참고용이며 실제 고시 가격과 다를 수 있습니다
      </div>
    </div>
  );
}
