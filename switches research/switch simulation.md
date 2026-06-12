To implement **Pair 1** (the **Wolfspeed C2M0080170P SiC MOSFET** driven by **GS61004B GaN HEMTs**) in LTspice, you must replicate the "Optimized Gate-Boosting" topology described in the research. This setup is designed to achieve sub-2 ns turn-on times at high operating voltages.

### Step 1: Obtain and Import SPICE Models
Before building the circuit, you must download the official SPICE models from the manufacturers:
*   **Wolfspeed C2M0080170P:** Available as a `.lib` or `.mod` file from Wolfspeed.
*   **GaN Systems GS61004B:** Available from GaN Systems (now Infineon).
*   **Importing:** In LTspice, use the `.lib` or `.inc` command (e.g., `.lib C2M0080170P.lib`) to include these models in your simulation.

### Step 2: Construct the Main Power Loop
1.  **Main Switch:** Place the **C2M0080170P** as the primary closing switch ($M_1$).
2.  **Bias Voltage ($V_{in}$):** Set your high-voltage DC source (e.g., 1200 V to 1500 V).
3.  **Load:** Connect a resistive load ($R_{load}$) in series with the drain. For high-speed film capacitor testing, the research suggests minimizing inductive elements to ensure the current rise time matches the voltage fall time.
4.  **Bulk Capacitance:** Use parallel **C0G and X7R** capacitors on the high-voltage bus to supply the output current pulse.

### Step 3: Implement the GaN Totem-Pole Driver
1.  **Totem-Pole Switches:** Build a half-bridge stage using two **GS61004B GaN HEMTs** ($G_1$ and $G_2$).
2.  **Driver Supply ($V_{gb}$):** Provide a gate-boosting supply voltage ($V_{gb}$) significantly higher than the rated gate voltage (e.g., 80 V to 95 V).
3.  **Logic Signal:** Control the GaN FETs using an ideal pulse source with a sub-nanosecond rise time (e.g., 400–500 ps) to simulate a high-speed intermediate driver stage.

### Step 4: Integrate the Gate-Boosting Network
This network is located between the GaN driver output and the SiC MOSFET gate:
1.  **Coupling Capacitor ($C_1$):** Place a capacitor in series with the gate. This is the core "boosting" element that applies a transient overvoltage.
2.  **Discharge Diode ($D_1$):** Place a fast diode (e.g., Schottky) in parallel with $C_1$, with the cathode facing the driver. This allows $C_{gs}$ to discharge once the voltage across $C_1$ reaches zero.
3.  **Resistance ($R_4$):** For maximum speed (the "optimized" version), the source suggests removing current-limiting resistors ($R_4 = 0 \Omega$) to maximize instantaneous gate current.

### Step 5: Perform Component Calculations
Calculate the value of the coupling capacitor ($C_1$) using the following formula to ensure the final gate-source voltage ($V_{gs}$) does not exceed the device's rated transient limit:
$$C_1 = \frac{V_{gr} \cdot C_{iss}}{V_{gb} - V_{gr}}$$
*   **$V_{gr}$:** Rated transient gate voltage (typically ~20 V for SiC).
*   **$C_{iss}$:** Input capacitance of the SiC MOSFET at your operating point.
*   **$V_{gb}$:** Your gate-boosting supply voltage.

### Step 6: Model Parasitic Elements
To achieve realistic nanosecond results, you must explicitly model the following parasitics, as they often dominate the performance:
*   **Internal Package Inductance:** Use values from Table I of the research ($L_g \approx 12.4$ nH for the TO-247 C2M0080170P).
*   **Common Source Inductance ($L_{cs}$):** Model the inductance shared between the power and gate loops (typically < 10–50 pH for optimized layouts).
*   **Kelvin Source:** Ensure you utilize the device's built-in Kelvin source pin to decouple the gate-drive return path from the high-current power path.

### Step 7: Configure Simulation Settings
1.  **Analysis Type:** Use a transient analysis: `.tran 0 [stop_time] 0 100p`. A small maximum timestep (e.g., 100 ps) is necessary to capture the sub-2 ns edges.
2.  **Observation:** Monitor the voltage at the **MOSFET die level** (the internal gate node after $L_g$ and $R_g$) rather than just the terminal to ensure it stays within safe operating limits despite the 80 V terminal "boost".
