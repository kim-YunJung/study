import { useSearchParams } from "react-router-dom";

const Param2 = () => {
    const [params] = useSearchParams();
    console.log(`q ${params.get("q")} / page ${params.get("page")}`);

    return (
        <div className="param-page">
            <p>param</p>
        </div>
    );
}

export default Param2;
