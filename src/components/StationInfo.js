import { useQuery, gql } from "@apollo/client";

function StationInfo({ stationId }) {
    const STATION_INFO = gql`
        query StationInfo($id: String!) {
            bikeRentalStation(id: $id) {
                stationId
                name
                bikesAvailable
                spacesAvailable
                lat
                lon
                allowDropoff
            }
        }
    `;

    const { loading, error, data } = useQuery(STATION_INFO, {
        variables: { id: stationId },
        pollInterval: 10000,
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <>
            <h2>{data.bikeRentalStation.name}</h2>
            <p>
                Pyöriä vapaana: <b>{data.bikeRentalStation.bikesAvailable}</b>
                &nbsp;kpl
            </p>
        </>
    );
}

export default StationInfo;
