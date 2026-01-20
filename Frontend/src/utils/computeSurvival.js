// calculation for survival score
export default function computeSurvival(species, pressure, temperature, plantLife) {

    // target temperature values based on preferences
    const tempTargets = {
        "polar": 3,
        "cold-temperate": 8,
        "temperate": 15,
        "warm-temperate": 22,
        "tropical": 28
    };
    const tempTarget = tempTargets[species.temperature] || 15;
    const tempScore = 20 - Math.min(30, Math.abs(temperature - tempTarget));


    // pressure multiplier calculation
    const maxDepth = 1000;
    const pressureDiff = pressure - (species.avgDepthM/maxDepth)*1000

    let pressureMult = 0

    // pressure thresholds
    const pressureTable = [
        { max: 100, mult: 1.0 },
        { max: 150, mult: 0.95 },
        { max: 200, mult: 0.85 },
        { max: 250, mult: 0.75 },
        { max: 300, mult: 0.6 },
        { max: 350, mult: 0.5 },
        { max: 400, mult: 0.35 },
        { max: 500, mult: 0.15 }
    ];

    for (const entry of pressureTable) {
        if (pressureDiff < entry.max) {
            pressureMult = entry.mult;
            break;
        }
    }

    const pressureScoreMult = (1.0 - Math.abs(pressureDiff/1000.0)) * pressureMult;

    // target plant life targets based on environment and temperature
    let plantTarget = 50;
    const envStr = (species.environment ?? "").toLowerCase();

    if (envStr.includes("reef") || envStr.includes("seagrass") || envStr.includes("kelp")) {
        plantTarget = 80;
    } else if (envStr.includes("pelagic")) {
        plantTarget = 40;
    }
    
    if (tempTarget <= 3) {
        plantTarget -= 20;
    } else if (tempTarget >= 28) {
        plantTarget += 20;
    }


    // plant life multiplier calculation
    const plantDiff = Math.abs(plantLife - plantTarget);

    let plantMult = 0;

    // plant life thresholds
    const plantTable = [
        { max: 30, mult: 1.0 },
        { max: 40, mult: 0.95 },
        { max: 50, mult: 0.8 },
        { max: 60, mult: 0.7 },
        { max: 70, mult: 0.5 },
        { max: 80, mult: 0.2 }
    ];

    for (const entry of plantTable) {
        if (plantDiff < entry.max) {
            plantMult = entry.mult;
            break;
        }
    }

    const plantScore = (100 - plantDiff) * plantMult;

    // survival score calculation
    const raw = pressureScoreMult * (tempScore/20.0) * (plantScore/100.0)*100;

    return Math.round(Math.max(0, Math.min(100, raw)));
}