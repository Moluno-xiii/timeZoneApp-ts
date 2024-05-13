import useFetchInfo from "../hooks/useFetchInfo";

const GetTime: React.FC = () => {
     const { ipAddress, timeZone } = useFetchInfo();
    return (
        <div>
            Get Time 
            <p>ipAddress : {ipAddress}</p>
            <p>timeZone : {timeZone}</p>
        </div>
    )
}

export default GetTime
