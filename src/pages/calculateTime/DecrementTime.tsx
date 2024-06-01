import Button from "../../components/Button";
import { useDecrementTimeContext } from "../../contexts/CalculateTime/DecrementTimeContext";

const DecrementTime: React.FC = () => {
    const {fetchData} = useDecrementTimeContext()
    return (
      <div>
        Decrement Time
        <Button onClick={fetchData}>Fetch Data</Button>
      </div>
    );
}

export default DecrementTime
