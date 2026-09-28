'use client';

import { FormEvent, KeyboardEvent as ReactKeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';

type ToolKey = 'ohms' | 'divider' | 'led' | 'rc';

const tools: Array<{ key: ToolKey; number: string; name: string; short: string }> = [
  { key: 'ohms', number: '01', name: "Ohm's Law", short: 'Solve V, I, or R' },
  { key: 'divider', number: '02', name: 'Voltage Divider', short: 'Ideal unloaded output' },
  { key: 'led', number: '03', name: 'LED Resistor', short: 'Size + power check' },
  { key: 'rc', number: '04', name: 'RC Time Constant', short: 'τ, 5τ, and cutoff' },
];

const formulaInfo: Record<ToolKey, { formula: string; assumptions: string[]; note: string }> = {
  ohms: { formula: 'V = I × R', assumptions: ['Enter any two positive magnitudes', 'The missing value is solved', 'Power is included when possible'], note: 'Useful for preliminary DC circuit checks.' },
  divider: { formula: 'Vout = Vin × R₂ / (R₁ + R₂)', assumptions: ['Ideal two-resistor network', 'Output is unloaded', 'Resistors entered in ohms'], note: 'A connected load changes the effective R₂ value.' },
  led: { formula: 'R = (Vs − nVf) / I', assumptions: ['LEDs modeled in series', 'Current entered in mA', 'Forward voltage is an estimate'], note: 'Choose a standard resistor and wattage with margin.' },
  rc: { formula: 'τ = R × C', assumptions: ['Ideal first-order network', 'Capacitance entered in µF', 'No source or load resistance'], note: 'Cutoff uses fc = 1 / (2πτ).' },
};

const engineeringFactors: Record<string, number> = {
  p: 1e-12,
  n: 1e-9,
  u: 1e-6,
  µ: 1e-6,
  m: 1e-3,
  k: 1e3,
  K: 1e3,
  M: 1e6,
  G: 1e9,
  T: 1e12,
};

function number(value: string, displayScale = 1) {
  const normalized = value.trim().replace(/,/g, '');
  if (normalized === '') return null;
  const match = normalized.match(/^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)([pnumµkKMGT]?)$/);
  if (!match) return NaN;
  const parsed = Number(match[1]);
  const suffix = match[2];
  const scaled = suffix ? parsed * engineeringFactors[suffix] / displayScale : parsed;
  return Number.isFinite(scaled) ? scaled : NaN;
}

function decimal(value: number, digits = 3) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: digits }).format(value);
}

function voltage(value: number) {
  return Math.abs(value) < 1 ? `${decimal(value * 1000)} mV` : `${decimal(value)} V`;
}

function current(value: number) {
  if (Math.abs(value) < 0.001) return `${decimal(value * 1_000_000)} µA`;
  if (Math.abs(value) < 1) return `${decimal(value * 1000)} mA`;
  return `${decimal(value)} A`;
}

function resistance(value: number) {
  if (Math.abs(value) >= 1_000_000) return `${decimal(value / 1_000_000)} MΩ`;
  if (Math.abs(value) >= 1000) return `${decimal(value / 1000)} kΩ`;
  return `${decimal(value)} Ω`;
}

function power(value: number) {
  if (Math.abs(value) < 0.001) return `${decimal(value * 1_000_000)} µW`;
  if (Math.abs(value) < 1) return `${decimal(value * 1000)} mW`;
  return `${decimal(value)} W`;
}

function time(value: number) {
  if (Math.abs(value) < 0.000001) return `${decimal(value * 1_000_000_000)} ns`;
  if (Math.abs(value) < 0.001) return `${decimal(value * 1_000_000)} µs`;
  if (Math.abs(value) < 1) return `${decimal(value * 1000)} ms`;
  return `${decimal(value)} s`;
}

function frequency(value: number) {
  const magnitude = Math.abs(value);
  if (magnitude < 0.001) return `${decimal(value * 1_000_000)} µHz`;
  if (magnitude < 1) return `${decimal(value * 1000)} mHz`;
  if (magnitude >= 1_000_000) return `${decimal(value / 1_000_000)} MHz`;
  if (magnitude >= 1000) return `${decimal(value / 1000)} kHz`;
  return `${decimal(value)} Hz`;
}

type Result = { title: string; detail: string; error?: boolean; idle?: boolean };

const readyResult: Result = {
  title: 'Ready when you are.',
  detail: 'Example values are prefilled. Adjust them or select Calculate to try the sample.',
  idle: true,
};

export function EngineeringToolkit() {
  const [active, setActive] = useState<ToolKey>('ohms');
  const [result, setResult] = useState<Result>(readyResult);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const toolButtons = useRef<Array<HTMLButtonElement | null>>([]);
  const copyTimer = useRef<number | null>(null);
  const info = useMemo(() => formulaInfo[active], [active]);

  useEffect(() => () => {
    if (copyTimer.current !== null) window.clearTimeout(copyTimer.current);
  }, []);

  function resetCopyFeedback() {
    if (copyTimer.current !== null) window.clearTimeout(copyTimer.current);
    copyTimer.current = null;
    setCopyState('idle');
  }

  function chooseTool(key: ToolKey) {
    setActive(key);
    resetCopyFeedback();
    setResult(readyResult);
  }

  function showResult(nextResult: Result) {
    resetCopyFeedback();
    setResult(nextResult);
  }

  function markChanged() {
    resetCopyFeedback();
    setResult({ title: 'Values updated.', detail: 'Select Calculate to refresh the result.', idle: true });
  }

  function handleToolKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tools.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tools.length) % tools.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tools.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    chooseTool(tools[nextIndex].key);
    window.requestAnimationFrame(() => toolButtons.current[nextIndex]?.focus());
  }

  async function copyResult() {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(`${result.title} — ${result.detail}`);
      setCopyState('copied');
      if (copyTimer.current !== null) window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => {
        setCopyState('idle');
        copyTimer.current = null;
      }, 1600);
    } catch {
      setCopyState('failed');
      if (copyTimer.current !== null) window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => {
        setCopyState('idle');
        copyTimer.current = null;
      }, 2200);
    }
  }

  return (
    <>
      <section className="toolkit-app" aria-labelledby="toolkit-title">
        <div className="toolkit-topbar shell">
          <div><p className="eyebrow"><span /> Browser app · v1.0</p><h1 id="toolkit-title">Engineering Toolkit</h1></div>
          <p>Transparent circuit checks with visible formulas, practical units, and local-only processing.</p>
          <span className="toolkit-online"><i /> 4 live tools</span>
        </div>

        <div className="toolkit-workspace shell">
          <aside className="tool-rail" role="tablist" aria-label="Calculator selection">
            <p>Choose a tool</p>
            {tools.map((tool, index) => (
              <button
                ref={(button) => { toolButtons.current[index] = button; }}
                id={`tool-tab-${tool.key}`}
                className={active === tool.key ? 'is-active' : undefined}
                type="button"
                role="tab"
                aria-selected={active === tool.key}
                aria-controls="tool-panel"
                tabIndex={active === tool.key ? 0 : -1}
                key={tool.key}
                onClick={() => chooseTool(tool.key)}
                onKeyDown={(event) => handleToolKeyDown(event, index)}
              >
                <span>{tool.number}</span><strong>{tool.name}</strong><small>{tool.short}</small><b aria-hidden="true">→</b>
              </button>
            ))}
          </aside>

          <div className="tool-canvas" id="tool-panel" role="tabpanel" tabIndex={0} aria-labelledby={`tool-tab-${active}`}>
            <div className="canvas-heading"><div><span>Active calculator</span><h2>{tools.find((tool) => tool.key === active)?.name}</h2></div><span className="local-badge">Runs locally</span></div>
            {active === 'ohms' && <OhmsForm onResult={showResult} onInput={markChanged} />}
            {active === 'divider' && <DividerForm onResult={showResult} onInput={markChanged} />}
            {active === 'led' && <LedForm onResult={showResult} onInput={markChanged} />}
            {active === 'rc' && <RcForm onResult={showResult} onInput={markChanged} />}

            <div id="tool-result" className={`${result.error ? 'tool-result is-error' : 'tool-result'}${result.idle ? ' is-idle' : ''}`} role={result.error ? 'alert' : result.idle ? undefined : 'status'}>
              <span className="result-icon" aria-hidden="true">{result.error ? '!' : result.idle ? '→' : '✓'}</span>
              <div><span>{result.error ? 'Input check' : result.idle ? 'Next step' : 'Calculated result'}</span><strong>{result.title}</strong><p>{result.detail}</p></div>
              {!result.error && !result.idle && <button className={copyState === 'copied' ? 'is-copied' : undefined} type="button" onClick={copyResult}>{copyState === 'copied' ? 'Copied ✓' : copyState === 'failed' ? 'Copy failed' : 'Copy result'}</button>}
            </div>
          </div>

          <aside className="formula-panel">
            <p>Formula</p>
            <code>{info.formula}</code>
            <div><span>Model assumptions</span><ul>{info.assumptions.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <p className="formula-note">{info.note}</p>
          </aside>
        </div>
      </section>

      <section className="toolkit-about shell">
        <p className="eyebrow"><span /> Why I built it</p>
        <div><h2>Fast answers are better when the math stays visible.</h2><p>This app is a software companion to my hardware portfolio. It turns common circuit formulas into quick, readable checks without hiding the assumptions behind the result.</p></div>
        <dl><div><dt>01</dt><dd><strong>Defensive inputs</strong><span>Clear errors instead of silent bad math.</span></dd></div><div><dt>02</dt><dd><strong>Engineering units</strong><span>Automatic µ, m, k, and M formatting.</span></dd></div><div><dt>03</dt><dd><strong>Visible models</strong><span>Formulas and assumptions stay next to the result.</span></dd></div></dl>
      </section>

      <section className="toolkit-roadmap">
        <div className="shell roadmap-grid"><div><p className="eyebrow"><span /> Roadmap</p><h2>Next useful tools.</h2></div><div><article><span>Next</span><h3>Battery runtime</h3><p>Capacity, load, derating, and estimated usable time.</p></article><article><span>Next</span><h3>Voltage drop</h3><p>Wire resistance and conductor-loss estimates for low-voltage builds.</p></article><article><span>Later</span><h3>Unit conversion</h3><p>A focused electrical and mechanical conversion workspace.</p></article></div></div>
      </section>

      <section className="toolkit-disclaimer shell"><strong>Engineering estimate only.</strong><p>Results use idealized models for preliminary checks. Verify tolerances, ratings, temperature effects, loading, and manufacturer data before building hardware. Not intended for mains, high-voltage, or safety-critical design.</p></section>
    </>
  );
}

function Field({ label, unit, name, defaultValue, placeholder, disabled = false, integer = false }: { label: string; unit: string; name: string; defaultValue?: string; placeholder?: string; disabled?: boolean; integer?: boolean }) {
  return (
    <label className={disabled ? 'tool-field is-disabled' : 'tool-field'}>
      <span>{label}</span>
      <div>
        <input
          type="text"
          inputMode={integer ? 'numeric' : 'text'}
          autoComplete="off"
          spellCheck={false}
          name={name}
          defaultValue={defaultValue}
          placeholder={disabled ? 'Calculated' : placeholder ?? '—'}
          aria-label={`${label} in ${unit}`}
          aria-describedby="tool-result"
          disabled={disabled}
        />
        <b>{unit}</b>
      </div>
    </label>
  );
}

function FormActions() {
  return <div className="tool-actions"><button type="submit">Calculate result <span aria-hidden="true">→</span></button><button type="reset">Reset example</button></div>;
}

type ToolFormProps = { onResult: (result: Result) => void; onInput: () => void };

function handleFormInput(event: FormEvent<HTMLFormElement>, onInput: () => void) {
  if (event.target instanceof HTMLInputElement) event.target.removeAttribute('aria-invalid');
  onInput();
}

function clearInvalid(form: HTMLFormElement) {
  form.querySelectorAll('input[aria-invalid="true"]').forEach((input) => input.removeAttribute('aria-invalid'));
}

function flagInvalid(form: HTMLFormElement, names: string[]) {
  clearInvalid(form);
  const inputs = names
    .map((name) => form.elements.namedItem(name))
    .filter((input): input is HTMLInputElement => input instanceof HTMLInputElement && !input.disabled);
  inputs.forEach((input) => input.setAttribute('aria-invalid', 'true'));
  inputs[0]?.focus();
}

function OhmsForm({ onResult, onInput }: ToolFormProps) {
  const [solveFor, setSolveFor] = useState<'voltage' | 'current' | 'resistance'>('current');

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const v = number(String(form.get('voltage') ?? ''));
    const i = number(String(form.get('current') ?? ''));
    const r = number(String(form.get('resistance') ?? ''));
    const values = [['voltage', v], ['current', i], ['resistance', r]] as const;
    const notNumeric = values.filter(([, value]) => Number.isNaN(value)).map(([name]) => name);
    if (notNumeric.length) {
      flagInvalid(formElement, notNumeric);
      return onResult({ title: 'Check the highlighted value.', detail: 'Use a number or an engineering shortcut such as 4.7k or 50m.', error: true });
    }
    if ([v, i, r].filter((value) => value !== null).length !== 2) {
      flagInvalid(formElement, values.filter(([, value]) => value === null).map(([name]) => name));
      return onResult({ title: 'Enter both known values.', detail: 'The selected result field is calculated automatically.', error: true });
    }
    const nonPositive = values.filter(([, value]) => value !== null && value <= 0).map(([name]) => name);
    if (nonPositive.length) {
      flagInvalid(formElement, nonPositive);
      return onResult({ title: 'Values must be positive.', detail: 'This calculator works with positive DC magnitudes.', error: true });
    }
    clearInvalid(formElement);
    if (v === null && i && r) { const solved = i * r; return onResult({ title: `Voltage = ${voltage(solved)}`, detail: `${current(i)} × ${resistance(r)} = ${voltage(solved)} · P = ${power(solved * i)}` }); }
    if (i === null && v && r) { const solved = v / r; return onResult({ title: `Current = ${current(solved)}`, detail: `${voltage(v)} ÷ ${resistance(r)} = ${current(solved)} · P = ${power(v * solved)}` }); }
    if (r === null && v && i) { const solved = v / i; return onResult({ title: `Resistance = ${resistance(solved)}`, detail: `${voltage(v)} ÷ ${current(i)} = ${resistance(solved)} · P = ${power(v * i)}` }); }
  }
  return <form className="tool-form" onSubmit={calculate} onInput={(event) => handleFormInput(event, onInput)} onReset={(event) => { clearInvalid(event.currentTarget); setSolveFor('current'); onResult(readyResult); }}><div className="form-guide"><p><strong>Choose what to calculate,</strong> then enter the other two values. Shortcuts like 4.7k and 50m work.</p><label>Calculate <select value={solveFor} onChange={(event) => { setSolveFor(event.target.value as typeof solveFor); onInput(); }}><option value="voltage">Voltage (V)</option><option value="current">Current (I)</option><option value="resistance">Resistance (R)</option></select></label></div><div className="tool-fields"><Field key={`${solveFor}-voltage`} label="Voltage" unit="V" name="voltage" defaultValue={solveFor === 'voltage' ? undefined : '12'} disabled={solveFor === 'voltage'} /><Field key={`${solveFor}-current`} label="Current" unit="A" name="current" defaultValue={solveFor === 'current' ? undefined : '0.05'} disabled={solveFor === 'current'} /><Field key={`${solveFor}-resistance`} label="Resistance" unit="Ω" name="resistance" defaultValue={solveFor === 'resistance' ? undefined : '220'} disabled={solveFor === 'resistance'} /></div><FormActions /></form>;
}

function DividerForm({ onResult, onInput }: ToolFormProps) {
  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const formElement = event.currentTarget; const form = new FormData(formElement); const vin = number(String(form.get('vin'))); const r1 = number(String(form.get('r1'))); const r2 = number(String(form.get('r2')));
    const values = [['vin', vin], ['r1', r1], ['r2', r2]] as const;
    const invalid = values.filter(([, value]) => typeof value !== 'number' || !Number.isFinite(value) || value <= 0).map(([name]) => name);
    if (invalid.length) { flagInvalid(formElement, invalid); return onResult({ title: 'Check the highlighted values.', detail: 'Source voltage, R₁, and R₂ must all be positive.', error: true }); }
    clearInvalid(formElement);
    const output = (vin as number) * (r2 as number) / ((r1 as number) + (r2 as number)); const amps = (vin as number) / ((r1 as number) + (r2 as number));
    onResult({ title: `Output = ${voltage(output)}`, detail: `${voltage(vin as number)} × ${resistance(r2 as number)} ÷ (${resistance(r1 as number)} + ${resistance(r2 as number)}) · Divider current = ${current(amps)}` });
  }
  return <form className="tool-form" onSubmit={calculate} onInput={(event) => handleFormInput(event, onInput)} onReset={(event) => { clearInvalid(event.currentTarget); onResult(readyResult); }}><div className="form-guide"><p><strong>Ideal unloaded divider.</strong> Enter both resistors in ohms; shortcuts like 10k work.</p></div><div className="tool-fields"><Field label="Source voltage" unit="V" name="vin" defaultValue="12" /><Field label="R₁" unit="Ω" name="r1" defaultValue="10k" /><Field label="R₂" unit="Ω" name="r2" defaultValue="10k" /></div><FormActions /></form>;
}

function LedForm({ onResult, onInput }: ToolFormProps) {
  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const formElement = event.currentTarget; const form = new FormData(formElement); const supply = number(String(form.get('supply'))); const forward = number(String(form.get('forward'))); const milliamps = number(String(form.get('milliamps')), 1e-3); const count = number(String(form.get('count')));
    const values = [['supply', supply], ['forward', forward], ['milliamps', milliamps], ['count', count]] as const;
    const invalid = values.filter(([, value]) => typeof value !== 'number' || !Number.isFinite(value) || value <= 0).map(([name]) => name);
    if (invalid.length) { flagInvalid(formElement, invalid); return onResult({ title: 'Check the highlighted values.', detail: 'Supply, forward voltage, current, and LED count must all be positive.', error: true }); }
    if (!Number.isInteger(count)) { flagInvalid(formElement, ['count']); return onResult({ title: 'LED count must be whole.', detail: 'Use 1, 2, 3, and so on.', error: true }); }
    const drop = (supply as number) - (forward as number) * (count as number); if (drop <= 0) { flagInvalid(formElement, ['supply']); return onResult({ title: 'Supply voltage is too low.', detail: 'It must exceed the total LED forward voltage.', error: true }); }
    clearInvalid(formElement);
    const amps = (milliamps as number) / 1000; const ohms = drop / amps;
    onResult({ title: `Resistor = ${resistance(ohms)}`, detail: `${voltage(drop)} ÷ ${current(amps)} = ${resistance(ohms)} · Dissipation = ${power(amps * amps * ohms)}. Choose a standard value and rating with margin.` });
  }
  return <form className="tool-form" onSubmit={calculate} onInput={(event) => handleFormInput(event, onInput)} onReset={(event) => { clearInvalid(event.currentTarget); onResult(readyResult); }}><div className="form-guide"><p><strong>Series LED estimate.</strong> Use the datasheet forward voltage and choose a current with margin.</p></div><div className="tool-fields tool-fields-four"><Field label="Supply" unit="V" name="supply" defaultValue="12" /><Field label="LED forward" unit="V" name="forward" defaultValue="2" /><Field label="Target current" unit="mA" name="milliamps" defaultValue="20" /><Field label="LED count" unit="LEDs" name="count" defaultValue="3" integer /></div><FormActions /></form>;
}

function RcForm({ onResult, onInput }: ToolFormProps) {
  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const formElement = event.currentTarget; const form = new FormData(formElement); const r = number(String(form.get('resistance'))); const microfarads = number(String(form.get('capacitance')), 1e-6);
    const values = [['resistance', r], ['capacitance', microfarads]] as const;
    const invalid = values.filter(([, value]) => typeof value !== 'number' || !Number.isFinite(value) || value <= 0).map(([name]) => name);
    if (invalid.length) { flagInvalid(formElement, invalid); return onResult({ title: 'Check the highlighted values.', detail: 'Resistance and capacitance must both be positive.', error: true }); }
    clearInvalid(formElement);
    const tau = (r as number) * (microfarads as number) / 1_000_000; const cutoff = 1 / (2 * Math.PI * tau);
    onResult({ title: `τ = ${time(tau)}`, detail: `${resistance(r as number)} × ${decimal(microfarads as number)} µF · 5τ = ${time(tau * 5)} · Ideal cutoff = ${frequency(cutoff)}` });
  }
  return <form className="tool-form" onSubmit={calculate} onInput={(event) => handleFormInput(event, onInput)} onReset={(event) => { clearInvalid(event.currentTarget); onResult(readyResult); }}><div className="form-guide"><p><strong>Ideal first-order RC network.</strong> Shortcuts like 10k and 100n are supported.</p></div><div className="tool-fields"><Field label="Resistance" unit="Ω" name="resistance" defaultValue="10k" /><Field label="Capacitance" unit="µF" name="capacitance" defaultValue="10" /></div><FormActions /></form>;
}
