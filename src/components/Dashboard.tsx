import { Info } from "../lib/icons";
import Results from "./Results";
import Form from "./Form";
import { useState } from "react";

const Dashboard = ({ design }: { design: any }) => {
    const [results, setResults] = useState<any>(null);
    return (
        <div className="w-full min-h-full pt-8 pb-6">
            <h1 className="text-primary text-5xl font-medium text-center mb-1">
                Best Car
            </h1>
            <button className="flex items-center gap-1 mb-9 mx-auto">
                <Info className="text-callable h-5 w-5" />
                <a
                    href="https://github.com/dcastillogi/ahp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                >
                    Modelo de decisión AHP
                </a>
            </button>
            {results ? (
                <Results results={results} setResults={setResults} />
            ) : (
                <Form design={design} setResults={setResults} />
            )}
            <p className="mt-4 text-sm">
                Copyright © 2023-{new Date().getFullYear()}{" "}
                <a
                    href="https://dcastillogi.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Daniel Castillo
                </a>
                .
            </p>
        </div>
    );
};

export default Dashboard;
