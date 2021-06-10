import { useQuery, gql } from "@apollo/client";
import * as utils from "./../utils.js";

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

    let mapsUrl = utils.getGoogleMapsUrl(
        data.bikeRentalStation.lat,
        data.bikeRentalStation.lon
    );

    return (
        <>
            <h2>
                {" "}
                <a href={mapsUrl}>
                    <span className="material-icons md-18 google-maps-color">
                        place
                    </span>
                </a>{" "}
                {data.bikeRentalStation.name}
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
