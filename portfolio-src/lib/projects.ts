import { publicPath } from '@/lib/site';
export type ProjectCategory = 'software' | 'electrical' | 'hardware';

export type Project = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  discipline: string;
  categories: ProjectCategory[];
  status: string;
  summary: string;
  image: string;
  imageAlt: string;
  imageFit?: 'contain' | 'cover';
  accent: 'forest' | 'lime';
  homeStat: { value: string; label: string };
  tags: string[];
  website?: { url: string; label: string };
  stats: Array<{ value: string; label: string }>;
  overview: string[];
  challenge: string;
  evidence: Array<{ label: string; title: string; tone: 'verified' | 'simulated' | 'planned'; items: string[] }>;
  process: Array<{ step: string; title: string; copy: string }>;
  gallery: Array<{ src: string; alt: string; caption: string; fit?: 'contain' | 'cover' }>;
  video?: { src: string; poster: string; caption: string };
  learnings: string[];
  next: string[];
};

export const projects: Project[] = [
  {
    slug: 'ourway-campus-app',
    number: '01',
    title: 'OurWay Campus Community App',
    shortTitle: 'OurWay Campus App',
    discipline: 'Full-stack software · Product design',
    categories: ['software'],
    status: 'Web beta · native in progress',
    summary: 'A multi-platform campus community product that helps students discover clubs and events, join organizations, and connect with the people who make campus feel like home.',
    image: publicPath('/assets/ourway-cover.png'),
    imageAlt: 'OurWay campus community app brand card',
    imageFit: 'contain',
    accent: 'forest',
    homeStat: { value: 'Web + mobile', label: 'Next.js and Capacitor product' },
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Product design', 'Capacitor'],
    website: { url: 'https://ourwaycampus.com', label: 'Visit OurWay' },
    stats: [
      { value: '3 platforms', label: 'web, iOS, and Android foundations' },
      { value: 'Full stack', label: 'Next.js, React, TypeScript, and Supabase' },
      { value: 'Role-based', label: 'student, officer, owner, and admin flows' },
    ],
    overview: [
      'OurWay is a campus community and social-discovery platform for students who want a clearer way to find clubs, events, communities, and people around their school.',
      'I am developing the product across the full stack: responsive product design, authentication, role-based workflows, database security, media handling, testing, and native mobile packaging. The work is active, so this case study separates what is already built from the remaining launch checks.',
    ],
    challenge: 'Turn a broad campus-social idea into one coherent, trustworthy product that works across desktop and mobile while keeping club permissions, student data, moderation, and administrative actions explicit and secure.',
    evidence: [
      {
        label: 'Built',
        title: 'Core campus experience',
        tone: 'verified',
        items: [
          'Created responsive home, discovery, calendar, club, profile, messaging, notification, and saved-item experiences.',
          'Implemented student, club-member, officer, primary-owner, and platform-admin workflows.',
          'Connected Supabase authentication, Postgres data, storage, and row-level security to the Next.js product.',
        ],
      },
      {
        label: 'Validated',
        title: 'Quality and safety checkpoint',
        tone: 'verified',
        items: [
          'A documented revamp checkpoint passed automated checks and a production build; database replay and authenticated end-to-end checks remain separate release tasks.',
          'Automated tests cover interface behavior, permissions, attachments, and release tooling.',
          'Accessibility, mobile navigation, empty states, error states, and responsive layouts received dedicated review.',
        ],
      },
      {
        label: 'In development',
        title: 'Release readiness',
        tone: 'planned',
        items: [
          'Complete the clean database replay and authenticated end-to-end verification for the newest migration.',
          'Finish the App Store and Google Play release requirements, signing, and account setup.',
          'Use pilot feedback and production monitoring to guide the next product iteration.',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Define the campus problem', copy: 'Focused the product on the practical student journey: discover, decide, join, participate, and stay connected.' },
      { step: '02', title: 'Model roles and trust', copy: 'Designed permissions around students, officers, owners, and administrators before expanding high-impact workflows.' },
      { step: '03', title: 'Build the core flows', copy: 'Connected discovery, clubs, events, calendars, messaging, profiles, and notifications into one product shell.' },
      { step: '04', title: 'Unify the experience', copy: 'Reworked navigation, hierarchy, spacing, themes, loading states, and phone-first layouts around a shared design system.' },
      { step: '05', title: 'Test the boundaries', copy: 'Added automated coverage for interface behavior, database rules, role transitions, attachments, and release tooling.' },
      { step: '06', title: 'Prepare for launch', copy: 'Packaged the web product for iOS and Android while tracking the remaining database, store, and operational checks.' },
    ],
    gallery: [
      { src: publicPath('/assets/ourway-desktop.png'), alt: 'OurWay desktop app showing campus selection and full navigation', caption: 'Responsive desktop experience', fit: 'contain' },
      { src: publicPath('/assets/ourway-phone.png'), alt: 'OurWay phone sign-in experience in light mode', caption: 'Phone-first sign-in flow', fit: 'contain' },
      { src: publicPath('/assets/ourway-tablet.png'), alt: 'OurWay tablet app showing the dark-mode campus selection screen', caption: 'Adaptive tablet layout', fit: 'contain' },
    ],
    learnings: [
      'A social product is also a permissions and data-integrity product.',
      'Mobile navigation and content priority need to be designed together, not scaled down from desktop.',
      'Clear empty, loading, error, and moderation states are part of the main experience.',
    ],
    next: ['Complete database replay and authenticated E2E checks', 'Finish iOS and Android release setup', 'Run a focused campus pilot', 'Add production monitoring and feedback loops'],
  },
  {
    slug: 'esp32-smart-home',
    number: '02',
    title: 'ESP32 Smart-Home Monitoring System',
    shortTitle: 'ESP32 Smart-Home Monitor',
    discipline: 'Embedded systems · Power electronics',
    categories: ['electrical', 'software', 'hardware'],
    status: 'Active build',
    summary: 'A modular sensing and control platform combining verified environmental and motion sensing with a simulated, protected 12 V fan-driver stage.',
    image: publicPath('/assets/esp32-overview-studio.png'),
    imageAlt: 'ESP32-S3 smart-home monitoring prototype on a breadboard',
    imageFit: 'contain',
    accent: 'forest',
    homeStat: { value: 'Flyback protection', label: 'simulated flyback protection' },
    tags: ['ESP32-S3', 'Arduino C++', 'I²C', 'PIR', 'LTspice'],
    stats: [
      { value: '0x76', label: 'verified BME280 address' },
      { value: 'GPIO 4', label: 'verified PIR signal' },
      { value: 'LTspice', label: 'flyback-protection comparison' },
    ],
    overview: [
      'The system began as a practical way to connect embedded firmware, sensor bring-up, serial diagnostics, and power-electronics protection in one documented build.',
      'I separated the evidence into three categories—verified in hardware, simulated, and planned—so each claim is easy to evaluate and the unfinished work stays explicit.',
    ],
    challenge: 'Bring several low-voltage sensors into one reliable embedded platform while designing a 12 V inductive-load driver that protects the control electronics from switching transients.',
    evidence: [
      {
        label: 'Verified in hardware',
        title: 'Firmware and sensing',
        tone: 'verified',
        items: [
          'ESP32-S3 firmware upload, flash, PSRAM, and serial diagnostics completed.',
          'BME280 detected at I²C address 0x76 with live temperature, humidity, and pressure readings.',
          'PIR sensor events verified through GPIO 4 and serial output.',
        ],
      },
      {
        label: 'Simulated',
        title: 'Protected fan driver',
        tone: 'simulated',
        items: [
          'MOSFET switching stage modeled for a 12 V fan load in LTspice.',
          'The model produced an approximately 551 V drain spike without flyback protection.',
          'Adding a flyback diode reduced the simulated drain-voltage transient.',
        ],
      },
      {
        label: 'In development',
        title: 'System integration',
        tone: 'planned',
        items: [
          'Build and validate the physical fan-driver stage on hardware.',
          'Integrate additional light and entry-state sensing after independent verification.',
          'Package the system and add a stable user-facing dashboard.',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Board bring-up', copy: 'Verified the ESP32-S3 environment, upload path, serial output, flash, and PSRAM before adding peripherals.' },
      { step: '02', title: 'Sensor isolation', copy: 'Tested each sensor independently, confirmed addresses and GPIO behavior, then combined the working paths.' },
      { step: '03', title: 'Diagnostic firmware', copy: 'Added readable serial states so wiring, initialization, and motion events could be checked quickly.' },
      { step: '04', title: 'Protection study', copy: 'Compared an inductive fan-driver model with and without flyback protection to quantify the switching transient.' },
      { step: '05', title: 'Next integration', copy: 'The next milestone is physical driver validation followed by enclosure and dashboard work.' },
    ],
    gallery: [
      { src: publicPath('/assets/esp32-overview-studio.png'), alt: 'Full ESP32-S3 breadboard prototype', caption: 'System overview' },
      { src: publicPath('/assets/esp32-bme280-wiring.jpg'), alt: 'BME280 environmental sensor wired to the ESP32-S3', caption: 'BME280 wiring' },
      { src: publicPath('/assets/esp32-pir-wiring-studio.png'), alt: 'PIR motion sensor wired to the ESP32-S3', caption: 'PIR motion input' },
      { src: publicPath('/assets/esp32-motion-detected.jpg'), alt: 'Serial output showing a detected motion event', caption: 'Verified motion event', fit: 'contain' },
      { src: publicPath('/assets/esp32-ltspice-flyback.jpg'), alt: 'LTspice waveform for fan driver with flyback diode', caption: 'Protected simulation', fit: 'contain' },
      { src: publicPath('/assets/esp32-ltspice-no-flyback.jpg'), alt: 'LTspice waveform for fan driver without flyback diode', caption: 'Unprotected simulation', fit: 'contain' },
    ],
    learnings: [
      'Bring-up is faster when every subsystem has an observable diagnostic state.',
      'Inductive-load protection is a design requirement, not an optional cleanup step.',
      'Clear evidence labels make an in-progress project more credible than vague completion claims.',
    ],
    next: ['Validate the 12 V driver on hardware', 'Consolidate firmware states', 'Design a serviceable enclosure', 'Add a simple monitoring interface'],
  },
  {
    slug: 'electric-dirt-bike',
    number: '03',
    title: 'Electric Dirt Bike Conversion',
    shortTitle: 'Electric Dirt Bike',
    discipline: 'Power systems · Electric mobility',
    categories: ['electrical', 'hardware'],
    status: 'Built + ride tested',
    summary: 'A complete electric drivetrain conversion focused on power delivery, component packaging, wiring, pre-power checks, and post-vibration inspection.',
    image: publicPath('/assets/electric-dirt-bike-1-studio.png'),
    imageAlt: 'Completed electric dirt bike conversion',
    imageFit: 'contain',
    accent: 'lime',
    homeStat: { value: '48 V / 2 kW-rated', label: 'battery and BLDC motor system' },
    tags: ['48 V', '2 kW BLDC', 'Controller wiring', 'CAD', 'Testing'],
    stats: [
      { value: '48 V', label: 'battery system' },
      { value: '2,000 W', label: 'BLDC motor rating' },
      { value: '20 Ah', label: 'battery capacity' },
    ],
    overview: [
      'This conversion turned a rolling chassis into a working electric vehicle by integrating the battery, controller, BLDC motor, throttle, wiring, and support hardware.',
      'The project demanded both electrical and mechanical judgment: high-current paths had to be routed cleanly, components had to remain serviceable, and every mounting choice had to withstand movement and vibration.',
    ],
    challenge: 'Fit a complete 48 V electric drivetrain into an existing frame while keeping the electrical path understandable, the components secure, and the system inspectable before and after ride testing.',
    evidence: [
      {
        label: 'Built',
        title: 'Powertrain integration',
        tone: 'verified',
        items: ['Installed and packaged the 48 V battery, 2 kW BLDC motor, and controller.', 'Connected throttle and control wiring, then inspected the signal and power paths before use.', 'Created support parts to solve fitment and component-protection constraints.'],
      },
      {
        label: 'Tested',
        title: 'Controlled ride checks',
        tone: 'verified',
        items: ['Performed staged power-up checks before higher-load operation.', 'Observed response, mounting, balance, and cable behavior during controlled ride testing.', 'Re-inspected wiring and fasteners after vibration and movement.'],
      },
      {
        label: 'Next iteration',
        title: 'Refinement opportunities',
        tone: 'planned',
        items: ['Improve weather protection and cable management.', 'Document electrical protection and service points more explicitly.', 'Capture repeatable performance measurements under defined test conditions.'],
      },
    ],
    process: [
      { step: '01', title: 'Layout', copy: 'Mapped battery, motor, controller, wiring, throttle, clearance, and service access on the frame.' },
      { step: '02', title: 'Fitment', copy: 'Tested component placement and adjusted the physical arrangement before committing to the wiring path.' },
      { step: '03', title: 'Electrical integration', copy: 'Connected the controller and throttle path, keeping power and signal routing visible and inspectable.' },
      { step: '04', title: 'Support parts', copy: 'Used custom-fit parts where the stock frame did not provide the needed mounting or protection.' },
      { step: '05', title: 'Power checks', copy: 'Inspected connections and system response before moving to higher-load operation.' },
      { step: '06', title: 'Ride + revise', copy: 'Tested the completed system, then inspected the build again after real vibration and movement.' },
    ],
    gallery: [
      { src: publicPath('/assets/electric-dirt-bike-1-studio.png'), alt: 'Completed electric dirt bike conversion', caption: 'Completed conversion' },
      { src: publicPath('/assets/electric-dirt-bike-motor.jpg'), alt: 'BLDC motor installed on the electric dirt bike', caption: 'BLDC motor fitment' },
      { src: publicPath('/assets/electric-dirt-bike-controller-studio.png'), alt: 'Motor controller mounted on the electric dirt bike', caption: 'Controller packaging' },
      { src: publicPath('/assets/electric-dirt-bike-wiring.jpg'), alt: 'Power and control wiring on the electric dirt bike', caption: 'Wiring layout' },
    ],
    learnings: ['Mechanical packaging and electrical design must be developed together.', 'Service access is easier to preserve early than recover after wiring is complete.', 'Post-vibration inspection is part of the test—not an afterthought.'],
    next: ['Improve environmental protection', 'Refine cable routing', 'Document protection devices', 'Add repeatable performance tests'],
  },
  {
    slug: 'cooler-scooter',
    number: '04',
    title: 'Rideable Cooler Scooter',
    shortTitle: 'Cooler Scooter',
    discipline: 'Electromechanical prototype',
    categories: ['hardware', 'electrical'],
    status: 'Built + ride tested',
    summary: 'A compact, rideable prototype that combines structure, propulsion, controls, rider ergonomics, and serviceable electrical packaging.',
    image: publicPath('/assets/scooter-build-1-studio.png'),
    imageAlt: 'Completed rideable cooler scooter prototype',
    imageFit: 'contain',
    accent: 'forest',
    homeStat: { value: 'Built + ride-tested', label: 'compact electromechanical system' },
    tags: ['Prototype', 'Packaging', 'Controls', 'Fabrication', 'Ride testing'],
    stats: [{ value: '36 V', label: 'two 18 V batteries in series' }, { value: 'Under load', label: 'voltage and current checks' }, { value: 'Real-world', label: 'ride and vibration testing' }],
    overview: ['The cooler scooter started with a playful idea but quickly became a serious packaging problem: propulsion, rider controls, structure, balance, and wiring all had to share a very small envelope.', 'I used the build to practice system layout, compact wiring, iterative mounting, and the difference between a part that fits at rest and a system that works under motion.'],
    challenge: 'Create a compact rideable platform that remains controllable and inspectable while fitting the electrical and mechanical systems around the cooler body and rider position.',
    evidence: [
      { label: 'Built', title: 'Integrated prototype', tone: 'verified', items: ['Packaged the structure, drive components, electrical path, and rider controls in one compact assembly.', 'Used CAD to check fit and improve the component layout.', 'Kept high-movement areas visible for post-test inspection.'] },
      { label: 'Tested', title: 'Ride behavior', tone: 'verified', items: ['Checked rider position, control response, balance, and component security.', 'Observed wire movement and mounting behavior during vibration.', 'Revised the layout based on issues revealed outside the workshop.'] },
      { label: 'Next iteration', title: 'Better packaging', tone: 'planned', items: ['Improve protection around exposed components.', 'Reduce cable movement and simplify service access.', 'Capture defined speed, runtime, and load measurements.'] },
    ],
    process: [
      { step: '01', title: 'Concept', copy: 'Defined how the rider, cooler body, drive system, wiring, and controls could occupy one chassis.' },
      { step: '02', title: 'Packaging', copy: 'Worked through balance, structure, clearance, and access before final assembly.' },
      { step: '03', title: 'Electrical layout', copy: 'Routed power and control wiring through a compact, high-motion space.' },
      { step: '04', title: 'Control setup', copy: 'Adjusted rider input and control placement for practical use.' },
      { step: '05', title: 'Ride testing', copy: 'Observed balance, movement, vibration, and component security in operation.' },
      { step: '06', title: 'Revision', copy: 'Updated mounting and wiring based on the post-test inspection.' },
    ],
    gallery: [
      { src: publicPath('/assets/scooter-build-1-studio.png'), alt: 'Rideable cooler scooter prototype', caption: 'Completed assembly' },
      { src: publicPath('/assets/scooter-cad-1.jpg'), alt: 'Autodesk Fusion model used for cooler scooter packaging', caption: 'CAD packaging study', fit: 'contain' },
      { src: publicPath('/assets/about-me.jpg'), alt: 'Overhead workshop view during scooter project work', caption: 'Workshop build session' },
    ],
    video: { src: publicPath('/assets/scooter-action-1.mp4'), poster: publicPath('/assets/scooter-build-1-studio.png'), caption: 'Ride test evidence' },
    learnings: ['Compact products expose every weak packaging decision.', 'Rider ergonomics and electrical layout affect each other.', 'A successful bench test does not replace a motion and vibration test.'],
    next: ['Improve component guarding', 'Refine the harness', 'Measure loaded performance', 'Create a cleaner service layout'],
  },
  {
    slug: 'cad-prototyping',
    number: '05',
    title: 'CAD + 3D-Printed Project Hardware',
    shortTitle: 'CAD + Prototyping',
    discipline: 'Mechanical design · Fabrication',
    categories: ['hardware'],
    status: 'Iterative work',
    summary: 'Autodesk Fusion models and printed parts developed around real constraints such as batteries, wires, frames, hardware, and service access.',
    image: publicPath('/assets/cad-print-1.jpg'),
    imageAlt: 'Autodesk Fusion model for a project-mounted component',
    accent: 'lime',
    homeStat: { value: 'Printed + fit-checked', label: 'project-specific support hardware' },
    tags: ['Autodesk Fusion', '3D printing', 'Fit checks', 'Iteration', 'Documentation'],
    stats: [{ value: 'Measure', label: 'capture the constraint' }, { value: 'Model + print', label: 'make the first answer' }, { value: 'Test + revise', label: 'prove the fit' }],
    overview: ['CAD is most useful to me when it closes the gap between an electrical design and the real object that has to hold, protect, or route it.', 'These parts were developed around project-specific constraints. The model is only the start; fit checks, wire clearance, fastener access, and reprinting are what turn it into usable hardware.'],
    challenge: 'Create practical support parts that fit around irregular frames, batteries, wiring, and existing hardware without hiding service points or creating new interference.',
    evidence: [
      { label: 'Design method', title: 'Constraint-led modeling', tone: 'verified', items: ['Started from measured project geometry rather than an isolated CAD exercise.', 'Modeled around wire bends, hardware, component edges, and assembly access.', 'Used simple geometry where it made later revision faster.'] },
      { label: 'Validation', title: 'Physical fit checks', tone: 'verified', items: ['Printed prototypes and checked the real fit against the target assembly.', 'Identified clearance and access problems that were not obvious on screen.', 'Updated dimensions and geometry for the next version.'] },
      { label: 'Growing practice', title: 'Better documentation', tone: 'planned', items: ['Record key dimensions and revision reasons alongside each model.', 'Capture before-and-after fit photos for every iteration.', 'Track print orientation and material choices when they affect the result.'] },
    ],
    process: [
      { step: '01', title: 'Measure', copy: 'Capture the target geometry, neighboring components, hardware, and wire paths.' },
      { step: '02', title: 'Model', copy: 'Build the simplest geometry that solves the mounting or protection problem.' },
      { step: '03', title: 'Print', copy: 'Choose an orientation that supports the important surfaces and produces a useful prototype quickly.' },
      { step: '04', title: 'Fit check', copy: 'Test the physical part with the real frame, fasteners, battery, and wiring.' },
      { step: '05', title: 'Revise', copy: 'Change dimensions or features based on observed interference, movement, and service access.' },
    ],
    gallery: [
      { src: publicPath('/assets/cad-print-1.jpg'), alt: 'Autodesk Fusion project component model', caption: 'Fusion design workspace', fit: 'contain' },
      { src: publicPath('/assets/scooter-cad-1.jpg'), alt: 'Autodesk Fusion packaging model for the cooler scooter', caption: 'Assembly packaging study', fit: 'contain' },
      { src: publicPath('/assets/about-me-project.jpg'), alt: 'Hands-on project assembly around custom support parts', caption: 'Real-world fit constraints' },
    ],
    learnings: ['The real assembly always contains constraints the first CAD model misses.', 'Wire clearance and tool access deserve explicit design space.', 'Fast prototypes make dimension errors cheap to discover.'],
    next: ['Document revisions consistently', 'Capture detailed fit evidence', 'Compare material choices', 'Build a reusable project-part library'],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
