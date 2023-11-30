import { useState } from "react";
import { Info, Loading } from "../lib/icons";
import Results from "./Results";

const Dashboard = ({ design }: { design: any }) => {
    const [loading, setLoading] = useState(true);

    const handleSubmit = (ev: React.FormEvent) => {
        const form = ev.target as HTMLFormElement;
        const formData = new FormData(form);
        const object: any = {};
        formData.forEach((value, key) => (object[key] = value));
        ev.preventDefault();
        fetch("/api/ahp", {
            method: "POST",
            body: JSON.stringify({
                design: design,
                weights: object,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    alert("Se ha producido un error");
                    console.error("Error: " + data.error);
                    return;
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="w-full min-h-full py-16">
            <form
                className="flex flex-col items-center"
                onSubmit={handleSubmit}
            >
                <h1 className="text-primary text-5xl font-medium text-center mb-1">
                    Best Car
                </h1>
                <button className="flex items-center gap-1 mb-12">
                    <Info className="text-callable h-5 w-5" />
                    <p className="underline underline-offset-4">
                        Modelo de decisión AHP
                    </p>
                </button>
                <div className="w-full mb-10">
                    <h3 className="bg-bg py-3 text-center rounded text-secondary font-medium mb-7">
                        Macrocriterios
                    </h3>
                    <ul className="grid gap-4">
                        <RelativeWeightSelector
                            id="char_battery"
                            label1="Características Básicas"
                            label2="Batería"
                        />
                        <RelativeWeightSelector
                            id="battery_motor"
                            label1="Batería"
                            label2="Motor"
                        />
                        <RelativeWeightSelector
                            id="motor_char"
                            label1="Motor"
                            label2="Características Básicas"
                        />
                    </ul>
                </div>
                <div className="w-full">
                    <h3 className="bg-bg py-3 text-center rounded text-secondary font-medium mb-7">
                        Subcriterios
                    </h3>
                    <h4 className="font-medium mb-4">
                        Características Básicas
                    </h4>
                    <ul className="grid gap-4">
                        <RelativeWeightSelector
                            id="char_price_safety"
                            label1="Precio"
                            label2="Seguridad"
                        />
                        <RelativeWeightSelector
                            id="char_design_price"
                            label1="Diseño"
                            label2="Precio"
                        />
                        <RelativeWeightSelector
                            id="char_safety_design"
                            label1="Seguridad"
                            label2="Diseño"
                        />
                    </ul>
                    <hr className="text-border mt-9 mb-6" />
                    <h4 className="font-medium mb-4">Batería</h4>
                    <ul className="grid gap-4">
                        <RelativeWeightSelector
                            id="battery_autonomy_capacity"
                            label1="Autonomía"
                            label2="Capacidad Útil"
                        />
                    </ul>
                    <hr className="text-border mt-9 mb-6" />
                    <h4 className="font-medium mb-4">Motor</h4>
                    <ul className="grid gap-4">
                        <RelativeWeightSelector
                            id="motor_speed_power"
                            label1="Velocidad Máxima"
                            label2="Potencia Máxima"
                        />
                    </ul>
                </div>
                <button
                    disabled={loading}
                    className={`bg-callable w-full py-3 text-center rounded font-medium text-white mt-8 hover:bg-callable-hover transition-colors ${loading && "bg-callable-hover"}`}
                >
                    {
                        loading ? <><Loading className="inline w-4 h-4 mr-1 -mt-1 text-white animate-spin" /> Cargando...</> : "Calcular"
                    }
                </button>
            </form>
            <Results />
            <p className="mt-4 text-sm">
                Copyright © 2023{" "}
                <a
                    href="https://idaniel.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Daniel Castillo Giraldo
                </a>
                .
            </p>
        </div>
    );
};

const RelativeWeightSelector = ({
    id,
    label1,
    label2,
}: {
    id: string;
    label1: string;
    label2: string;
}) => {
    return (
        <li className="flex gap-1.5">
            <label htmlFor={id} className="whitespace-nowrap">
                {label1}
            </label>
            <select
                name={id}
                id={id}
                className="w-full bg-transparent border-b border-secondary"
                required
                defaultValue="1"
            >
                <option value={1 / 9}>
                    absolutamente menos importante que
                </option>
                <option value={1 / 7}>mucho menos importante que</option>
                <option value={1 / 5}>bastante menos importante que</option>
                <option value={1 / 3}>apenas menos importante que</option>
                <option value="1">igualmente importante que</option>
                <option value="3">apenas más importante que</option>
                <option value="5">bastante más importante que</option>
                <option value="7">mucho más importante que</option>
                <option value="9">absolutamente más importante que</option>
            </select>
            <label htmlFor={id} className="whitespace-nowrap">
                {label2}
            </label>
        </li>
    );
};

export default Dashboard;
