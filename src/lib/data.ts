// Price and capacity are negative because they are minimized
// Sum 1 to safety because can't divide by 0
// Design is received as a parameter from UI

export const DATA: {
    [key: string]: { [key: string]: { [key: string]: number } };
} = {
    RENAULT: {
        char: {
            price: -169990000,
            safety: 1,
        },
        battery: {
            autonomy: 390,
            capacity: -52,
        },
        motor: {
            power: 135,
            speed: 140,
        },
    },
    VOLVO: {
        char: {
            price: -270000000,
            safety: 6,
        },
        battery: {
            autonomy: 460,
            capacity: -69,
        },
        motor: {
            speed: 160,
            power: 231,
        },
    },
    BYD: {
        char: {
            price: -329900000,
            safety: 6,
        },
        battery: {
            autonomy: 500,
            capacity: -108,
        },
        motor: {
            speed: 180,
            power: 268,
        },
    },
    TESLA: {
        char: {
            price: -260000000,
            safety: 6,
        },
        battery: {
            autonomy: 500,
            capacity: -75,
        },
        motor: {
            speed: 260,
            power: 138,
        },
    },
};

export const VEHICLES: string[] = ["RENAULT", "VOLVO", "BYD", "TESLA"];
export const VEHICLES_NAMES: { [key: string]: string } = {
    RENAULT: "Renault Zoe E-Tech",
    VOLVO: "Volvo XC40 Recharge",
    BYD: "BYD Tang EV",
    TESLA: "Tesla Model 3",
};
export const MACROCRITERIA: string[] = ["char", "battery", "motor"];
export const SUBCRITERIA: { [key: string]: string[] } = {
    char: ["price", "safety", "design"],
    battery: ["autonomy", "capacity"],
    motor: ["speed", "power"],
};
export const SUBCRITERIA_NAMES: { [key: string]: string } = {
    price: "Precio",
    safety: "Seguridad",
    design: "Diseño",
    autonomy: "Autonomía",
    capacity: "Capacidad Útil",
    speed: "Velocidad Máxima",
    power: "Potencia Máxima",
}


/* ==== LOGIC ==== */

const normalize = (data: {
    [key: string]: { [key: string]: { [key: string]: number } };
}) => {
    const LinerNormalizedData: { [key: string]: { [key: string]: number[] } } = {};

    for (const macro of MACROCRITERIA) {
        LinerNormalizedData[macro] = {};
        for (const sub of SUBCRITERIA[macro]) {
            LinerNormalizedData[macro][sub] = [];
            const max = Math.max(
                ...VEHICLES.map((vehicle) => data[vehicle][macro][sub])
            );
            const min = Math.min(
                ...VEHICLES.map((vehicle) => data[vehicle][macro][sub])
            );
            for (const vehicle of VEHICLES) {
                if (max == min) {
                    LinerNormalizedData[macro][sub].push(1);
                } else {
                    LinerNormalizedData[macro][sub].push(
                        (data[vehicle][macro][sub] - min) / (max - min)
                    );
                }
            }
        }
    }

    const NormalizedCriteriaData: { [key: string]: { [key: string]: number[] } } = {};
    for (const macro of MACROCRITERIA) {
        NormalizedCriteriaData[macro] = {};
        for (const sub of SUBCRITERIA[macro]) {
            NormalizedCriteriaData[macro][sub] = [];
            const max = Math.max(
                ...VEHICLES.map((vehicle) => data[vehicle][macro][sub])
            );
            const min = Math.min(
                ...VEHICLES.map((vehicle) => data[vehicle][macro][sub])
            );

            for (const vehicle of VEHICLES) {
                const currentNormalized = LinerNormalizedData[macro][sub][VEHICLES.indexOf(vehicle)];
                NormalizedCriteriaData[macro][sub].push(
                    currentNormalized / LinerNormalizedData[macro][sub].reduce((a, b) => a + b)
                );
            }
        }
    }

    return [NormalizedCriteriaData, LinerNormalizedData];
};

export const getData = (design: { [key: string]: number }) => {
    const NEW_DATA = { ...DATA };
    for (const vehicle of VEHICLES) {
        NEW_DATA[vehicle].char.design = design[vehicle];
    }
    return normalize(NEW_DATA);
};
