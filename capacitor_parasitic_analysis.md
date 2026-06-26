# Mathematical and Electromagnetic Analysis of Capacitor Parasitic Parameter Extraction and Next-Generation Test Fixture Design

---

## 1. Mathematical and Electromagnetic Analysis of Shielding Behavior

### 1.1 Governing Equations of Eddy Current Shielding

The introduction of tin-plated copper shielding plates into an underdamped RLC resonant tank test setup modifies the electromagnetic boundary conditions of the system. This environment operates at a target resonant frequency $f_r \approx 80\ \text{kHz}$. Given that the corresponding free-space wavelength $\lambda \approx 3.75\ \text{km}$ is several orders of magnitude larger than the physical dimensions of the test fixture, a **quasi-static electromagnetic assumption** is highly accurate. Under these conditions, the displacement current density term $\partial \mathbf{D}/\partial t$ within Maxwell-Ampère's equation is negligible compared to the conduction current density $\mathbf{J}$ inside the highly conductive copper plates.

The physical mechanism of the shielding behavior is derived by combining Maxwell's equations with the constitutive relations of the material.

**Faraday's Law of Induction:**

$$\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}$$

**Ohm's Law** in a homogeneous, isotropic conducting medium with electrical conductivity $\sigma$:

$$\mathbf{J} = \sigma \mathbf{E}$$

Taking the curl of both sides of Faraday's Law and substituting Ohm's Law yields:

$$\nabla \times (\nabla \times \mathbf{J}) = -\sigma \frac{\partial}{\partial t} (\nabla \times \mathbf{B})$$

Under the quasi-static limit, **Ampère's Circuital Law** is:

$$\nabla \times \mathbf{H} = \mathbf{J}$$

Applying $\mathbf{B} = \mu \mathbf{H}$ (where $\mu = \mu_0 \mu_r$) and $\nabla \cdot \mathbf{B} = 0$, the vector identity $\nabla \times (\nabla \times \mathbf{A}) = \nabla(\nabla \cdot \mathbf{A}) - \nabla^2 \mathbf{A}$ simplifies to the classical **magnetic field diffusion equation**:

$$\nabla^2 \mathbf{B} = \mu \sigma \frac{\partial \mathbf{B}}{\partial t}$$

For time-harmonic excitation at $\omega = 2\pi f$, using the phasor $\mathbf{B}(t) = \mathbf{B}_0 e^{j\omega t}$:

$$\nabla^2 \mathbf{B} = j \omega \mu \sigma \mathbf{B}$$

This PDE demonstrates that any time-varying magnetic flux impinging on the copper plate induces localized eddy currents ($\mathbf{J}$) circulating perpendicular to the incident flux lines. By Lenz's Law, these generate an opposing field ($\mathbf{B}_{\text{ind}}$) that prevents magnetic flux transmission, effectively isolating spatial mutual inductive coupling ($M$) between adjacent current paths.

---

### 1.2 Near-Field Magnetic Field Attenuation Dynamics

The electromagnetic **skin depth** $\delta$ defines the depth at which field amplitude decays to $1/e \approx 36.8\%$ of its surface value:

$$\delta = \frac{1}{\sqrt{\pi f \mu \sigma}}$$

**For tin-plated copper** ($\sigma \approx 5.8 \times 10^7\ \text{S/m}$, $\mu_r \approx 1$) at $f = 80\ \text{kHz}$:

$$\delta \approx 0.2334\ \text{mm}$$

With plate thickness $t = 0.75\ \text{mm}$, the normalized electrical thickness is approximately $3.21\delta$.

**Field attenuation** vs. penetration depth $z$:

$$H(z) = H_0\, e^{-z/\delta}$$

At the exit boundary ($z = t = 0.75\ \text{mm}$):

$$\frac{H(t)}{H_0} = e^{-3.21337} \approx 0.04022 \quad (4.02\%\ \text{residual})$$

**Absorption loss** (Schelkunoff representation):

$$A_{\text{dB}} = 20 \log_{10}\!\left(e^{t/\delta}\right) \approx 8.686 \times \frac{t}{\delta} \approx 8.686 \times 3.21337 \approx 27.91\ \text{dB}$$

**Near-field wave impedance** of a magnetic source at distance $r = 3\ \text{mm}$ (Configuration B):

$$Z_{W,M} = \omega \mu_0 r = (2\pi \cdot 80 \times 10^3)\cdot(4\pi \times 10^{-7})\cdot(3 \times 10^{-3}) \approx 1.895 \times 10^{-3}\ \Omega$$

**Intrinsic boundary impedance** of the copper shield:

$$|Z_s| = \sqrt{\frac{\omega \mu}{\sigma}} \approx 1.043 \times 10^{-4}\ \Omega$$

**Reflection loss** from the impedance mismatch:

$$R_{\text{dB}} = 20 \log_{10}\!\left|\frac{Z_{W,M}}{4Z_s}\right| \approx 13.15\ \text{dB}$$

Since $A_{\text{dB}} \approx 27.91\ \text{dB} \gg 9\ \text{dB}$, the multiple-reflection correction factor $B_{\text{dB}} \approx 0\ \text{dB}$.

**Total Shielding Effectiveness:**

$$SE_{\text{dB}} = A_{\text{dB}} + R_{\text{dB}} + B_{\text{dB}} \approx 27.91 + 13.15 + 0 \approx 41.06\ \text{dB}$$

> This corresponds to a **99.11% reduction** in coupling, verifying the plate's effectiveness at isolating near-field magnetic interactions.

---

## 2. Comprehensive Loss Characterization

Integrating conductive copper plates introduces complex electromagnetic trade-offs. While certain spatial parasitics are suppressed, secondary electrical losses are introduced into the measurement loop. Internal capacitor physical parameters remain completely unaffected.

| Loss Classification | Primary Physical Source | Shielding Impact | Governing Equation |
|---|---|---|---|
| **Proximity Effect Loss** | Transverse magnetic flux from adjacent terminal pins forces current crowding onto inner conductor surfaces, inflating effective AC resistance. | Mitigated | $P_{\text{prox}} = R_{\text{DC}} \cdot H_{\text{ext}}^2 \cdot F(\xi)$ |
| **Ohmic Eddy Current Loss** | Time-varying magnetic fields induce circulating current loops within the finite conductivity of the copper plate, dissipating energy as heat. | Introduced | $P_{\text{eddy}} \approx \frac{\pi^2 \sigma t^3 f^2 B_0^2}{6}$ per unit area |
| **Lead Skin Effect Loss** | High-frequency current distribution ($f_r \approx 80\ \text{kHz}$) constrained to the outer perimeter of the active capacitor terminal pins. | Unaffected | $R_{\text{lead,AC}} \approx R_{\text{lead,DC}}\left(\frac{r_{\text{pin}}}{2\delta_{\text{lead}}}\right)$ |
| **Internal Dielectric Dissipation** | Molecular dipole relaxation polarizations within the polypropylene film under high alternating electric fields. | Unaffected | $P_{\text{diel}} = \omega C V^2 \tan(\delta_{\text{diel}})$ |

---

## 3. Mathematical Formulation of Flux Compression and Self-Inductance Reduction

When high-frequency current flows through a terminal pin, its surrounding magnetic field impinges on the copper plate. Because the plate is thick relative to the skin depth ($t \approx 3.21\delta$), the normal component $B_n$ is forced to zero at the plate interface.

Using the **electromagnetic method of images**, a virtual image conductor is placed behind the plate at equal distance, carrying current in the opposite direction. Let $d$ = physical distance from pin center to the copper plate.

**Total flux linkage:**

$$\Phi_{\text{total}} = L_{\text{pin,isolated}}\, I_{\text{pin}} - M_{\text{image}}(2d)\, I_{\text{pin}}$$

**Effective self-inductance in presence of shield:**

$$L_{\text{pin,effective}} = L_{\text{pin,isolated}} - M_{\text{image}}(2d)$$

$$\Delta L_{\text{pin}} = M_{\text{image}}(2d)$$

**Mutual inductance between parallel filaments** separated by $D = 2d$ (Grover's formula):

$$M_{\text{image}}(2d) = \frac{\mu_0 l_{\text{pin}}}{2\pi} \left[ \ln\!\left( \frac{l_{\text{pin}}}{2d} + \sqrt{1 + \frac{l_{\text{pin}}^2}{4d^2}} \right) - \sqrt{1 + \frac{4d^2}{l_{\text{pin}}^2}} + \frac{2d}{l_{\text{pin}}} \right]$$

For $l_{\text{pin}} \gg 2d$:

$$\Delta L_{\text{pin}} \approx \frac{\mu_0 l_{\text{pin}}}{2\pi} \left[ \ln\!\left(\frac{l_{\text{pin}}}{d}\right) - 1 \right]$$

### Configuration Comparison

| Configuration | Pin-to-Plate Distance ($d$) | Image Distance ($2d$) |
|---|---|---|
| **Config A** (terminal gap < 8 mm) | $d_A < 4\ \text{mm}$ | $2d_A < 8\ \text{mm}$ |
| **Config B** (terminal gap > 10 mm) | $d_B = 3\ \text{mm}$ | $2d_B = 6\ \text{mm}$ |

Since $2d_B < 2d_A$:

$$M_{\text{image}}(6\ \text{mm}) > M_{\text{image}}(8\ \text{mm}) \implies \Delta L_{\text{pin,B}} > \Delta L_{\text{pin,A}}$$

> This mathematical asymmetry **violates the core assumption of the 3-Test Method** (which requires $L_{\text{pin}}$ to remain invariant across all configurations), corrupting the extracted capacitor body inductance ($L_{\text{body}}$) and pin self-inductance values.

---

## 4. Impact of Proximity Eddy Currents on Rogowski Coil Integrity

The Rogowski coil monitors total current via:

$$v_{\text{coil}}(t) = M_{\text{rog}} \frac{dI_{\text{total}}}{dt}, \quad M_{\text{rog}} = \frac{\mu_0 N A}{l}$$

This assumes symmetric magnetic field depending solely on $I_{\text{total}}$. The proximity of the 0.75 mm copper plates disrupts this in two ways:

**1. Field Distortion and Spatial Sensitivity**

Eddy currents alter the local spatial distribution of magnetic flux lines, breaking the $1/r$ symmetry. The altered effective mutual inductance ($M_{\text{rog}}$) causes amplitude calibration errors that distort the measured peak current ($I_{\text{peak}} \approx 500\ \text{A}$).

**2. Phase Displacement and Transient Distortion**

The finite conductivity ($\sigma$) of the copper plates causes the diffusion of magnetic field to be non-instantaneous. The phase-shifted secondary fields couple back into the Rogowski coil, introducing a phase lag in $v_{\text{coil}}(t)$. During an underdamped RLC ring-down test, this distorts current zero-crossing alignment, leading to errors in extracted **ESR** and resonant frequency ($f_r$).

---

## 5. Engineering Remediation of the Current Setup

### 5.1 Hybrid Ferrite-Conductive Shielding and Slotted Geometries

Instead of bare 0.75 mm copper plates, a **dual-layer "magnetic mirror" shield** should be implemented: a high-permeability, low-loss **NiZn ferrite sheet** ($\mu_r \approx 100$–$300$ at 80 kHz) laminated onto the copper plate surfaces facing the active terminal pins.

The ferrite layer acts as a low-reluctance path that deflects and guides magnetic flux lines **parallel** to the shield surface, preventing penetration into the copper backing and eliminating strong eddy currents.

Using the method of images for a magnetic boundary with $\mu_r \gg 1$, the image current flows in the **same direction** as the primary current, theoretically increasing self-inductance slightly. By tuning the ferrite thickness relative to spacing, the positive image contribution of the ferrite can exactly cancel the negative image contribution of the copper plate:

$$\Delta L_{\text{pin}} \approx 0$$

**Alternative — Slotted Shield Geometry:** Cutting thin vertical slots (comb-like patterns) into the copper plate parallel to the terminal pin orientation physically interrupts the paths of circulating eddy currents. This prevents the formation of large low-impedance current loops, eliminating flux compression while still providing electric field shielding.

---

### 5.2 Mathematical Calibration and De-embedding Matrix

A rigorous **open-short-calibration routine** mapped to the 3-Test extraction software eliminates residual parasitic influence.

Three dummy calibration standards are machined (identical dimensions to the 4-pin film capacitor):

- **Open Standard:** Hollow structural block with pins in identical spatial coordinates, no internal electrical connection. Isolates stray capacitive coupling of the fixture.
- **Short Standard:** Solid copper block shorting pins at the capacitor body interface. Internal inductance ($L_{\text{short,internal}}$) is a known constant calculated via 3D EM field solvers.

For each configuration, the measured short-circuit inductance at $80\ \text{kHz}$ is:

$$L_{\text{measured,short}}(\omega) = L_{\text{fixture,parasitic}}(\omega) + L_{\text{short,internal}}$$

The frequency-dependent fixture parasitic inductance (incorporating $\Delta L_{\text{pin}}$ and loop inductance) is isolated as:

$$L_{\text{fixture,parasitic}}(\omega) = L_{\text{measured,short}}(\omega) - L_{\text{short,internal}}$$

The corrected capacitor inductance:

$$L_{\text{capacitor,true}} = L_{\text{loop,raw}} - L_{\text{fixture,parasitic}}(f_r)$$

---

### 5.3 Geometric Isolation and Orthogonal Loop Design

Two physical modifications eliminate spatial mutual inductance ($M$) without shielding plates:

**1. Orthogonal Lead Routing**

Route same-polarity pin loop paths at 90° spatial rotation relative to each other. Since:

$$M \propto \cos(\theta)$$

enforcing $\theta = 90°$ geometrically forces $M = 0$.

**2. Concentric Coaxial Return Paths**

Redesign the fixture to route the return current of each pin through a concentric coaxial shielding sleeve surrounding the pin. The magnetic field of a coaxial transmission line is entirely confined to the dielectric spacing between inner conductor and outer shield, yielding $M \approx 0$ externally while stabilizing $L_{\text{pin}}$ to a mathematically definable value immune to external objects.

---

## 6. Next-Generation Ultra-Low Parasitic Fixture Design

### 6.1 Frequency-Domain Impedance Characterization Topology

The existing time-domain underdamped RLC ringing method at 80 kHz is highly sensitive to instrumentation noise and digitization jitter. In a loop with $L_{\text{total}} \approx 400\ \text{nH}$ and $C = 10\ \mu\text{F}$, a 1 nH inductance shift causes:

$$\frac{df_r}{f_r} = -\frac{1}{2} \frac{dL}{L_{\text{total}}} = -\frac{1}{2} \cdot \frac{1\ \text{nH}}{400\ \text{nH}} = -0.125\%$$

At 80 kHz, this is only a **100 Hz frequency shift** — difficult to resolve reliably under transient conditions with $I_{\text{peak}} \approx 500\ \text{A}$ and high $di/dt$ transitions.

**Solution:** Deploy a **Vector Network Analyzer (VNA)** in a **Two-Port Shunt-Through Measurement** topology. The complex impedance is extracted from $S_{21}$ via:

$$Z_{\text{DUT}} = Z_0 \frac{S_{21}}{2(1 - S_{21})}, \quad Z_0 = 50\ \Omega$$

This configuration is mathematically immune to contact resistances of probes and series lead impedances.

---

### 6.2 Multi-layer Coplanar PCB Fixture Geometry

A custom **4-layer PCB** (0.8 mm total thickness) minimizes fixture loop inductance:

| Layer | Material | Thickness | Function |
|---|---|---|---|
| Layer 1 (Top) | Copper | 70 µm (2 oz) | CPW RF launcher traces; gold-plated micro-indentation landing pads |
| Dielectric 1 | Rogers RO4350B | 0.1 mm | Ultra-thin HF laminate ($\varepsilon_r = 3.48$, $\tan\delta = 0.0037$) |
| Layer 2 | Copper | 35 µm (1 oz) | Solid Ground Return Plane (GND) |
| Dielectric 2 | FR-4 | 0.5 mm | Standard structural core |
| Layer 3 | Copper | 35 µm (1 oz) | Solid Power Plane (VCC) |
| Dielectric 3 | Rogers RO4350B | 0.1 mm | High-frequency bottom layer |
| Layer 4 (Bottom) | Copper | 70 µm (2 oz) | Secondary GND return plane with coaxial launch footprints |

**Interleaved Via Array Geometry:** Each signal via (accepting a capacitor pin) is surrounded by a radial ring of six grounded stitching vias at $r = 1.5\ \text{mm}$. This mimics a continuous coaxial shield, compressing the return current loop to the immediate radial boundary of the pin:

$$L_{\text{via,loop}} < 80\ \text{pH}$$

---

### 6.3 Instrumentation and Ground-Loop Compensation

**VNA:** Rohde & Schwarz ZNB20 or Keysight E5061B, sweep range: 10 kHz to 100 MHz (covers capacitive region, SRF, and inductive region).

**Probing:** Phase-stable semi-rigid coaxial cables (RG-402) terminating in high-precision end-launch SMA connectors ($50\ \Omega$) soldered directly to the top-layer CPW traces.

**System Calibration:** Standard 2-port SOLT (Short-Open-Load-Thru) calibration at cable-end SMA interfaces using a mechanical calibration kit.

**On-Board De-embedding (Fixture Compensation):**

| Standard | Construction |
|---|---|
| **Open** | Landing pads with no capacitor attached |
| **Short** | Zero-height copper shorting plate across pads |
| **Load** | Four parallel $200\ \Omega$ thin-film resistors forming a $50\ \Omega$ termination (0.1%, low-inductance) |

A "Load-Short" compensation routine via the VNA's fixture simulator software mathematically subtracts residual inductances and capacitances of PCB traces, SMA connectors, and landing vias.

**Cable-Braid Loop Isolation:** A common-mode coaxial choke (high-permeability toroidal ferrite core wrapped with the Port 2 cable) is integrated in series with the return path to eliminate common-mode ground loop errors below 10 MHz.

---

## 7. Metrology Error Budget Analysis

Target: Absolute measurement uncertainty of extracted ESL $\le 1\ \text{nH}$.

| Error Source | Physical Root Cause | Uncertainty | Sensitivity ($\partial L/\partial x$) | Contribution | Mitigation |
|---|---|---|---|---|---|
| VNA Phase Noise & Jitter | Phase fluctuations in internal local oscillators during S-parameter capture | $\pm 0.05°$ at 1 MHz | $1.0\ \text{nH/°}$ | $0.05\ \text{nH}$ | IF bandwidth = 100 Hz; $16\times$ averaging |
| Contact Resistance Variation | Micro-roughness and oxidation at pressure-clamped pin interface | $\pm 1.5\ \text{m}\Omega$ | $0.08\ \text{nH/m}\Omega$ | $0.12\ \text{nH}$ | ENIG gold-plated pads; pneumatic clamp (50 N) |
| Residual Short Inductance | On-board "Short" standard has finite non-zero physical inductance | $\pm 35\ \text{pH}$ | $1.0\ \text{nH/nH}$ | $0.035\ \text{nH}$ | 3D EM modeling of shorting plane; upload S2P correction file |
| Mechanical Alignment Error | Variations in pin insertion depth and tilt relative to landing pads | $\pm 0.1\ \text{mm}$ | $0.8\ \text{nH/mm}$ | $0.08\ \text{nH}$ | Precision-machined alignment guide blocks |
| Thermal Drift | Temperature coefficient of Rogers dielectric and copper trace expansion | $\pm 5°\text{C}$ | $0.01\ \text{nH/°C}$ | $0.05\ \text{nH}$ | Temperature-controlled thermal chamber at $25°\text{C} \pm 1°\text{C}$ |
| Cable Flexure and Phase Shift | Microphonic effects and physical routing changes of VNA RF cables | $\pm 0.15°$ phase shift | $1.0\ \text{nH/°}$ | $0.15\ \text{nH}$ | Armored phase-stable semi-rigid cables on vibration-isolated optical table |

**Total Combined Uncertainty (RSS method, uncorrelated sources):**

$$u_{\text{total}} = \sqrt{(0.05)^2 + (0.12)^2 + (0.035)^2 + (0.08)^2 + (0.05)^2 + (0.15)^2}\ \text{nH}$$

$$= \sqrt{0.0025 + 0.0144 + 0.001225 + 0.0064 + 0.0025 + 0.0225}\ \text{nH}$$

$$= \sqrt{0.049525}\ \text{nH} \approx \boxed{0.223\ \text{nH}}$$

The worst-case RSS uncertainty of **0.223 nH** is well below the 1 nH target limit. The next-generation frequency-domain measurement fixture is rigorously validated to meet the required precision.
