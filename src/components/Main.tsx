import { useState } from "react";
import CarView from "./CarView";
import Dashboard from "./Dashboard";

const Main = () => {
    const [design, setDesign] = useState({
        VOLVO: 5,
        RENAULT: 5,
        TESLA: 5,
        BYD: 5,
    });
    return (
        <div className="w-full min-h-full px-12 flex gap-14 justify-end">
            <div className="h-full w-[calc(100vw-3rem*2-3.5rem-20rem)] fixed left-14">
                <CarView />
            </div>
            <div className="w-80 overflow-hidden">
                <Dashboard design={design} />
            </div>
        </div>
    );
};
export default Main;
