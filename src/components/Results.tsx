import { SUBCRITERIA_NAMES, VEHICLES, VEHICLES_NAMES } from "../lib/data";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    Colors,
} from "chart.js";
import { useState } from "react";
import { Radar } from "react-chartjs-2";
import { Close } from "../lib/icons";
const Results = ({
    results,
    setResults,
}: {
    results: any;
    setResults: any;
}) => {
    const [tableModal, setTableModal] = useState(false);

    const resultsArray = Object.keys(results.result).sort(
        (a, b) => results.result[b] - results.result[a]
    );
    return (
        <div className="w-full mt-4">
            <img
                src={`/images/${resultsArray[0].toLowerCase()}.png`}
                className="w-full mb-5"
                alt="Mejor elección"
            />
            <ScoreTable resultsArray={resultsArray} />
            <div className="flex justify-end mb-4">
                <button className="text-sm underline" onClick={() => setTableModal(true)}>Ver detalles</button>
            </div>
            <div className="w-full relative">
                <RadarChart results={results} />
            </div>
            <button
                onClick={() => setResults(null)}
                className="font-medium fixed -right-9 top-16 translate-y-full -rotate-90 bg-callable hover:bg-callable-hover text-white px-5 py-1.5 pb-2 select-none"
            >
                Regresar
            </button>
            {tableModal && <NormalizedMatrixModal results={results} setVisible={setTableModal} />}
        </div>
    );
};

export default Results;

const NormalizedMatrixModal = ({ results, setVisible }: { results: any, setVisible: any }) => {
    return (
        <div className="fixed w-screen h-screen top-0 left-0 z-30 bg-black/20 backdrop-blur-sm grid place-items-center">
            <div className="max-w-4xl bg-white rounded-lg p-12 relative pb-16">
                <button className="right-4 top-4 absolute w-10 h-10 grid place-items-center" onClick={() => setVisible(false)}>
                    <Close className="w-7 h-7" />
                </button>
                <h3 className="text-primary text-2xl font-semibold mb-1">
                    Matriz Normalizada por Criterio
                </h3>
                <p className="mb-8">
                    Esta matriz compara las alternativas con los criterios como
                    parte del proceso de análisis de decisiones utilizando el
                    método AHP.
                </p>
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-secondary uppercase bg-bg2">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-4 whitespace-nowrap"
                            >
                                Macro Criterios
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Criterios
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Pesos
                            </th>
                            {VEHICLES.map((vehicle) => (
                                <th scope="col" className="px-6 py-4">
                                    {vehicle}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b border-border">
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg2"
                                rowSpan={3}
                            >
                                Características
                            </th>
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg2"
                            >
                                Precio
                            </th>
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg2"
                            >
                                {Math.round(results.weights.price * 100) / 100}
                            </th>
                            {[0, 1, 2, 3].map((i) => (
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {Math.round(
                                        results.normalized.char.price[i] * 100
                                    ) / 100}
                                </td>
                            ))}
                        </tr>
                        <tr className="bg-white border-b border-border">
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg2"
                            >
                                Seguridad
                            </th>
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg2"
                            >
                                {Math.round(results.weights.safety * 100) / 100}
                            </th>
                            {[0, 1, 2, 3].map((i) => (
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {Math.round(
                                        results.normalized.char.safety[i] * 100
                                    ) / 100}
                                </td>
                            ))}
                        </tr>
                        <tr className="bg-white border-b border-border">
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg2"
                            >
                                Diseño
                            </th>
                            <th
                                scope="row"
                                className="pl-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg2"
                            >
                                {Math.round(results.weights.design * 100) / 100}
                            </th>
                            {[0, 1, 2, 3].map((i) => (
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {Math.round(
                                        results.normalized.char.design[i] * 100
                                    ) / 100}
                                </td>
                            ))}
                        </tr>
                        <tr className="bg-bg border-b border-border">
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg2"
                                rowSpan={2}
                            >
                                Batería
                            </th>
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg2"
                            >
                                Autonomía
                            </th>
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg2"
                            >
                                {Math.round(results.weights.autonomy * 100) /
                                    100}
                            </th>
                            {[0, 1, 2, 3].map((i) => (
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {Math.round(
                                        results.normalized.battery.autonomy[i] *
                                            100
                                    ) / 100}
                                </td>
                            ))}
                        </tr>
                        <tr className="bg-bg border-b border-border">
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg2"
                            >
                                Capacidad útil
                            </th>
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg2"
                            >
                                {Math.round(results.weights.capacity * 100) /
                                    100}
                            </th>
                            {[0, 1, 2, 3].map((i) => (
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {Math.round(
                                        results.normalized.battery.capacity[i] *
                                            100
                                    ) / 100}
                                </td>
                            ))}
                        </tr>
                        <tr className="bg-white border-b border-border">
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg2"
                                rowSpan={2}
                            >
                                Motor
                            </th>
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg2"
                            >
                                Velocidad máxima
                            </th>
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg2"
                            >
                                {Math.round(results.weights.speed * 100) / 100}
                            </th>
                            {[0, 1, 2, 3].map((i) => (
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {Math.round(
                                        results.normalized.motor.speed[i] * 100
                                    ) / 100}
                                </td>
                            ))}
                        </tr>
                        <tr className="bg-white border-b border-border">
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg2"
                            >
                                Potencia máxima
                            </th>
                            <th
                                scope="row"
                                className="pl-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg2"
                            >
                                {Math.round(results.weights.power * 100) / 100}
                            </th>
                            {[0, 1, 2, 3].map((i) => (
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {Math.round(
                                        results.normalized.motor.power[i] * 100
                                    ) / 100}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ScoreTable = ({ resultsArray }: { resultsArray: any }) => {
    return (
        <div className="relative overflow-hidden mb-1">
            <table className="w-full text-sm text-left">
                <tbody>
                    {resultsArray.map((result: string, index: number) => (
                        <tr
                            className="odd:bg-white even:bg-bg border-b border-border"
                            key={result}
                        >
                            <th
                                scope="row"
                                className="pl-4 py-4 font-medium text-secondary whitespace-nowrap"
                            >
                                {index + 1}.
                            </th>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {index == 0 && "👑"} {VEHICLES_NAMES[result]}{" "}
                                {index == 0 && "👑"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const RadarChart = ({ results }: { results: any }) => {
    ChartJS.register(
        RadialLinearScale,
        PointElement,
        LineElement,
        Filler,
        Tooltip,
        Legend,
        Colors
    );
    const datasets: any = [];
    for (let i = 0; i < VEHICLES.length; i++) {
        datasets[i] = {
            label: VEHICLES_NAMES[VEHICLES[i]],
            data: {},
            fill: true,
        };
        for (const macro of Object.values(results.linear)) {
            for (let sub of Object.keys(macro as any)) {
                const m = macro as any;
                datasets[i].data[sub] = Math.round(m[sub][i] * 100);
            }
        }
    }

    // replace datasets.data with array of values ordered by key with subcriteria names
    //

    datasets.forEach((dataset: any) => {
        const dataOrdered: any = [];
        Object.keys(SUBCRITERIA_NAMES).forEach((name: string) => {
            dataOrdered.push(dataset.data[name]);
        });
        dataset.data = dataOrdered;
    });

    const data = {
        labels: Object.values(SUBCRITERIA_NAMES).map((name) => name + " (%)"),
        datasets: datasets,
    };

    return <Radar data={data} className="w-full" />;
};
