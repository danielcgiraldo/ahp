import { Info } from "../lib/icons";
import Results from "./Results";
import Form from "./Form";
import { useState } from "react";

const Dashboard = ({ design }: { design: any }) => {
    const [results, setResults] = useState<any>(null);
    return (
        <div className="w-full min-h-full py-16">
            <h1 className="text-primary text-5xl font-medium text-center mb-1">
                Best Car
            </h1>
            <button className="flex items-center gap-1 mb-9 mx-auto">
                <Info className="text-callable h-5 w-5" />
                <p className="underline underline-offset-4">
                    Modelo de decisión AHP
                </p>
            </button>
            {
                results ? <Results results={results} setResults={setResults} /> : <Form design={design} setResults={setResults} />
            }
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

export default Dashboard;
