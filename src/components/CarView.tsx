import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronUp } from "../lib/icons";

const CarView = () => {
    const [currentCar, setCurrentCar] = useState(0);

    const moveCar = (ev: React.MouseEvent) => {
        const action = (ev.target as HTMLElement).dataset.action;
        if (action == "left") {
            setCurrentCar((prev) => (prev - 1 < 0 ? 3 : prev - 1));
        } else if (action == "right") {
            setCurrentCar((prev) => (prev + 1 > 3 ? 0 : prev + 1));
        }
    };

    return (
        <div className="flex w-full h-full">
            <button className="w-7 h-full" onClick={moveCar} data-action="left">
                <span className="w-7 h-7 bg-bg grid place-items-center rounded text-secondary pointer-events-none">
                    <ChevronLeft className="w-5 h-5" />
                </span>
            </button>
            <div className="flex-grow overflow-hidden relative">
                <div
                    className={`grid place-items-center w-full h-full absolute ${
                        currentCar != 0 ? "invisible" : ""
                    }`}
                >
                    <img
                        src="/images/tesla.png"
                        className="w-full"
                        alt="Tesla Model 3"
                    />
                    <CarBanner title="Tesla Model 3" price="260.000.000" />
                </div>
                <div
                    className={`grid place-items-center w-full h-full absolute ${
                        currentCar != 1 ? "invisible" : ""
                    }`}
                >
                    <img
                        src="/images/renault.png"
                        className="w-full"
                        alt="Renault ZOE E-TECH"
                    />
                    <CarBanner title="Renault ZOE E-TECH" price="169.990.000" />
                </div>
                <div
                    className={`grid place-items-center w-full h-full absolute ${
                        currentCar != 2 ? "invisible" : ""
                    }`}
                >
                    <img
                        src="/images/volvo.png"
                        className="w-full"
                        alt="Volvo XC40 Recharge"
                    />
                    <CarBanner title="Volvo XC40 Recharge" price="270.000.000" />
                </div>
                <div
                    className={`grid place-items-center w-full h-full absolute ${
                        currentCar != 3 ? "invisible" : ""
                    }`}
                >
                    <img
                        src="/images/byd.png"
                        className="w-full"
                        alt="BYD Tang EV"
                    />
                    <CarBanner title="BYD Tang EV" price="329.900.000" />
                </div>
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

const CarBanner = ({ title, price }: { title: string; price: string }) => {
    return (
        <button className="absolute -bottom-0.5 w-134 bg-bg py-4 px-5 rounded-t-2xl">
            <div className="h-10 w-full relative flex justify-center items-center gap-3 text-sm">
                <span className="w-9 h-9 bg-white grid place-items-center rounded-full text-secondary absolute left-0 shadow-md">
                    <ChevronUp className="w-5 h-5" />
                </span>
                <h2 className="inline-block w-auto font-medium text-secondary">{title}</h2>
                <span className="text-border">|</span>
                <p>$ {price},00 Precio Final</p>
            </div>
        </button>
    );
};

export default CarView;
