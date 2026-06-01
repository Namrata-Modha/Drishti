// City → { lat, lon, tz } lookup table
// tz = UTC offset in hours (standard time, not DST)

const CITIES = [
  // ── India ───────────────────────────────────────────────────
  { name: 'Ahmedabad',       lat: 23.0225, lon: 72.5714, tz: 5.5 },
  { name: 'Amritsar',        lat: 31.6340, lon: 74.8723, tz: 5.5 },
  { name: 'Aurangabad',      lat: 19.8762, lon: 75.3433, tz: 5.5 },
  { name: 'Bangalore',       lat: 12.9716, lon: 77.5946, tz: 5.5 },
  { name: 'Bhopal',          lat: 23.2599, lon: 77.4126, tz: 5.5 },
  { name: 'Bhubaneswar',     lat: 20.2961, lon: 85.8245, tz: 5.5 },
  { name: 'Chandigarh',      lat: 30.7333, lon: 76.7794, tz: 5.5 },
  { name: 'Chennai',         lat: 13.0827, lon: 80.2707, tz: 5.5 },
  { name: 'Coimbatore',      lat: 11.0168, lon: 76.9558, tz: 5.5 },
  { name: 'Dehradun',        lat: 30.3165, lon: 78.0322, tz: 5.5 },
  { name: 'Delhi',           lat: 28.6139, lon: 77.2090, tz: 5.5 },
  { name: 'Gandhinagar',     lat: 23.2156, lon: 72.6369, tz: 5.5 },
  { name: 'Goa (Panaji)',    lat: 15.4909, lon: 73.8278, tz: 5.5 },
  { name: 'Guwahati',        lat: 26.1445, lon: 91.7362, tz: 5.5 },
  { name: 'Hyderabad',       lat: 17.3850, lon: 78.4867, tz: 5.5 },
  { name: 'Indore',          lat: 22.7196, lon: 75.8577, tz: 5.5 },
  { name: 'Jaipur',          lat: 26.9124, lon: 75.7873, tz: 5.5 },
  { name: 'Jamnagar',        lat: 22.4707, lon: 70.0577, tz: 5.5 },
  { name: 'Jodhpur',         lat: 26.2389, lon: 73.0243, tz: 5.5 },
  { name: 'Kanpur',          lat: 26.4499, lon: 80.3319, tz: 5.5 },
  { name: 'Kochi',           lat: 9.9312,  lon: 76.2673, tz: 5.5 },
  { name: 'Kolkata',         lat: 22.5726, lon: 88.3639, tz: 5.5 },
  { name: 'Lucknow',         lat: 26.8467, lon: 80.9462, tz: 5.5 },
  { name: 'Ludhiana',        lat: 30.9010, lon: 75.8573, tz: 5.5 },
  { name: 'Madurai',         lat: 9.9252,  lon: 78.1198, tz: 5.5 },
  { name: 'Mangalore',       lat: 12.9141, lon: 74.8560, tz: 5.5 },
  { name: 'Mumbai',          lat: 19.0760, lon: 72.8777, tz: 5.5 },
  { name: 'Mysore',          lat: 12.2958, lon: 76.6394, tz: 5.5 },
  { name: 'Nagpur',          lat: 21.1458, lon: 79.0882, tz: 5.5 },
  { name: 'Nashik',          lat: 19.9975, lon: 73.7898, tz: 5.5 },
  { name: 'Patna',           lat: 25.5941, lon: 85.1376, tz: 5.5 },
  { name: 'Porbandar',       lat: 21.6437, lon: 69.6293, tz: 5.5 },
  { name: 'Pune',            lat: 18.5204, lon: 73.8567, tz: 5.5 },
  { name: 'Rajkot',          lat: 22.3039, lon: 70.8022, tz: 5.5 },
  { name: 'Ranchi',          lat: 23.3441, lon: 85.3096, tz: 5.5 },
  { name: 'Surat',           lat: 21.1702, lon: 72.8311, tz: 5.5 },
  { name: 'Thiruvananthapuram', lat: 8.5241, lon: 76.9366, tz: 5.5 },
  { name: 'Vadodara',        lat: 22.3072, lon: 73.1812, tz: 5.5 },
  { name: 'Varanasi',        lat: 25.3176, lon: 82.9739, tz: 5.5 },
  { name: 'Visakhapatnam',   lat: 17.6868, lon: 83.2185, tz: 5.5 },

  // ── Nepal ──────────────────────────────────────────────────
  { name: 'Kathmandu',       lat: 27.7172, lon: 85.3240, tz: 5.75 },
  { name: 'Pokhara',         lat: 28.2096, lon: 83.9856, tz: 5.75 },

  // ── Pakistan ──────────────────────────────────────────────
  { name: 'Karachi',         lat: 24.8607, lon: 67.0011, tz: 5 },
  { name: 'Lahore',          lat: 31.5204, lon: 74.3587, tz: 5 },
  { name: 'Islamabad',       lat: 33.6844, lon: 73.0479, tz: 5 },

  // ── Sri Lanka ─────────────────────────────────────────────
  { name: 'Colombo',         lat: 6.9271,  lon: 79.8612, tz: 5.5 },

  // ── Canada ────────────────────────────────────────────────
  { name: 'Calgary',         lat: 51.0447, lon: -114.0719, tz: -7 },
  { name: 'Edmonton',        lat: 53.5461, lon: -113.4938, tz: -7 },
  { name: 'Halifax',         lat: 44.6488, lon: -63.5752,  tz: -4 },
  { name: 'London ON',       lat: 42.9849, lon: -81.2453,  tz: -5 },
  { name: 'Montreal',        lat: 45.5017, lon: -73.5673,  tz: -5 },
  { name: 'Ottawa',          lat: 45.4215, lon: -75.6972,  tz: -5 },
  { name: 'Toronto',         lat: 43.6532, lon: -79.3832,  tz: -5 },
  { name: 'Vancouver',       lat: 49.2827, lon: -123.1207, tz: -8 },
  { name: 'Winnipeg',        lat: 49.8951, lon: -97.1384,  tz: -6 },

  // ── USA ──────────────────────────────────────────────────
  { name: 'Atlanta',         lat: 33.7490, lon: -84.3880,  tz: -5 },
  { name: 'Boston',          lat: 42.3601, lon: -71.0589,  tz: -5 },
  { name: 'Chicago',         lat: 41.8781, lon: -87.6298,  tz: -6 },
  { name: 'Dallas',          lat: 32.7767, lon: -96.7970,  tz: -6 },
  { name: 'Houston',         lat: 29.7604, lon: -95.3698,  tz: -6 },
  { name: 'Los Angeles',     lat: 34.0522, lon: -118.2437, tz: -8 },
  { name: 'Miami',           lat: 25.7617, lon: -80.1918,  tz: -5 },
  { name: 'New York',        lat: 40.7128, lon: -74.0060,  tz: -5 },
  { name: 'San Francisco',   lat: 37.7749, lon: -122.4194, tz: -8 },
  { name: 'Seattle',         lat: 47.6062, lon: -122.3321, tz: -8 },
  { name: 'Washington DC',   lat: 38.9072, lon: -77.0369,  tz: -5 },

  // ── UK ───────────────────────────────────────────────────
  { name: 'Birmingham',      lat: 52.4862, lon: -1.8904,   tz: 0 },
  { name: 'Glasgow',         lat: 55.8642, lon: -4.2518,   tz: 0 },
  { name: 'London',          lat: 51.5074, lon: -0.1278,   tz: 0 },
  { name: 'Manchester',      lat: 53.4808, lon: -2.2426,   tz: 0 },

  // ── Australia ─────────────────────────────────────────────
  { name: 'Melbourne',       lat: -37.8136, lon: 144.9631, tz: 10 },
  { name: 'Sydney',          lat: -33.8688, lon: 151.2093, tz: 10 },
  { name: 'Brisbane',        lat: -27.4698, lon: 153.0251, tz: 10 },
  { name: 'Perth',           lat: -31.9505, lon: 115.8605, tz: 8 },

  // ── UAE ──────────────────────────────────────────────────
  { name: 'Dubai',           lat: 25.2048, lon: 55.2708,   tz: 4 },
  { name: 'Abu Dhabi',       lat: 24.4539, lon: 54.3773,   tz: 4 },

  // ── Other ─────────────────────────────────────────────────
  { name: 'Singapore',       lat: 1.3521,  lon: 103.8198,  tz: 8 },
  { name: 'Kuala Lumpur',    lat: 3.1390,  lon: 101.6869,  tz: 8 },
  { name: 'New Zealand (Auckland)', lat: -36.8485, lon: 174.7633, tz: 12 },
];

// Case-insensitive substring search, returns up to `n` matches
export function searchCity(query, n = 6) {
  if (!query || query.trim().length < 2) return [];
  const q = query.trim().toLowerCase();
  return CITIES.filter(c => c.name.toLowerCase().includes(q)).slice(0, n);
}

export default CITIES;
