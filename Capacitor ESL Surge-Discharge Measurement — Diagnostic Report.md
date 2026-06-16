# Capacitor ESL Surge-Discharge Measurement — Diagnostic Report

**Subject:** Resolving a 20× discrepancy between time-domain surge-discharge ESL measurement and impedance-analyzer ESL measurement, and corrective actions taken.

**Method reference:** TDK/EPCOS "Capacitor Inductance Measurement Based on Low Voltage Surge Discharge Method" (Report 69, Ed. 1, F. Rodríguez, 08-11-2017).

---

## 1. Problem Statement

Two independent measurements of the same film capacitor's internal parasitic inductance (ESL, $L_c$) disagreed by roughly 20×:

| Method | Result |
|---|---|
| Impedance analyzer (Keysight E4990A) | ≈ 19 nH |
| Time-domain surge-discharge calculation (initial setup) | ≈ 396.35 nH |

The objective was to identify whether this gap was real physics or a measurement/setup artifact, and to correct the test methodology accordingly.

---

## 2. Governing Equations (TDK Method)

$$e^{aT} = \frac{I_{p1}}{I_{p2}} \qquad a = \frac{R}{2L} \qquad \omega_0 = \sqrt{\omega_r^2 + a^2} \qquad \omega_0 = \frac{1}{\sqrt{LC}} \qquad \frac{V_1}{V_c} = \frac{L_c}{L}$$

Where $L = L_d + L_c$ (discharger/fixture inductance + capacitor's own inductance), $R = R_d + R_c$, $\omega_r = 2\pi/T$.

---

## 3. Initial (Flawed) Test — Root Cause Analysis

### 3.1 Initial Data

| Parameter | Value |
|---|---|
| $C$ | 0.33 µF |
| $V_c$ | 313 V |
| $I_{p1}$ | 165 A |
| $I_{p2}$ | 79 A |
| $T$ | 3.20 µs |
| $V_1$ | 160 V |
| $V_2$ | 153 V |
| **Calculated $L$** | 775.353 nH |
| **Calculated $L_c$** | **396.346 nH** |

The arithmetic was confirmed correct. The 20× gap against the analyzer's 19 nH was therefore attributed to setup/topology, not calculation error.

### 3.2 Diagnosed Causes (ranked by severity)

1. **Probe placement error (dominant cause).** The voltage probe tip was on Terminal 2 (switched node) and the alligator ground clip was on the *switch's* common ground — not on the capacitor body. This caused the $V_1/V_c = L_c/L$ formula to lump into "$L_c$" everything physically between those two points:
   - True internal capacitor ESL (~19 nH)
   - The elongated, 90°-bent terminal lead routed through the Rogowski coil
   - Interconnecting wires/busbar from terminal to switch
   - The mercury switch housing's internal parasitic path
   - Contact inductance at the alligator clip

   This is a topological/definitional error: the formula isolates whatever is *between the two probe contact points*, not "the capacitor" — and the probe contacts were not on the capacitor.

2. **Ghost inductance (mutual coupling).** The open loop area formed by the stretched, unshielded alligator ground lead picks up $V = M\frac{di}{dt}$ from the high-$di/dt$ discharge current in adjacent conductors, adding directly to the measured $V_1$ and inflating $L_c$ further.

3. **AC-coupled Rogowski coil baseline droop.** AC coupling on the current channel forces equal positive/negative integrated area, distorting $I_{p1}/I_{p2}$ and skewing $\alpha$ (and thus total $L$) — a secondary, smaller-magnitude error than #1.

4. **Mercury-arc dynamics (§4.3 of source doc) — ruled out as an explanation for the 20× gap.** This effect concerns waveform cleanliness/SNR at high di/dt, not where parasitic inductance gets allocated in the $L_c/L$ split. It does not explain the magnitude of the discrepancy.

### 3.3 Corrective Action Specified

- **Alligator ground clip:** moved to Terminal 1 (permanently-charged rail terminal), as close to the capacitor body as physically possible — not on the supply rail, not on switch ground.
- **Probe tip:** placed directly on Terminal 2, on the capacitor side of the 90° bend — before the lead enters the Rogowski coil / switch path.
- Both leads kept as short as possible to avoid reintroducing the ghost-inductance loop.
- Trigger and Rogowski coil setup left unchanged; only the voltage probe's two contact points were relocated.

---

## 4. Ancillary Technical Questions Resolved

### 4.1 Probe voltage rating (300 V continuous)
No universal answer — depends on the specific probe's printed/datasheet rating. Two things must be checked individually:
- **Max input voltage rating** (often listed with a CAT rating, e.g. "300V CAT II"). Standard 10× probes are typically rated 300–600 V; 1× probes are often only ~150–200 V or less.
- **Continuous vs. transient rating** — some cheap probes only specify peak/transient tolerance, not continuous working voltage. Don't assume; check the markings/datasheet.
- Scope channel's own input rating should also be checked, though with a 10× probe the channel only sees a fraction of the applied voltage.

### 4.2 Running the test at lower voltage (avoiding mercury arc)
**Conclusion: yes, and it's the recommended approach.** The TDK procedure itself specifies 4–20 V for clean waveforms. Lower voltage avoids the failure mode in §4.3 (vapor-phase arc trapping due to high fixture inductance at high voltage/field). The $L$/$L_c$ math is voltage-independent — $\alpha$, $\omega_0$, and $V_1/V_c$ derive from waveform shape and ratios, not absolute magnitude — so accuracy is not degraded by testing at lower voltage. $I_{p1}$ drops proportionally ($I_{p1} = V_c\sqrt{C/L}$), but stays in a measurable range.

### 4.3 "Without mercury arc, discharge isn't instantaneous" — corrected
This is based on a mistaken premise. Mercury-wetted relays achieve fast, clean, bounce-free closure via the wetted-contact mechanism itself — not via arcing. The arc discussion in the source material describes a *failure mode* (large fixture inductance → slow di/dt → contacts trapped in vapor-arc state before the liquid bridge forms), not a requirement that arcing is necessary for fast switching. Contact closure time is largely voltage-independent (relay-design-dependent, ns–low-µs range); current rise time is set by loop inductance and $V_c/L$, not arc presence. Low voltage is the *safer* regime for avoiding the arc-trapping failure mode, not a riskier one.

### 4.4 Tight-space probe connection — clip on discharge side, tip on high-voltage side?
**Rejected.** This breaks the reference consistency of the measurement, not just convenience. Scope ground / Channel 1 reference / trigger all sit at the switch-ground side, which is only at a stable potential *after* the switch closes. Terminal 2 (switched node) is part of the oscillating RLC response during the transient — clipping ground there means the "ground" reference itself moves with the ringing waveform, breaking the assumption that $V_1$ and $V_c$ are referenced to a fixed ground. Fix for tight space: shorten both leads; do not swap which terminal gets which contact.

---

## 5. Oscilloscope Capture Review (Image Analysis)

An oscilloscope photo was reviewed showing CH1 (current, yellow, 50 A/div) and CH2 (voltage, blue, 50 V/div) both pinned flat before and between transitions, with a sharp simultaneous drop and undershoot, followed by separated ring-down.

**Findings:**
- The flat segments are consistent with clipping/saturation or a multi-segment/Stop-mode capture rather than a single clean transient — the waveform shape did not match the expected single-drop, single-ringdown TDK profile.
- **Scale label conflict identified:** the display showed both "CH2 50.0V" and "CH2 / 200mV" simultaneously — an unresolved inconsistency that invalidates any voltage readings taken from that capture until clarified.
- Timebase (5 µs/div) vs. displayed marker position (M Pos: 4.200 ms) suggested a scope mode mismatch (possible Stop-mode multi-event display rather than single-shot acquisition).
- **Action required (still open):** confirm scope trigger mode (single-shot/Normal per procedure, not free-run/Stop with overlapping captures) and resolve the CH2 V/div label conflict before trusting any voltage data from that setup.

---

## 6. Second Test Run — Data and Critical Finding

### 6.1 Reported Data and Setup

| Parameter | Value |
|---|---|
| $I_{p1}$ | 132 A |
| $I_{p2}$ | 51 A |
| $T$ | 3.280 µs |
| $V_c$ | 258 V |
| $V_1$ | 19.7 V |
| $V_2$ | 238 V |
| $C$ (as reported) | 314.83 µF |
| **Reported $L$** | 846.2047 nH |
| **Reported $L_c$** | 64.613 nH |

**Setup change:** alligator clip moved to the supply busbar (correct side — Terminal 1), but several cm away from the capacitor body rather than directly on it. Probe tip placed at the discharge terminal (Terminal 2), before the bend — correct, per prior corrective guidance.

**Operating voltage note:** user reports the switch only produces a correct waveform above ~250 V; test was run at 258 V on that basis (assumed correct for the purposes of this analysis, root cause not yet diagnosed).

### 6.2 Verification of Calculations

Recomputing from the raw inputs:
- $\alpha = \frac{1}{T}\ln(I_{p1}/I_{p2}) \approx 290{,}049$ rad/s
- $\omega_r = 2\pi/T \approx 1{,}915{,}605$ rad/s
- $\omega_0 = \sqrt{\omega_r^2+\alpha^2} \approx 1{,}937{,}450$ rad/s

Using the **reported** $C = 314.83\ \mu\text{F}$:
$$L = \frac{1}{\omega_0^2 C} \approx 0.846\ \text{nH}$$

This does **not** match the reported $L = 846.2047$ nH — it is off by a factor of exactly **1000×**.

**Critical finding:** For $L = 846.2$ nH to be self-consistent with the other inputs, $C$ must actually be **0.31483 µF (314.83 nF)**, not 314.83 µF. This is a decimal-place/unit transcription error in the reported capacitance value (or the calculation used a different, uncited $C$). This must be resolved — re-measure $C$ on a calibrated instrument and confirm the correct value — before the result can be considered valid or shown to anyone.

### 6.3 Assuming the Corrected C (0.31483 µF), Result Assessment

With the self-consistent reading ($L \approx 846.2$ nH, $L_c \approx 64.6$ nH):

| Comparison | Value |
|---|---|
| Impedance analyzer ESL | ~19 nH |
| New surge-discharge $L_c$ | ~64.6 nH |
| Residual gap | ~3.4× (down from ~20×) |

This represents a substantial, real improvement attributable to correcting probe placement. The remaining ~3.4× gap is most plausibly explained by the residual lead length between the alligator clip and the capacitor terminal (a few cm of bare conductor can easily contribute tens of nH), not by any deeper physical effect.

### 6.4 Consistency Check
$V_1 + V_2 = 19.7 + 238 = 257.7\ \text{V} \approx V_c = 258\ \text{V}$ — consistent, as expected for the inductive/resistive voltage-drop decomposition.

---

## 7. Outstanding Items Before This Method Can Be Considered Closed

1. **Resolve the capacitance unit/decimal error.** Re-measure $C$ on a calibrated LCR/component analyzer at low frequency; document instrument and conditions.
2. **Re-run with the alligator clip directly on the Terminal 1 lug**, zero slack — eliminate the busbar gap entirely rather than estimating its contribution.
3. **Repeat the test 3–5 times minimum** at fixed voltage for repeatability (mean ± std. dev. on $L_c$); a single shot is not a measurement.
4. **Run the simulation cross-check** (per TDK §5 of the source method): build the RLC model with final $L$, $C$, $R$, simulate the discharge waveform, and overlay against the real capture. TDK's own worked example achieved <1.5% deviation on every parameter — treat that as the bar.
5. **Quantify the final gap vs. the impedance analyzer's 19 nH** as a percentage and determine if it's within acceptable tolerance, or needs further explanation.
6. **Characterize (not necessarily root-cause) the >250 V switch threshold.** Test at 200/220/240 V and document exactly what "incorrect waveform" looks like (bounce, double-trigger, no clean step, etc.). This will be the first question raised in any technical review.
7. **Resolve the CH1/CH2 scale label conflict** seen in the oscilloscope photo (§5) — confirm actual probe attenuation/V-per-div settings on the scope are correct, not assumed.
8. **Write the final report** including: method description, raw labeled waveforms, calculation steps, repeatability statistics, simulation comparison, comparison against the analyzer value, and an explicit note on the >250 V operating point and the reason for the deviation from the TDK-recommended 4–20 V range.

---

## 8. Open Technical Question: Does Operating Voltage (20 V vs. 250 V) Affect the Result?

**In principle, no** — the $L$/$L_c$ extraction is voltage-independent by construction. $\alpha$, $\omega_r$, $\omega_0$, and $V_1/V_c$ all derive from waveform *shape* (period, peak-current ratio, voltage-drop ratio), not absolute magnitude. $I_{p1}$ scales with $V_c$ ($I_{p1}=V_c\sqrt{C/L}$), but the ratios that feed the inductance calculation do not change with $V_c$ for a fixed physical $L$, $C$, $R$.

**Caveat — this assumes $R$, $L$, $C$ are themselves voltage-independent**, which is not guaranteed in this specific setup:
- Mercury switch contact resistance/dynamics may be voltage- or current-dependent — directly evidenced by the switch's empirically observed failure to close cleanly below ~250 V.
- Capacitor ESR ($R_c$) can have some voltage/current dependence near peak currents of hundreds of amps.
- If $R$ differs between 20 V and 250 V operation, $\alpha$ (and therefore the extracted $L$) is not guaranteed to be identical between the two regimes.

**Conclusion:** the math is voltage-independent; whether *this specific switch's electrical behavior* is voltage-independent is unconfirmed and should not be assumed. This is the basis for outstanding item #6 above.

---

## 9. Summary of Status

| Item | Status |
|---|---|
| Root cause of original 20× gap | Identified — probe placement topology error |
| Probe placement corrected | Yes (clip on Terminal 1 side, tip on Terminal 2 before bend) |
| Residual gap after correction | ~3.4× — likely residual lead-length inductance |
| Capacitance value | **Inconsistent — requires re-measurement/correction before any result is valid** |
| Repeatability data | Not yet collected |
| Simulation cross-check | Not yet performed |
| Switch >250V behavior | Unexplained, only empirically asserted |
| Oscilloscope channel scale conflict | Unresolved |
| **Presentable to management as-is?** | **No** — pending items 1–7 in Section 7 |

---

*End of report.*
