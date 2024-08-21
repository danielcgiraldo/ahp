import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronUp } from "../lib/icons";
import { DATA, VEHICLES, VEHICLES_NAMES } from "../lib/data";
import { transform } from "typescript";

const CarView = ({ design, setDesign }: { design: any; setDesign: any }) => {
    const [currentCar, setCurrentCar] = useState(0);

    const moveCar = (ev: React.MouseEvent) => {
        const action = (ev.target as HTMLElement).dataset.action;
        if (action == "left") {
            setCurrentCar((prev) => (prev - 1 < 0 ? 3 : prev - 1));
        } else if (action == "right") {
            setCurrentCar((prev) => (prev + 1 > 3 ? 0 : prev + 1));
        }
    };

    const COP = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
    });

    return (
        <div className="flex w-full h-full">
            <button className="w-7 h-full" onClick={moveCar} data-action="left">
                <span className="w-7 h-7 bg-bg grid place-items-center rounded text-secondary pointer-events-none">
                    <ChevronLeft className="w-5 h-5" />
                </span>
            </button>
            <div className="flex-grow overflow-hidden relative">
                {VEHICLES.map((vehicle, index) => (
                    <div
                        className={`grid place-items-center w-full h-full absolute ${
                            currentCar != index ? "invisible" : ""
                        }`}
                        key={vehicle}
                    >
                        <img
                            src={`/images/${vehicle.toLowerCase()}.png`}
                            className="w-full"
                            alt={VEHICLES_NAMES[vehicle]}
                        />
                        <CarBanner
                            title={VEHICLES_NAMES[vehicle]}
                            price={COP.format(DATA[vehicle].char.price * -1)}
                            safety={DATA[vehicle].char.safety.toString()}
                            design={"5"}
                            setDesign={(value) => {
                                setDesign((prev: any) => ({
                                    ...prev,
                                    [vehicle]: parseInt(value),
                                }));
                            }}
                            autonomy={DATA[vehicle].battery.autonomy.toString()}
                            capacity={(DATA[vehicle].battery.capacity * -1).toString()}
                            speed={DATA[vehicle].motor.speed.toString()}
                            power={DATA[vehicle].motor.power.toString()}
                        />
                    </div>
                ))}
            </div>
            <button
                className="w-7 h-full"
                data-action="right"
                onClick={moveCar}
            >
                <span className="w-7 h-7 bg-bg grid place-items-center rounded text-secondary pointer-events-none">
                    <ChevronRight className="w-5 h-5" />
                </span>
            </button>
        </div>
    );
};

const CarBanner = ({
    title,
    price,
    safety,
    design,
    setDesign,
    autonomy,
    capacity,
    speed,
    power,
}: {
    title: string;
    price: string;
    safety: string;
    design: string;
    setDesign: (value: string) => void;
    autonomy: string;
    capacity: string;
    speed: string;
    power: string;
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="absolute -bottom-0.5 w-134 transition-transform duration-200" style={{transform: `translateY(${open ? "0px" : "415px"})`}}>
            <button className="bg-bg py-4 w-134 px-5 rounded-t-2xl" onClick={() => setOpen((prev) => !prev)}>
                <div className="h-10 w-full relative flex justify-center items-center gap-3 text-sm">
                    <span className="w-9 h-9 bg-white grid place-items-center rounded-full text-secondary absolute left-0 shadow-md">
                        <ChevronUp className={`w-5 h-5 transition-transform ${open ? "rotate-180" : "0"}`} />
                    </span>
                    <h2 className="inline-block w-auto font-medium text-secondary">
                        {title}
                    </h2>
                    <span className="text-border">|</span>
                    <p>{price} Precio Final</p>
                </div>
            </button>
            <div className="bg-bg w-134">
            <table className="w-full text-sm text-left">
                    <thead className="text-xs text-secondary uppercase bg-bg">
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
                                Dato
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b border-border">
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg"
                                rowSpan={3}
                            >
                                Características
                            </th>
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg"
                            >
                                Precio
                            </th>
                            <th
                                scope="row"
                                className="px-6 py-4 whitespace-nowrap"
                            >
                                {price}
                            </th>
                        </tr>
                        <tr className="bg-white border-b border-border">
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg"
                            >
                                Seguridad
                            </th>
                            <th
                                scope="row"
                                className="px-6 py-4 whitespace-nowrap"
                            >
                                {safety}<span className="font-normal"> de 6</span>
                            </th>
                        </tr>
                        <tr className="bg-white border-b border-border">
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg"
                            >
                                Diseño
                            </th>
                            <th
                                scope="row"
                                className="px-6 py-4 whitespace-nowrap"
                            >
                                <input type="number" onChange={(ev) => setDesign(ev.target.value)} defaultValue={design} min={1} max={5} className="border-b border-border" /><span className="font-normal"> de 5</span>
                            </th>
                        </tr>
                        <tr className="bg-white border-b border-border">
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg"
                                rowSpan={2}
                            >
                                Batería
                            </th>
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg"
                            >
                                Autonomía
                            </th>
                            <th
                                scope="row"
                                className="px-6 py-4 whitespace-nowrap"
                            >
                                {autonomy}<span className="font-normal"> km</span>
                            </th>
                        </tr>
                        <tr className="bg-white border-b border-border">
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg"
                            >
                                Capacidad útil
                            </th>
                            <th
                                scope="row"
                                className="px-6 py-4 whitespace-nowrap"
                            >
                                {capacity}<span className="font-normal"> kWh</span>
                            </th>
                        </tr>
                        <tr className="bg-white border-b border-border">
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg"
                                rowSpan={2}
                            >
                                Motor
                            </th>
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg"
                            >
                                Velocidad máxima
                            </th>
                            <th
                                scope="row"
                                className="px-6 py-4 whitespace-nowrap"
                            >
                                {speed}<span className="font-normal"> km/h</span>
                            </th>
                        </tr>
                        <tr className="bg-white border-b border-border">
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-secondary whitespace-nowrap bg-bg"
                            >
                                Potencia máxima
                            </th>
                            <th
                                scope="row"
                                className="px-6 py-4 whitespace-nowrap"
                            >
                                {power}<span className="font-normal"> hp</span>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CarView;
