import CarView from "./CarView";
import Dashboard from "./Dashboard";

const Main = () => {
    return (
        <div className="w-full h-full px-12 flex gap-14 justify-end">
            <div className="h-full w-[calc(100vw-3rem*2-3.5rem-20rem)] fixed left-14">
                <CarView />
            </div>
            <div className="w-80 min-h-full">
                <Dashboard />
            </div>
        </div>
    );
};
export default Main;
 