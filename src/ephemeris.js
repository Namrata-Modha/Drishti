// ═══════════════════════════════════════════════════════════════
// VEDIC EPHEMERIS — pure JavaScript, no external libs
// Accuracy: ±1-2° for most planets (sufficient for sign/house/nakshatra)
// Based on: Jean Meeus "Astronomical Algorithms" + JPL simplified models
// ═══════════════════════════════════════════════════════════════

const DEG = Math.PI / 180;
const mod = (n, m) => ((n % m) + m) % m;

// ── Julian Day ────────────────────────────────────────────────
export function julianDay(year, month, day, hourUT) {
  let y = year, m = month;
  if (m <= 2) { y -= 1; m += 12; }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + hourUT / 24 + B - 1524.5;
}

// ── Lahiri Ayanamsa ───────────────────────────────────────────
// Increases ~50.3"/yr = ~0.01397°/yr from 23.8531° at J2000.0
export function lahiriAyanamsa(JD) {
  const yrs = (JD - 2451545.0) / 365.25;
  return 23.8531 + yrs * 0.013969;
}

// ── Kepler solver (eccentric anomaly) ────────────────────────
function solveKepler(M_deg, e) {
  let M = mod(M_deg, 360) * DEG;
  let E = M;
  for (let i = 0; i < 10; i++) {
    E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  }
  return E; // radians
}

// ── Heliocentric position from Keplerian elements ────────────
// elem = { L0, Ldot, omega, a, e }
// L0, Ldot: mean longitude at J2000.0, change per century
// omega: longitude of perihelion; a: semi-major axis; e: eccentricity
function helioPos(T, elem) {
  const { L0, Ldot, omega, a, e } = elem;
  const L = mod(L0 + Ldot * T, 360);   // mean longitude
  const M_deg = mod(L - omega, 360);    // mean anomaly
  const E = solveKepler(M_deg, e);      // eccentric anomaly (rad)
  // True anomaly
  const cosE = Math.cos(E), sinE = Math.sin(E);
  const nu = 2 * Math.atan2(Math.sqrt(1 + e) * sinE, Math.sqrt(1 - e) * cosE) / DEG;
  const trueLon = mod(nu + omega, 360);
  // Heliocentric radius
  const r = a * (1 - e * cosE);
  return { lon: trueLon, r };
}

// Orbital elements [L0, Ldot, omega, a, e] at J2000.0
const ORB = {
  Me: { L0: 252.2509, Ldot: 149472.6746, omega: 77.4561,  a: 0.38710, e: 0.20564 },
  Ve: { L0: 181.9798, Ldot:  58517.8157, omega: 131.5637, a: 0.72333, e: 0.00678 },
  Ma: { L0: 355.4330, Ldot:  19140.3003, omega: 336.0608, a: 1.52368, e: 0.09341 },
  Ju: { L0:  34.3515, Ldot:   3034.9057, omega:  14.3313, a: 5.20260, e: 0.04849 },
  Sa: { L0:  50.0775, Ldot:   1222.1138, omega:  93.0568, a: 9.53707, e: 0.05566 },
};
const EARTH_ORB = { L0: 100.4664, Ldot: 35999.3728, omega: 102.9373, a: 1.00000, e: 0.01671 };

// ── Geocentric longitude from two heliocentric positions ─────
function geoLon(planet, earth) {
  const pRad = planet.lon * DEG, eRad = earth.lon * DEG;
  const dx = planet.r * Math.cos(pRad) - earth.r * Math.cos(eRad);
  const dy = planet.r * Math.sin(pRad) - earth.r * Math.sin(eRad);
  return mod(Math.atan2(dy, dx) / DEG, 360);
}

// ── Sun (high-precision formula) ─────────────────────────────
export function sunTropical(T) {
  const L0 = mod(280.46646 + 36000.76983 * T, 360);
  const M  = mod(357.52911 + 35999.05029 * T - 0.0001537 * T * T, 360);
  const Mrad = M * DEG;
  const C = (1.9146  - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad)
          + (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad)
          + 0.000290 * Math.sin(3 * Mrad);
  const aberration = -0.00569 - 0.00478 * Math.sin((125.04 - 1934.136 * T) * DEG);
  return mod(L0 + C + aberration, 360);
}

// ── Moon (40-term series, ±0.3°) ─────────────────────────────
export function moonTropical(T) {
  const Lm = mod(218.3164477 + 481267.88123421 * T - 0.0015786 * T * T, 360);
  const D  = mod(297.8501921 + 445267.1114034  * T - 0.0018819 * T * T, 360);
  const M  = mod(357.5291092 + 35999.0502909   * T - 0.0001536 * T * T, 360);
  const Mp = mod(134.9633964 + 477198.8675055  * T + 0.0087414 * T * T, 360);
  const F  = mod(93.2720950  + 483202.0175233  * T - 0.0036539 * T * T, 360);
  const E  = 1 - 0.002516 * T - 0.0000074 * T * T;

  // Main periodic terms [coeff, D, M, Mp, F]
  const terms = [
    [ 6.288774, 0,  0,  1,  0],
    [ 1.274027, 2,  0, -1,  0],
    [ 0.658314, 2,  0,  0,  0],
    [ 0.213618, 0,  0,  2,  0],
    [-0.185116, 0,  1,  0,  0],
    [-0.114332, 0,  0,  0,  2],
    [ 0.058793, 2,  0, -2,  0],
    [ 0.057066, 2, -1, -1,  0],
    [ 0.053322, 2,  0,  1,  0],
    [ 0.045758, 2, -1,  0,  0],
    [-0.040923, 0,  1, -1,  0],
    [-0.034720, 1,  0,  0,  0],
    [-0.030383, 0,  1,  1,  0],
    [ 0.015327, 2,  0,  0, -2],
    [ 0.010980, 0,  0,  1, -2],
    [ 0.010675, 4,  0, -1,  0],
    [ 0.010034, 0,  0,  3,  0],
    [ 0.008548, 4,  0, -2,  0],
    [-0.007888, 2,  1, -1,  0],
    [-0.006766, 2,  1,  0,  0],
    [-0.005163, 1,  0, -1,  0],
    [ 0.004987, 1,  1,  0,  0],
    [ 0.004036, 2, -1,  1,  0],
    [ 0.003994, 2,  0,  2,  0],
    [ 0.003861, 4,  0,  0,  0],
    [ 0.003665, 2,  0, -3,  0],
    [-0.002689, 0,  1, -2,  0],
    [ 0.002390, 2, -1, -2,  0],
    [-0.002348, 1,  0,  1,  0],
    [ 0.002236, 2, -2,  0,  0],
    [-0.002120, 0,  1,  2,  0],
    [-0.002069, 0,  2,  0,  0],
    [ 0.002048, 2, -2, -1,  0],
    [-0.001773, 2,  0,  1, -2],
    [ 0.001215, 4, -1, -1,  0],
    [-0.001110, 0,  0,  2,  2],
    [-0.000892, 3,  0, -1,  0],
    [ 0.000727, 2,  2, -1,  0],
    [-0.000657, 4,  0,  1,  0],
    [-0.000660, 1,  1,  1,  0],
  ];

  let sum = 0;
  for (const [cf, d, m, mp, f] of terms) {
    const arg = (d * D + m * M + mp * Mp + f * F) * DEG;
    const e_fac = Math.abs(m) === 1 ? E : Math.abs(m) === 2 ? E * E : 1;
    sum += cf * e_fac * Math.sin(arg);
  }
  return mod(Lm + sum, 360);
}

// ── Mean Lunar Node (Rahu) ────────────────────────────────────
export function rahuTropical(T) {
  return mod(125.04452 - 1934.136261 * T + 0.0020708 * T * T, 360);
}

// ── Planets via Keplerian elements ───────────────────────────
export function planetTropical(T, key) {
  const earth = helioPos(T, EARTH_ORB);
  // Earth's heliocentric lon = Sun's geocentric + 180°
  const sunLon = sunTropical(T);
  earth.lon = mod(sunLon + 180, 360);
  const planet = helioPos(T, ORB[key]);
  return geoLon(planet, earth);
}

// ── Ascendant (corrected atan2 formula) ──────────────────────
export function calcAscendant(JD, lat, lon) {
  const T = (JD - 2451545.0) / 36525;
  const D = JD - 2451545.0;
  const gmst = mod(280.46061837 + 360.98564736629 * D + 0.000387933 * T * T, 360);
  const ramc = mod(gmst + lon, 360);
  const r = ramc * DEG;
  const phi = lat * DEG;
  const eps = (23.4392911 - 0.013004167 * T) * DEG;

  // RA of Ascendant using corrected atan2
  const Y =  Math.cos(r);
  const X = -(Math.sin(eps) * Math.tan(phi) + Math.cos(eps) * Math.sin(r));
  const raAsc = mod(Math.atan2(Y, X) / DEG, 360);

  // Convert RA → ecliptic longitude
  const tL = Math.tan(raAsc * DEG) / Math.cos(eps);
  let asc = Math.atan(tL) / DEG;
  if (Math.cos(raAsc * DEG) < 0) asc += 180;
  else if (asc < 0) asc += 360;
  return mod(asc, 360);
}

// ── Nakshatra from sidereal degree ───────────────────────────
const NAK_NAMES = [
  'Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra',
  'Punarvasu','Pushya','Ashlesha','Magha','P.Phalguni','U.Phalguni',
  'Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha',
  'Mula','P.Ashadha','U.Ashadha','Shravana','Dhanishtha',
  'Shatataraka','P.Bhadrapada','U.Bhadrapada','Revati',
];
// Nakshatra dasha lords (Vimshottari, 0-indexed: 0=Ketu,1=Venus,2=Sun,3=Moon,4=Mars,5=Rahu,6=Jupiter,7=Saturn,8=Mercury)
const NAK_LORD_IDX = [0,1,2,3,4,5,6,7,8, 0,1,2,3,4,5,6,7,8, 0,1,2,3,4,5,6,7,8];
const DASHA_PLANET = ['Ketu','Venus','Sun','Moon','Mars','Rahu','Jupiter','Saturn','Mercury'];
const DASHA_YEARS  = [7, 20, 6, 10, 7, 18, 16, 19, 17]; // 120 year cycle
const DASHA_COLORS = ['#C090FF','#FFB6C1','#FFD700','#CACAFF','#FF7055','#FF6060','#FFA040','#90B8D0','#78E08F'];

export function getNakshatra(siderealDeg) {
  const d = mod(siderealDeg, 360);
  const idx = Math.floor(d / (360 / 27));
  const within = d - idx * (360 / 27);
  const pada = Math.floor(within / (360 / 27 / 4)) + 1;
  return { name: NAK_NAMES[idx], pada, idx, lord: DASHA_PLANET[NAK_LORD_IDX[idx]] };
}

// ── Vimshottari Dasha ─────────────────────────────────────────
export function calcDasha(moonSidereal, birthJD) {
  const nak = getNakshatra(moonSidereal);
  const nakFrac = (mod(moonSidereal, 360) % (360 / 27)) / (360 / 27); // 0→1
  const lordIdx = NAK_LORD_IDX[nak.idx];

  // Remaining balance of first dasha at birth
  const firstYears = DASHA_YEARS[lordIdx] * (1 - nakFrac);
  const msPerYear = 365.25 * 24 * 3600 * 1000;

  const timeline = [];
  let startJD = birthJD;

  // Build full dasha sequence starting from current lord
  for (let i = 0; i < 9; i++) {
    const li = (lordIdx + i) % 9;
    const yrs = (i === 0) ? firstYears : DASHA_YEARS[li];
    const endJD = startJD + yrs * 365.25;
    timeline.push({
      planet: DASHA_PLANET[li],
      color: DASHA_COLORS[li],
      startJD, endJD,
      years: DASHA_YEARS[li],
      balance: i === 0 ? firstYears : null,
    });
    startJD = endJD;
  }
  return timeline;
}

export function currentDasha(timeline, nowJD) {
  const maha = timeline.find(d => nowJD >= d.startJD && nowJD < d.endJD) || timeline[0];
  if (!maha) return null;

  // Build antardasha within mahadasha
  const mahaYrs = maha.endJD - maha.startJD;
  const mahaLordIdx = DASHA_PLANET.indexOf(maha.planet);
  const antarList = [];
  let aStart = maha.startJD;
  for (let i = 0; i < 9; i++) {
    const li = (mahaLordIdx + i) % 9;
    const aYrs = (DASHA_YEARS[mahaLordIdx] * DASHA_YEARS[li] / 120) * (mahaYrs / (DASHA_YEARS[mahaLordIdx] * 365.25)) * 365.25;
    const aEnd = aStart + aYrs;
    antarList.push({ planet: DASHA_PLANET[li], color: DASHA_COLORS[li], startJD: aStart, endJD: aEnd });
    aStart = aEnd;
  }
  const antar = antarList.find(a => nowJD >= a.startJD && nowJD < a.endJD) || antarList[0];
  return { maha, antar, antarList };
}

// ── JD to Date string ─────────────────────────────────────────
export function jdToDate(JD) {
  const z = Math.floor(JD + 0.5), f = JD + 0.5 - z;
  let A = z;
  if (z >= 2299161) { const a = Math.floor((z - 1867216.25) / 36524.25); A = z + 1 + a - Math.floor(a / 4); }
  const B = A + 1524, C = Math.floor((B - 122.1) / 365.25);
  const D = Math.floor(365.25 * C), E = Math.floor((B - D) / 30.6001);
  const day = B - D - Math.floor(30.6001 * E);
  const month = E < 14 ? E - 1 : E - 13;
  const year = month > 2 ? C - 4716 : C - 4715;
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[month-1]} ${year}`;
}

// ── Yoga detection ────────────────────────────────────────────
export function detectYogas(chart) {
  const yogas = [];
  const { planets, lagnaIdx } = chart;
  const get = id => planets.find(p => p.id === id);

  const Ju = get('Ju'), Ve = get('Ve'), Mo = get('Mo'), Ma = get('Ma');
  const Su = get('Su'), Me = get('Me'), Sa = get('Sa');

  // Hamsa Yoga: Jupiter in own sign (Pisces/Sagittarius) in kendra (H1,4,7,10)
  if (Ju) {
    const juSign = Ju.siderealIdx;
    const juHouse = Ju.house;
    const juOwn = (juSign === 8 || juSign === 11); // Sagittarius(8) or Pisces(11)
    const kendras = [1, 4, 7, 10];
    if (juOwn && kendras.includes(juHouse)) {
      yogas.push({ name: 'Hamsa Yoga', grade: 'A+', desc: `Jupiter in own sign (${Ju.sign}) in the ${Ju.house}th house — a Pancha Mahapurusha yoga. Career and wisdom are divinely blessed.` });
    }
  }

  // Malavya Yoga: Venus in own sign (Taurus/Libra) in kendra
  if (Ve) {
    const veOwn = (Ve.siderealIdx === 1 || Ve.siderealIdx === 6);
    const kendras = [1, 4, 7, 10];
    if (veOwn && kendras.includes(Ve.house)) {
      yogas.push({ name: 'Malavya Yoga', grade: 'A+', desc: `Venus in own sign (${Ve.sign}) in the ${Ve.house}th house — Pancha Mahapurusha yoga of beauty, wealth, and creativity.` });
    }
  }

  // Neecha Bhanga: Debilitated planet with cancellation
  if (Mo) {
    const moDebil = Mo.siderealIdx === 7; // Scorpio
    if (moDebil && Ma && Ma.siderealIdx === 7) {
      yogas.push({ name: 'Neecha Bhanga Raja Yoga', grade: 'A+', desc: `Moon debilitated in Scorpio, but Mars (Scorpio's lord) is in the same sign — cancellation. The fallen planet rises with extraordinary force.` });
    }
  }

  // Budhaditya: Sun + Mercury conjunction
  if (Su && Me && Su.siderealIdx === Me.siderealIdx) {
    yogas.push({ name: 'Budhaditya Yoga', grade: 'A', desc: `Sun and Mercury conjunct in ${Su.sign}. Sharp analytical mind, eloquent communication, success through intellectual precision.` });
  }

  // Gaja Kesari: Jupiter in kendra from Moon
  if (Ju && Mo) {
    const moonHouse = Mo.house;
    const jupFromMoon = ((Ju.house - moonHouse + 12) % 12) + 1;
    if ([1, 4, 7, 10].includes(jupFromMoon)) {
      yogas.push({ name: 'Gaja Kesari Yoga', grade: 'A', desc: `Jupiter in ${jupFromMoon === 1 ? 'same sign as' : `${jupFromMoon}th house from`} Moon. Wisdom, reputation, and leadership qualities amplified throughout life.` });
    }
  }

  // Stellium: 3+ planets in same sign
  const signGroups = {};
  planets.forEach(p => {
    if (!signGroups[p.siderealIdx]) signGroups[p.siderealIdx] = [];
    signGroups[p.siderealIdx].push(p.id);
  });
  Object.entries(signGroups).forEach(([si, pids]) => {
    if (pids.length >= 3) {
      const SIGNS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
      yogas.push({ name: `${pids.length}-Planet Stellium in ${SIGNS[+si]}`, grade: 'A', desc: `${pids.join(', ')} all conjunct in ${SIGNS[+si]}. Concentrated planetary energy creates a powerful focal point in this sign and house.` });
    }
  });

  return yogas;
}

// ── Main chart calculation ─────────────────────────────────────
const SIGNS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo',
               'Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const SIGN_SYM = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
const SIGN_LORD = ['Mars','Venus','Mercury','Moon','Sun','Mercury',
                   'Venus','Mars','Jupiter','Saturn','Saturn','Jupiter'];
const PLANET_NAMES = { Su:'Sun', Mo:'Moon', Ma:'Mars', Me:'Mercury', Ju:'Jupiter', Ve:'Venus', Sa:'Saturn', Ra:'Rahu', Ke:'Ketu' };
const PLANET_SYMS  = { Su:'☉', Mo:'☽', Ma:'♂', Me:'☿', Ju:'♃', Ve:'♀', Sa:'♄', Ra:'Rā', Ke:'Ke' };
const PLANET_COLORS = { Su:'#FFD700', Mo:'#CACAFF', Ma:'#FF7055', Me:'#78E08F', Ju:'#FFA040', Ve:'#FFB6C1', Sa:'#90B8D0', Ra:'#FF6060', Ke:'#C090FF' };

export function calculateChart(input) {
  const { year, month, day, hour, minute, tz, lat, lon, name } = input;
  const hourUT = hour + minute / 60 - tz;
  const JD = julianDay(year, month, day, hourUT);
  const T = (JD - 2451545.0) / 36525;
  const ayanamsa = lahiriAyanamsa(JD);
  const toSid = deg => mod(deg - ayanamsa, 360);
  const signIdx = deg => Math.floor(deg / 30);

  // Tropical longitudes
  const tropAsc = calcAscendant(JD, lat, lon);
  const tropPositions = {
    Su: sunTropical(T),
    Mo: moonTropical(T),
    Ma: planetTropical(T, 'Ma'),
    Me: planetTropical(T, 'Me'),
    Ju: planetTropical(T, 'Ju'),
    Ve: planetTropical(T, 'Ve'),
    Sa: planetTropical(T, 'Sa'),
    Ra: rahuTropical(T),
    Ke: mod(rahuTropical(T) + 180, 360),
  };

  // Sidereal conversions
  const sidAsc = toSid(tropAsc);
  const lagnaIdx = signIdx(sidAsc); // 0=Aries, 1=Taurus ... 11=Pisces
  const lagnaSign = SIGNS[lagnaIdx];

  // Whole-sign house function: house 1 = lagna sign
  const getHouse = sidDeg => {
    const si = signIdx(mod(sidDeg, 360));
    return ((si - lagnaIdx + 12) % 12) + 1;
  };

  // Build planet list
  const planets = Object.entries(tropPositions).map(([id, tropDeg]) => {
    const sid = toSid(tropDeg);
    const si = signIdx(sid);
    const nak = getNakshatra(sid);
    return {
      id,
      name: PLANET_NAMES[id],
      sym: PLANET_SYMS[id],
      col: PLANET_COLORS[id],
      tropical: tropDeg,
      sidereal: sid,
      siderealIdx: si,
      sign: SIGNS[si],
      signSym: SIGN_SYM[si],
      degree: sid % 30,
      house: getHouse(sid),
      nakshatra: nak.name,
      pada: nak.pada,
      nakLord: nak.lord,
    };
  });

  // Dasha calculation
  const moonPlanet = planets.find(p => p.id === 'Mo');
  const dashaTimeline = calcDasha(moonPlanet.sidereal, JD);
  const nowJD = julianDay(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate(), 12);
  const activeDasha = currentDasha(dashaTimeline, nowJD);

  // Yogas
  const chart = { planets, lagnaIdx };
  const yogas = detectYogas(chart);

  // Western (tropical) Ascendant
  const tropLagnaIdx = signIdx(tropAsc);
  const planetsWest = Object.entries(tropPositions).map(([id, tropDeg]) => {
    const si = signIdx(tropDeg);
    const westHouse = ((si - tropLagnaIdx + 12) % 12) + 1;
    return { id, name: PLANET_NAMES[id], sym: PLANET_SYMS[id], col: PLANET_COLORS[id],
             tropical: tropDeg, siderealIdx: si, sign: SIGNS[si], signSym: SIGN_SYM[si],
             degree: tropDeg % 30, house: westHouse };
  });

  return {
    name, JD,
    timeKnown: input.timeKnown !== false,
    placeKnown: input.placeKnown !== false,
    // Vedic (sidereal)
    lagna: { sign: lagnaSign, signIdx: lagnaIdx, degree: sidAsc % 30, sym: SIGN_SYM[lagnaIdx], nakshatra: getNakshatra(sidAsc) },
    planets,
    lagnaIdx,
    ayanamsa,
    // Western (tropical)
    lagnaW: { sign: SIGNS[tropLagnaIdx], signIdx: tropLagnaIdx, degree: tropAsc % 30, sym: SIGN_SYM[tropLagnaIdx] },
    planetsW: planetsWest,
    // Dasha
    dashaTimeline,
    activeDasha,
    // Yogas
    yogas,
    // Helpers
    SIGNS, SIGN_SYM, SIGN_LORD,
  };
}
