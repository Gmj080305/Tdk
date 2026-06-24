# Project 2 — SiC Switching for Capacitor Discharge Systems (Technical + Business Report)

## Document purpose
This document is a comprehensive technical and commercial report to guide a transition from mercury‑wetted relays (MWR) to SiC MOSFET‑based switching modules for high‑speed film capacitor discharge applications. It includes device selection, circuit architecture, layout guidelines, thermal and EMI mitigation, testing plan, BOM guidance, risk assessment, and a recommended rollout roadmap.

## Executive summary
- SiC MOSFET modules (e.g., Wolfspeed C2M0080170P class) enable sub‑nanosecond switching, dramatically higher di/dt capability, reduced footprint, and zero mercury environmental risk. Combining isolated gate drivers (ADuM4177), proper gate‑boost techniques and integrated snubber design enables SiC to replace MWRs in many pulsed‑power applications.
- Primary implementation focus: predictable di/dt control, low‑inductance packaging, and thermal management. Business case indicates meaningful long‑term TCO and regulatory advantages.

---

## 1. Problem statement & market drivers
- Legacy MWRs: excellent contact resistance and low jitter historically used for high‑energy discharge, but have toxic material handling, maintenance costs, and supply risk due to regulation (Minamata, RoHS).
- Drivers for replacement:
  - Regulatory phase‑out of mercury
  - Need for smaller, faster, lower‑maintenance systems
  - Demand for programmable switching (slew control/diagnostics)

---

## 2. Technical advantages of SiC
- Fast switching (<2 ns achievable with gate‑boosting).
- High blocking voltage (1.2 kV+ per device; paralleled/stacked for higher voltages).
- High di/dt tolerance (tens of kA/µs).
- Thermal ruggedness: acceptable operation at higher junction temperatures.
- Predictable electrical failure modes vs. mechanical wear of MWRs.

---

## 3. Recommended hardware selection (examples from research)
- Power device: Wolfspeed C2M0080170P (or equivalent SiC MOSFET) — high voltage, fast switching.
- Gate driver: ADuM4177 (isolated driver, 5.7 kV isolation) and high‑speed GaN HEMT boosters (GS61004B, EPC devices) for gate‑boost topologies.
- Snubber / damping: low‑loss RC combined with transmission‑line damping for high‑energy systems.
- Packaging: multichip module (MCM) to reduce stray inductance; Kelvin source and gate pads.

---

## 4. Circuit architecture & design rules
- Topology
  ```
  [Capacitor Bank] -- Busbar -- [SiC MOSFET module] -- Busbar -- [Load]
                  \                                     /
                   \-- Local sensing (Kelvin) -- Ground --/
  ```
- Key design rules:
  - Loop inductance budget: target < nH per mm of high‑current loop (compute by system energy and allowed overshoot).
  - Series snubber: place RC/C network directly across device terminals; locate within 5–10 mm of SiC package.
  - Gate control: programmable gate resistor network (fast/slow path), gate monitoring circuit, and desaturation protection.
  - Paralleling: use symmetrical layout, matched source bus, and individual gate resistors to ensure current sharing.
  - Layout: place power return adjacent to forward conductor as a laminated pair to reduce loop area.

---

## 5. Gate drive & advanced switching techniques
- Standard gate drive: isolated driver with gate resistor and Miller clamp.
- Gate‑boosting / Impact‑Ionization Gate Triggering (for sub‑ns):
  - Use a pre‑charged gate‑boost capacitor and secondary small GaN device to deliver a high‑voltage short pulse to the gate.
  - Extreme care: this technique increases stress and may have yield/infant mortality risk; use only after thermal/EMC analysis.
- dv/dt and EMI control:
  - Kelvin source sense and careful gate resistor tuning.
  - Soft start and programmable slew control in firmware for field tuning.

---

## 6. Thermal management & mechanical packaging
- High‑energy systems require water cold plate cooling at high rep rates; for low duty cycle, forced air or conduction may suffice.
- Thermal design steps:
  1. Run electro‑thermal simulation for expected pulse energy and rep rate.
  2. Derate device tables per junction temperature (suggest derate to 150°C if unknown).
  3. Implement temperature sensors on module and in thermal path with firmware trip thresholds.
- Mechanical: design module footprint compatible with existing MWR footprints where possible (mechanical drop‑in adapters).

---

## 7. BOM & cost guidance (example)
- SiC MOSFET C2M0080170P — $150 ea (8–12 devices typical per high‑energy module)
- Gate driver ADuM4177 — $80–$200 ea (per section)
- Packaging & cold plate — depends on custom module (~$200–$600)
- Snubber/passive network — <$200
- Prototype BOM per module: $1,800–$3,000; target volume pricing reduces BOM significantly.

---

## 8. Test & validation plan
- Electrical validation
  - Static: Vds blocking, leakage, Rds_on at temperature.
  - Dynamic: rise/fall time, di/dt, dv/dt, overshoot, ringing.
  - Jitter & repeatability tests vs MWR baseline.
- Reliability & stress
  - Thermal cycling, high‑rep rate soak (≥1,000 cycles PoC; ≥100k cycles reliability target).
  - Fault testing: shorted load, crowbar activation, gate drive faults.
- EMC/EMI
  - Radiated and conducted emission tests; ensure filtering and grounding meet regulatory needs.
- Safety & protection
  - Gate desaturation, overcurrent, and temperature‑trip validation.
- Test data logging
  - Capture high bandwidth DSO traces, thermal logs, and fault counters.

---

## 9. Risk assessment & mitigation
- Thermal failure → validated simulation, conservative derating, water cooling option.
- Parasitic oscillation/EMI → Kelvin source, localized snubbers, shielded layouts.
- Manufacturing & supply lead time → multiple vendor qualification and longer procurement windows.
- Acceptance risk (customers comfortable with MWR) → provide proof‑of‑concept conversions and TCO case studies.

---

## 10. Regulatory & environmental benefits
- SiC removes mercury handling and disposal liabilities; aligns with Minamata Convention and regional phase‑outs.
- No hazardous material remediation costs; improved public and customer perception.

---

## 11. Commercial rollout roadmap (Phased)
- Phase 1 (0–6 months): PoC bench unit (10 kV equivalent scaled tests), verify switching metrics and thermal performance.
- Phase 2 (6–18 months): Field trials with 2–3 customers (magnetic forming, research labs), iterate packaging.
- Phase 3 (18–36 months): Manufacturing scaling, channel partnerships, certification, and full product launch.

---

## 12. Deliverables (first 12 months)
- Prototype SiC module with driver and snubber (functional).
- Testing report: switching edges, di/dt, jitter, thermal soak, and waveform overlays vs MWR baseline.
- Mechanical drop‑in adapter and integration guide.
- Safety and EMC test summaries.
- Business case: TCO analysis, pricing, and service offering.

---

## 13. Example checklist for engineers (pre‑commissioning)
- Confirm device lot and datasheets.
- Verify gate drive isolation clearance and creepage distances.
- Confirm snubber components rated for surge energy.
- Validate thermal mounting and cold‑plate tightness.
- Run low‑energy commissioning pulses before full energy operation.

---

## 14. Appendices
- A. Reference device datasheets and papers (repository files: C2M0080170P.PDF, GS61004B.PDF, EPC2034C.PDF)
- B. Example schematic snippet (power switch + gate driver + snubber)
- C. Suggested firmware features: programmable gate slew, desaturation detection, pulse counters, thermal trip logs
- D. Business model summary and TAM estimate (from internal analysis)

---

## 15. Recommended next actions
1. Build PoC SiC module and run bench validation against a representative capacitor bank and load.
2. Simultaneously redesign the ESL measurement fixture (Project 1 deliverable) to produce traceable measurements that prove switching integration gains and validate parasitic budgets.
3. Prepare a small field pilot program and target 2–3 customer candidates for early trials.

--- 
Prepared by: Project Team (based on repository research and lab diagnostics)  
Date: 2026-06-24  
Status: Draft — ready for prototyping and review
