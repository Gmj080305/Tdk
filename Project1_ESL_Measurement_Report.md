# Project 1 — ESL Measurement: Low‑Voltage Surge‑Discharge Method (Assembly Line & Lab SOP)

## Document purpose
This document defines the validated method, SOP, instrumentation, acceptance criteria, calibration plan, and rollout schedule for measuring Equivalent Series Inductance (ESL, Lc) of film capacitors using the TDK low‑voltage surge‑discharge method adapted for production and R&D use. It consolidates diagnostic findings and corrective actions observed in lab investigations.

## Executive summary
- Objective: Provide a repeatable, traceable ESL measurement method that matches impedance‑analyzer baselines within defined uncertainty and is suitable for assembly‑line integration.
- Key outcomes: Topology and probe placement dominate measurement error. Use rigid Kelvin contacts, fixture‑referenced ground returns, short shielded leads, and cross‑validation with impedance analyzer and simulation.
- Targets: Production expanded uncertainty (k=2) ≤ ±15%; R&D uncertainty ≤ ±5–10%.

---

## 1. Background & rationale
- The TDK surge‑discharge method extracts L from transient voltage/current waveforms. Errors arise when the measurement loop includes fixture/switched path inductance rather than only the capacitor.
- Observed issues:
  - Probe ground clip placed away from capacitor lug contaminated measurement (20× error in a reported case).
  - Long/unshielded ground leads produced ghost inductance and coupling into the Rogowski coil.
  - Oscilloscope scale mislabeling and timebase/trigger misconfiguration invalidated results.
  - Transcription/unit errors in C produce catastrophic L errors.

---

## 2. Governing equations (reference)
- Key equations used in automated analysis:
  - α = (1/T) · ln(Ip1 / Ip2)
  - ωr = 2π/T
  - ω0 = sqrt(ωr^2 + α^2)
  - L = 1 / (ω0^2 · C)
  - Lc = L − Ld (Ld = fixture/discharger inductance)
- Implement these in software with units consistency checks; flag if computed L differs by >×10 from impedance‑analyzer baseline.

---

## 3. Measurement hardware & layout (required)
- Fixture
  - Rigid machined jig with spring‑loaded Kelvin voltage contacts on both capacitor terminals.
  - Local return lug clamp pressed directly to capacitor/body (NOT to switch or busbar).
  - Indexing pins for repeatable seating.
- Current sensing
  - Shielded Rogowski coil or coaxial current shunt with known integrator constant; mount so the loop area is minimized and reference ground is isolated.
- Voltage sensing
  - Differential voltage acquisition (true differential scope probes preferred) or matched 10× probes with short ground returns (spring contacts).
- Oscilloscope
  - ≥500 MHz (application dependent), single‑shot capture, sample rate ≥10× expected highest frequency content.
- Triggering
  - Use a single reliable trigger source; verify single/normal mode, not Stop/Free‑run capture.
- Cabling
  - Short, shielded BNCs; route return near forward conductor to minimize loop inductance.

---

## 4. SOP: step‑by‑step (operator)
1. Identify and log part ID; fetch nominal C from database.
2. Measure/verify C and ESR with calibrated LCR meter (record instrument and settings).
3. Insert part into fixture; verify spring contacts show correct seating (mechanical flag).
4. Verify oscilloscope channel attenuations and V/div labels; run quick channel calibration.
5. Capture fixture baseline (no capacitor) to measure Ld and validate zeroing.
6. Perform discharge at recommended voltage (default 4–20 V for clean waveforms). If device or switch requires higher V for correct behavior, note and capture extended data.
7. Acquire N = 3–5 single‑shot captures; store raw files.
8. Automated analysis:
   - Validate waveform integrity (no clipping, V1+V2 ≈ Vc within tolerance).
   - Compute α, ωr, ω0, L, Lc.
   - Cross‑check: simulated RLC overlay (see §7).
9. Pass/fail decision:
   - Accept if Lc within spec and repeatability criteria met.
   - If flagged (bad waveform, mismatch vs simulation, inconsistency with C), re‑run. If persistently failing, route to R&D review.

---

## 5. Data validation rules and automated checks
- Waveform flags:
  - Channel label mismatch → reject run.
  - Baseline droop on current (AC coupling) beyond threshold → apply correction or remeasure with DC sensor.
  - V1 + V2 difference from Vc >2% → reject (possible probe misplacement).
- Unit checks:
  - Verify C units; if computed L is off by factor 10^n, raise "unit transcription" alert and require manual review.
- Repeatability:
  - Standard deviation across N runs should be <10% (production) or <5% (R&D).
- Logging:
  - Save raw waveform file, computed parameters, Ld baseline, sensor serial numbers, and operator ID.

---

## 6. Calibration & traceability plan
- Weekly: fixture Ld verification using a calibrated short or known inductor standard.
- Monthly: current probe integrator verification and oscilloscope calibration check.
- Quarterly: cross‑check selected parts against a precision impedance analyzer (e.g., Keysight E4990A) and update correction factors if consistent offset observed.
- Maintain calibration certificates and timestamps in measurement database.

---

## 7. Simulation cross‑check
- Use an LTspice/parameterized RLC model (use esl_metrology_ltspice_simulation_sandbox.html as template). Steps:
  1. Input measured C, computed L (and Ld), R estimate.
  2. Simulate discharge under identical initial Vc and trigger conditions.
  3. Overlay simulated voltage/current on captured waveforms; compute waveform similarity metric (e.g., RMSE).
  4. If RMSE > threshold, flag for manual review.

---

## 8. Uncertainty budget (example contributors)
- Fixture/loop inductance control: 40%
- Current sensor calibration: 20%
- Capacitance uncertainty: 15%
- ADC/scope scale and timing: 15%
- Repeatability/fit error: 10%
- Aim: identify dominant contributor and reduce cost by engineering mitigation (e.g., fixture redesign reduces the 40% term).

---

## 9. Faults, root causes, and corrective actions (from diagnostic cases)
- Symptom: L measured ≈ 20× analyzer value → Root cause: probe ground on switch common ground; fix: move alligator to capacitor lug and shorten leads.
- Symptom: computed L off by ×1000 → Root cause: wrong C units; fix: verify LCR meter reading, implement auto unit sanity check.
- Symptom: waveform clipped/label mismatch → Root cause: scope mode or probe settings; fix: pre‑run channel validation script.

---

## 10. Acceptance criteria & reporting
- For production:
  - ESG: Lc within product spec ± tolerance (or within deviation relative to impedance‑analyzer baseline once validated).
  - Process stability: CPk ≥1.67 on repeated runs or corrective action required.
- For R&D:
  - Documented repeatability study, simulation overlay, and full waveform library published to central repository.

---

## 11. Implementation timeline (4–8 weeks)
- Week 1–2: Fixture design & baseline Ld characterization; software for acquisition and auto‑checks.
- Week 3: Cross‑check against impedance analyzer for 20 parts; adjust offset/corrections.
- Week 4: Repeatability & uncertainty study; finalize SOP.
- Week 5–8: Integration to production cell, operator training, and calibration schedule activation.

---

## 12. Appendices
- A: Example waveform validation script pseudocode (unit checks, V1+V2 test, α calculation)
- B: Example metadata fields for each capture (partID, lot, C_meas, ESR, Lc, Ld, operator, instrument serials)
- C: Quick operator checklist (condensed SOP)
- D: References
  - TDK: "Capacitor Inductance Measurement Based on Low Voltage Surge Discharge Method" (internal reference)
  - Project diagnostic reports and simulation sandbox in the repository
