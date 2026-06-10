### Opening Analysis

The challenge in measuring film capacitor ESL (Equivalent Series Inductance) in the nanohenry range lies in the "switching transparency" of the circuit. Because the target inductance is so small, the internal inductance and turn-on speed of the switch itself often exceed or mask the parasitic characteristics of the capacitor. To observe a clean ringing waveform, you are essentially seeking a switch that approximates an ideal impulse—minimizing both Rise Time jitter and On-State resistance to prevent premature damping of the LC oscillation.

### Landscape

The landscape for high-speed capacitor discharge switches is divided by voltage requirements and the sheer magnitude of the peak current ($di/dt$).

Solid-State High-Frequency Switches: These are the primary modern choice for precise, repetitive measurements. Wide Bandgap (WBG) semiconductors like Gallium Nitride (GaN) and Silicon Carbide (SiC) have largely superseded traditional silicon for nH-scale work. Manufacturers like EPC (Efficient Power Conversion) produce eGaN FETs with sub-nanosecond switching transitions, while the IXYS DE-Series (specifically the DE275 or DE475) is widely used in pulse power for its specialized low-inductance RF packaging. These devices allow for "hard switching" at megahertz frequencies, which is critical for inducing resonance in film capacitors.

Plasma and Gas Discharge Switches: For high-energy pulses where voltages exceed $1\text{ kV}$, Triggered Spark Gaps and Thyratrons are the standard. Excelitas and Teledyne produce miniature triggered gaps (such as the GP-series) that can handle tens of kiloamperes. While they offer the highest current density, their internal inductance typically ranges from 5 nH to 30 nH, meaning they must be carefully de-embedded from the measurement or used only for larger film capacitors where the DUT inductance is significantly higher than the switch floor.

Specialized Mechanical and Solid-State Pulse Switches: Mercury Wetted Relays are a classic laboratory tool for nH measurements due to their bounce-free, picosecond contact closure. However, their physical lead length often introduces $10\text{--}20\text{ nH}$ of parasitic inductance, limiting their utility for surface-mount or ultra-low ESL film caps. Alternatively, "Solidtron" devices—specialized high-$di/dt$ thyristors from Teledyne Defense Electronics—bridge the gap between solid-state control and the high surge capacity of spark gaps.

### What's Established

It is broadly known that the physical layout of the test fixture is as critical as the switch selection itself. Established methodologies involve using LRC circuit modeling to fit the observed ringing waveform, where the total circuit inductance ($L_{total}$) is the sum of the switch, the capacitor, and the interconnects. To isolate the capacitor's ESL, researchers typically perform a "short-circuit" calibration of the switch and fixture using a low-inductance copper shim or silver-plated strap to establish the measurement floor. Commercial pulse discharge capacitors are often verified using these high-speed ringing tests to confirm they meet $di/dt$ ratings required for applications like railguns, medical lithotripters, and laser drivers.

### The Switch's Inductance Is Not a Spec — It's Part of Your Answer

The defining feature of this measurement, easy to miss, is that everything in the discharge path adds in series with the ESL you're trying to find. The extracted inductance from a ringing test is L_total = ESL + loop + switch, and the switch contribution is "hardest to de-embed without a separate short-circuit calibration of the switch path alone" (Report 6). When your target is single-digit nH and a TO-247 package alone contributes 6–8 nH while a GaN chip-scale package contributes under 0.2–1 nH (Report 3), the switch is not a peripheral choice — for a meaningful fraction of measurements it is the number you read off the scope.

This reframes the entire selection problem. You are not just picking the fastest switch; you are picking the switch whose parasitic inductance is either (a) far below your DUT's ESL, or (b) low and repeatable enough that a short-circuit reference shot can subtract it cleanly. That second criterion quietly eliminates several "fast" candidates that the high-voltage literature otherwise favors.

### Ranking of Practical Switch Candidates

Most to least suitable for nH-range film-capacitor ESL via ringing discharge:

#### GaN eHEMT (chip-scale LGA/PQFN, ideally integrated FET+driver) — 
Lowest package inductance at <0.2–1 nH with source inductance ~0.9 nH (Report 3), sub-2 ns transitions (Report 5), near-zero reverse-recovery charge versus ~860 nC for silicon superjunction (Report 5). Solid-state means device-to-device repeatability, so its small residual inductance calibrates out reliably. This is the best all-round choice for moderate-voltage film caps.

#### SiC MOSFET — 
Slightly slower than GaN (tens of ns typical) but bridges to higher voltages >600–1200 V where many DC-link/pulse film capacitors live (Report 5). Repeatable and robust; the right pick when DUT voltage exceeds GaN's comfortable range.

#### Silicon MOSFET (SMD, D2PAK/SOT, with Kelvin source) — 
Accessible and low-cost, 10–100 ns edges, ~1–10 nH package depending on package (Report 1, Report 3). Adequate for many film caps (see Section 3), but body-diode reverse recovery and Coss can spawn secondary resonances that distort the ring (Report 6).

#### Mercury-wetted reed relay — 
Clean ~1–5 ns edges with low capsule inductance ~1–5 nH and inherent galvanic isolation (Report 3, Report 4); bounce-free contact wetting. An underused dark horse (Section 4).

#### Avalanche transistor (2N2369A, ZTX415/FMMT41x) — 
Unmatched sub-ns edges (300–600 ps) at low cost and ~2 nH in SOT-23 (Report 3, Report 4), but limited to low energy/voltage, with device-to-device variability (~82% of 2N2369 samples reach ≤350 ps) and free-running jitter (Report 4). Excellent for tiny caps/TDR-style work, awkward for general film-cap energies.

#### Spark gap — 
The published standard for high-voltage pulse capacitors and treated as a near-ideal short in models (Report 1, Report 2), but plasma-channel inductance of 10–50 nH plus breakdown-voltage variability and jitter make it both inductive and non-repeatable (Report 1, Report 6) — poison for nH calibration. Use only when the DUT voltage leaves no alternative.

#### IGBT — 
Tail current stretches turn-off into the 100 ns–µs range (Report 1); too slow for clean ESL extraction.

#### SCR/thyristor — 
1–10 µs turn-on and tens-of-nH module inductance (Report 1); high-energy banks only.

Mechanical pushbutton — Contact bounce, ms–s action, and >10 nH wiring-dominated inductance (Report 1, Report 6); qualitative use only.

### The Frequency Reality Check — Why Sub-Nanosecond Edges Are Usually Overkill

A non-obvious insight hides in the resonance math. With f = 1/(2π√(LC)) (Report 2), a typical film capacitor of order 1 µF with ~10 nH total inductance rings at roughly 1.6 MHz — a period near 600 ns, with the critical first quarter-cycle around 150 ns. The published method requires only that switch turn-on be "much faster than the ringing period" (Report 2).

That means a GaN or SiC FET with single-digit-ns edges is comfortably fast, and even a good silicon MOSFET at tens of ns is often adequate (Report 1, Report 5). The avalanche transistor's 300–600 ps and the spark gap's high-current breakdown — the glamorous "pulsed-power" options — buy you speed you don't need while costing you repeatability and added inductance. The exception is genuinely small-capacitance DUTs, where the ring climbs toward tens of MHz and edge speed re-enters as a constraint.

The strategic takeaway: optimize for low and repeatable inductance plus clean, artifact-free edges, not raw transition speed. This is precisely where solid-state WBG switches beat the exotic pulsers for this specific job.

### The Two Most Promising Underutilized Options

Mercury-wetted reed relay as a precision low-cost bench switch. It delivers clean 1–5 ns edges with adjustable pulse width via charge lines and is already used in TDR pulse generators (Report 4), with capsule inductance of only ~1–5 nH and built-in galvanic isolation that simplifies grounding (Report 3). Its weaknesses — orientation sensitivity, mechanical variability, limited repetition rate (Report 4) — are tolerable in a single-shot ESL bench where you fire infrequently and average. For a low-cost, high-accuracy setup that sidesteps gate-driver complexity entirely, this is the most overlooked candidate in the whole set.

Integrated GaN FET-plus-driver ICs (e.g., EPC21701-class chip-scale parts). These collapse the gate loop into the package — sub-2 ns switching, sub-1 ns voltage edges, chip-scale footprint (Report 5). Because they internalize the gate drive, they eliminate the gate-bounce and driver-ringing artifacts that Report 6 flags as a primary corruptor of the discharge waveform. EPC's open reference boards (e.g., the AN032 resonant pulse drivers) lower the barrier to a known-good low-inductance fixture (Report 5). This is the highest-accuracy path for anyone willing to master WBG layout.

### Layout Principles That Apply Regardless of Switch

The switch is necessary but not sufficient — these dominate whatever you choose:

Force loop inductance below your target ESL. Use the shortest, widest conductors — flat copper straps, bus bars, parallel-plate or coaxial/stripline geometries that cancel magnetic fields (Report 2). A vertical/multilayer stackup can cut loop inductance ~70% versus a lateral layout (Report 3).
Kelvin-connect the switch. Separating the gate-drive return from the power source path bypasses package source inductance and suppresses gate ringing, cutting switching losses ~20% (Report 3).
Always shoot a short-circuit reference. Replace the DUT with a low-inductance short (or reference cap) to characterize and subtract the combined switch-plus-loop inductance (Report 2, Report 6). This single step is what converts a "system" measurement into a component-level ESL.
Sense current non-invasively. Rogowski coils or Pearson monitors add negligible series inductance versus an in-line shunt (Report 2).
Exploit the single-discharge fitting method. The 2025 approach fits the full V(t) and I(t) to the RLC equations via regression, extracting C, ESL, and ESR simultaneously from one shot with ~4–6% agreement to simulation (Report 2, Report 6) — a strong pairing with a repeatable solid-state switch.

### Critical Failure Modes and Which Switches Defuse Them

Probe ground-lead ringing masquerading as ESL. A standard alligator-clip ground forms a 100–200 nH loop that resonates with probe capacitance at 50–200 MHz, creating false overshoot indistinguishable from real parasitics (Report 6). This is arguably the single most common way to get a wrong answer, and no switch choice fixes it — short spring grounds or coaxial probing and >1–2 GHz bandwidth are mandatory (Report 5, Report 6).
Gate bounce and driver ringing injecting spurious oscillations. Worst in discrete MOSFET/IGBT drives (Report 6); mitigated by integrated-driver GaN ICs (Report 5) or by reed relays/spark gaps that have no gate loop at all (Report 4).
Body-diode reverse recovery and Coss secondary resonances. A silicon-MOSFET-specific corruptor of the ring (Report 6); GaN's near-zero Qrr largely removes it (Report 5).
Non-repeatable switch inductance. Spark-gap plasma-channel inductance/resistance fluctuates shot to shot and breakdown voltage varies (Report 1, Report 6); avalanche devices vary part to part (Report 4). Both defeat short-circuit calibration. Solid-state GaN/SiC/Si switches are repeatable enough to subtract (Report 6).
Capacitor self-heating drifting ESR/ESL across repeated shots (Report 6). Independent of switch — use single-shot, low-duty-cycle testing.
The cross-method discrepancy trap. Ringing results inherently bundle switch and loop parasitics and probe a high-di/dt regime, so they legitimately disagree with impedance-analyzer values measured at low power on calibrated fixtures (Report 6). Treat the ringing number as a "system" value and cross-check against an analyzer (e.g., Keysight E4990A, Zurich MFIA) rather than assuming one is "true" (Report 6).

### Questions Worth Resolving Before You Commit

What is your DUT's actual capacitance and voltage? This sets the ring frequency (Section 3) and decides between GaN (moderate V), SiC (high V), and whether spark gaps are unavoidable — the research gives ranges but your specific DUT determines the regime.
Can you achieve a loop inductance below your target ESL? If not, the measurement is dominated by the fixture regardless of switch (Report 2, Report 6), and the question becomes how repeatably you can calibrate it out rather than how low you can push it.
How tightly do switch package inductances actually repeat unit-to-unit? Reports cite typical values but flag them as "starting points only," recommending verification by impedance measurement or double-pulse test (Report 3) — repeatability, not the nominal value, governs calibration accuracy and is the one parameter the research does not quantify.
Is the mercury-wetted reed relay's shot-to-shot inductance stable enough for nH de-embedding? Report 4 documents clean edges but also mechanical/orientation variability; whether that variability lands below your accuracy target is untested in the provided research and worth a quick empirical check before building around it.
