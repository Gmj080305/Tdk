# Overlapped External Busbar Fixture Design and Prototyping Dossier

---

## SECTION 1: Detailed Engineering Guide

### 1.1 Geometric Symmetry & Layout Physics

Characterizing ESL of high-power DC-link film capacitors in the single-to-double-digit nanohenry range requires a metrology fixture with a sub-nanohenry parasitic floor. The fixture employs a laminated, parallel-plate coplanar busbar for maximum EM field cancellation.

The design implements a symmetric **H-bridge split-plane geometry** across two overlapping copper plates:

[Discharge Switch Node]
                           |
                           | (Main Stem, Width = W_stem)
                           |
               +-----------+-----------+
               |                       |
       +-------+-------+       +-------+-------+
       |  Branch 1     |       |  Branch 2     |
       |  (Length = l) |       |  (Length = l) |
       +-------+-------+       +-------+-------+
               |                       |
         [Terminal +ve]          [Terminal +ve]
         [Terminal -ve]          [Terminal -ve]
         (Capacitor Lead 1)      (Capacitor Lead 2)

Total parasitic inductance of the laminated assembly:

$$L_{sum} = L_1 + L_2 - 2M$$

Self-inductance of a single flat plate:

$$L = \mu_0\mu_r\frac{l \cdot h}{w}$$

Mutual inductance between two tightly coupled parallel plates:

$$M = \mu_0\mu_r\frac{l \cdot (h+d)}{w}$$

Total loop inductance (opposite current directions):

$$L_{loop} = 2(L - M) \approx \mu_0\mu_r\frac{l \cdot d}{w}$$

> Minimizing dielectric spacing $d$ and maximizing plate width $w$ minimizes fixture loop inductance.

---

### 1.2 Skin Effect & High di/dt Layer Sizing

Ringing frequency for typical DC-link film devices ($C \approx 100\ \mu\text{F}$, $L_{total} \approx 10\ \text{nH}$):

$$f_{ring} = \frac{1}{2\pi\sqrt{L_{total} \cdot C}}$$

Skin depth (annealed copper C11000, $\rho = 1.72 \times 10^{-8}\ \Omega\cdot\text{m}$, $\mu_r \approx 1$):

$$\delta = \sqrt{\frac{\rho}{\pi \cdot f \cdot \mu_0 \cdot \mu_r}}$$

| $f_{ring}$ | $\delta$ | Min. Thickness ($3\delta$) | Recommended Gauge |
|---|---|---|---|
| 10 kHz | 661.4 µm (0.661 mm) | 1.984 mm | 12-gauge (2.05 mm) |
| 50 kHz | 295.8 µm (0.296 mm) | 0.887 mm | 18-gauge (1.02 mm) |
| 100 kHz | 209.2 µm (0.209 mm) | 0.627 mm | 22-gauge (0.64 mm) |
| 200 kHz | 147.9 µm (0.148 mm) | 0.444 mm | 24-gauge (0.51 mm) |
| 500 kHz | 93.5 µm (0.094 mm) | 0.281 mm | 28-gauge (0.32 mm) |

> **Selection:** For 100–200 kHz target, use **22-gauge (0.64 mm)** or **16-gauge (1.29 mm)** copper sheet. Requirement: $t_{Cu} \geq 3\delta$.

---

### 1.3 Dielectric Isolation Optimization

Busbar parasitic capacitance:

$$C_{bar} = \varepsilon_0\varepsilon_r\frac{w \cdot l}{d}$$

Characteristic impedance:

$$Z_0 = \sqrt{\frac{L_{unit}}{C_{unit}}} = \frac{d}{w}\sqrt{\frac{\mu_0\mu_r}{\varepsilon_0\varepsilon_r}}$$

| Material | $\varepsilon_r$ | Dielectric Strength | Target Thickness | Breakdown Voltage | Notes |
|---|---|---|---|---|---|
| **Kapton (Polyimide)** | 3.4 | 200 kV/mm | 0.050 mm (2 mil) | 10.0 kV | ✅ Flexible, tear-resistant, excellent thermal resistance |
| Mylar (PET) | 3.2 | 110 kV/mm | 0.100 mm (4 mil) | 11.0 kV | ⚠️ Susceptible to cracking at folds |
| FR4 Prepreg | 4.4 | 20 kV/mm | 0.250 mm (10 mil) | 5.0 kV | ❌ Rigid, increases loop inductance |

> **Selected: 2 mil Kapton tape.** Provides 10 kV breakdown vs. 5–20 V test voltage — exceptional safety margin. Keeps loop inductance below **1 nH**.

---

### 1.4 Terminal Interface & Contact Resistance Mitigation

Capacitor pins insert **vertically** into slotted receptacles — no horizontal bending, no loop area pockets.

(Nylon Compression Bolts)
                     |
+-----------------------v-----------------------+

|         Rigid G10/FR4 Top Clamping Block      |

+-----------------------------------------------+

|  Positive Busbar Plate                        |

+-----------------------------------------------+

|  Kapton Dielectric Film                       |

+-----------------------------------------------+

|  Negative Busbar Plate                        |

+----------------------+------------------------+

|  (Vertical Insertion

|   of Capacitor Pins)

v

+-----------------------------------------------+

|         Rigid G10/FR4 Bottom Clamping Block   |

+-----------------------------------------------+

- Nylon bolts torqued to **2.5 N·m** (alternating star pattern)
- Copper pads polished to mirror finish, cleaned with IPA
- **Silver-loaded conductive grease** applied to contact pads
- Contact resistance target: **< 50 µΩ**

---

### 1.5 Sense Point Integration

Kelvin sense fingers branch off from the main busbar **immediately adjacent** to terminal slots — zero current-carrying, connected to **SMA edge-launch connectors**.

De-embedding methodology (at switch closure $t = 0^+$):

Total loop inductance:

$$L = L_c + L_d$$

Current slew rate:

$$\frac{di}{dt} = \frac{V_c}{L_c + L_d} = \frac{V_c}{L}$$

Initial voltage step across DUT terminals:

$$V_1 = L_c \cdot \frac{di}{dt} = L_c \cdot \frac{V_c}{L}$$

**TDK/EPCOS de-embedding equation:**

$$\boxed{L_c = L \cdot \left(\frac{V_1}{V_c}\right)}$$

---

## SECTION 2: System Integration

### 2.1 Surge Discharge Test Bench

+------------- HIGH-IMPEDANCE CHARGING PATH ---------------+

|                                                          |

| DC Supply  →  R_charge (1kΩ, 25W)  →  D_iso (fast)  →  |

| (0–30V)                                                  |

+------------------------------------------+---------------+

|

[+ve Laminated Plane]

|

[DUT Capacitor]

|

[-ve Laminated Plane]

|

Kelvin SMA Probes → [Oscilloscope]

|

[Coaxial Shunt (SDN-010, 10mΩ)]

|

[Discharge Switch — Parallel MOSFETs]

**Charging path:** $R_{charge}$ limits inrush; $D_{iso}$ blocks discharge back-feed.  
**Discharge path:** Low-inductance parallel MOSFET array → coaxial shunt → Kelvin probes → DSO.

---

### 2.2 Switching Topology

| Metric | Mercury-Wetted Relay | Parallel MOSFET Array |
|---|---|---|
| Turn-On Rise Time | < 1 ns | 10–20 ns |
| Parasitic Inductance | 5–15 nH | **< 0.5 nH** |
| Contact Bounce | Eliminated | None |
| Peak Pulsed Current | 100–200 A | **> 5 kA** |
| Physical Profile | Coaxial tube (large loop) | **Flat SMD (co-planar)** |

**Selected: 4× Nexperia BUK7S1R0-40H** (40V, 120A, LFPAK88)
- $R_{DS(on)} = 1.0\ \text{m}\Omega$, package inductance < 0.4 nH
- Drain → positive plane, Source → negative plane (maintains field cancellation)
- Gate driver: 9A source/sink, rise time < 15 ns, gate traces < 10 mm

---

### 2.3 Instrumentation

| Sensor | Type | Placement | Notes |
|---|---|---|---|
| Current | Coaxial shunt, 10 mΩ, 2 GHz BW, < 10 pH | In-line with negative return plane | Preserves field cancellation |
| Voltage | 500 MHz passive probe + ground spring on SMA | Kelvin sense fingers | No alligator leads — prohibited |
| EMI suppression | High-µ ferrite sleeves | Probe cables at DSO inputs | Suppresses common-mode HF currents |

> Rogowski coils **prohibited** — require plate separation, introducing loop inductance.

---

## SECTION 3: 72-Hour Rapid Prototyping Blueprint

### 3.1 Bill of Materials

| Source | Item | Qty | Specification |
|---|---|---|---|
| McMaster 9801K11 | Copper Sheet C110, 24-gauge (0.51 mm), 12"×12" | 2 | 5.8×10⁷ S/m conductivity |
| McMaster 7648A24 | Kapton Tape, 2 mil (0.050 mm), 2" wide | 1 roll | 10 kV breakdown |
| McMaster 8526K14 | G10/FR4 Garolite Sheet, 1/8", 12"×12" | 1 | Non-conductive clamping plates |
| McMaster 95123A150 | Nylon 6/6 Hex Screws, 1/4"-20, 1" | 10 | Non-conductive fasteners |
| DigiKey 568-12092-1-ND | Nexperia BUK7S1R0-40H MOSFET, LFPAK88 | 5 | 40V/120A, 1.0 mΩ $R_{DS(on)}$ |
| DigiKey ACX1264-ND | SMA Edge-Launch Connector, 50Ω Female | 4 | Kelvin sense points |
| Local Hardware | Heavy-Duty C-Clamps, 3" throat | 4 | Lamination pressure |
| Standard Chemical | MG Chemicals 8463 Silver Grease | 1 tube | Contact resistance < 50 µΩ |

---

### 3.2 Implementation Timeline

---

#### Day 1 — Material Prep & Fabrication

1. **Layout Stenciling** — Print 1:1 H-bridge template; fix to copper with spray adhesive; mark cut lines and terminal slots.
2. **Copper Shearing** — Cut plates with aviation snips; keep sheet flat, make shallow controlled cuts.
3. **Deburring** — File + 400-grit wet sandpaper; round all edges; eliminate burrs that could puncture Kapton.
4. **G10 Backing Plates** — Cut with fine-tooth hacksaw; drill 1/4"-20 clearance holes.
5. **Terminal Slot Drilling** — Clamp copper between scrap wood; drill press; deburr with countersink tool.

#### Day 2 — Lamination & Assembly

1. **Chemical Cleaning** — 99% IPA + lint-free wipe; remove oils, fingerprints, copper dust.
2. **Dielectric Lamination** — Apply 2 mil Kapton to inner face of negative plate; rubber roller from center out; overlap edges ≥ 3 mm.
3. **Busbar Stacking** — Align positive plate over insulated negative plate; maximize overlap area.
4. **Mechanical Clamping** — G10 plates top and bottom; C-clamps to compress and eliminate micro-air gaps.
5. **Bolt Torque** — Insert 1/4"-20 nylon bolts; remove C-clamps; torque to **2.5 N·m** in alternating star pattern.

#### Day 3 — Switch Integration, Instrumentation & Validation

1. **Switch Assembly** — Solder 4× LFPAK88 MOSFETs at discharge node; drain → positive plane, source → negative plane; 100W iron, lead-free solder.
2. **Gate Driver** — Mount TC4422 proto-board vertically adjacent to gates; gate-source traces **< 10 mm**.
3. **Instrument Hookup** — Solder SMA connectors to Kelvin fingers; install coaxial shunt in return path.
4. **Isolation Test** — Measure positive-to-negative isolation; verify **> 10 GΩ at 500V DC**.
5. **Capacitor Mounting** — Clean leads with IPA; apply silver grease; insert vertically; tighten G10 compression bar.
6. **Dry-Run Test** — RG-223 coax to DSO; charge to **10V**; trigger switch; record transient.
7. **Calibration & De-embedding** — Verify clean $V_1$ step + underdamped ringing; extract $L$ from $f_{ring}$; apply:

$$L_c = L \cdot \left(\frac{V_1}{V_c}\right)$$

Clean waveform with no HF noise spikes = fixture validated. ✅

