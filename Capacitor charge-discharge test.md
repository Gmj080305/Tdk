# A Comprehensive Comparative Analysis of Electromechanical and Solid-State Switching Technologies for High-Accuracy Transient Capacitor Charge-Discharge Testing

---

## Abstract

The high-fidelity extraction of transient parameters—such as equivalent series resistance (ESR), equivalent series inductance (ESL), capacitance degradation, and localized heating profiles—requires non-intrusive, ultra-fast charge-discharge testing circuits. This study presents a comparative evaluation of eight electromechanical and solid-state switching technologies integrated into a sequential charge-saturation-isolation-discharge loop. The switches evaluated include mercury-wetted mechanical relays, silicon power MOSFETs, gallium nitride (GaN) HEMTs, coaxial instrument-grade reed relays, IGBTs, SCRs, triggered gas-discharge spark gaps (TSGs), and high-vacuum mechanical interrupters.

Each technology is analyzed with respect to its physics of operation, high-speed switching profiles, power handling capability, and electromagnetic interference footprint. Physical constraints such as mechanical contact bounce, prestrike ionization, carrier injection delays, gate-drain Miller charge feedback, package parasitics, and common-source degeneration are evaluated. Instrumentation layout techniques including Kelvin sensing, coaxial termination impedance matching, active probe loading mitigation, and TDR calibration are detailed. These findings establish definitive selection boundaries for aerospace, automotive, utility-scale power systems, and ATE applications.

---

## 1. Introduction

High-accuracy capacitor charge-discharge testing is vital for qualifying energy-storage devices, evaluating dielectric material degradation, and ensuring structural integrity of safety-critical electronic systems. Modern transient power systems—ranging from milliwatt-level deep-space capacitive sensors to multi-megawatt EV charging nodes—rely on capacitors that must survive severe pulsed current stresses. Test systems must capture ultra-fast transient discharge waveforms with microsecond to sub-nanosecond resolution.

The fundamental challenge is minimizing equipment-induced loading. Any switching device in the current path introduces non-zero parasitic inductance ($L_\text{parasitic}$), parasitic capacitance ($C_\text{parasitic}$), and finite conduction resistance ($R_\text{on}$). Mechanical switches suffer contact bounce and pre-contact arcing. Solid-state alternatives introduce parasitic junction capacitances ($C_\text{oss}$, $C_\text{ies}$) and carrier recombination delays, limiting maximum $dv/dt$ and $di/dt$.

Extreme thermal and environmental conditions further vary physical parameters—e.g., ESR of aluminum electrolytics increases dramatically below 0 °C. This underscores the need for stable, low-parasitic, repeatable switching topologies.

---

## 2. Circuit Topology & System Architecture

The transient test circuit operates through a tightly coordinated sequential execution loop: charge the DUT to saturation → isolate from source → initiate high-speed discharge into a matched coaxial load.

```
              Phase 1: Charge
                    │
              Phase 2: Isolate
                    │
                    ├──────────────┐
                    ▼              │
              Phase 3: Couple      │
                    ▲              │
                    │              ▼
              Phase 4: Discharge
                    │
                    ▼
              Phase 5: Acquire
```

**Phase 1 — Charge-Saturation:** Primary isolation switch closes; stable low-noise voltage source charges DUT to target potential. Advanced systems use 50 kHz series-resonant H-bridge inverters for 0.1% voltage regulation.

**Phase 2 — Source-Isolation:** Primary isolation switch opens, physically decoupling the voltage source from the discharge path.

**Phase 3 — Sequential Coupling:** Microsecond-scale dead-time delay prevents shoot-through before the secondary discharge switch receives its close command.

**Phase 4 — Ultra-Fast Discharge:** Secondary switch transitions to full conduction; DUT discharges through a non-inductive current-viewing resistor (CVR) or coaxial load.

**Phase 5 — Parametric Acquisition:** High-bandwidth DSO captures the transient. System continuously monitors temperature rise, capacitance drift, and dissipation factor.

### RLC Discharge Model

The discharge loop is modeled as a source-free lumped-element series RLC circuit:

$$L_\text{total} \frac{d^2 i(t)}{dt^2} + R_\text{total} \frac{di(t)}{dt} + \frac{1}{C_\text{DUT}} i(t) = 0$$

Where:

$$L_\text{total} = L_\text{ESL} + L_\text{switch} + L_\text{trace}$$

$$R_\text{total} = R_\text{ESR} + R_\text{switch} + R_\text{load}$$

Dynamic response parameters:

$$\alpha = \frac{R_\text{total}}{2 L_\text{total}}, \qquad \omega_0 = \frac{1}{\sqrt{L_\text{total} C_\text{DUT}}}$$

**Damping regimes:**

| Regime | Condition | Current Expression |
|---|---|---|
| Over-damped | $\alpha > \omega_0$ | $i(t) = \frac{V_0}{2\beta L_\text{total}}\left(e^{-(\alpha-\beta)t} - e^{-(\alpha+\beta)t}\right),\quad \beta=\sqrt{\alpha^2-\omega_0^2}$ |
| Under-damped | $\alpha < \omega_0$ | $i(t) = \frac{V_0}{\omega_d L_\text{total}}e^{-\alpha t}\sin(\omega_d t),\quad \omega_d=\sqrt{\omega_0^2-\alpha^2}$ |
| Critically-damped | $\alpha = \omega_0$ | $i(t) = \frac{V_0}{L_\text{total}} t\, e^{-\alpha t}$ |

Software algorithms fit these second-order models to measured data to extract precise ESR, ESL, and capacitance.

---

## 3. Evaluation of Practical Switching Methodologies

### 3.1 Mercury-Wetted Relays

Liquid mercury is drawn up the contact surfaces via capillary action. Contact is made through coalescence of liquid mercury films rather than solid-metal collision, yielding a completely bounce-free connection.

```
        Coil
 ┌────────────────┐
 │  [======]      │
 ├──┐      │      │
 │Armature ├──────┼──┐
 ├──┘      │  │   │
 │         ▼  ▼   │
 │        Liquid  │  <-- Liquid Mercury Coalescence
 │       Mercury  │
 └─────────▲──────┘
           │
      Mercury Pool
```

**Strengths:** Contact resistance < 50 mΩ, stable over billions of cycles; pulse rise times as fast as 250 ps in matched coaxial lines; zero bounce-induced noise.

**Weaknesses:**
- Max switching frequency ~100–120 Hz (limited by physical mass)
- Orientation-sensitive (must mount within a few degrees of vertical)
- Contact cavity size causes 50 Ω impedance mismatch unless specially designed
- **Obsolete** due to mercury toxicity regulations; restricted in modern ATE

---

### 3.2 Silicon Power MOSFETs

Voltage-controlled channel; switches up to 1.2 kV, tens of amperes pulsed, repeatable rise times of 10–50 ns without mechanical wear.

**Key limitation — Output capacitance ($C_\text{oss}$):**

$$C_\text{oss} = C_\text{ds} + C_\text{gd}$$

Parasitic energy stored during charge phase:

$$E_\text{parasitic} = \frac{1}{2} C_\text{oss} V^2$$

This energy dumps into the load during discharge, distorting waveforms—especially when testing $C_\text{DUT} < 1\text{ nF}$.

**Miller plateau** extends turn-on transition time:

$$t_\text{plateau} = \frac{Q_\text{gd}}{I_\text{source\_driver}}$$

The plateau rounds the initial $di/dt$ slope and distorts the transient wavefront.

---

### 3.3 Gallium Nitride (GaN) HEMTs

Wide-bandgap devices using a 2DEG channel; no physical p-n junction. Gate charge $Q_g$ is ~6× lower than SiC and ~50× lower than silicon MOSFETs.

**Performance benchmarks:**
- GS66508B (low-current): 0.9 ns rise time at 1 A
- GS66516B (high-current): 600 V / 100 A with 2.2–3.86 ns rise time

**Key limitation — Common-source inductance feedback:**

$$V_\text{feedback} = -L_\text{cs} \frac{di_D}{dt}$$

With $di/dt > 100\text{ A/ns}$, even a few nH of stray inductance causes destructive voltage overshoots, shoot-through, or false gate triggering. Layout optimization and Kelvin packaging are mandatory.

---

### 3.4 Instrument-Grade Coaxial Reed Relays

Miniature dry reed switch hermetically sealed in inert gas, enclosed in a continuous grounded coaxial metal shield. Physical dimensions are controlled to maintain $Z_0 = 50\,\Omega$ or $75\,\Omega$ along the entire signal path.

**Strengths:**
- Signal bandwidth: 7–17 GHz
- Rise-time skew: < 30–40 ps (e.g., Standex CRF, Coto B40)
- Off-state parasitic capacitance: < 0.2 pF

**Key limitation — Hot-switching inrush:**

$$I_\text{inrush} = \frac{V_\text{DUT}}{R_\text{contact} + R_\text{trace}}$$

Closing onto a live voltage causes tens of ampere inrush for nanoseconds → contact arcing, carbon deposits, pitting, and eventual micro-welding. **Must be operated cold-switching only** (close before voltage applied; open only after stimulus removed).

---

### 3.5 Insulated Gate Bipolar Transistors (IGBTs)

Hybrid MOS-gate + bipolar drift region. Handles 600 V–6.5 kV, peak currents > 1.5 kA, $V_\text{CE(sat)}$ = 1.5–2.5 V. Standard for utility-scale capacitor bank testing.

```
         Gate
           │
     ┌─────┴─────┐
     │    MOS    │  <-- Voltage-Controlled Channel
     │   Gate    │
     └─────┬─────┘
           │
     ┌─────┴─────┐
     │  Bipolar  │  <-- Minority-Carrier Recombination (Tail Current)
     │   Drift   │
     └─────┬─────┘
           │
       Collector
```

**Key limitations:**
- Turn-on rise time: 100–800 ns (limited by large $C_\text{ies}$ and minority-carrier injection)
- Turn-off **tail current**: minority carriers clear only via natural recombination, distorting waveform tail and causing switching losses
- Inductive overshoot on fast fault shutoff:

$$V_\text{overshoot} = -L_\text{stray} \frac{di_C}{dt}$$

Requires controlled **soft-shutdown** routine, adding system complexity.

---

### 3.6 Silicon Controlled Rectifiers (SCRs)

Four-layer ($PNPN$) latching device. Highest pulsed power ratings among solid-state switches: up to 12 kV / 1.5 kA, peak surge of several kA. Once triggered by a brief gate pulse, regenerative feedback latches the SCR in conduction until current drops below holding current $I_h$.

**Key limitation — Current spreading:**

Conduction initially forms in a localized region adjacent to the gate electrode. Full pellet spreading takes 1–5 µs. If the discharge loop forces rapid $di/dt$ exceeding the spreading velocity, localized current density causes **thermal runaway**.

Mitigation requires either:
- Restricting peak $di/dt$, or
- High-amplitude gate trigger (250–500 mA, rise time < 1 µs) for forced uniform conduction

This slow spreading phase significantly deforms the rising edge, making SCRs **unsuitable for sub-microsecond signal integrity studies**.

---

### 3.7 Gas Discharge Tubes (GDTs) & Triggered Spark Gaps (TSGs)

Gas ionization and plasma formation inside a hermetically sealed ceramic-metal envelope. Off-state insulation resistance: up to $10^{12}\,\Omega$. Beyond Paschen breakdown threshold, Townsend avalanche ionizes gas into conductive plasma with terminal voltage of 20–30 V in < 50 ns.

**TSGs** add a third trigger electrode behind a ceramic barrier. A fast high-voltage trigger pulse initiates a localized spark that rapidly ionizes the main gap, enabling controlled discharge at 40–80% of $V_\text{breakdown}$. TSGs handle 17–32 kV with $dI/dt > 10^9\,\text{A/s}$.

**Key limitations:**
- **Stochastic trigger jitter**: 10–100 ns depending on gas pressure and trigger energy, complicating DSO synchronization
- Plasma arc generates severe RF transients that couple into nearby measurement channels
- Very low repetition rate (gas must fully deionize between shots)

---

### 3.8 High-Vacuum Mechanical Interrupters (VCBs)

CuCr contacts in high-vacuum chamber ($10^{-5}\text{ Pa}$). Closed-state contact resistance < 20 µΩ. Spring-driven actuator closes contacts at 0.6–1.2 m/s.

**Key limitations:**

- **Prestrike arcing**: At 1–3 ms before physical contact, field exceeds vacuum breakdown limit → arc initiates conduction before mechanical touch
- **Mechanical bounce**: 1–8 ms of make-break cycles after contact collision, each drawing a transient vacuum arc that vaporizes CuCr and injects metal-vapor plasma

This combination of prestrike and bounce generates severe high-frequency transient oscillations and voltage spikes that **completely distort the rising edge**. Vacuum interrupters are **highly unsuitable** for precise parametric signal integrity studies.

---

## 4. Comprehensive Comparative Matrix

| Switching Method | Rise Time | Jitter & Bounce | $L_\text{parasitic}$ | $C_\text{parasitic}$ | Max V / I (pulsed) | Waveform Distortion | Feasibility |
|---|---|---|---|---|---|---|---|
| **Mercury-Wetted Relay** | 250 ps – 5 ns | Bounce-free; jitter < 10 ps | 2–5 nH | 1–2 pF | 1 kV / 5 A | Minimal (coaxial match required) | Obsolete; orientation-sensitive |
| **Power MOSFET (Si)** | 10–50 ns | None; jitter < 50 ps | 5–15 nH | 100–500 pF ($C_\text{oss}$) | 1.2 kV / 100 A | Low–Moderate ($Q_g$ plateau) | High; standard lab benchmark |
| **GaN HEMT** | 400 ps – 3.8 ns | None; jitter < 10 ps | < 1 nH (Kelvin pkg) | 5–20 pF ($C_\text{oss}$) | 650 V / 100 A | Extremely Low | High; ideal for ultra-fast testing |
| **Coaxial Reed Relay** | 30–50 ps | Minimal (cold-switch only) | < 0.5 nH | < 0.2 pF | 10 kV / 10 A | Extremely Low (DC–17 GHz BW) | High; standard in ATE |
| **IGBT Module** | 100–800 ns | None; jitter < 100 ps | 10–30 nH | 1–5 nF ($C_\text{ies}$) | 6.5 kV / 1.5 kA | Moderate–High (turn-on delay) | High; standard medium-voltage testing |
| **SCR** | 1–5 µs | None; jitter < 500 ps | 15–40 nH | 2–10 nF | 12 kV / 1.5 kA | High (restricted $di/dt$ spreading) | High; high-energy pulsed power |
| **Triggered Spark Gap** | < 50 ns (transition) | Severe jitter 10–100 ns | 10–50 nH | < 1 pF | 15–32 kV / > 5 kA | High (plasma noise & arcing) | Moderate; extreme HV labs only |
| **Vacuum Interrupter (VCB)** | 40–80 ms closing; < 10 µs discharge | Extreme bounce 1–8 ms | 20–100 nH | 10–50 pF | 40.5 kV / 40 kA | Severe (bounce & prestrike) | High; power distribution grid only |

---

## 5. Minimization of Instrumentation Loading Effects

### 5.1 PCB Layout Optimization and Loop Area Minimization

High $di/dt$ makes any loop area a radiating loop antenna. Stray inductance scales proportionally with enclosed loop area. Mitigation:

- Place forward discharge path directly above return path on adjacent PCB layers (e.g., L1/L2) to maximize mutual inductive cancellation
- Maintain large uninterrupted copper ground planes beneath signal/power layers for low-impedance high-frequency return path

### 5.2 Kelvin Connections and Source Inductance Mitigation

In a standard three-pin package, high-current discharge path and gate-drive return share the same source pin. Rapid $di_D/dt$ across $L_\text{cs}$ induces opposing gate-source voltage, slowing turn-on.

```
  Standard 3-Terminal                 4-Terminal Kelvin
  ┌──────────────┐                   ┌──────────────┐
  │    Drain     │                   │    Drain     │
  └──────┬───────┘                   └──────┬───────┘
         │                                  │
   [GaN Channel]                      [GaN Channel]
         │                                  │
   ┌─────┴─────┐                      ┌─────┴─────┐
   │  Source   ├────┐                 │  Source   ├────┐
   └─────┬─────┘    │                 └─────┬─────┘    │
         │          │                       ├── Power Ground (High Current)
         ▼          ▼                       ▼
   High Power   Gate Drive            High Power
      Loop        Return                 Loop
  (Shared: L_cs in both loops)       (No shared path with gate loop)
```

Use **four-terminal Kelvin packages** (TO-247-4L, TOLL, DFN8×8): dedicated Kelvin source pin connects directly to the die, decoupling the gate-drive loop from the high-power path. Result: switch operates at maximum physical speed with clean discharge transitions.

### 5.3 Coaxial Impedance Matching and Tapered Terminations

For nanosecond/sub-nanosecond rise times, interconnects are distributed-element transmission lines. Impedance mismatch ($Z_L \neq Z_0$) causes reflections:

$$\Gamma = \frac{Z_L - Z_0}{Z_L + Z_0}$$

$$\text{VSWR} = \frac{1 + |\Gamma|}{1 - |\Gamma|}$$

For zero reflections: $\Gamma = 0$, VSWR = 1, requiring matched 50 Ω throughout.

For high-voltage/high-power pulses, standard thin-film resistors are inadequate (parasitic inductance, poor thermal dissipation). Use **low-inductance tubular bulk ceramic** or **CuSO₄ liquid resistors** inside an exponentially tapered coaxial shield:

```
          Exponentially Tapered Metallic Shield
          ┌───────────────────────────┐
          │                           │
50 Ω ────┼─── [Resistive Element] ──┼── GND
Input     │                           │
          └───────────────────────────┘
```

The tapered geometry maintains continuous 50 Ω along the full physical length, absorbing pulse energy without reflections down to sub-nanosecond rise times.

### 5.4 High-Frequency Probe Loading and Active FET Buffering

A standard 10× passive probe: $R_\text{probe} = 10\,\text{M}\Omega$, $C_\text{probe} = 10\text{–}15\,\text{pF}$.

At high frequencies, capacitive reactance drops sharply:

$$X_C = \frac{1}{2\pi f C_\text{probe}}$$

At 500 MHz, 10 pF → $X_C = 31.8\,\Omega$: severely loads high-speed nodes, dampening HF components and rounding transition edges.

**Ground lead inductance problem:**  
Standard long ground clip ≈ 1 nH/mm → 6.5-inch lead ≈ 190 nH. Resonance with probe tip capacitance:

$$f_\text{resonance} = \frac{1}{2\pi\sqrt{L_\text{ground}\, C_\text{probe}}}$$

For $L_\text{ground} = 190\,\text{nH}$, $C_\text{probe} = 13\,\text{pF}$ → resonance ≈ **100 MHz**: any fast edge excites this, producing ringing artifacts on the oscilloscope.

**Solutions:**

| Approach | Input Capacitance | Bandwidth |
|---|---|---|
| Active FET probe (tip-mounted buffer) | < 1–2 pF | Multi-GHz |
| Ultra-short coaxial ground spring | Eliminates $L_\text{ground}$ resonance | — |
| Resistive divider ($450\,\Omega$ + 50 Ω coax) | < 0.5 pF | Multi-GHz |

The resistive divider establishes a stable 500 Ω load across the full frequency range—a practical choice for ultra-high-speed, non-interfering transient measurement.

---

## 6. Conclusion & Engineering Recommendations

| Application | Recommended Switch | Key Considerations |
|---|---|---|
| Sub-ns signal integrity, RF/sensor characterization (low-V) | **Coaxial Reed Relay** | Cold-switch only; 30 ps rise time; < 0.2 pF off-state |
| 50–650 V, ns-range, pulsed laser / EM actuators | **GaN HEMT** | Requires Kelvin packaging, low-inductance layout |
| General lab testing, film/ceramic caps to 1.2 kV | **Silicon Power MOSFET** | Cost-effective; robust; µs-scale adequate |
| Traction drives, hybrid breakers, pulse-forming networks (HV) | **IGBT** (controlled turn-off) or **SCR** (massive energy) | IGBT: soft-shutdown mandatory. SCR: aggressive gate drive to prevent current crowding |
| Ultra-HV discharge (> 15 kV) | **Triggered Spark Gap (TSG)** | Accept 10–100 ns jitter and low rep rate |
| **Avoid** for precision testing | **Vacuum Interrupter (VCB)** | Prestrike arcing + 1–8 ms bounce → unacceptable waveform distortion |
