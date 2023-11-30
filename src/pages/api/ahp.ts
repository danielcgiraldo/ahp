import type { APIRoute } from "astro";
import { MACROCRITERIA, SUBCRITERIA, VEHICLES, getData } from "../../lib/data";
import AHP from "../../lib/AHP";

export const POST: APIRoute = async ({ request }) => {
    let body = await request.json();
    for (const w of Object.keys(body.weights)) {
        body.weights[w] = parseFloat(body.weights[w]);
    }
    const NormalizedCriteriaData = getData(body.design); // Get normalized alternatives
    const AHPCalc = new AHP();
    AHPCalc.setItems(VEHICLES);

    /*
    |                         | CARACTERISTICAS BASICAS | BATERIA | MOTOR |
    |-------------------------|-------------------------|---------|-------|
    | CARACTERISTICAS BASICAS |                         |         |       |
    | BATERIA                 |                         |         |       |
    | MOTOR                   |                         |         |       |
    */

    const WeightFromMacro = new MacroCriteria(
        [
            [1, body.weights.char_battery, 1 / body.weights.motor_char],
            [1, 1, body.weights.battery_motor],
            [body.weights.motor_char, 1 / body.weights.char_battery, 1],
        ],
        MACROCRITERIA
    );

    // Precio x Seguridad x Diseño
    
    WeightFromMacro.addCriteria(
        [
            [1, body.weights.char_price_safety, 1 / body.weights.char_design_price],
            [1 / body.weights.char_price_safety, 1, body.weights.char_safety_design],
            [body.weights.char_design_price, 1 / body.weights.char_safety_design, 1],
        ], "char", SUBCRITERIA["char"]
    )

    // Autonomia x Capacidad

    WeightFromMacro.addCriteria(
        [
            [1, 1 / body.weights.battery_autonomy_capacity],
            [body.weights.battery_autonomy_capacity, 1]
        ], "battery", SUBCRITERIA["battery"]
    )

    // Velocidad x Potencia

    WeightFromMacro.addCriteria(
        [
            [1, body.weights.motor_speed_power],
            [1 / body.weights.motor_speed_power, 1]
        ], "motor", SUBCRITERIA["motor"]
    )

    AHPCalc.setWeight(WeightFromMacro.Criteria);
    AHPCalc.setAlternatives(NormalizedCriteriaData);
    const result = AHPCalc.run();
    return { status: 200, body: JSON.stringify({
        status: "ok",
        result: result,
        normalized: NormalizedCriteriaData,
        weights: WeightFromMacro.Criteria
    }) };
};

class MacroCriteria {
    MacroCriteria: { [key: string]: number } = {};
    Criteria: { [key: string]: number } = {};
    constructor(macroCriteria: number[][], macroCriteriaKeys: string[]) {
        // Get local weights for each macro criteria
        const localMacroCriteriaWeights = this.getLocalWeights(macroCriteria);
        // Store them with their keys
        for (let i = 0; i < macroCriteriaKeys.length; i++) {
            this.MacroCriteria[macroCriteriaKeys[i]] =
                localMacroCriteriaWeights[i];
        }
    }

    addCriteria(subCriteriaMatrix: number[][], macroCriteriaKey: string, subCriteriaKeys: string[]) {
        const localSubCriteriaWeights = this.getLocalWeights(subCriteriaMatrix);
        for (let i = 0; i < localSubCriteriaWeights.length; i++) {
            this.Criteria[subCriteriaKeys[i]] = localSubCriteriaWeights[i] * this.MacroCriteria[macroCriteriaKey]
        }
    }

    getLocalWeights(matrix: number[][]) {
        const normalizedMatrix: number[][] = matrix;
        for (let i = 0; i < matrix.length; i++) {
            let sumCol = 0;
            for (let j = 0; j < matrix[i].length; j++) {
                sumCol += matrix[j][i];
            }
            for (let j = 0; j < matrix[i].length; j++) {
                normalizedMatrix[j][i] = matrix[j][i] / sumCol;
            }
        }


        const localWeights: number[] = [];
        for (let i = 0; i < normalizedMatrix.length; i++) {
            localWeights.push(
                normalizedMatrix[i].reduce((a, b) => {
                    return a + b;
                }) / normalizedMatrix.length
            );
        }
        return localWeights;
    }
}
