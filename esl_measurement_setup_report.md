# Engineering Handoff Report: High-Frequency ESL and Mutual Inductance Extraction

## 1. Project Objective and Overview
This document compiles the full technical parameters, mathematical frameworks, physical mechanisms, and circuit constraints analyzed for an experimental bench setup designed to measure the Equivalent Series Inductance (ESL) parameters of a 4-pin TDK capacitor. 

The primary objectives of this setup are:
1. To isolate and calculate the exact mutual inductance ($M$) contributing specifically to the capacitor loop inductance ($L_c$), rather than the overall loop inductance.
2. To empirically isolate the self-inductance of a single terminal pin ($L_{pin}$) without relying solely on theoretical calculations.
3. To mitigate, compensate for, or eliminate measurement errors introduced by parasitic fixture inductances ($L_{fixture}$ or $L_{stray}$), spatial cross-talk, high $di/dt$ effects, and switching non-linearities.

---

## 2. System and Waveform Characterization
The nominal parameters of the Device Under Test (DUT) and the experimental loop are:
* **Capacitance ($C$):** $10\ \mu\text{F}$
* **Target Total Inductance ($L_{total}$):** $\approx 400\text{ nH}$
* **Charging Voltage ($V_0$):** $< 100\text{ V}$ (Low-voltage transient surge)

### Resonant Ringing Frequency Analysis
The circuit operates as an unclamped, underdamped RLC resonant tank. The expected ringing frequency ($f_r$) observed on the oscilloscope is derived via:
$$f_r = \frac{1}{2\pi \sqrt{L \cdot C}} = \frac{1}{2\pi \sqrt{400\text{ nH} \cdot 10\ \mu\text{F}}} \approx 79.58\text{ kHz}$$

### Waveform Attributes
* **Time Period ($T$):** $\approx 12.5\ \mu\text{s}$ per full cycle.
* **Oscilloscope Setup Recommendation:** Timebase configured to $5\ \mu\text{s/div}$ or $10\ \mu\text{s/div}$ to capture 3 to 5 full cycles. Frequency calculations should bypass the first half-cycle (to avoid spark gap/switch non-linearities) and be averaged across downstream stable cycles.

---

## 3. Mathematical Extraction Methods

### 3.1. Baseline Fixture Separation
The raw measured inductance from the oscilloscope waveform represents the total loop ($L_{total} = L_c + L_{fixture}$). The setup relies on a baseline routine where $L_{fixture}$ is captured via a solid shorting block and subtracted out, yielding a clean, isolated capacitor value ($L_c$) for subsequent steps.

### 3.2. 3-Test Empirical Method for $L_{pin}$ and $M$ Separation
To eliminate theoretical straight-wire equations and extract real-world, high-frequency values for $L_{pin}$ and $M$, a three-configuration differential test is established. A calibration standard consisting of a single copper wire/strip of identical gauge and length to the capacitor pin is required.

#### Test Configurations
1. **Test 1 (4-Pins Active):** Normal configuration where both positive pins are tied together in parallel, and both negative pins are tied together in parallel.
   $$L_{c1} = L_{body} + L_{pin} + M$$
2. **Test 2 (2-Pins Active):** Two diagonal or adjacent pins are lifted/isolated from the fixture, forcing the surge current through only one positive and one negative pin. 
   $$L_{c2} = L_{body} + 2L_{pin}$$
3. **Test 3 (Pin Extension Calibration):** Maintaining the 2-pins active setup from Test 2, the identical calibration wire piece is soldered in series to the tip of one active pin. The test fixture contact point is shifted to the end of this extension, forcing current through an extra isolated pin length.
   $$L_{c3} = L_{body} + 2L_{pin} + L_{pin} = L_{body} + 3L_{pin}$$

#### Algebraic Solutions
By executing these three tests and deriving $L_{c1}$, $L_{c2}$, and $L_{c3}$ directly from their respective ringing frequencies ($L = \frac{1}{\omega^2 C}$), the parameters are isolated as follows:

* **Single Pin Self-Inductance:**
  $$L_{pin} = L_{c3} - L_{c2}$$
* **Mutual Inductance:**
  $$M = L_{pin} - (L_{c2} - L_{c1})$$
* **Intrinsic Capacitor Winding/Body Inductance:**
  $$L_{body} = L_{c2} - 2L_{pin}$$

---

## 4. Hardware Implementation & Parasitic Cancellation

### 4.1. Hardware Compensation of Mutual Inductance ($M \to 0$)
To physically cancel $M$ during standard testing without post-processing math, a non-magnetic, highly conductive eddy current shield can be placed in the physical gaps between parallel same-polarity pins (+ to + and - to -).

#### Material Selection and Skin Depth
* **Selected Material:** Tin-plated flat copper strip, $0.75\text{ mm}$ thick.
* **Skin Depth Physics:** At the ringing frequency of $\approx 80\text{ kHz}$, the skin depth ($\delta$) of copper is approximately $0.23\text{ mm}$.
* **Shield Effectiveness:** Because the $0.75\text{ mm}$ strip is $>3$ times thicker than the skin depth, high-frequency magnetic flux cannot penetrate it. High-speed $di/dt$ fields induce localized eddy currents that act as a magnetic mirror, creating an equal and opposite field (Lenz's Law) that drops $M$ to near-zero.
* **Note on Tin Plating:** The microscopically thin tin-plating layer does not hinder performance, as the high-frequency field easily penetrates the plating to establish eddy currents within the underlying copper mass.

#### Insulation Selection
* **Evaluated Materials:** Standard polyolefin heat-shrink (Woer RSFR-H, $125^\circ\text{C}$, wall thickness $\approx 0.4 - 0.6\text{ mm}$ per side) vs. standard clear cello tape (thickness $\approx 0.04 - 0.05\text{ mm}$).
* **Proximity Constraint:** Magnetic coupling drops off exponentially with distance. Thick heat-shrink creates an overall $\approx 0.8 - 1.0\text{ mm}$ physical barrier, pushing the shield away from the pins and allowing stray mutual flux to escape.
* **Optimized Choice:** Clear cello tape or thin Kapton tape is preferred. It provides sufficient dielectric strength for the $<100\text{V}$ environment while maximizing the spatial proximity of the copper shield to the terminal pins, driving $M$ effectively to zero.
* **Mechanical Warning:** Sheared edges of the $0.75\text{ mm}$ copper strip must be deburred and rounded with sandpaper/files before tape application to prevent structural puncture and subsequent shorting.

---

## 5. Measurement Fixture, Probing, and Isolation

### 5.1. Instrument Placement Geometry
* **Rogowski Coil:** Must encircle **both** negative pins simultaneously. Since current splits between parallel pins inside the capacitor, encompassing both paths ensures the capture of total loop current ($I_{total}$), preserving the fidelity of the overall $L_c$ calculation.
* **Voltage Probe:** Connects across exactly **one** positive pin and **one** negative pin directly at the root where they emerge from the capacitor body. This minimizes the physical loop area of the probe tip to shield it from external magnetic fields.
* **Symmetry Requirement:** To prevent uneven current sharing from corrupting the single-pin voltage measurement, the external copper busbars delivering power must maintain exact geometric symmetry up to the connection points of all four pins.

### 5.2. Charging Circuit Isolation
* **Problem:** Direct connection of a low-impedance power supply to the discharge bus allows high-frequency ringing to flow into the power supply, corrupting the $10\ \mu\text{F}$ loop characteristics and risking power supply damage.
* **Mitigation:** A charging resistor ($1\text{ k}\Omega$ to $10\text{ k}\Omega$) or high-voltage blocking diode must be placed in series between the power supply and the busbar. This acts as a high-impedance barrier to the $80\text{ kHz}$ transient while letting DC charging current pass. Consequently, charging terminals do not require magnetic shielding.

### 5.3. High-Frequency Error Sources
1. **Common-Mode Ground Loops:** High $di/dt$ paths induce common-mode currents on the oscilloscope probe outer shield braid. *Fix:* Loop the probe cable 3 to 5 times through a high-permeability ferrite core (clamp-on choke) prior to input connection.
2. **Mercury Switch Vapor Arc:** Prior to solid mechanical closing, a mercury-wetted switch forms a microscopic vapor arc. This manifests as a transient, non-linear resistance ($R_{arc}(t)$) that dampens the initial half-cycle. *Fix:* Extract resonant frequency from cycles 2 through 5.
3. **Proximity Effect:** High-frequency current crowds toward the outer perimeters of closely spaced conductors, inflating AC resistance ($R_{AC}$) and increasing dampening relative to standard DC ESR models.

---

## 6. Switching Element Selection & Layout Considerations

### 6.1. Analysis of the C2M0080170P SiC MOSFET
Evaluation of a single discrete `C2M0080170P` Silicon Carbide (SiC) MOSFET (1700V, 80A pulsed max) determined it is **unsuitable** for direct substitution in this specific unclamped test circuit due to the following stress boundaries at $V_0 = 100\text{ V}$:

* **Peak Surge Current ($I_{peak}$):** $$I_{peak} = V_0 \sqrt{\frac{C}{L}} = 100\text{ V} \times \sqrt{\frac{10\ \mu\text{F}}{400\text{ nH}}} = 500\text{ A}$$
  This exceeds the absolute maximum pulsed rating of the device (80 A) by more than a factor of six, leading to immediate thermal/wire-bond destruction.
* **Turn-On Rate of Current Rise ($di/dt$):**
  $$\frac{di}{dt} = \frac{V_0}{L} = \frac{100\text{ V}}{400\text{ nH}} = 250\text{ A/}\mu\text{s}$$
  Forcing this rate of rise while the device is transitioning through its linear region risks localized gate-oxide puncture from hotspots.
* **Reverse Oscillatory Ringing:** The 80 kHz ring forces current backward through the switch on alternating half-cycles. The internal body diode of the SiC MOSFET cannot clear the reverse recovery energy safely at 500 A peak amplitudes.

### 6.2. Analysis of the Clamped Inductive Switching Test Circuit
Standard application schematics (e.g., Double Pulse Test circuits using a discrete SiC MOSFET paired with a freewheeling SiC Schottky diode and a large load inductor) are **rejected**. Clamped inductive circuits are optimized to suppress loop ringing and maintain constant inductor currents, whereas ESL extraction requires an unclamped, freely oscillating RLC tank to observe resonant frequency.

### 6.3. Proposed Solid-State Switch Layout Architecture
If a solid-state switch is implemented to replace the high-current mercury displacement relay, it must adhere to the following architecture:

```
                  [ + BUS PLANE ]
                         |
                 +-------+-------+
                 |       |       |
               [MOS1]  [MOS2]  [MOS3]  (Symmetrical Array)
                 |       |       |
                 +-------+-------+
                         |
                  [ - BUS PLANE ]
```

1. **Semiconductor Selection:** Replace the high-voltage SiC MOSFET with an array of 3 to 4 parallel **100V–150V Silicon Trench MOSFETs** featuring ultra-low $R_{DS(on)}$ ($< 1\text{ m}\Omega$) and high pulsed-current handling ($> 1000\text{ A}$ limits per device). This reduces circuit damping and distributes the 500 A peak surge safely.
2. **Anti-Parallel Diode Shunts:** Connect discrete, high-current **SiC Schottky Diodes** in anti-parallel (Cathode to Drain, Anode to Source) across the silicon MOSFETs. This bypasses the slow silicon body diodes during the reverse cycles of the 80 kHz ring, preserving the underdamped wave shape.
3. **Vertical Stripline Geometry:** The switch PCB must utilize a multi-layer heavy copper stackup (2 oz or 3 oz) where the Drain plane is on Layer 1 and the Source return plane is directly underneath on Layer 2, separated by a thin dielectric ($0.4\text{ mm} - 0.8\text{ mm}$). This configuration ensures opposing magnetic field cancellation, minimizing the switch’s parasitic inductance contribution.
4. **Symmetrical Gate Drive:** Utilize a "Star" connection layout ensuring the trace length from the primary pulse input to the Drain/Source pins of every parallel device is structurally identical, enforcing uniform $di/dt$ distribution. Implement dedicated Kelvin Source connections to isolate gate loops from the high-power discharge path.

---

## 7. Parameters for Next Session Continuity
When continuing this engineering analysis in a subsequent session, initialize with these baseline assumptions:
* $C = 10\ \mu\text{F}$, $L \approx 400\text{ nH}$, $f_r \approx 80\text{ kHz}$.
* Hardware mutual inductance mitigation utilizes a $0.75\text{ mm}$ flat copper shield insulated with $0.05\text{ mm}$ cello tape inserted between same-polarity leads.
* Fixture current is monitored comprehensively via a dual-pin-enclosing Rogowski coil, and differential voltage is monitored via a tight single-pair contact layout.
* Switching options are strictly limited to the current mercury relay or a low-voltage, low-inductance paralleled silicon trench MOSFET array with vertical stripline copper balancing.
