# Summer Intern, R&D Engineering — TDK Electronics, Nashik
**June – July 2026** | *6-week internship*

## Overview
Contributed to two major R&D initiatives within TDK's Power Component Engineering division, focusing on advanced capacitor metrology, precision measurement techniques, and next-generation switching technologies for high-speed energy-storage applications.

---

## Project 1: ESL Measurement Standardization for Assembly-Line Integration

### Problem & Objectives
Designed and validated a low-voltage surge-discharge method (LSM) to measure Equivalent Series Inductance (ESL, Lc) of film capacitors with production-grade repeatability and traceability. The method was engineered to replace costly impedance analyzer baseline tests while maintaining ±15% production uncertainty and ±5–10% R&D accuracy.

### Key Deliverables

**Standard Operating Procedure (SOP)**
- Authored comprehensive 12-section technical SOP detailing measurement hardware requirements, step-by-step operator workflows, automated data validation rules, and calibration/traceability protocols

**Hardware Specification**
- Defined rigid Kelvin-contact fixture design, shielded measurement loop architecture, and current/voltage sensing requirements to minimize probe-placement artifacts (critical issue: identified cases where poor ground placement inflated ESL errors by 20×)

**Automated Analysis Pipeline**
- Designed software validation framework including:
  - Waveform integrity checks (clipping detection, channel label verification, V1+V2 conservation)
  - Unit sanity checks (flagged instances where C transcription errors caused 1000× inductance errors)
  - RLC parameter extraction (α, ωr, ω0 calculations with cross-validation against LTspice simulation overlays)
  - Repeatability/statistical acceptance criteria (Std Dev < 10% production, < 5% R&D)

**Uncertainty Budget Analysis**
- Identified fixture/loop inductance as 40% contributor; proposed mitigation strategies to reduce total production uncertainty target

**Implementation Timeline**
- Structured 4–8 week phased rollout from fixture characterization → cross-validation against reference → operator training

### Technical Scope
Mastered theoretical foundations (RLC transient analysis, damping regimes, frequency-domain parameter extraction) and practical measurement challenges (cabling impedance matching, scope configuration, waveform interpretation). Diagnostic work identified root causes of high measurement error including layout/grounding mistakes and oscilloscope misconfiguration.

---

## Project 2: SiC Switching Technology for Capacitor Discharge Systems (Mercury Relay Replacement)

### Problem & Objectives
Evaluated Silicon Carbide (SiC) MOSFET-based switching to replace legacy mercury-wetted relays (MWRs), which face regulatory phase-out due to Minamata Convention toxicity restrictions. Conducted comprehensive technical and business case analysis to guide transition roadmap.

### Key Deliverables

**Technical Architecture Document**
- Specified optimal power devices (Wolfspeed C2M0080170P SiC MOSFETs), isolated gate drivers (ADuM4177 + GaN HEMTs for gate-boost), and snubber/damping topologies for controlled sub-nanosecond switching

**Comparative Hardware Analysis**
- Evaluated 8 switching technologies (mercury relays, silicon/GaN MOSFETs, IGBTs, SCRs, triggered spark gaps) across rise-time, jitter, parasitic inductance, waveform distortion—created detailed decision matrix with engineering recommendations for different voltage/current regimes

**Circuit Design Specifications**
- Loop inductance budgeting (target < nanohenries per mm of conduction path)
- Multi-layer PCB architecture with Kelvin source pins and symmetrical gate drive layout
- Thermal management framework (electro-thermal simulation, derate thresholds, cold-plate cooling for high-rep-rate systems)

**Reliability & Test Plan**
- Defined validation protocol spanning static characterization (blocking voltage, leakage, Rds_on at temperature), dynamic measurements (rise/fall time, di/dt, overshoot, jitter), and 100k-cycle reliability soak testing

**Business Case & Rollout Roadmap**
- Developed phased 36-month commercialization strategy (Phase 1: PoC bench validation; Phase 2: field trials; Phase 3: manufacturing scale) with BOM estimates ($1,800–$3,000 prototype → volume pricing reductions)

### Technical Scope
Analyzed fundamental semiconductor physics (GaN 2DEG channel vs. silicon p-n junction, SiC thermal ruggedness, gate-oxide stress mechanisms). Integrated thermal, EMC, mechanical, and regulatory considerations. Identified switching-induced parasitic phenomena (common-source inductance feedback, Miller plateau distortion, reverse recovery tail currents) and mitigation strategies.

---

## Supporting Technical Work

**Comparative Metrology Study**
- Authored 115-page advanced characterization document covering 6 laboratory measurement techniques (auto-balanced bridge, voltage surge-discharge, VNA 2-port shunt-thru, RF I-V, resonant cavity, time-domain reflectometry) with mathematical derivations, applicability ranges, and systematic error analysis

**Switching Technology Evaluation**
- Conducted physics-based comparative analysis of mercury-wetted relays, power MOSFETs, GaN HEMTs, coaxial reed relays, IGBTs, SCRs, and gas discharge tubes—quantified rise-time, jitter, parasitic inductance/capacitance, waveform distortion, and identified optimal device classes for each application regime

**ESL Extraction Methodology**
- Designed 3-test differential configuration approach to empirically separate capacitor pin self-inductance, mutual inductance, and winding/body inductance without theoretical assumptions; specified hardware compensation (0.75 mm copper eddy-current shield, tape insulation) to cancel mutual inductance effects

**Data Analysis & Simulation**
- Developed LTspice models for transient RLC discharge waveforms, created overlay comparison algorithms, and validated measurement accuracy through waveform similarity metrics (RMSE thresholds for flagging anomalies)

**Interactive Analysis Tools**
- Built HTML/JavaScript interactive simulation sandboxes for ESL metrology and capacitor discharge behavior, enabling field engineers to validate measurements and troubleshoot in real-time

---

## Technical Skills Demonstrated

**Metrology & Instrumentation**
- Oscilloscope acquisition, Rogowski coil/current shunt measurement, impedance analyzer cross-validation, fixture design and grounding/layout optimization

**Analog Electronics**
- RLC circuit analysis, transient response theory, damping regimes, frequency-domain and time-domain parameter extraction

**Power Semiconductor Physics**
- SiC/GaN device operation, switching transients, thermal management, gate-drive architecture, parasitic inductance/capacitance effects

**Manufacturing & Quality**
- SOP development, uncertainty budgeting, acceptance criteria design, calibration traceability, repeatability studies, process capability analysis (CPk metrics)

**Technical Documentation**
- Comprehensive engineering reports, decision matrices, phased implementation roadmaps, risk assessment and mitigation strategies

**Simulation & Analysis**
- LTspice electro-thermal modeling, waveform overlay validation, statistical analysis, HTML/JavaScript interactive tools for measurement interpretation

---

## Business Impact

- Provided TDK with validated assembly-line ESL measurement SOP, eliminating costly impedance analyzer dependency for production QA
- Authored complete technical business case for SiC switching replacement, enabling informed go/no-go decision on mercury relay phase-out strategy
- Identified and root-caused critical measurement errors (probe placement artifacts, oscilloscope misconfiguration, unit transcription mistakes) that were corrupting historical data by orders of magnitude
- Delivered field-ready diagnostic tools and operator training materials to support manufacturing scale-up

---

**Technical Repository:** [https://github.com/Gmj080305/Tdk](https://github.com/Gmj080305/Tdk)  
*Includes technical reports (PDF/Word), comparative analysis documents (Markdown), interactive HTML simulation tools, measurement data, and design specifications.*
