import { useQuery, gql } from "@apollo/client";
import * as utils from "../utils/utils";

type StationInfoProps = {
    stationId: string;
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

const StationInfo: React.FC<StationInfoProps> = ({ stationId }) => {
    const { loading, error, data } = useQuery<BikeRentalStationQuery>(
        STATION_INFO,
        {
            variables: { id: stationId },
            pollInterval: 15000,
        }
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    if (!data?.bikeRentalStation) return <div>Asemaa ei löytynyt</div>;

    const { bikesAvailable, lat, lon, name } = data.bikeRentalStation;

    const inactive = bikesAvailable === 0;
    const mapsUrl = utils.getGoogleMapsUrl(lat, lon);

    // TODO localize texts
    return (
        <div className="stationInfo">
            <h2>
                <a className="stationName" href={mapsUrl}>
                    <span className="material-icons md-18 google-maps-color">
                        place
                    </span>
                    &nbsp;
                    {name}
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
                &nbsp; Pyöriä telineissä: <b>{bikesAvailable}</b> kpl
            </p>
        </div>
    );
};

export default StationInfo;
