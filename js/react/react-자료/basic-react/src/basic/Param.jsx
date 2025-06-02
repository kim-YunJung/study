import { useParams } from "react-router-dom";

const Param = () => {
    /* 
    /param/:id 
    /param/10으로 값이 넘어온 경우 
    id = 10이라는 값을 읽을 수 있다. 
    */
    const {id} = useParams();

    return (
        <div className="param-page">
            <p>param</p>
        </div>
    );
}

export default Param;
