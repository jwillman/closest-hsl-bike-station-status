import { useQuery, gql } from "@apollo/client";
import * as utils from "../utils/utils";

type StationInfoProps = {
    stationId: any;
};

type BikeRentalStationQuery = {
    bikeRentalStation: BikeRentalStationItem;
};

type BikeRentalStationItem = {
    stationId: string;
    name: string;
    bikesAvailable: number;
    spacesAvailable: number;
    lat: number;
    lon: number;
    allowDropoff: boolean;
};

const StationInfo: React.FC<StationInfoProps> = ({ stationId }) => {
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

    const { loading, error, data } = useQuery<BikeRentalStationQuery>(
        STATION_INFO,
        {
            variables: { id: stationId },
            pollInterval: 15000,
        }
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    if (data?.bikeRentalStation === null) return <div>Asemaa ei löytynyt</div>;

    const inactive = data?.bikeRentalStation?.bikesAvailable === 0;

    let mapsUrl = utils.getGoogleMapsUrl(
        data?.bikeRentalStation?.lat,
        data?.bikeRentalStation?.lon
    );

    // TODO localize texts
    return (
        <div className="stationInfo">
            <h2>
                {" "}
                <a className="stationName" href={mapsUrl}>
                    <span className="material-icons md-18 google-maps-color">
                        place
                    </span>
                    &nbsp;
                    {data?.bikeRentalStation.name}
                </a>{" "}
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
                <b>{data?.bikeRentalStation.bikesAvailable}</b> kpl
            </p>
        </div>
    );
};

export default StationInfo;
