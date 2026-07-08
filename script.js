// Sebastian Keltz Portfolio JavaScript
// Keep this file small for GitHub Pages. It controls the mobile menu,
// active navigation state, scroll reveal, current year, and image placeholders.

document.documentElement.classList.add("js-enabled");

const body = document.body;
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");
const currentYear = document.querySelector("[data-current-year]");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;

    body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
  });
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  const href = link.getAttribute("href");

  if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) return;

  try {
    const currentPath = window.location.pathname.replace(/\\/g, "/");
    const targetPath = new URL(href, window.location.href).pathname.replace(/\\/g, "/");
    const currentFile = currentPath.split("/").pop() || "index.html";
    const targetFile = targetPath.split("/").pop() || "index.html";
    const isProjectDetail = currentPath.includes("/projects/") && targetFile === "projects.html";
    const isCourseworkDetail = currentPath.includes("/coursework/") && targetFile === "academic.html";

    if (currentFile === targetFile || isProjectDetail || isCourseworkDetail) {
      link.classList.add("is-active");
    }
  } catch (error) {
    // If URL parsing is unavailable, the link still works without active styling.
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  body.classList.remove("nav-open");
  if (navToggle) {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
  }
});

// PHOTO PLACEHOLDERS:
// Each .image-slot has an img pointing to assets/your-file.jpg.
// If the file exists, the real image fades in.
// If it does not exist yet, the slot stays as a clean placeholder with the filename.
document.querySelectorAll(".image-slot").forEach((slot) => {
  const image = slot.querySelector("img");

  if (!image) return;

  const markLoaded = () => {
    slot.classList.add("has-image");
    slot.classList.remove("missing-image");
  };

  const markMissing = () => {
    slot.classList.add("missing-image");
    slot.classList.remove("has-image");
    image.setAttribute("aria-hidden", "true");
  };

  if (image.complete) {
    if (image.naturalWidth > 0) {
      markLoaded();
    } else {
      markMissing();
    }
  }

  image.addEventListener("load", markLoaded);
  image.addEventListener("error", markMissing);
});

const revealItems = document.querySelectorAll(".reveal");

const revealVisibleItems = () => {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  revealItems.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;

    if (itemTop < viewportHeight * 0.95) {
      item.classList.add("is-visible");
    }
  });
};

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

revealVisibleItems();
window.addEventListener("load", revealVisibleItems);
window.setTimeout(revealVisibleItems, 350);

const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

if ("IntersectionObserver" in window && sections.length && navAnchors.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        navAnchors.forEach((link) => link.classList.remove("is-active"));

        if (activeLink) {
          activeLink.classList.add("is-active");
        }
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0.01
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

const calculatorForms = document.querySelectorAll("[data-calculator-form]");

const calculatorDefaultMessages = {
  ohms: "Enter any two values to solve for the third.",
  "voltage-divider": "Output voltage is measured across R2.",
  "led-resistor": "Result includes resistor value and estimated resistor power.",
  "rc-time": "Time constant equals resistance multiplied by capacitance."
};

const getCalculatorValue = (form, name) => {
  const input = form.querySelector(`[name="${name}"]`);

  if (!input || input.value.trim() === "") return null;

  const value = Number(input.value);
  return Number.isFinite(value) ? value : NaN;
};

const isPositiveNumber = (value) => Number.isFinite(value) && value > 0;

const formatDecimal = (value) => {
  if (!Number.isFinite(value)) return "0";

  const absoluteValue = Math.abs(value);

  if (absoluteValue > 0 && (absoluteValue >= 100000 || absoluteValue < 0.001)) {
    return value.toExponential(3);
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 4
  }).format(value);
};

const formatVoltage = (volts) => {
  const absoluteValue = Math.abs(volts);

  if (absoluteValue > 0 && absoluteValue < 1) {
    return `${formatDecimal(volts * 1000)} mV`;
  }

  return `${formatDecimal(volts)} V`;
};

const formatCurrent = (amps) => {
  const absoluteValue = Math.abs(amps);

  if (absoluteValue > 0 && absoluteValue < 0.001) {
    return `${formatDecimal(amps * 1000000)} uA`;
  }

  if (absoluteValue > 0 && absoluteValue < 1) {
    return `${formatDecimal(amps * 1000)} mA`;
  }

  return `${formatDecimal(amps)} A`;
};

const formatResistance = (ohms) => {
  const absoluteValue = Math.abs(ohms);

  if (absoluteValue >= 1000000) {
    return `${formatDecimal(ohms / 1000000)} Mohms`;
  }

  if (absoluteValue >= 1000) {
    return `${formatDecimal(ohms / 1000)} kohms`;
  }

  return `${formatDecimal(ohms)} ohms`;
};

const formatPower = (watts) => {
  const absoluteValue = Math.abs(watts);

  if (absoluteValue > 0 && absoluteValue < 0.001) {
    return `${formatDecimal(watts * 1000000)} uW`;
  }

  if (absoluteValue > 0 && absoluteValue < 1) {
    return `${formatDecimal(watts * 1000)} mW`;
  }

  return `${formatDecimal(watts)} W`;
};

const formatTime = (seconds) => {
  const absoluteValue = Math.abs(seconds);

  if (absoluteValue > 0 && absoluteValue < 0.000001) {
    return `${formatDecimal(seconds * 1000000000)} ns`;
  }

  if (absoluteValue > 0 && absoluteValue < 0.001) {
    return `${formatDecimal(seconds * 1000000)} us`;
  }

  if (absoluteValue > 0 && absoluteValue < 1) {
    return `${formatDecimal(seconds * 1000)} ms`;
  }

  return `${formatDecimal(seconds)} s`;
};

const setCalculatorResult = (form, message, isError = false) => {
  const card = form.closest(".calculator-tool-card");
  const result = card ? card.querySelector("[data-calculator-result]") : null;

  if (!result) return;

  result.innerHTML = message;
  result.classList.toggle("is-error", isError);
};

const showCalculatorError = (form, message) => {
  setCalculatorResult(form, `<strong>Check the inputs.</strong><span>${message}</span>`, true);
};

const calculateOhmsLaw = (form) => {
  const voltage = getCalculatorValue(form, "voltage");
  const current = getCalculatorValue(form, "current");
  const resistance = getCalculatorValue(form, "resistance");
  const values = [voltage, current, resistance];

  if (values.some((value) => Number.isNaN(value))) {
    showCalculatorError(form, "Use numbers only.");
    return;
  }

  const filledCount = values.filter((value) => value !== null).length;

  if (filledCount < 2) {
    showCalculatorError(form, "Enter at least two values.");
    return;
  }

  if (voltage === null) {
    if (!isPositiveNumber(current) || !isPositiveNumber(resistance)) {
      showCalculatorError(form, "Current and resistance must be greater than zero.");
      return;
    }

    const solvedVoltage = current * resistance;
    setCalculatorResult(
      form,
      `<strong>Voltage = ${formatVoltage(solvedVoltage)}</strong><span>Formula: V = I x R</span>`
    );
    return;
  }

  if (current === null) {
    if (!isPositiveNumber(voltage) || !isPositiveNumber(resistance)) {
      showCalculatorError(form, "Voltage and resistance must be greater than zero.");
      return;
    }

    const solvedCurrent = voltage / resistance;
    setCalculatorResult(
      form,
      `<strong>Current = ${formatCurrent(solvedCurrent)}</strong><span>Formula: I = V / R</span>`
    );
    return;
  }

  if (resistance === null) {
    if (!isPositiveNumber(voltage) || !isPositiveNumber(current)) {
      showCalculatorError(form, "Voltage and current must be greater than zero.");
      return;
    }

    const solvedResistance = voltage / current;
    setCalculatorResult(
      form,
      `<strong>Resistance = ${formatResistance(solvedResistance)}</strong><span>Formula: R = V / I</span>`
    );
    return;
  }

  if (!isPositiveNumber(voltage) || !isPositiveNumber(current) || !isPositiveNumber(resistance)) {
    showCalculatorError(form, "All values must be greater than zero.");
    return;
  }

  const expectedVoltage = current * resistance;
  const power = voltage * current;

  setCalculatorResult(
    form,
    `<strong>Check: I x R = ${formatVoltage(expectedVoltage)}</strong><span>Power from your voltage and current: ${formatPower(power)}</span>`
  );
};

const calculateVoltageDivider = (form) => {
  const sourceVoltage = getCalculatorValue(form, "sourceVoltage");
  const r1 = getCalculatorValue(form, "r1");
  const r2 = getCalculatorValue(form, "r2");

  if ([sourceVoltage, r1, r2].some((value) => Number.isNaN(value))) {
    showCalculatorError(form, "Use numbers only.");
    return;
  }

  if (!isPositiveNumber(sourceVoltage) || !isPositiveNumber(r1) || !isPositiveNumber(r2)) {
    showCalculatorError(form, "Source voltage, R1, and R2 must be greater than zero.");
    return;
  }

  const totalResistance = r1 + r2;
  const outputVoltage = sourceVoltage * (r2 / totalResistance);
  const dividerCurrent = sourceVoltage / totalResistance;

  setCalculatorResult(
    form,
    `<strong>Output voltage = ${formatVoltage(outputVoltage)}</strong><span>Divider current = ${formatCurrent(dividerCurrent)}. Formula: Vout = Vin x R2 / (R1 + R2)</span>`
  );
};

const calculateLedResistor = (form) => {
  const supplyVoltage = getCalculatorValue(form, "supplyVoltage");
  const forwardVoltage = getCalculatorValue(form, "forwardVoltage");
  const ledCurrent = getCalculatorValue(form, "ledCurrent");
  const ledCount = getCalculatorValue(form, "ledCount");

  if ([supplyVoltage, forwardVoltage, ledCurrent, ledCount].some((value) => Number.isNaN(value))) {
    showCalculatorError(form, "Use numbers only.");
    return;
  }

  if (!isPositiveNumber(supplyVoltage) || !isPositiveNumber(forwardVoltage) || !isPositiveNumber(ledCurrent)) {
    showCalculatorError(form, "Supply voltage, LED voltage, and LED current must be greater than zero.");
    return;
  }

  if (!Number.isInteger(ledCount) || ledCount < 1) {
    showCalculatorError(form, "LED count must be a whole number of 1 or more.");
    return;
  }

  const totalLedVoltage = forwardVoltage * ledCount;
  const resistorVoltage = supplyVoltage - totalLedVoltage;

  if (resistorVoltage <= 0) {
    showCalculatorError(form, "The supply voltage must be higher than the total LED forward voltage.");
    return;
  }

  const currentAmps = ledCurrent / 1000;
  const resistance = resistorVoltage / currentAmps;
  const resistorPower = currentAmps * currentAmps * resistance;

  setCalculatorResult(
    form,
    `<strong>Resistor = ${formatResistance(resistance)}</strong><span>Estimated resistor power = ${formatPower(resistorPower)}. Use a resistor wattage rating above this value.</span>`
  );
};

const calculateRcTime = (form) => {
  const resistance = getCalculatorValue(form, "resistance");
  const capacitance = getCalculatorValue(form, "capacitance");

  if ([resistance, capacitance].some((value) => Number.isNaN(value))) {
    showCalculatorError(form, "Use numbers only.");
    return;
  }

  if (!isPositiveNumber(resistance) || !isPositiveNumber(capacitance)) {
    showCalculatorError(form, "Resistance and capacitance must be greater than zero.");
    return;
  }

  const capacitanceFarads = capacitance / 1000000;
  const timeConstant = resistance * capacitanceFarads;
  const fiveTimeConstants = timeConstant * 5;
  const cutoffFrequency = 1 / (2 * Math.PI * timeConstant);

  setCalculatorResult(
    form,
    `<strong>Time constant = ${formatTime(timeConstant)}</strong><span>About 5 time constants = ${formatTime(fiveTimeConstants)}. RC cutoff estimate = ${formatDecimal(cutoffFrequency)} Hz.</span>`
  );
};

const calculatorHandlers = {
  ohms: calculateOhmsLaw,
  "voltage-divider": calculateVoltageDivider,
  "led-resistor": calculateLedResistor,
  "rc-time": calculateRcTime
};

calculatorForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const calculatorType = form.dataset.calculator;
    const handler = calculatorHandlers[calculatorType];

    if (handler) {
      handler(form);
    }
  });

  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      const calculatorType = form.dataset.calculator;
      setCalculatorResult(form, calculatorDefaultMessages[calculatorType] || "", false);
    }, 0);
  });
});

window.addEventListener("resize", () => {
  if (!header || window.innerWidth <= 860) return;

  body.classList.remove("nav-open");
  if (navToggle) {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
  }
});
