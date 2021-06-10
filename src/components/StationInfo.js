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

    const inactive = data.bikeRentalStation.bikesAvailable === "0";
    const latLon = encodeURIComponent(
        data.bikeRentalStation.lat + "," + data?.bikeRentalStation.lon
    );
    let mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latLon}`;

    return (
        <>
            <h2>
                {" "}
                {data.bikeRentalStation.name}
                <a href={mapsUrl}>
                    <span className="material-icons md-18 google-maps-color">
                        place
                    </span>
                </a>
            </h2>
            <p>
                <span
                    className={`material-icons md-dark ${
                        inactive ? "md-inactive" : ""
                    }`}
                >
                    pedal_bike
                </span>
                &nbsp; Pyöriä telineissä:{" "}
                <b>{data.bikeRentalStation.bikesAvailable}</b> kpl
            </p>
        </>
    );
}

export default StationInfo;
