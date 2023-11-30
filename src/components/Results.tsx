const Results = ({results, setResults} : {results: any, setResults: any}) => {
 return (
    <div className="w-full mt-4">
        <h1>{JSON.stringify(results)}</h1>
        <button onClick={() => setResults(null)}>Volver</button>
    </div>
 )
}

export default Results