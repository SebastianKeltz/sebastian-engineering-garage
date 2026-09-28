import { publicPath } from '@/lib/site';
// Background and qualifications: EE Resume 2026.pdf supplied September 28, 2026.
// Existing case-study material is retained separately in projects.ts.
export const resumePath = publicPath('/assets/Sebastian-Keltz-Resume.pdf');
export const resumeViewPath = '/resume#resume-document';
export const skills = [
  { title: 'Programming', items: ['C', 'C++ firmware', 'MATLAB', 'TypeScript', 'JavaScript'] },
  { title: 'Engineering software', items: ['PowerWorld Simulator', 'LTspice', 'Autodesk Fusion', 'Arduino IDE'] },
  { title: 'Software development', items: ['React', 'Next.js', 'Supabase', 'Git / GitHub'] },
  { title: 'Embedded & hardware', items: ['ESP32-S3', 'BME280', 'I²C', 'Serial diagnostics', 'Power-system integration', 'Testing under load'] },
];
export const experience = [
  { title: 'Founder & Developer — OurWay', organization: 'Campus social platform', dates: '2026 – Present', summary: 'Founded and built a full-stack platform with Next.js, React, TypeScript, and Supabase. Implemented authentication, organization profiles, rosters, calendars, officer roles, and administrative tools.', href: '/projects/ourway-campus-app' },
  { title: 'Independent Game Developer', organization: 'Original action game · In development', dates: '2026 – Present', summary: 'Designing wave-based combat, upgrade progression, enemy AI, weapon systems, and boss encounters. Refining gameplay through prototyping, testing, debugging, and balancing.' },
  { title: 'Eagle Scout', organization: 'Boy Scouts of America · Miami, FL', dates: 'Scouting involvement: August 2007 – December 2021', summary: 'Led a community service project and earned the Eagle Scout rank through sustained leadership, teamwork, and commitment.' },
];
export const featuredProjects = [
  { slug: 'esp32-smart-home', dates: '2026 – Present', role: 'Independent project · Firmware and sensor integration', tools: 'ESP32-S3, Arduino C++, BME280, I²C, serial diagnostics', summary: 'Built a modular monitoring system to read and report live environmental conditions.', result: 'Integrated and tested live temperature, humidity, and pressure measurements through C++ firmware and serial diagnostics.' },
  { slug: 'electric-dirt-bike', dates: 'October 2025 – January 2026', role: 'Independent project · Electrical and drivetrain integration', tools: '48 V / 20 Ah lithium battery, 2 kW-rated BLDC motor, controller', summary: 'Converted a dirt bike to electric drive and integrated the battery, motor, controls, and protection components.', result: 'Tested the completed drivetrain under load; designed the system for approximately 40–45 A full-load current.' },
  { slug: 'cooler-scooter', dates: 'September 2025 – January 2026', role: 'Independent project · Design, assembly, and testing', tools: 'Two 18 V / 8 Ah batteries, DC motor, motor controller, throttle', summary: 'Designed and built a three-wheel electric cooler scooter with a 36 V power system.', result: 'Integrated the drive and controls, then evaluated voltage, current, torque, runtime, and system performance under load.' },
];
