// City → { lat, lon, tz } lookup table
// tz = UTC offset in hours (standard time, not DST-adjusted)
// ~400 cities across 50+ countries

const CITIES = [

  // ── India — North ────────────────────────────────────────────
  { name: 'Agra',              lat: 27.1767, lon: 78.0081,  tz: 5.5 },
  { name: 'Ajmer',             lat: 26.4499, lon: 74.6399,  tz: 5.5 },
  { name: 'Aligarh',           lat: 27.8974, lon: 78.0880,  tz: 5.5 },
  { name: 'Allahabad (Prayagraj)', lat: 25.4358, lon: 81.8463, tz: 5.5 },
  { name: 'Amritsar',          lat: 31.6340, lon: 74.8723,  tz: 5.5 },
  { name: 'Bareilly',          lat: 28.3670, lon: 79.4304,  tz: 5.5 },
  { name: 'Chandigarh',        lat: 30.7333, lon: 76.7794,  tz: 5.5 },
  { name: 'Dehradun',          lat: 30.3165, lon: 78.0322,  tz: 5.5 },
  { name: 'Delhi',             lat: 28.6139, lon: 77.2090,  tz: 5.5 },
  { name: 'Dharamsala',        lat: 32.2190, lon: 76.3234,  tz: 5.5 },
  { name: 'Faridabad',         lat: 28.4089, lon: 77.3178,  tz: 5.5 },
  { name: 'Gurgaon',           lat: 28.4595, lon: 77.0266,  tz: 5.5 },
  { name: 'Haridwar',          lat: 29.9457, lon: 78.1642,  tz: 5.5 },
  { name: 'Jammu',             lat: 32.7266, lon: 74.8570,  tz: 5.5 },
  { name: 'Jhansi',            lat: 25.4484, lon: 78.5685,  tz: 5.5 },
  { name: 'Kanpur',            lat: 26.4499, lon: 80.3319,  tz: 5.5 },
  { name: 'Ludhiana',          lat: 30.9010, lon: 75.8573,  tz: 5.5 },
  { name: 'Lucknow',           lat: 26.8467, lon: 80.9462,  tz: 5.5 },
  { name: 'Mathura',           lat: 27.4924, lon: 77.6737,  tz: 5.5 },
  { name: 'Meerut',            lat: 28.9845, lon: 77.7064,  tz: 5.5 },
  { name: 'Moradabad',         lat: 28.8386, lon: 78.7733,  tz: 5.5 },
  { name: 'Noida',             lat: 28.5355, lon: 77.3910,  tz: 5.5 },
  { name: 'Patna',             lat: 25.5941, lon: 85.1376,  tz: 5.5 },
  { name: 'Shimla',            lat: 31.1048, lon: 77.1734,  tz: 5.5 },
  { name: 'Srinagar',          lat: 34.0837, lon: 74.7973,  tz: 5.5 },
  { name: 'Varanasi',          lat: 25.3176, lon: 82.9739,  tz: 5.5 },

  // ── India — Gujarat ──────────────────────────────────────────
  { name: 'Ahmedabad',         lat: 23.0225, lon: 72.5714,  tz: 5.5 },
  { name: 'Amreli',            lat: 21.6030, lon: 71.2219,  tz: 5.5 },
  { name: 'Anand',             lat: 22.5645, lon: 72.9289,  tz: 5.5 },
  { name: 'Bharuch',           lat: 21.7051, lon: 72.9959,  tz: 5.5 },
  { name: 'Bhavnagar',         lat: 21.7645, lon: 72.1519,  tz: 5.5 },
  { name: 'Bhuj (Kutch)',      lat: 23.2419, lon: 69.6669,  tz: 5.5 },
  { name: 'Dwarka',            lat: 22.2442, lon: 68.9685,  tz: 5.5 },
  { name: 'Gandhinagar',       lat: 23.2156, lon: 72.6369,  tz: 5.5 },
  { name: 'Jamnagar',          lat: 22.4707, lon: 70.0577,  tz: 5.5 },
  { name: 'Junagadh',          lat: 21.5222, lon: 70.4579,  tz: 5.5 },
  { name: 'Mehsana',           lat: 23.5880, lon: 72.3693,  tz: 5.5 },
  { name: 'Morbi',             lat: 22.8173, lon: 70.8378,  tz: 5.5 },
  { name: 'Nadiad',            lat: 22.6916, lon: 72.8634,  tz: 5.5 },
  { name: 'Navsari',           lat: 20.9467, lon: 72.9520,  tz: 5.5 },
  { name: 'Porbandar',         lat: 21.6440, lon: 69.6293,  tz: 5.5 },
  { name: 'Rajkot',            lat: 22.3039, lon: 70.8022,  tz: 5.5 },
  { name: 'Somnath',           lat: 20.9026, lon: 70.3842,  tz: 5.5 },
  { name: 'Surat',             lat: 21.1702, lon: 72.8311,  tz: 5.5 },
  { name: 'Surendranagar',     lat: 22.7270, lon: 71.6492,  tz: 5.5 },
  { name: 'Vadodara',          lat: 22.3072, lon: 73.1812,  tz: 5.5 },
  { name: 'Valsad',            lat: 20.5992, lon: 72.9342,  tz: 5.5 },
  { name: 'Vapi',              lat: 20.3731, lon: 72.9058,  tz: 5.5 },

  // ── India — Maharashtra ──────────────────────────────────────
  { name: 'Aurangabad',        lat: 19.8762, lon: 75.3433,  tz: 5.5 },
  { name: 'Mumbai',            lat: 19.0760, lon: 72.8777,  tz: 5.5 },
  { name: 'Nagpur',            lat: 21.1458, lon: 79.0882,  tz: 5.5 },
  { name: 'Nashik',            lat: 19.9975, lon: 73.7898,  tz: 5.5 },
  { name: 'Navi Mumbai',       lat: 19.0330, lon: 73.0297,  tz: 5.5 },
  { name: 'Pune',              lat: 18.5204, lon: 73.8567,  tz: 5.5 },
  { name: 'Solapur',           lat: 17.6869, lon: 75.9064,  tz: 5.5 },
  { name: 'Thane',             lat: 19.2183, lon: 72.9781,  tz: 5.5 },

  // ── India — South ────────────────────────────────────────────
  { name: 'Bangalore',         lat: 12.9716, lon: 77.5946,  tz: 5.5 },
  { name: 'Chennai',           lat: 13.0827, lon: 80.2707,  tz: 5.5 },
  { name: 'Coimbatore',        lat: 11.0168, lon: 76.9558,  tz: 5.5 },
  { name: 'Hyderabad',         lat: 17.3850, lon: 78.4867,  tz: 5.5 },
  { name: 'Kochi',             lat:  9.9312, lon: 76.2673,  tz: 5.5 },
  { name: 'Kozhikode',         lat: 11.2588, lon: 75.7804,  tz: 5.5 },
  { name: 'Madurai',           lat:  9.9252, lon: 78.1198,  tz: 5.5 },
  { name: 'Mangalore',         lat: 12.9141, lon: 74.8560,  tz: 5.5 },
  { name: 'Mysore',            lat: 12.2958, lon: 76.6394,  tz: 5.5 },
  { name: 'Thiruvananthapuram',lat:  8.5241, lon: 76.9366,  tz: 5.5 },
  { name: 'Vijayawada',        lat: 16.5062, lon: 80.6480,  tz: 5.5 },
  { name: 'Visakhapatnam',     lat: 17.6868, lon: 83.2185,  tz: 5.5 },
  { name: 'Warangal',          lat: 17.9784, lon: 79.5941,  tz: 5.5 },

  // ── India — East & Northeast ─────────────────────────────────
  { name: 'Bhubaneswar',       lat: 20.2961, lon: 85.8245,  tz: 5.5 },
  { name: 'Cuttack',           lat: 20.4625, lon: 85.8828,  tz: 5.5 },
  { name: 'Guwahati',          lat: 26.1445, lon: 91.7362,  tz: 5.5 },
  { name: 'Imphal',            lat: 24.8170, lon: 93.9368,  tz: 5.5 },
  { name: 'Kolkata',           lat: 22.5726, lon: 88.3639,  tz: 5.5 },
  { name: 'Ranchi',            lat: 23.3441, lon: 85.3096,  tz: 5.5 },
  { name: 'Siliguri',          lat: 26.7271, lon: 88.3953,  tz: 5.5 },

  // ── India — Central & Rajasthan ──────────────────────────────
  { name: 'Bhopal',            lat: 23.2599, lon: 77.4126,  tz: 5.5 },
  { name: 'Gwalior',           lat: 26.2183, lon: 78.1828,  tz: 5.5 },
  { name: 'Indore',            lat: 22.7196, lon: 75.8577,  tz: 5.5 },
  { name: 'Jaipur',            lat: 26.9124, lon: 75.7873,  tz: 5.5 },
  { name: 'Jodhpur',           lat: 26.2389, lon: 73.0243,  tz: 5.5 },
  { name: 'Kota',              lat: 25.2138, lon: 75.8648,  tz: 5.5 },
  { name: 'Raipur',            lat: 21.2514, lon: 81.6296,  tz: 5.5 },
  { name: 'Udaipur',           lat: 24.5854, lon: 73.7125,  tz: 5.5 },
  { name: 'Ujjain',            lat: 23.1765, lon: 75.7885,  tz: 5.5 },

  // ── India — Goa & Odisha ─────────────────────────────────────
  { name: 'Goa (Panaji)',      lat: 15.4909, lon: 73.8278,  tz: 5.5 },

  // ── Nepal ────────────────────────────────────────────────────
  { name: 'Kathmandu',         lat: 27.7172, lon: 85.3240,  tz: 5.75 },
  { name: 'Pokhara',           lat: 28.2096, lon: 83.9856,  tz: 5.75 },
  { name: 'Biratnagar',        lat: 26.4831, lon: 87.2833,  tz: 5.75 },
  { name: 'Lalitpur (Patan)',  lat: 27.6644, lon: 85.3188,  tz: 5.75 },

  // ── Bangladesh ───────────────────────────────────────────────
  { name: 'Dhaka',             lat: 23.8103, lon: 90.4125,  tz: 6 },
  { name: 'Chittagong',        lat: 22.3569, lon: 91.7832,  tz: 6 },
  { name: 'Sylhet',            lat: 24.8949, lon: 91.8687,  tz: 6 },

  // ── Pakistan ─────────────────────────────────────────────────
  { name: 'Karachi',           lat: 24.8607, lon: 67.0011,  tz: 5 },
  { name: 'Lahore',            lat: 31.5497, lon: 74.3436,  tz: 5 },
  { name: 'Islamabad',         lat: 33.6844, lon: 73.0479,  tz: 5 },
  { name: 'Faisalabad',        lat: 31.4180, lon: 73.0790,  tz: 5 },
  { name: 'Peshawar',          lat: 34.0151, lon: 71.5249,  tz: 5 },
  { name: 'Multan',            lat: 30.1978, lon: 71.4711,  tz: 5 },
  { name: 'Quetta',            lat: 30.1798, lon: 66.9750,  tz: 5 },

  // ── Sri Lanka ────────────────────────────────────────────────
  { name: 'Colombo',           lat:  6.9271, lon: 79.8612,  tz: 5.5 },
  { name: 'Kandy',             lat:  7.2906, lon: 80.6337,  tz: 5.5 },
  { name: 'Jaffna',            lat:  9.6615, lon: 80.0255,  tz: 5.5 },

  // ── Myanmar ──────────────────────────────────────────────────
  { name: 'Yangon',            lat: 16.8661, lon: 96.1951,  tz: 6.5 },
  { name: 'Mandalay',          lat: 21.9588, lon: 96.0891,  tz: 6.5 },
  { name: 'Naypyidaw',         lat: 19.7633, lon: 96.0785,  tz: 6.5 },

  // ── Canada ───────────────────────────────────────────────────
  { name: 'Calgary',           lat: 51.0447, lon:-114.0719,  tz: -7 },
  { name: 'Edmonton',          lat: 53.5461, lon:-113.4938,  tz: -7 },
  { name: 'Halifax',           lat: 44.6488, lon: -63.5752,  tz: -4 },
  { name: 'Hamilton ON',       lat: 43.2557, lon: -79.8711,  tz: -5 },
  { name: 'Kitchener',         lat: 43.4516, lon: -80.4925,  tz: -5 },
  { name: 'London ON',         lat: 42.9849, lon: -81.2453,  tz: -5 },
  { name: 'Mississauga',       lat: 43.5890, lon: -79.6441,  tz: -5 },
  { name: 'Montreal',          lat: 45.5017, lon: -73.5673,  tz: -5 },
  { name: 'Ottawa',            lat: 45.4215, lon: -75.6972,  tz: -5 },
  { name: 'Quebec City',       lat: 46.8139, lon: -71.2082,  tz: -5 },
  { name: 'Regina',            lat: 50.4452, lon:-104.6189,  tz: -6 },
  { name: 'Saskatoon',         lat: 52.1332, lon:-106.6700,  tz: -6 },
  { name: 'Toronto',           lat: 43.6532, lon: -79.3832,  tz: -5 },
  { name: 'Vancouver',         lat: 49.2827, lon:-123.1207,  tz: -8 },
  { name: 'Victoria BC',       lat: 48.4284, lon:-123.3656,  tz: -8 },
  { name: 'Windsor ON',        lat: 42.3149, lon: -83.0364,  tz: -5 },
  { name: 'Winnipeg',          lat: 49.8951, lon: -97.1384,  tz: -6 },
  { name: 'Brampton',          lat: 43.6831, lon: -79.7663,  tz: -5 },
  { name: 'Surrey BC',         lat: 49.1913, lon:-122.8490,  tz: -8 },

  // ── USA — East ───────────────────────────────────────────────
  { name: 'Atlanta',           lat: 33.7490, lon: -84.3880,  tz: -5 },
  { name: 'Baltimore',         lat: 39.2904, lon: -76.6122,  tz: -5 },
  { name: 'Boston',            lat: 42.3601, lon: -71.0589,  tz: -5 },
  { name: 'Charlotte',         lat: 35.2271, lon: -80.8431,  tz: -5 },
  { name: 'Cleveland',         lat: 41.4993, lon: -81.6944,  tz: -5 },
  { name: 'Columbus OH',       lat: 39.9612, lon: -82.9988,  tz: -5 },
  { name: 'Detroit',           lat: 42.3314, lon: -83.0458,  tz: -5 },
  { name: 'Edison NJ',         lat: 40.5187, lon: -74.4121,  tz: -5 },
  { name: 'Jacksonville',      lat: 30.3322, lon: -81.6557,  tz: -5 },
  { name: 'Jersey City',       lat: 40.7178, lon: -74.0431,  tz: -5 },
  { name: 'Miami',             lat: 25.7617, lon: -80.1918,  tz: -5 },
  { name: 'New York City',     lat: 40.7128, lon: -74.0060,  tz: -5 },
  { name: 'Newark NJ',         lat: 40.7357, lon: -74.1724,  tz: -5 },
  { name: 'Orlando',           lat: 28.5383, lon: -81.3792,  tz: -5 },
  { name: 'Philadelphia',      lat: 39.9526, lon: -75.1652,  tz: -5 },
  { name: 'Pittsburgh',        lat: 40.4406, lon: -79.9959,  tz: -5 },
  { name: 'Raleigh',           lat: 35.7796, lon: -78.6382,  tz: -5 },
  { name: 'Tampa',             lat: 27.9506, lon: -82.4572,  tz: -5 },
  { name: 'Washington DC',     lat: 38.9072, lon: -77.0369,  tz: -5 },

  // ── USA — Central ────────────────────────────────────────────
  { name: 'Austin TX',         lat: 30.2672, lon: -97.7431,  tz: -6 },
  { name: 'Chicago',           lat: 41.8781, lon: -87.6298,  tz: -6 },
  { name: 'Dallas',            lat: 32.7767, lon: -96.7970,  tz: -6 },
  { name: 'Houston',           lat: 29.7604, lon: -95.3698,  tz: -6 },
  { name: 'Indianapolis',      lat: 39.7684, lon: -86.1581,  tz: -5 },
  { name: 'Kansas City',       lat: 39.0997, lon: -94.5786,  tz: -6 },
  { name: 'Memphis',           lat: 35.1495, lon: -90.0490,  tz: -6 },
  { name: 'Minneapolis',       lat: 44.9778, lon: -93.2650,  tz: -6 },
  { name: 'Nashville',         lat: 36.1627, lon: -86.7816,  tz: -6 },
  { name: 'New Orleans',       lat: 29.9511, lon: -90.0715,  tz: -6 },
  { name: 'San Antonio',       lat: 29.4241, lon: -98.4936,  tz: -6 },
  { name: 'St. Louis',         lat: 38.6270, lon: -90.1994,  tz: -6 },

  // ── USA — West ───────────────────────────────────────────────
  { name: 'Fremont CA',        lat: 37.5485, lon:-121.9886,  tz: -8 },
  { name: 'Las Vegas',         lat: 36.1699, lon:-115.1398,  tz: -8 },
  { name: 'Los Angeles',       lat: 34.0522, lon:-118.2437,  tz: -8 },
  { name: 'Phoenix',           lat: 33.4484, lon:-112.0740,  tz: -7 },
  { name: 'Portland OR',       lat: 45.5051, lon:-122.6750,  tz: -8 },
  { name: 'Sacramento',        lat: 38.5816, lon:-121.4944,  tz: -8 },
  { name: 'San Diego',         lat: 32.7157, lon:-117.1611,  tz: -8 },
  { name: 'San Francisco',     lat: 37.7749, lon:-122.4194,  tz: -8 },
  { name: 'San Jose CA',       lat: 37.3382, lon:-121.8863,  tz: -8 },
  { name: 'Seattle',           lat: 47.6062, lon:-122.3321,  tz: -8 },

  // ── USA — Mountain & Other ────────────────────────────────────
  { name: 'Albuquerque',       lat: 35.0844, lon:-106.6504,  tz: -7 },
  { name: 'Denver',            lat: 39.7392, lon:-104.9903,  tz: -7 },
  { name: 'Salt Lake City',    lat: 40.7608, lon:-111.8910,  tz: -7 },
  { name: 'Honolulu',          lat: 21.3069, lon:-157.8583,  tz: -10 },
  { name: 'Anchorage',         lat: 61.2181, lon:-149.9003,  tz: -9 },

  // ── UK & Ireland ─────────────────────────────────────────────
  { name: 'Belfast',           lat: 54.5973, lon:  -5.9301,  tz: 0 },
  { name: 'Birmingham',        lat: 52.4862, lon:  -1.8904,  tz: 0 },
  { name: 'Bradford',          lat: 53.7960, lon:  -1.7594,  tz: 0 },
  { name: 'Bristol',           lat: 51.4545, lon:  -2.5879,  tz: 0 },
  { name: 'Coventry',          lat: 52.4068, lon:  -1.5197,  tz: 0 },
  { name: 'Dublin',            lat: 53.3498, lon:  -6.2603,  tz: 0 },
  { name: 'Edinburgh',         lat: 55.9533, lon:  -3.1883,  tz: 0 },
  { name: 'Glasgow',           lat: 55.8642, lon:  -4.2518,  tz: 0 },
  { name: 'Leeds',             lat: 53.8008, lon:  -1.5491,  tz: 0 },
  { name: 'Leicester',         lat: 52.6369, lon:  -1.1398,  tz: 0 },
  { name: 'Liverpool',         lat: 53.4084, lon:  -2.9916,  tz: 0 },
  { name: 'London',            lat: 51.5074, lon:  -0.1278,  tz: 0 },
  { name: 'Manchester',        lat: 53.4808, lon:  -2.2426,  tz: 0 },
  { name: 'Northampton',       lat: 52.2405, lon:  -0.9027,  tz: 0 },
  { name: 'Nottingham',        lat: 52.9548, lon:  -1.1581,  tz: 0 },
  { name: 'Sheffield',         lat: 53.3811, lon:  -1.4701,  tz: 0 },
  { name: 'Slough',            lat: 51.5105, lon:  -0.5950,  tz: 0 },
  { name: 'Southampton',       lat: 50.9097, lon:  -1.4044,  tz: 0 },
  { name: 'Wolverhampton',     lat: 52.5862, lon:  -2.1285,  tz: 0 },

  // ── Australia ────────────────────────────────────────────────
  { name: 'Adelaide',          lat:-34.9285, lon: 138.6007,  tz: 9.5 },
  { name: 'Brisbane',          lat:-27.4698, lon: 153.0251,  tz: 10 },
  { name: 'Canberra',          lat:-35.2809, lon: 149.1300,  tz: 10 },
  { name: 'Darwin',            lat:-12.4634, lon: 130.8456,  tz: 9.5 },
  { name: 'Gold Coast',        lat:-28.0167, lon: 153.4000,  tz: 10 },
  { name: 'Melbourne',         lat:-37.8136, lon: 144.9631,  tz: 10 },
  { name: 'Perth',             lat:-31.9505, lon: 115.8605,  tz: 8 },
  { name: 'Sydney',            lat:-33.8688, lon: 151.2093,  tz: 10 },

  // ── New Zealand ──────────────────────────────────────────────
  { name: 'Auckland',          lat:-36.8509, lon: 174.7645,  tz: 12 },
  { name: 'Christchurch',      lat:-43.5321, lon: 172.6362,  tz: 12 },
  { name: 'Wellington',        lat:-41.2865, lon: 174.7762,  tz: 12 },

  // ── UAE ──────────────────────────────────────────────────────
  { name: 'Abu Dhabi',         lat: 24.4539, lon: 54.3773,   tz: 4 },
  { name: 'Al Ain',            lat: 24.2075, lon: 55.7447,   tz: 4 },
  { name: 'Dubai',             lat: 25.2048, lon: 55.2708,   tz: 4 },
  { name: 'Sharjah',           lat: 25.3462, lon: 55.4209,   tz: 4 },

  // ── Middle East ──────────────────────────────────────────────
  { name: 'Amman',             lat: 31.9454, lon: 35.9284,   tz: 2 },
  { name: 'Bahrain (Manama)',  lat: 26.2154, lon: 50.5832,   tz: 3 },
  { name: 'Beirut',            lat: 33.8938, lon: 35.5018,   tz: 2 },
  { name: 'Cairo',             lat: 30.0444, lon: 31.2357,   tz: 2 },
  { name: 'Doha',              lat: 25.2854, lon: 51.5310,   tz: 3 },
  { name: 'Istanbul',          lat: 41.0082, lon: 28.9784,   tz: 3 },
  { name: 'Jerusalem',         lat: 31.7683, lon: 35.2137,   tz: 2 },
  { name: 'Kuwait City',       lat: 29.3759, lon: 47.9774,   tz: 3 },
  { name: 'Muscat',            lat: 23.5880, lon: 58.3829,   tz: 4 },
  { name: 'Riyadh',            lat: 24.7136, lon: 46.6753,   tz: 3 },
  { name: 'Tel Aviv',          lat: 32.0853, lon: 34.7818,   tz: 2 },

  // ── Singapore & Malaysia ─────────────────────────────────────
  { name: 'Singapore',         lat:  1.3521, lon: 103.8198,  tz: 8 },
  { name: 'Kuala Lumpur',      lat:  3.1390, lon: 101.6869,  tz: 8 },
  { name: 'George Town',       lat:  5.4141, lon: 100.3288,  tz: 8 },
  { name: 'Johor Bahru',       lat:  1.4927, lon: 103.7414,  tz: 8 },

  // ── Southeast Asia ───────────────────────────────────────────
  { name: 'Bangkok',           lat: 13.7563, lon: 100.5018,  tz: 7 },
  { name: 'Chiang Mai',        lat: 18.7883, lon: 98.9853,   tz: 7 },
  { name: 'Jakarta',           lat: -6.2088, lon: 106.8456,  tz: 7 },
  { name: 'Manila',            lat: 14.5995, lon: 120.9842,  tz: 8 },
  { name: 'Ho Chi Minh City',  lat: 10.8231, lon: 106.6297,  tz: 7 },
  { name: 'Hanoi',             lat: 21.0285, lon: 105.8542,  tz: 7 },

  // ── East Asia ────────────────────────────────────────────────
  { name: 'Beijing',           lat: 39.9042, lon: 116.4074,  tz: 8 },
  { name: 'Hong Kong',         lat: 22.3193, lon: 114.1694,  tz: 8 },
  { name: 'Shanghai',          lat: 31.2304, lon: 121.4737,  tz: 8 },
  { name: 'Seoul',             lat: 37.5665, lon: 126.9780,  tz: 9 },
  { name: 'Tokyo',             lat: 35.6762, lon: 139.6503,  tz: 9 },
  { name: 'Osaka',             lat: 34.6937, lon: 135.5023,  tz: 9 },
  { name: 'Taipei',            lat: 25.0320, lon: 121.5654,  tz: 8 },

  // ── Africa — East & South ────────────────────────────────────
  { name: 'Dar es Salaam',     lat: -6.7924, lon: 39.2083,   tz: 3 },
  { name: 'Johannesburg',      lat:-26.2041, lon: 28.0473,   tz: 2 },
  { name: 'Cape Town',         lat:-33.9249, lon: 18.4241,   tz: 2 },
  { name: 'Durban',            lat:-29.8587, lon: 31.0218,   tz: 2 },
  { name: 'Kampala',           lat:  0.3476, lon: 32.5825,   tz: 3 },
  { name: 'Mombasa',           lat: -4.0435, lon: 39.6682,   tz: 3 },
  { name: 'Nairobi',           lat: -1.2921, lon: 36.8219,   tz: 3 },

  // ── Africa — West ────────────────────────────────────────────
  { name: 'Accra',             lat:  5.6037, lon: -0.1870,   tz: 0 },
  { name: 'Lagos',             lat:  6.5244, lon:  3.3792,   tz: 1 },

  // ── Europe ───────────────────────────────────────────────────
  { name: 'Amsterdam',         lat: 52.3676, lon:  4.9041,   tz: 1 },
  { name: 'Antwerp',           lat: 51.2194, lon:  4.4025,   tz: 1 },
  { name: 'Athens',            lat: 37.9838, lon: 23.7275,   tz: 2 },
  { name: 'Barcelona',         lat: 41.3851, lon:  2.1734,   tz: 1 },
  { name: 'Berlin',            lat: 52.5200, lon: 13.4050,   tz: 1 },
  { name: 'Brussels',          lat: 50.8503, lon:  4.3517,   tz: 1 },
  { name: 'Copenhagen',        lat: 55.6761, lon: 12.5683,   tz: 1 },
  { name: 'Frankfurt',         lat: 50.1109, lon:  8.6821,   tz: 1 },
  { name: 'Geneva',            lat: 46.2044, lon:  6.1432,   tz: 1 },
  { name: 'Hamburg',           lat: 53.5753, lon: 10.0153,   tz: 1 },
  { name: 'Helsinki',          lat: 60.1699, lon: 24.9384,   tz: 2 },
  { name: 'Lisbon',            lat: 38.7169, lon: -9.1395,   tz: 0 },
  { name: 'Madrid',            lat: 40.4168, lon: -3.7038,   tz: 1 },
  { name: 'Milan',             lat: 45.4654, lon:  9.1859,   tz: 1 },
  { name: 'Moscow',            lat: 55.7558, lon: 37.6173,   tz: 3 },
  { name: 'Munich',            lat: 48.1351, lon: 11.5820,   tz: 1 },
  { name: 'Oslo',              lat: 59.9139, lon: 10.7522,   tz: 1 },
  { name: 'Paris',             lat: 48.8566, lon:  2.3522,   tz: 1 },
  { name: 'Prague',            lat: 50.0755, lon: 14.4378,   tz: 1 },
  { name: 'Rome',              lat: 41.9028, lon: 12.4964,   tz: 1 },
  { name: 'Stockholm',         lat: 59.3293, lon: 18.0686,   tz: 1 },
  { name: 'Vienna',            lat: 48.2082, lon: 16.3738,   tz: 1 },
  { name: 'Warsaw',            lat: 52.2297, lon: 21.0122,   tz: 1 },
  { name: 'Zurich',            lat: 47.3769, lon:  8.5417,   tz: 1 },

  // ── Mauritius ────────────────────────────────────────────────
  { name: 'Port Louis',        lat:-20.1609, lon: 57.4989,   tz: 4 },
  { name: 'Rose Hill (Mauritius)', lat:-20.2355, lon: 57.4638, tz: 4 },

  // ── Fiji ─────────────────────────────────────────────────────
  { name: 'Suva',              lat:-18.1248, lon: 178.4501,  tz: 12 },
  { name: 'Lautoka',           lat:-17.6134, lon: 177.4500,  tz: 12 },

  // ── Trinidad & Tobago ────────────────────────────────────────
  { name: 'Port of Spain',     lat: 10.6596, lon: -61.5086,  tz: -4 },
  { name: 'San Fernando TT',   lat: 10.2796, lon: -61.4676,  tz: -4 },

  // ── Guyana & Suriname ────────────────────────────────────────
  { name: 'Georgetown (Guyana)',lat:  6.8013, lon: -58.1551,  tz: -4 },
  { name: 'Paramaribo',        lat:  5.8520, lon: -55.2038,  tz: -3 },

  // ── Caribbean ────────────────────────────────────────────────
  { name: 'Kingston Jamaica',  lat: 17.9970, lon: -76.7936,  tz: -5 },
  { name: 'Bridgetown Barbados', lat: 13.0975, lon: -59.6167, tz: -4 },

  // ── South America ────────────────────────────────────────────
  { name: 'Bogota',            lat:  4.7110, lon: -74.0721,  tz: -5 },
  { name: 'Buenos Aires',      lat:-34.6037, lon: -58.3816,  tz: -3 },
  { name: 'Lima',              lat:-12.0464, lon: -77.0428,  tz: -5 },
  { name: 'Sao Paulo',         lat:-23.5505, lon: -46.6333,  tz: -3 },

  // ── Reunion Island ───────────────────────────────────────────
  { name: 'Saint-Denis Reunion', lat:-20.8823, lon: 55.4504, tz: 4 },

];

// Case-insensitive substring search, returns up to `n` matches
export function searchCity(query, n = 8) {
  if (!query || query.trim().length < 2) return [];
  const q = query.trim().toLowerCase();
  return CITIES.filter(c => c.name.toLowerCase().includes(q)).slice(0, n);
}

export default CITIES;