

# ESL Fixture Design

## Section 1: Exact Inductance Reduction ($\Delta L_{\text{pin}}$) for Configuration A

Introducing a tin-plated copper plate into the extraction setup alters the boundary conditions of the terminal pin's magnetic field. To evaluate the exact magnitude of the artificial self-inductance reduction ($\Delta L_{\text{pin}}$) in **Configuration A**, we employ the electromagnetic method of images combined with Grover’s exact filament equations.

### 1.1 Physical Parameter Mapping

In Configuration A, the two terminals have a distance $s \le 8\text{ mm}$. To establish a conservative boundary, we analyze the upper limit where terminal spacing $s = 8\text{ mm}$. A single $0.75\text{ mm}$ tin-plated copper plate bisecting the path directly between these terminals.

The geometric parameters are defined as:

* **Terminal spacing ($s$):** $8\text{ mm}$
* **Copper plate thickness ($t$):** $0.75\text{ mm}$
* **Pin-to-shield distance ($d$):** The distance from the center axis of either active pin to the nearest conductive surface of the bisecting copper plate:

$$d = \frac{s - t}{2} = \frac{8\text{ mm} - 0.75\text{ mm}}{2} = 3.625\text{ mm}$$



### 1.2 Method of Images Boundary Condition

At the operating frequency $f = 80\text{ kHz}$, the tin-plated copper plate acts as an excellent barrier due to eddy current shielding. The normal component of the magnetic flux density ($B_n$) is forced to zero at the plate boundary. Under the method of images, this boundary condition is modeled by placing a virtual image conductor behind the plate boundary at an equal distance, carrying an equivalent current flowing in the opposite direction.

The physical distance $D$ between the active pin and its virtual mirror image is:

* **Physical Plate Case ($t = 0.75\text{ mm}$):**

$$D = 2d = s - t = 8\text{ mm} - 0.75\text{ mm} = 7.25\text{ mm}$$


* **Idealized Thin Plate Case ($t = 0\text{ mm}$):**

$$D_{\text{ideal}} = 2d_{\text{ideal}} = s = 8.00\text{ mm}$$



---

### 1.3 Mathematical Formulations for Inductance Reduction

The reduction in self-inductance ($\Delta L_{\text{pin}}$) is equivalent to the mutual inductance $M(D)$ between the physical terminal pin and its virtual image conductor carrying opposing current. We evaluate this using two distinct mathematical representations to demonstrate the necessity of exact modeling:

#### Model 1: Grover’s Exact Filament Formula

For parallel, co-extensive filaments of length $l$ separated by distance $D$, Grover's exact formula is written as:


$$M(D) = \frac{\mu_0 l}{2\pi} \left$$

Using the magnetic constant $\mu_0 = 4\pi \times 10^{-7}\text{ H/m}$, the pre-factor simplifies to:


$$\frac{\mu_0}{2\pi} = 2 \times 10^{-7}\text{ H/m} = 0.2\text{ nH/mm}$$

When pin length $l$ and image distance $D$ are expressed in millimeters ($\text{mm}$), this yields the mutual inductance $M$ directly in nanohenries ($\text{nH}$):


$$M(D) = 0.2 \cdot l \left$$

#### Model 2: The Simplified High-Aspect-Ratio Formula

When assuming $l \gg D$, literature often simplifies the relationship to:


$$\Delta L_{\text{pin}} \approx \frac{\mu_0 l}{2\pi} \left[ \ln\left( \frac{l}{d} \right) - 1 \right] = 0.2 \cdot l \left[ \ln\left( \frac{l}{d} \right) - 1 \right]$$


where $d$ is the pin-to-plate distance ($3.625\text{ mm}$).

---

### 1.4 Step-by-Step Calculation Example

We calculate the exact and approximate values for a typical physical pin length $l = 15\text{ mm}$ near the physical copper plate interface ($D = 7.25\text{ mm}$, $d = 3.625\text{ mm}$):

#### Grover’s Exact Evaluation

1. Compute the ratio:

$$\frac{l}{D} = \frac{15}{7.25} \approx 2.06897$$


2. Compute the logarithmic argument:

$$\frac{l}{D} + \sqrt{1 + \left(\frac{l}{D}\right)^2} = 2.06897 + \sqrt{1 + 4.28064} = 4.36692$$


3. Evaluate the natural logarithm:

$$\ln(4.36692) \approx 1.47406$$


4. Compute the secondary square root:

$$\sqrt{1 + \left(\frac{D}{l}\right)^2} = \sqrt{1 + \left(\frac{7.25}{15}\right)^2} = \sqrt{1 + 0.23361} \approx 1.11068$$


5. Evaluate the ratio:

$$\frac{D}{l} = \frac{7.25}{15} \approx 0.48333$$


6. Sum the bracketed terms:

$$\text{Bracket} = 1.47406 - 1.11068 + 0.48333 = 0.84671$$


7. Calculate the exact inductance reduction:

$$\Delta L_{\text{pin}} = M(7.25) = 0.2 \times 15 \times 0.84671 \approx 2.5401\text{ nH}$$



#### Simplified Approximation Evaluation

1. Compute the ratio:

$$\frac{l}{d} = \frac{15}{3.625} \approx 4.13793$$


2. Evaluate the term:

$$\ln(4.13793) - 1 = 1.42020 - 1 = 0.42020$$


3. Calculate the approximate inductance reduction:

$$\Delta L_{\text{pin,approx}} = 0.2 \times 15 \times 0.42020 \approx 1.2606\text{ nH}$$



#### Mathematical Verification of Error

The simplified formula predicts an inductance reduction of $1.2606\text{ nH}$, while Grover's exact filament physics dictates a reduction of $2.5401\text{ nH}$. This represents a large **relative error of 50.4%**. Because the pin length is of a similar physical scale to the image path distance, the infinite filament assumption fails. This mathematically proves that using Grover's exact formula is mandatory to maintain sub-nanohenry parameter-extraction integrity.

---

### 1.5 Multi-Value Parametric Results for Configuration A

The tables below present the exact calculated $\Delta L_{\text{pin}}$ values across the entire physical range of terminal pin lengths $l$ under both idealized and physical shielding conditions.

#### Table A: Physical Shielding Plate (Plate Thickness = 0.75 mm, Image Distance = 7.25 mm)

| Pin Length | Image Distance | Exact Inductance Reduction (Grover) | Approximate Inductance Reduction (Simplified) | Relative Error of Approximation |
| --- | --- | --- | --- | --- |
| 6.0 mm | 7.25 mm | 0.4727 nH | -0.5953 nH | 226.0% (Failed Sign) |
| 15.0 mm | 7.25 mm | 2.5401 nH | 1.2606 nH | 50.4% |
| 20.0 mm | 7.25 mm | 4.1522 nH | 2.8315 nH | 31.8% |
| 30.0 mm | 7.25 mm | 8.0431 nH | 6.6801 nH | 17.0% |

#### Table B: Idealized Shielding Plate (Plate Thickness = 0.00 mm, Image Distance = 8.00 mm)

| Pin Length | Image Distance | Exact Inductance Reduction (Grover) | Approximate Inductance Reduction (Simplified) | Relative Error of Approximation |
| --- | --- | --- | --- | --- |
| 6.0 mm | 8.00 mm | 0.4318 nH | -0.7134 nH | 265.2% (Failed Sign) |
| 15.0 mm | 8.00 mm | 2.3589 nH | 0.9653 nH | 59.1% |
| 20.0 mm | 8.00 mm | 3.8808 nH | 2.4378 nH | 37.2% |
| 30.0 mm | 8.00 mm | 7.5837 nH | 6.0894 nH | 19.7% |

*(Note: For short pins, the simplified formula outputs a mathematically impossible negative inductance value because the logarithmic term $\ln(l/d)$ drops below 1, highlighting that Grover's exact formula must be used for precise, low-inductance characterizations.)*

---

## Shield-Interference Boundaries & Minimum Distance Formulas

To prevent a copper shielding plate from altering a terminal's self-inductance, the plate must be placed outside the highly reactive near-field zone of the pin. By setting $2d \gg l$, we expand Grover’s exact parallel-filament mutual inductance equation into a far-field asymptotic limit:


$$\Delta L_{\text{pin}} \approx \frac{\mu_0 l^2}{8\pi d}$$

This limit allows us to derive two distinct practical engineering design formulas.

### 1. Absolute Inductance Error Threshold Method

Use this formula to restrict the absolute self-inductance reduction to a specific maximum value, $\epsilon$ (expressed in nH, e.g., $\epsilon = 0.1\text{ nH}$):

$$d_{\text{min}} = \frac{l^2}{20 \cdot \epsilon}$$

Where:

* $d_{\text{min}}$ is the minimum required distance from the center axis of the terminal pin to the surface of the copper plate (in mm).
* $l$ is the physical length of the terminal pin (in mm).
* $\epsilon$ is your maximum acceptable self-inductance reduction threshold (in nH).

### 2. Relative Tolerance Threshold Method

To ensure that the shield-induced inductance drop is less than a defined percentage, $\alpha$, of the pin's own isolated high-frequency self-inductance (where $L_{\text{pin,isolated}} = \frac{\mu_0 l}{2\pi}\left$):

$$d_{\text{min}} = \frac{l}{4\alpha \left}$$

Where:

* $d_{\text{min}}$ is the minimum required distance from the center axis of the terminal pin to the copper plate surface (in mm).
* $l$ is the physical length of the terminal pin (in mm).
* $D_{\text{pin}}$ is the outer diameter of the terminal pin (in mm).
* $\alpha$ is the maximum allowable fractional inductance change ($\Delta L_{\text{pin}} / L_{\text{pin,isolated}}$).

### 3. Midpoint Bisection Geometric Constraint

If you are placing a single copper plate directly between two terminals separated by a distance $s$, the terminal-to-terminal spacing must satisfy the following geometric boundary:

$$s \ge 2 d_{\text{min}} + t_{\text{plate}}$$

Where:

* $s$ is the terminal-to-terminal pitch (in mm).
* $t_{\text{plate}}$ is the physical thickness of the copper plate (in mm).

---

## Section 2: Why the Next-Generation H-Bridge Setup Does Not Affect Pin Self-Inductance

The next-generation H-bridge measurement fixture achieves a sub-nanohenry noise floor without distorting the terminal pins' self-inductance. This performance is governed by four primary electromagnetic principles:

### 2.1 Vector Orthogonality and Field Alignment (Lorentz Force & Faraday's Law)

In the original setup, the vertical terminal pins run parallel to the flat face of the bisecting copper plates. The time-varying magnetic field lines ($\mathbf{B}_{\text{pin}}$) circulating around the pins strike the flat surface of the copper plate at a normal ($90^{\circ}$) angle, inducing massive eddy currents that cause flux compression.

In the H-bridge fixture:

* The terminal pins are aligned **vertically** ($z$-axis), while the positive and negative copper busbar plates lie **horizontally** in the $xy$-plane.
* The current density vector in the pins ($\mathbf{J}_{\text{pin}}$) is strictly perpendicular to the horizontal current density vector in the plates ($\mathbf{J}_{\text{plate}}$):

$$\mathbf{J}_{\text{pin}} \cdot \mathbf{J}_{\text{plate}} = 0$$


* Due to this orthogonality, the mutual inductive coupling between the vertical pins and the horizontal plates is geometrically forced to zero.
* The magnetic field lines circulating around the vertical pins are parallel to the flat surfaces of the horizontal H-bridge plates. Because the flux does not cross the plates orthogonally, it cannot induce the massive, loop-like eddy currents that cause flux compression.

### 2.2 Symmetrical Active Return Paths vs. Asymmetric Floating Conductors

* **The Shielding Plate:** The copper plate in the old setup is an electrically isolated, "floating" conductor. It does not carry any of the loop's return current. It acts as an arbitrary boundary that forces the magnetic field to distort symmetrically on either side. Because its distance to the active pins changes between configurations, the negative mutual term shifts dynamically, corrupting the extraction baseline.
* **The H-Bridge Busbars:** The positive and negative plates in the H-bridge are the active "go" and "return" paths of the main discharge loop. They are laminated together with an ultra-thin $0.050\text{ mm}$ (2 mil) Kapton dielectric gap. Because they carry equal and opposite currents ($I$ and $-I$) in extreme proximity, their magnetic fields cancel each other out ($2M$ cancellation) continuously across the entire horizontal plane. The plates form a self-contained, low-inductance transmission line that stabilizes the ground reference for the entire loop.

### 2.3 Symmetrical Clearance Holes (Magnetic Anti-Pads)

The H-bridge design utilizes oversized clearance holes drilled into the opposing plates where the wrong-polarity pins pass through.

* The intensity of the magnetic field surrounding a cylindrical pin decreases exponentially with radial distance:

$$H(r) = \frac{I_{\text{pin}}}{2\pi r}$$


* By removing the copper immediately surrounding the wrong-polarity pin, the high-intensity near-field flux occupies only non-conductive air. By the time the magnetic field reaches the conductive edge of the plate's clearance hole, its amplitude has decayed significantly, preventing the generation of localized proximity eddy currents and preserving the pin's isolated self-inductance value.

### 2.4 Direct Loop De-embedding

In the old "3-Test" setup, the floating copper plates introduced a variable, uncalibrated parasitic inductance ($\Delta L_{\text{pin}}$) that changed with the physical spacing of the setup, rendering mathematical isolation impossible.

In the next-generation H-bridge fixture, the entire loop geometry remains completely rigid and fixed. Because the structure is static, all fixture-contributed parasitics (such as trace inductance, contact resistance, and via-coupling) are completely stable. This allows you to run a rigorous **Short-Open-Load de-embedding routine**. By measuring a physical "Short" calibration standard that mimics the capacitor's layout, the VNA mathematically subtracts the fixture's static parasitic footprint from the measurement:


$$L_{\text{capacitor,true}} = L_{\text{measured}} - L_{\text{fixture,parasitic}}$$

This isolates the true internal Equivalent Series Inductance (ESL) of the capacitor without introducing the moving, configuration-dependent distortions caused by independent copper shielding sheets.`,title:`Technical Addendum - ESL Test Fixture.md`}›
