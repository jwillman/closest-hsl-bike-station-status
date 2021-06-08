import "./App.css";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
} from "@apollo/client";

const client = new ApolloClient({
    uri: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
    cache: new InMemoryCache(),
});

const stationId = 133;

const STATION_INFO = gql`
    query StationInfo {
        bikeRentalStation(id: "133") {
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

function StationInfo() {
    const { loading, error, data } = useQuery(STATION_INFO);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    console.log(data);

    return (
        <>
            <h1>{data.bikeRentalStation.name}</h1>
            <p>Pyöriä vapaana: {data.bikeRentalStation.bikesAvailable} </p>
            <p>Paikkoja vapaana: {data.bikeRentalStation.spacesAvailable}</p>
        </>
    );
}

function App() {
    return (
        <>
            <ApolloProvider client={client}>
                <div className="container">
                    <StationInfo></StationInfo>
                </div>
            </ApolloProvider>
        </>
    );
}

export default App;
