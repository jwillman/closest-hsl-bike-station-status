import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import StationInfo from "./components/StationInfo.js";
import Location from "./components/Location.js";

function App() {
    const client = new ApolloClient({
        uri: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
        cache: new InMemoryCache(),
    });

    return (
        <>
            <ApolloProvider client={client}>
                <div className="container">
                    <StationInfo stationId="134"></StationInfo>
                    <StationInfo stationId="133"></StationInfo>
                    <StationInfo stationId="290"></StationInfo>
                    <Location></Location>
                </div>
            </ApolloProvider>
        </>
    );
}

export default App;
