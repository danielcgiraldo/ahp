import { Info } from "../lib/icons";

const Dashboard = () => {
    return (
        <div className="w-full min-h-full py-16">
            <form className="flex flex-col items-center">
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
                            id="macro_char_battery"
                            label1="Características Básicas"
                            label2="Batería"
                        />
                        <RelativeWeightSelector
                            id="macro_battery_motor"
                            label1="Batería"
                            label2="Motor"
                        />
                        <RelativeWeightSelector
                            id="macro_motor_char"
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
                            id="char_safety_motor"
                            label1="Seguridad"
                            label2="Motor"
                        />
                    </ul>
                    <hr className="text-border mt-9 mb-6" />
                    <h4 className="font-medium mb-4">
                        Batería
                    </h4>
                    <ul className="grid gap-4">
                        <RelativeWeightSelector
                            id="battery_autonomy_capacity"
                            label1="Autonomía"
                            label2="Capacidad Útil"
                        />
                    </ul>
                    <hr className="text-border mt-9 mb-6" />
                    <h4 className="font-medium mb-4">
                        Motor
                    </h4>
                    <ul className="grid gap-4">
                        <RelativeWeightSelector
                            id="motor_velocity_power"
                            label1="Velocidad Máxima"
                            label2="Potencia Máxima"
                        />
                    </ul>
                </div>
                <button className="bg-callable w-full py-3 text-center rounded font-medium text-white mt-8 hover:bg-callable-hover transition-colors">Calcular</button>
            </form>
            <p className="mt-4 text-sm">Copyright © 2023 <a href="https://idaniel.dev" target="_blank" rel="noopener noreferrer">Daniel Castillo Giraldo</a>.</p>
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
            >
                <option value="" selected disabled></option>
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
