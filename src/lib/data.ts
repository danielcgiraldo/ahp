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
            autonomy: 395,
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
            autonomy: 420,
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
export const MACROCRITERIA: string[] = ["char", "battery", "motor"];
export const SUBCRITERIA: { [key: string]: string[] } = {
    char: ["price", "safety", "design"],
    battery: ["autonomy", "capacity"],
    motor: ["speed", "power"],
};

/* ==== LOGIC ==== */

const normalize = (data: {
    [key: string]: { [key: string]: { [key: string]: number } };
}) => {
    const NormalizedData: { [key: string]: { [key: string]: number[] } } = {};

    for (const macro of MACROCRITERIA) {
        NormalizedData[macro] = {};
        for (const sub of SUBCRITERIA[macro]) {
            NormalizedData[macro][sub] = [];
            const max = Math.max(
                ...VEHICLES.map((vehicle) => data[vehicle][macro][sub])
            );
            const min = Math.min(
                ...VEHICLES.map((vehicle) => data[vehicle][macro][sub])
            );
            for (const vehicle of VEHICLES) {
                if (max == min) {
                    NormalizedData[macro][sub].push(1);
                } else {
                    NormalizedData[macro][sub].push(
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
                const currentNormalized = NormalizedData[macro][sub][VEHICLES.indexOf(vehicle)];
                NormalizedCriteriaData[macro][sub].push(
                    currentNormalized / NormalizedData[macro][sub].reduce((a, b) => a + b)
                );
            }
        }
    }

    return NormalizedCriteriaData;
};

export const getData = (design: { [key: string]: number }) => {
    const NEW_DATA = { ...DATA };
    for (const vehicle of VEHICLES) {
        NEW_DATA[vehicle].char.design = design[vehicle];
    }
    return normalize(NEW_DATA);
};
