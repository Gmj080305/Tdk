No need for the design skill here — this is just text output. Here are your resume entries, ATS-optimized with strong action verbs and quantified impact:

---

**Work Experience — Summer Intern, R&D Engineering | TDK Electronics, Nashik | Jun–Jul 2026**

- Designed and validated a low-voltage surge-discharge ESL measurement method achieving ±15% production and ±5–10% R&D uncertainty, eliminating dependency on costly impedance analyzers for production QA
- Authored a 12-section SOP covering hardware specs, operator workflow, calibration/traceability protocols, and automated data validation — ready for immediate assembly-line integration
- Engineered automated waveform analysis pipeline with integrity checks, RLC parameter extraction (α, ωr, ω0), and LTspice simulation overlays; identified root causes inflating historical ESL errors by up to 20×
- Conducted physics-based evaluation of 8 switching technologies (SiC MOSFETs, GaN HEMTs, IGBTs, SCRs, mercury relays, spark gaps) and authored complete technical + business case for mercury relay phase-out aligned with Minamata Convention regulations
- Built interactive HTML/JavaScript simulation tools for ESL metrology and capacitor discharge behavior, enabling field engineers to validate measurements and troubleshoot in real-time

---

**Project — ESL Measurement of Film Capacitors (Low-Voltage Surge-Discharge Method)**

- Developed end-to-end ESL extraction methodology using transient RLC analysis; derived α, ωr, ω0, and Lc from discharge waveforms with cross-validation against Keysight E4990A impedance analyzer baselines
- Specified rigid Kelvin-contact fixture architecture with shielded measurement loops and fixture-referenced ground returns; diagnosed and corrected probe placement errors previously causing 20× measurement contamination
- Built automated validation software implementing clipping detection, V1+V2 conservation checks, unit sanity flags, and CPk-based repeatability criteria (Std Dev <10% production, <5% R&D)
- Constructed uncertainty budget identifying fixture/loop inductance as 40% contributor; proposed targeted mitigation strategies to meet production expanded uncertainty ≤±15% (k=2)
- Designed 4–8 week phased implementation roadmap from fixture characterization → impedance analyzer cross-validation → operator training → production cell integration with weekly/monthly/quarterly calibration schedule

---

**Project — SiC Switching Technology Research: Mercury Relay Replacement in Capacitor Discharge Circuits**

- Selected and specified Wolfspeed C2M0080170P SiC MOSFETs with ADuM4177 isolated gate drivers and GaN HEMT gate-boost topology achieving sub-nanosecond switching with tens of kA/µs di/dt — quantified superiority over legacy mercury-wetted relays across rise-time, jitter, parasitic inductance, and waveform distortion via structured decision matrix
- Defined multi-layer PCB layout rules (loop inductance budget <nH/mm, Kelvin source sensing, symmetrical gate drive, integrated RC snubber within 5–10 mm of package), thermal management framework (electro-thermal simulation, 150°C derate threshold, cold-plate cooling), and 100k-cycle reliability validation protocol
- Authored phased 36-month commercialization roadmap (PoC → field trials → manufacturing scale) with prototype BOM estimates ($1,800–$3,000) and TCO analysis supporting go/no-go decision on mercury phase-out strategy
