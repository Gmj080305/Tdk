# Industrial Blueprint & Manufacturing Roadmap: Ultra-High Performance (UHP) DC-Link Film Capacitors

---

## 1. Advanced Dielectric Film Synthesis & Metallization Topography

### 1.1 High-Temperature BOEPN Copolymer Blend Compounding Profile

To achieve continuous operation at a $+105^\circ\text{C}$ hotspot without voltage derating, standard Biaxially Oriented Polypropylene (BOPP) is insufficient due to its rapid loss of mechanical modulus and sharp decline in breakdown strength ($E_{bd}$) above $+85^\circ\text{C}$. This blueprint utilizes a Biaxially Oriented Ethylene Propylene Norbornene (BOEPN) / Cyclic Olefin Copolymer (COC) blend.

```
       [Amorphous COC Domain (Rigid Norbornene Rings)]  --- Raises Tg & Enhances High-Temp Modulus
                             │
                             ▼
  [iPP Matrix] ───►  ( Melt Compounding & Extrusion )  ───►  [BOEPN Bulk Film] (7.3:2.7 Ratio)
                             ▲
                             │
       [Beta-Nucleating Agent (0.15% Calcium Pimelate)] --- Drives Controlled High-Tm Crystallinity

```

* **Compounding Ratio:** 73 wt% high-isotactic polypropylene (iPP, isotacticity $\ge 98\%$, $M_w \approx 350,000\text{ g/mol}$) blended with 27 wt% Cyclic Olefin Copolymer (COC) containing $35\text{ mol}\%$ norbornene content.
* **Molecular Alterations:** The inclusion of bulky, rigid norbornene rings into the amorphous regions of the iPP matrix restricts polymer chain segment rotation and sliding under high electrical fields. This shifts the glass transition temperature ($T_g$) of the amorphous phase from $-10^\circ\text{C}$ up to $+115^\circ\text{C}$.
* **Crystallinity Tuning:** A masterbatch containing $0.15\text{ wt}\%$ of a specific $\beta$-nucleating agent (e.g., calcium pimelate) is introduced during melt compounding. This creates a high density of uniform $\beta$-spherulites during the initial cast-film phase. During subsequent sequential biaxial stretching (stretching ratios: Machine Direction $\text{MD} = 5.2:1$, Transverse Direction $\text{TD} = 9.5:1$), the $\beta$-phase transforms into an ultra-stable, highly oriented $\alpha$-nematic crystalline structure. This yields a final bulk crystallinity of $68\%$ and a melting point ($T_m$) exceeding $+168^\circ\text{C}$.
* **Dielectric Performance:** This microstructural modification maintains a rigid mechanical storage modulus ($E' > 1.2\text{ GPa}$ at $+105^\circ\text{C}$), which suppresses electromechanical breakdown mechanisms. The permittivity remains stable ($\varepsilon_r = 2.35 \pm 0.02$) up to $+115^\circ\text{C}$, and the dissipation factor ($\tan\delta$) is kept below $2 \times 10^{-4}$ at $1\text{ kHz}$. The targeted final film thickness is $d = 3.2\ \mu\text{m}$ to achieve the required operating electric field:

$$E_{op} = \frac{V_{dc}}{d} = \frac{1800\text{ V}}{3.2\ \mu\text{m}} = 562.5\text{ V/}\mu\text{m}$$

### 1.2 Patterned Segmented Metallization Matrix & Self-Healing Physics

To prevent catastrophic dielectric breakdown cascades under continuous $1800\text{ V}$ stress, the BOEPN film features a high-resolution, segmented mosaic T-grid metallization pattern.

```
+-----------------------------------------------------------+ [Heavy Edge: 1.5 - 2.5 ohms/sq]
|   |===|   |===|   |===|   |===|   |===|   |===|   |===|   | (Al-Zn Alloy Contact Zone)
|---+- -+---+- -+---+- -+---+- -+---+- -+---+- -+---+- -+---|
|   |   |   |   |   |   |   |   |   |   |   |   |   |   |   | [Active Mosaic Elements]
|   | T |   | T |   | T |   | T |   | T |   | T |   | T |   | (Pure Al; 15 - 20 ohms/sq)
|   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|---+- -+---+- -+---+- -+---+- -+---+- -+---+- -+---+- -+---| [Interconnecting Fuses]
|   |===|   |===|   |===|   |===|   |===|   |===|   |===|   |
+-----------------------------------------------------------+ [Free Margin (Unmetallized)]

```

* **Topography & Profile:** Physical Vapor Deposition (PVD) is performed in a differential vacuum chamber ($< 10^{-4}\text{ mbar}$). The contact margin utilizes a heavy-edge slope profile composed of an Aluminum-Zinc alloy ($\text{Al-Zn}$, ratio $30:70$) transitioning smoothly from a surface resistance ($R_s$) of $1.5\ \Omega/\text{sq}$ at the Schoopage connection edge down to $4.5\ \Omega/\text{sq}$ over a $4\text{ mm}$ gradient. The active area features a pure Aluminum ($100\%\ \text{Al}$) segmented T-grid matrix with a baseline $R_s$ of $15\text{ to }20\ \Omega/\text{sq}$.
* **Fuse Micro-Geometry:** Each individual mosaic tile is isolated by unmetallized laser/oil-masked lanes ($0.3\text{ mm}$ width) and linked to the main injection bus via dual bottleneck fuses measuring $0.4\text{ mm}$ wide.
* **Self-Healing (Clearing) Physics:** When a local dielectric defect occurs, the high fault current density passing through the thin $15\ \Omega/\text{sq}$ gate bottleneck creates rapid Joule heating ($J^2 R$). Because the pure Al layer is extremely thin ($\approx 15\text{ to }20\text{ nm}$), the localized temperature spikes above $+1200^\circ\text{C}$ in less than $1\ \mu\text{s}$. This causes the metal film surrounding the defect to instantly vaporize and de-wet, expanding outward into an insulating plasma ring.
* The low oxygen content of the BOEPN matrix limits carbonization, ensuring that the vaporized metal oxidizes into non-conductive Aluminum Oxide ($\text{Al}_2\text{O}_3$). This isolates the flawed mosaic element with negligible capacitance loss ($\Delta C < 1\text{ pF}$ per event) and drops the local leakage current back to base levels ($< 1\ \mu\text{A}$).

---

## 2. Element Winding, Geometry, and Matrix Assembly

### 2.1 Flat-Wound Rectangular Element Process Controls

Converting conventional cylindrical windings into highly compact, structural rectangular flat elements requires strict thermomechanical control to avoid micro-cracking the metallization or creating dielectric wrinkles.

```
[Spindle Winding] ──► [Radially Tensioned Cylinder] ──► [Hydraulic Flattening Jig] ──► [Convection Annealing]
  (3.2 um Film,         (Tapered Profile:                 (P = 0.85 MPa,                  (T = +135°C,
   22 N down to 14 N)    78% Solid Vol. Fraction)          Deformation Speed <= 2 mm/s)    Stabilizes Alpha Phase)

```

1. **Winding Phase:** The two layers of patterned, metallized BOEPN film are wound on an automated high-precision spindle. The tension profile follows a strict logarithmic decay curve to manage internal displacement stress:

$$T(r) = T_0 - K \cdot \ln\left(\frac{r}{r_0}\right)$$

Where $T_0 = 22\text{ N}$ (initial winding tension) and final tension at maximum radius is $14\text{ N}$. This establishes a controlled winding density with an initial solid volume fraction of $78\%$.
2.  **Flattening Phase:** The cylindrical elements are transferred into an automated hydraulic flattening jig. The flattening plates are pre-heated to $+85^\circ\text{C}$. The elements are compressed at a deformation speed $\le 2\text{ mm/s}$ until reaching a target thickness of $38.5\text{ mm}$. A constant stabilization pressure of $0.85\text{ MPa}$ is maintained to prevent structural asymmetric layer slippage.
3.  **Heat-Setting / Annealing Phase:** While locked under mechanical compression within the jig, the elements undergo a multi-stage convection thermal annealing cycle:
* Ramp at $2^\circ\text{C/min}$ to $+135^\circ\text{C} \pm 2^\circ\text{C}$.
* Dwell for 4.5 hours. This releases internal orientation stresses within the amorphous fractions of the film and stabilizes the crystalline $\alpha$-phase without shrinking the film margins.
* Cool down under a controlled ramp of $1^\circ\text{C/min}$ to $+40^\circ\text{C}$ before pressure release. This prevents delamination between the dielectric film and the heavy-edge metallization layer.

### 2.2 Internal Block Arrangement and Thermal Management

To fit within the strict $205\text{ mm} \times 90\text{ mm} \times 170\text{ mm}$ cubic footprint while maximizing volumetric efficiency, a modular quadrant-split architecture is used.

```
       +------------------------- 205 mm -------------------------+
       |  +-----------------------+   +-----------------------+  |  ▲
       |  |   Quadrant Block A    |   |   Quadrant Block B    |  |  │
       |  |     (220 uF Windings) |   |     (220 uF Windings) |  |  │
       |  +-----------------------+   +-----------------------+  |  │
       |  =================== Laminated Busbar =================  |  90 mm
       |  +-----------------------+   +-----------------------+  |  │
       |  |   Quadrant Block C    |   |   Quadrant Block D    |  |  │
       |  |     (220 uF Windings) |   |     (220 uF Windings) |  |  │
       |  +-----------------------+   +-----------------------+  |  ▼
       +---------------------------------------------------------+

```

* **Quadrant Configuration:** The total internal capacitance (e.g., $880\ \mu\text{F}$ for the maximum capacity variation) is split into four identical sub-assembly quadrant blocks, each rated at $220\ \mu\text{F}$. Each block contains multiple flat-wound elements connected in parallel.
* **Volumetric Fill Factor:** The outer geometric envelope equals $3.136\text{ liters}$. The net volume of the four compressed winding blocks is $2.415\text{ liters}$, yielding a high active packaging fill factor of $77\%$.
* **Thermal Resistors & Heat Dissipation Paths:** The quadrant blocks are oriented symmetrically around a central, internal thermal evacuation axis. Each block is wrapped in a highly conductive $0.15\text{ mm}$ thick, electrical-grade Nomex/Kapton thermal composite film ($\kappa = 0.35\text{ W/m}\cdot\text{K}$).
* The flat sides of the windings press against the outer aluminum housing walls, establishing an short, direct thermal conduction path. This configuration balances the internal thermal resistance network ($R_{th}$ hotspot-to-case) within a target range of $1.4\text{ to }1.5\text{ K/W}$, allowing an core losses of up to $20\text{ W}$ to be rejected continuously while maintaining the internal hotspot temperature below $+105^\circ\text{C}$ when the cold plate is held at $+75^\circ\text{C}$.

---

## 3. Electromagnetic Minimization of Parasitics (Internal Busbar Engineering)

### 3.1 Laminated Planar Busbar Structural Architecture

To handle high-frequency switching ripples without inducing significant voltage overshoots ($\Delta V = L_{esl} \cdot \frac{di}{dt}$), the internal connections feature a closely coupled, laminated planar sandwich busbar system.

```
[ + Vdc Copper Plane: 1.2 mm ETP Cu ]  ──► Skin Depth Managed for 100 kHz
─────────────────────────────────────
[ Dielectric Isolation Layer ]         ──► 0.25 mm PET/PA Film (High-Dielectric)
─────────────────────────────────────
[ - Vdc Copper Plane: 1.2 mm ETP Cu ]  ──► Maximizes Mutual Inductance Cancellation

```

* **Conductor Dimensions & Material:** Positive and negative planes are constructed from $1.2\text{ mm}$ thick Electrolytic Tough Pitch (ETP) Copper (C11000, half-hard temper). This thickness provides sufficient cross-sectional area to handle $205\text{ A}_\text{rms}$ while matching the skin depth ($\delta \approx 0.21\text{ mm}$ at $100\text{ kHz}$) to minimize high-frequency AC resistance ($R_{ac}$).
* **Insulation & Geometry:** The plates are separated by an ultra-thin, high-temperature $0.25\text{ mm}$ Polyethylene Terephthalate / Polyamide (PET/PA) co-extruded insulation film featuring a dielectric breakdown strength $> 20\text{ kV/mm}$.
* **Mutual Inductance Cancellation Physics:** The forward and return high-frequency ripple currents flow in opposite directions through the parallel, closely spaced copper planes. The magnetic fields generated by these opposing currents overlap and largely cancel each other out. This mutual inductance cancellation reduces the intrinsic busbar inductance down to a minimal level:

$$L_{bus} \approx \mu_0 \cdot \frac{d \cdot l}{w}$$

Where $d = 0.25\text{ mm}$ (separation distance), $l$ is length, and $w$ is width. This configuration limits total loop inductance contribution to less than $2.5\text{ nH}$.

### 3.2 8-Terminal Female M6 Contact Optimization

```
              Top Interface View (Terminal Distribution Grid)
       +---------------------------------------------------------+
       |   (+) [M6]     (-) [M6]             (+) [M6]     (-) [M6]   |
       |  Terminal 1   Terminal 2           Terminal 3   Terminal 4  |
       |                                                         |
       |   (-) [M6]     (+) [M6]             (-) [M6]     (+) [M6]   |
       |  Terminal 5   Terminal 6           Terminal 7   Terminal 8  |
       +---------------------------------------------------------+

```

* **Terminal Matrix Geometric Mapping:** The interface features 8 distinct female M6 threaded terminals, arranged in an interleaved checkered configuration on the top surface. Four terminals connect to the positive laminated plane and four to the negative plane.
* **Current Distribution Mechanics:** Each internal quadrant winding block links directly to the closest pair of positive and negative terminal drops through wide, short connection tabs. This divides the total current path into four parallel electrical channels.
* When a total current load of $205\text{ A}_\text{rms}$ enters the capacitor, each individual M6 terminal pair carries a maximum of $51.25\text{ A}_\text{rms}$. This parallel current paths significantly lowers the overall equivalent inductance:

$$L_{total} = \frac{L_{internal\_block}}{4} + L_{busbar} + L_{terminal\_escape} \le 8\text{ nH at }1\text{ MHz}$$

* **Skin Effect Mitigation:** Interleaving the positive and negative terminals reduces current crowding at high frequencies ($10\text{ to }100\text{ kHz}$). The proximity effect forces the high-frequency current density to distribute evenly across the full width of the planar conductors rather than concentrating at the edges. This minimizes localized high-frequency skin effect hotspots and maintains a flat, stable ESR profile across the entire operating bandwidth.

---

## 4. Resin Chemistry, Potting, and Quality Assurance Testing

### 4.1 Dry PU Resin Formulation and Vacuum Casting Execution Profile

The internal active components are sealed using a dry, oil-free, highly filled Polyurethane (PU) resin. This potting compound provides insulation, structural support, and flame resistance that complies with EN 45545-2 HL3 (Requirement R23) and UL 94V-0.

* **Resin Chemical Composition:**
* **Base Polyol Component:** High-hydrophobicity, branched polyether-ester polyol matrix ($45\text{ wt}\%$).
* **Isocyanate Hardener:** Low-viscosity Modified Diphenylmethane Diisocyanate (MDI, $15\text{ wt}\%$).
* **Thermal Functional Fillers:** High-purity, synthetic Silane-treated Aluminum Trihydroxide ($\text{ATH}, \text{Al(OH)}_3$) blended with surface-treated hexagonal Boron Nitride ($\text{h-BN}$) ($40\text{ wt}\%$ total filler loading). The particle size distribution is optimized using a multimodal distribution ($d_{50} = 2\ \mu\text{m} \text{ and } 12\ \mu\text{m}$) to achieve a low casting viscosity while providing a composite thermal conductivity $\kappa \ge 0.95\text{ W/m}\cdot\text{K}$.
* The high density of ATH provides flame retardancy via endothermic dehydration ($\text{Al(OH)}_3 \rightarrow \text{Al}_2\text{O}_3 + 3\text{H}_2\text{O}$), absorbing heat and releasing water vapor above $+200^\circ\text{C}$ to suppress smoke formation.



```
[Pre-Heating Housing & Cores] ──► [Chamber Evacuation] ──► [Dynamic Meter-Mix Injection] ──► [Multi-Stage Curing]
  (Dwell: 3 hrs at +85°C)          (P <= 1 mbar for         (Resin Injected at                 (6 hrs at +80°C +
                                    35 minutes)              +45°C Base Temp)                   2 hrs post-cure)

```

* **Vacuum Casting Execution Steps:**
1. **Dehydration Preheat:** Assemble the wound matrix inside the aluminum box and bake the assembly in a convection oven at $+85^\circ\text{C}$ for 3 hours to remove moisture from the polymeric films and insulation materials.
2. **Chamber Evacuation:** Transfer the pre-heated assembly into the vacuum potting chamber. Evacuate the chamber to a deep vacuum level $P \le 1\text{ mbar}$ and hold for 35 minutes to de-gas the components and structural gaps.
3. **Dynamic Meter-Mix Injection:** Automatically mix the polyol and isocyanate components under vacuum through a static mixer. Inject the compound at a regulated mass flow rate into the lowest point of the capacitor housing at a resin temperature of $+45^\circ\text{C}$. This low temperature keeps the mixed viscosity below $1200\text{ mPa}\cdot\text{s}$, allowing the resin to completely wet out and fill the thin spaces within the winding matrix. Maintain the vacuum until the liquid level rises $5\text{ mm}$ above the upper busbar plane.
4. **Multi-Stage Curing Cycle:**
* Pressurize the chamber back to atmospheric pressure (this collapses any remaining microscopic gas bubbles).
* Transfer to the curing oven: Gelation phase for 6 hours at $+80^\circ\text{C}$.
* Post-cure phase for 2 hours at $+100^\circ\text{C}$ to fully cross-link the polymer matrix and eliminate unreacted isocyanate monomers.





### 4.2 End-of-Line Reliability & High-Temperature Accelerated Life Testing (ALT)

To validate the target operational lifetime of $\ge 200,000\text{ hours}$ at a continuous $+105^\circ\text{C}$ hotspot, units must pass an intensive validation protocol based on extended IEC 61071 standards.

```
       End-of-Line Production Pass/Fail Testing Gates
 ┌──────────────────────┐     ┌──────────────────────┐     ┌──────────────────────┐
 │ Insulation Resistance│ ──► │  Dissipation Factor  │ ──► │ Partial Discharge    │
 │ V_test = 2700 VDC    │     │  tandelta <= 2E-4    │     │ V_extinction >= 2100V│
 │ R_ins >= 10,000 MOhm │     │  at 1 kHz            │     │ Q_pd <= 10 pC        │
 └──────────────────────┘     └──────────────────────┘     └──────────────────────┘

```

#### Accelerated Life Testing (ALT) Engineering Parameters

To verify long-term reliability without running multi-decade tests, a group of 25 production-line samples is subjected to an over-stress matrix calculated using a combined voltage and thermal acceleration model:

$$A_F = A_V \cdot A_T = \left(\frac{V_{test}}{V_{rated}}\right)^n \cdot \exp\left[\frac{E_a}{k_B} \cdot \left(\frac{1}{T_{rated}} - \frac{1}{T_{test}}\right)\right]$$

* **Voltage Acceleration Exponent ($n$):** Set conservatively to $n = 8.2$ based on historical empirical testing of BOEPN thin-film structures.
* **Activation Energy ($E_a$):** Confirmed at $E_a = 0.88\text{ eV}$ for self-healing polymer degradation pathways.
* **Boltzmann Constant ($k_B$):** $8.6173 \times 10^{-5}\text{ eV/K}$.
* **Test Environment Setup:** The ALT chamber conditions are configured as follows:
* $T_{test} = +125^\circ\text{C}$ ($398.15\text{ K}$), which is a $+20\text{ K}$ over-temperature acceleration relative to the $+105^\circ\text{C}$ ($378.15\text{ K}$) rated hotspot.
* $V_{test} = 1.25 \times V_{rated} = 2250\text{ V}_{dc}$ (for the $1800\text{ V}$ variant).



#### Acceleration Factor Calculation

$$\text{Voltage Acceleration: } A_V = (1.25)^{8.2} = 6.20$$

$$\text{Thermal Acceleration: } A_T = \exp\left[\frac{0.88}{8.6173 \times 10^{-5}} \cdot \left(\frac{1}{378.15} - \frac{1}{398.15}\right)\right] = \exp[10212 \cdot 0.0001328] = 3.88$$

$$\text{Total Acceleration Factor ($A_F$): } A_F = 6.20 \times 3.88 = 24.05$$

#### Test Duration & Qualification Thresholds

To verify a design lifetime of $200,000\text{ hours}$, the minimum required duration for the accelerated test is:

$$t_{test} = \frac{200,000\text{ hours}}{24.05} = 8,316\text{ hours } (\approx 346.5\text{ days})$$

* **Interim Checkpoints:** Samples are checked at $1000\text{ hr}$ intervals.
* **End-of-Test End-of-Life (Eol) Failure Criteria:** A capacitor is marked as failed if it meets any of the following conditions during or at the conclusion of the test:
* Total capacitance shift: $\frac{\Delta C}{C_0} > -3.0\%$.
* ESR degradation: $\frac{\text{ESR}_{final}}{\text{ESR}_{initial}} > 2.0$.
* Insulation Resistance drop: $R_{ins} < 100\ \Omega\cdot\mu\text{F}$.
* Any visible housing deformation, resin cracking, or hermetic seal leakage.
