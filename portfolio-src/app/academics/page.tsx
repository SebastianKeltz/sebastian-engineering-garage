import { publicPath } from '@/lib/site';
import type { Metadata } from 'next';
import Link from '@/components/site-link';
import { PageFrame } from '@/components/page-frame';

export const metadata: Metadata = {
  title: 'Academic Work',
  description: 'Selected circuit labs, simulations, measurement work, and engineering coursework by Sebastian Keltz.',
};

const labWork = [
  { number: '01', title: 'Breadboard circuit development', copy: 'Translate a schematic into a physical layout, check node connections, and isolate faults systematically.', image: publicPath('/assets/lab-breadboard-1-studio.png'), alt: 'Electronics circuit assembled on a breadboard' },
  { number: '02', title: 'Circuit testing + iteration', copy: 'Use measurements to refine the setup and explain why the circuit behaves differently from an ideal model.', image: publicPath('/assets/circuit-test-1.jpg'), alt: 'Hands-on electronics circuit test setup' },
];

export default function AcademicsPage() {
  return (
    <PageFrame>
      <section className="academic-hero shell">
        <div>
          <p className="eyebrow"><span /> Academic work</p>
          <h1>Theory earns its place at the bench.</h1>
          <p>Selected electronics labs, measurement work, simulation, programming, and design coursework from Electrical Engineering at UCF.</p>
        </div>
        <figure><img src={publicPath('/assets/oscilloscope-1.jpg')} alt="Oscilloscope measurement from an electronics lab" fetchPriority="high" /><figcaption><span>Measured work</span> Circuit behavior made visible</figcaption></figure>
      </section>

      <section className="academic-work shell">
        <div className="section-intro"><p className="eyebrow"><span /> Lab evidence</p><h2>From schematic to measured behavior.</h2><p>The most useful coursework is work I can explain, reproduce, and connect to a real design decision.</p></div>
        <div className="lab-grid">{labWork.map((lab) => <article key={lab.number}><figure><img src={lab.image} alt={lab.alt} loading="lazy" decoding="async" /></figure><div><span>{lab.number}</span><h3>{lab.title}</h3><p>{lab.copy}</p></div></article>)}</div>
      </section>

      <section className="coursework-band">
        <div className="shell coursework-grid">
          <div><p className="eyebrow"><span /> Applied coursework</p><h2>Concepts and tools I&apos;m applying now.</h2></div>
          <dl>
            <div><dt>Circuits</dt><dd>AC/DC analysis, diodes, transistors, RC behavior, waveform measurement</dd></div>
            <div><dt>Embedded</dt><dd>Arduino C++, GPIO, I²C sensors, serial diagnostics, system states</dd></div>
            <div><dt>Power</dt><dd>Power Systems Analysis, Fundamentals of Electric Power, LTspice, PowerWorld Simulator</dd></div>
            <div><dt>Computation</dt><dd>C, MATLAB, GNU Octave, JArmEmu, MARS MIPS Simulator</dd></div>
            <div><dt>Design</dt><dd>Autodesk Fusion, 3D printing, fit checks, mechanical packaging</dd></div>
          </dl>
        </div>
      </section>

      <section className="academic-close shell">
        <div><p className="eyebrow"><span /> Apply the theory</p><h2>See how the coursework moves into full systems.</h2></div>
        <Link className="button button-primary" href="/projects">Explore projects <span aria-hidden="true">↗</span></Link>
        <p className="sharing-note">Selected lab photos and project summaries.</p>
      </section>
    </PageFrame>
  );
}
