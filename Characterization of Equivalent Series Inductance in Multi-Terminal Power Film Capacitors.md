# Characterization of Equivalent Series Inductance in Multi-Terminal Power Film Capacitors

**Analytical Modeling, Fixturing, and Solid-State Triggering**

---

## Electromagnetic Scaling and Structural Analysis of Multi-Terminal Paralleling

In high-power electronic systems, characterizing the equivalent series inductance (ESL) of DC-link and snubber film capacitors is critical for managing voltage overshoot during rapid semiconductor switching transitions. When evaluating a four-terminal or multi-terminal film capacitor with same-polarity terminals externally paralleled, a common testing practice involves dividing the total measured loop inductance by a scaling factor of two to back out the nominal inductance of a single terminal or terminal pair. However, the physical and mathematical validity of this scaling factor ($\frac{1}{2}$) is highly dependent on the internal electromagnetic construction of the capacitive element, the spatial arrangement of the internal connections, and the resulting magnetic flux coupling.

---

### Genuinely Independent Internal Windings

In capacitors constructed with multiple separate, physically isolated internal capacitive elements (spatially separated wound bobbins) housed within a single casing, each connected to its own dedicated pair of external terminals, the parallel path model is highly accurate. Because the internal windings are spatially separated, the mutual magnetic coupling between them is negligible ($M \approx 0$). Under these conditions, the total equivalent inductance ($L_{eq}$) of the paralleled arrangement is governed by the standard parallel inductance formula:

$$L_{eq} = \frac{L_1 L_2}{L_1 + L_2}$$

Assuming symmetrical manufacturing where the individual terminal-to-bobbin inductances are identical ($L_1 = L_2 = L_c$), the equation simplifies to:

$$L_{eq} = \frac{L_c}{2} \implies L_c = 2 L_{eq}$$

In this specific architectural scenario, multiplying the total measured loop inductance by two to isolate the single-branch ESL is physically and mathematically justified.

---

### Single Internal Winding with Duplicated External Tabs

In contrast, most commercial box-type film capacitors utilize a single large wound capacitive element. This single winding has a zinc end-spray coating, known as **schoopage**, applied to its faces to weld all internal metallized film turns to a single positive and negative terminal plane. Multiple external pins are then soldered directly to this unified schoopage layer.

Here, the current flowing through the parallel terminals converges onto the same physical metallization layer. Because the external pins are closely spaced and run parallel to one another, they share a highly active electromagnetic boundary. The mutual inductance ($M$) between these adjacent same-polarity conductors is positive and highly significant. The total equivalent inductance of two coupled parallel inductors carrying current in the same direction is defined as:

$$L_{eq} = \frac{L_1 L_2 - M^2}{L_1 + L_2 - 2M}$$

Given symmetrical pins ($L_1 = L_2 = L_{pin}$), the expression reduces to:

$$L_{eq} = \frac{L_{pin}^2 - M^2}{2(L_{pin} - M)} = \frac{L_{pin} + M}{2}$$

Because $M > 0$, the actual equivalent inductance $L_{eq}$ is significantly larger than $\frac{L_{pin}}{2}$. If an engineer assumes $L_{pin} = 2 L_{eq}$, the resulting individual pin inductance will be severely overestimated by ignoring the mutual coupling term $M$. If the terminals are extremely close, the mutual coupling coefficient ($k = \frac{M}{\sqrt{L_1 L_2}}$) approaches unity ($M \approx L_{pin}$), meaning that $L_{eq} \approx L_{pin}$. Under tight coupling, paralleling the terminals yields almost no reduction in lead inductance, and dividing the loop inductance by two is **physically invalid**.

Furthermore, the external connection busbar geometry dominates the overall loop area. When current returns through a parallel plane, the loop inductance is governed by the spacing and the loop area of the opposing electrodes. Simple division by two ignores the fact that the return path loop area is not halved when adding parallel terminals; rather, it is the current density that is redistributed, which alters the high-frequency proximity and skin effects within the conductors.

---

### Standardization and Manufacturer Guidelines

Industry test standards, such as **IEC 61071** (the governing standard for power electronic capacitors), avoid simple proportional scaling rules. IEC 61071 defines the self-inductance ($L_{self}$) as a black-box parameter measured under specified terminal connection conditions, typically evaluating the entire terminal group as a single node rather than attempting to mathematically isolate individual pins.

Manufacturer application notes from **TDK/EPCOS** and **KEMET** emphasize that for multi-terminal film capacitors, the spatial geometry of the external connection busbar dominates the overall inductance. TDK recommends using a laminated coplanar busbar to test multi-terminal capacitors, ensuring that the distance and loop area from the short-circuit point to each terminal pair are identical. Attempting to back out a single-pin ESL without a comprehensive 3D finite element method (FEM) electromagnetic simulation to isolate $M$ is discouraged by component manufacturers.

---

## Design and Optimization of Low-Inductance Test Fixtures and Contact Interfaces

Accurately measuring sub-10 nH inductances in multi-terminal film capacitors requires specialized fixtures that minimize the loop area of the measurement path and ensure highly repeatable contact resistance. At these ultra-low inductance levels, even a millimeter of exposed terminal lead can add approximately $1\ \text{nH}$ of stray inductance, overshadowing the internal ESL of the capacitor under test (DUT).

### Laminated Planar Busbar Fixtures

For both surge discharge testing and impedance analyzer sweeps, labs utilize customized, laminated planar busbars to interface with the capacitor terminals. These fixtures consist of thin, wide copper plates separated by an ultra-thin dielectric insulation layer, such as Kapton or Mylar, often thinner than $100\ \mu\text{m}$. This sandwich structure maximizes the mutual coupling ($M$) between the forward and return current paths, forcing electromagnetic field cancellation and driving the stray loop inductance of the fixture to near-zero levels. In high-power testing, these laminated structures connect directly to the capacitor's terminal geometry, concentrating current injection paths and preventing localized current crowding that artificially inflates ESL measurements.

### Impedance Analyzer Calibration and Contact Interfaces

Instruments like the **Zurich Instruments MFIA** or **Keysight E4990A** require highly specialized four-terminal pair (4TP) fixtures. These setups utilize a custom low-ESL fixture that converts the coaxial instrument ports into a planar layout matching the capacitor pins. To achieve repeatable sub-milliohm contact resistance across all terminals simultaneously, fixtures incorporate:

- **Pneumatic or Spring-Loaded Clamps:** Heavy, gold-plated copper blocks or matrices of spring-loaded test probes (pogo pins) press down on the capacitor terminals with uniform force, preventing contact resistance variations from distorting the damping calculations.
- **Kelvin Sensing Configuration:** The current excitation path and the voltage sensing path are kept entirely separate right up to the capacitor pin landing zone. This eliminates the voltage drop across the contact resistance from the measurement loop.
- **Flexible Connectors with Vertical Offset:** Standard low-ESL fixtures are designed with adjustable contacts to accommodate vertical terminal offsets matching standard power module configurations, such as the standard $22\ \text{mm}$ spacing of BNC terminals on impedance analyzers.

### Current Sensor Integration

To capture high $di/dt$ transient currents without inserting excessive parasitic inductance into the discharge loop, fixtures integrate sensors directly into the planar structure:

- **PCB-Embedded Rogowski Coils:** Multi-layer PCB coupons are designed where the capacitor's discharge leads pass through the center of a toroidal Rogowski coil wound directly onto the inner layers of the PCB. This eliminates the bulk of external clamp-on probes.
- **Coaxial Shunt Integration:** For ultra-low inductance, a circular ring of SMD current-sensing resistors is placed in a symmetric pattern around the terminal pads. This mimics a coaxial shunt, maintaining high bandwidth (up to hundreds of MHz) while preserving the low-loop-area geometry of the coplanar busbar.

---

## Evaluation of Clean Transient-Triggering Elements for sub-100 nH Discharges

The low-voltage surge discharge method relies on a rapid, bounce-free short-circuit trigger to initiate a clean decaying sinusoidal current waveform. Historically, mercury-wetted switches were the gold standard due to their liquid-metal contact interface, which eliminates mechanical contact bounce, provides sub-milliohm contact resistance, and supports nanosecond-range rise times. However, severe global environmental regulations and the progressive discontinuation of mercury-based relays have forced labs to adopt alternative triggering technologies.

| Triggering Technology | Typical $R_{on}$ | Parasitic $L_p$ | Bounce & Arcing | Jitter | Suitability |
|---|---|---|---|---|---|
| **Mercury-Wetted Relay** | $< 10\ \text{m}\Omega$ | $5\text{–}15\ \text{nH}$ | Zero bounce, no micro-arcing | $< 1\ \text{ns}$ | Excellent — but banned under environmental regulations |
| **Dry Reed Relay** | $50\text{–}200\ \text{m}\Omega$ | $10\text{–}20\ \text{nH}$ | Severe bounce; contact welding at high peak currents | $10\text{–}100\ \mu\text{s}$ | Poor — high $R_{on}$ overdamps; bounce corrupts initial peaks |
| **Power MOSFET / IGBT Array** | $1\text{–}10\ \text{m}\Omega$ | $5\text{–}15\ \text{nH}$ | Zero mechanical bounce; destruction risk at transient limits | $< 5\ \text{ns}$ | Good — repeatable, but package parasitics must be de-embedded |
| **MOS-Controlled Thyristor (MCT)** | $< 2\ \text{m}\Omega$ | $3\text{–}8\ \text{nH}$ | Zero bounce; dynamic latching prevents micro-arcing | $< 1\ \text{ns}$ | Excellent — exceptional $di/dt$ capability ($> 350\ \text{kA/cm}^2/\mu\text{s}$) |
| **Triggered Spark Gap** | Non-linear | $10\text{–}20\ \text{nH}$ | Arc noise; time-varying plasma resistance | $10\ \text{ns}\text{–}100\ \mu\text{s}$ | Moderate — high voltage required; arc resistance complicates damping |
| **Solid Copper-Plate Manual Switch** | Highly variable | Variable | Extreme arcing and bounce; hazardous at high energy | Infinite (Manual) | Poor — completely unrepeatable |

### Deep Analysis of Solid-State Alternatives

To replace mercury-wetted devices without sacrificing measurement accuracy, modern test labs prioritize **MOS-Controlled Thyristors (MCTs)** or paralleled fast MOSFET arrays. MCTs are highly advantageous because they combine the simple, low-power voltage-gated turn-on characteristics of a MOSFET with the massive, non-destructive surge current carrying capacity of a thyristor. Because their conduction mechanism involves carrier plasma injection, their dynamic on-state resistance drops to micro-ohm levels during high-current conduction, minimizing circuit damping.

When using Si or SiC MOSFETs, engineers must parallel multiple low-$R_{ds(on)}$ discrete devices (such as TO-263-7 or TO-247-4 packages with dedicated Kelvin source pins) to distribute the peak current and decrease the total dynamic switch inductance. **Kelvin source connections** are crucial in this setup, as they allow the gate driver loop to bypass the high-current power path, preventing source-lead inductance from slowing down the switch turn-on transition.

---

## Laboratory Integration, Parameter De-embedding, and Simulation-Based Validation

Executing a precise surge discharge ESL measurement requires an integrated laboratory setup designed to handle transient currents up to several kiloamperes with sub-nanosecond resolution.

### Oscilloscope and Probe Selection

Due to the high $di/dt$ rates typical of low-ESL film capacitor discharges (often exceeding $1\ \text{A/ns}$), the measurement instrumentation must be carefully selected to avoid signal distortion:

- **Oscilloscope:** A digital phosphor oscilloscope with a minimum analog bandwidth of $1\ \text{GHz}$ and a real-time sampling rate of $\geq 5\ \text{GS/s}$ is required. This prevents attenuation of the rapid rising edge of the initial discharge transient.
- **Voltage Probing:** Passive $10\times$ voltage probes are highly susceptible to EMI radiated from the high-current discharge loop. Instead, labs utilize high-frequency differential probes or $50\ \Omega$ passive transmission-line probes connected to the scope's internal $50\ \Omega$ termination. The sensing point must be located directly at the capacitor terminals, utilizing a soldered, low-inductance bridging wire to minimize probe loop area.

### Current Sensor Trade-Offs

Sensing the high-current ringing waveform requires balancing insertion impedance, bandwidth, and signal delay:

- **Rogowski Coils:** Non-intrusive and handle huge overload currents without saturating. However, they introduce a fixed analog propagation delay (often exceeding $10\ \text{ns}$ due to the active integrator). If this delay is not corrected via oscilloscope channel deskewing, the voltage and current waveforms will be out of phase, rendering the inductive voltage divider calculation ($V_1/V_c = L_c/L$) highly inaccurate.
- **Coaxial Shunt Resistors:** Bandwidth up to $2\ \text{GHz}$ and signal delay less than $1\ \text{ns}$, providing the most accurate $di/dt$ tracking. Trade-offs include insertion loss, added parasitic inductance from physical integration into the power loop, and lack of galvanic isolation.

---

## Experimental Case Study and Quantitative Analysis

A real-world experimental dataset for a nominal $C \approx 7.73198\ \mu\text{F}$ multi-terminal film capacitor is analyzed across five different charging voltages ($V_{op} = 24\ \text{V}$ to $90\ \text{V}$):

| Measurement Parameter | Set 1 | Set 2 | Set 3 | Set 4 | Set 5 |
|---|---|---|---|---|---|
| Operating Voltage $V_{op}$ (V) | 24.00 | 35.00 | 45.00 | 75.00 | 90.00 |
| Capacitor Initial Voltage $V_c$ (V) | 22.90 | 31.70 | 39.60 | 62.20 | 77.50 |
| Inductive Drop peak $V_1$ (V) | 3.20 | 4.50 | 5.45 | 9.05 | 10.40 |
| Ringing Voltage peak $V_2$ (V) | 19.70 | 27.20 | 34.20 | 53.10 | 67.10 |
| First Peak Current $I_1$ (A) | 81.20 | 111.00 | 135.00 | 232.00 | 239.00 |
| Second Peak Current $I_2$ (A) | 37.80 | 55.60 | 69.90 | 124.00 | 97.40 |
| Waveform Period $T$ ($\mu\text{s}$) | 11.80 | 11.80 | 11.80 | 11.80 | 11.90 |
| Measured Capacitance $C$ ($\mu\text{F}$) | 7.73198 | 7.73198 | 7.73198 | 7.73198 | 7.73198 |
| Damping Coefficient $a$ ($10^6\ \text{s}^{-1}$) | 0.0648 | 0.0586 | 0.0558 | 0.0531 | 0.0754 |
| Resonant Freq $\omega_r$ (M rad/s) | 0.5325 | 0.5325 | 0.5325 | 0.5325 | 0.5280 |
| Natural Freq Squared $\omega_0^2$ | 0.2877 | 0.2870 | 0.2866 | 0.2863 | 0.2845 |
| Natural Freq $\omega_0$ (M rad/s) | 0.5364 | 0.5357 | 0.5354 | 0.5351 | 0.5334 |
| Inverse Inductance $1/L$ ($\mu\text{H}^{-1}$) | 2.2247 | 2.2188 | 2.2163 | 2.2140 | 2.1995 |
| Total Loop Inductance $L$ (nH) | 449.50 | 450.70 | 451.20 | 451.67 | 454.64 |
| Deembedded Capacitor ESL $L_c$ (nH) | 62.81 | 63.98 | 62.10 | 65.72 | 61.01 |

### Physical Interpretation of the Case Study

Applying the mathematical model to the experimental data yields highly stable and repeatable physical parameters across all operating conditions:

1. **Inductance Stability:** Despite a massive current swing from $81.2\ \text{A}$ to $239\ \text{A}$, the extracted total loop inductance ($L$) remains incredibly stable, varying by less than $1.2\%$ (from $449.50\ \text{nH}$ to $454.64\ \text{nH}$). This validates the electromagnetic linearity of both the polypropylene film dielectric and the copper busbar assembly under high transient load currents.

2. **ESL De-embedding Consistency:** The deembedded capacitor inductance ($L_c$) converges tightly around an average value of:

$$L_{c(\text{avg})} \approx 63.12\ \text{nH}$$

This consistency proves the voltage-independence and high reliability of the TDK/EPCOS de-embedding equation ($L_c = L \cdot \frac{V_1}{V_c}$) under varying peak currents.

3. **Circuit Damping Analysis:** The damping coefficient ($a$) is derived from the decay ratio of successive peak currents ($I_1/I_2$). The slight variation in $a$ (specifically the spike in Set 5 to $0.0754 \times 10^6\ \text{s}^{-1}$) points to dynamic non-linear resistance elements in the discharge loop, such as thermal heating of the copper conductors under sustained peak current or transient arcing during trigger switch closure.

4. **High Parasitic Ratio:** The total loop inductance ($L \approx 451\ \text{nH}$) is significantly larger than the isolated capacitor ESL ($L_c \approx 63\ \text{nH}$). This indicates that the discharger switch and its associated interconnections contribute approximately $86\%$ of the total loop inductance ($L_d = L - L_c \approx 388\ \text{nH}$). This massive ratio highlights why proper de-embedding is mathematically mandatory; without subtracting $L_d$, the raw measured loop inductance would overestimate the capacitor's actual ESL by more than $700\%$.

---

## Simulation-Based Validation and Parameter Extraction

To perform the "check the result" step recommended in manufacturer whitepapers, the isolated physical parameters are translated into an equivalent SPICE netlist representing the discharge loop:

```spice
* SPICE netlist for Low Voltage Surge Discharge Validation
.param Vc_val = 22.90
.param C_val  = 7.73198u
.param Lc_val = 62.81n
.param Ld_val = 386.69n

* Node connections: Discharger (Rd, Ld) and Capacitor (Rc, Lc, C)
Vcap   init_node  0          {Vc_val}
C1     init_node  mid_node_1 {C_val}
Rc     mid_node_1 mid_node_2 9.78m
Lc     mid_node_2 clamp_node {Lc_val}

* Solid-state switch loop
Rd     clamp_node mid_node_3 7.62m
Ld     mid_node_3 0          {Ld_val}

.ic V(init_node) = {Vc_val}
.tran 10n 100u
.end
```

By executing this transient SPICE simulation, the resulting current and voltage decay profiles are compared directly to the raw oscilloscope captures. An exact alignment of the envelope decay rate, resonant frequency, and initial inductive voltage steps ($V_1$) provides mathematical validation that the de-embedded ESL ($L_c$) represents the true, unshielded physical parameter of the multi-terminal capacitor.

---

## Systemic Conclusions and Actionable Design Recommendations

To achieve highly repeatable, standard-compliant measurements of equivalent series inductance in multi-terminal film capacitors, testing laboratories must move away from simplified scaling assumptions and adopt advanced physical and mathematical characterization techniques:

1. **Abandon Blind Inductance Division:** Engineers must avoid dividing measured loop inductance by the number of parallel pins (e.g., dividing by two in four-terminal layouts) unless the internal construction consists of genuinely independent, uncoupled capacitive bobbins. For standard single-winding configurations, a 3D FEM electromagnetic field simulation is required to isolate the mutual coupling coefficient ($M$) and prevent severe overestimation of individual pin inductances.

2. **Implement Coplanar Laminated Busbars:** Custom test fixtures must utilize laminated, overlapped copper planes with ultra-thin insulation layers ($< 100\ \mu\text{m}$) to force forward and return current paths into maximum proximity, minimizing the fixture's stray loop area and cancelling unwanted magnetic fields.

3. **Transition to Solid-State Triggering:** In response to environmental regulations phasing out mercury-wetted switches, laboratories should implement MOS-Controlled Thyristors (MCTs) or low-inductance, Kelvin-source parallel MOSFET arrays. These devices eliminate mechanical contact bounce and provide the high $di/dt$ capabilities ($> 350\ \text{kA/cm}^2/\mu\text{s}$) required to capture clean ringing waveforms.

4. **Enforce Rigorous Instrument Calibration:** Prior to taking measurements with impedance analyzers or VNAs, a full Open/Short/Load calibration must be performed using the analyzer's built-in compensation advisors to shift the measurement plane directly to the fixture-to-capacitor terminal boundary.

5. **Account for Current Sensor Phase Delays:** When utilizing Rogowski coils for transient current sensing, the inherent analog propagation delay ($\geq 10\ \text{ns}$) must be deskewed on the oscilloscope relative to the voltage probe. Failure to perform this deskewing will introduce massive phase errors into the inductive voltage divider calculations, invalidating the isolated ESL values.
