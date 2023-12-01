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
import { Radar } from "react-chartjs-2";

const Results = ({
    results,
    setResults,
}: {
    results: any;
    setResults: any;
}) => {
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
                <button className="text-sm underline">Ver detalles</button>
            </div>
            <div className="w-full relative">
                <RadarChart results={results} />
            </div>
            <button onClick={() => setResults(null)}>Volver</button>
        </div>
    );
};

export default Results;

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
        datasets: datasets
    };

    return <Radar data={data} className="w-full" />;
};
