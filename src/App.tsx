import "./App.css";

import { useEffect } from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import useStateWithLocalStorage from "./hooks/useStateWithLocalStorage";
import StationInfo from "./components/StationInfo";
import Location from "./components/Location";

function App() {
    // Create an http link to the GraphQL server
    const httpLink = createHttpLink({
        uri: "https://closest-hsl-bike-station-status-function-app.azurewebsites.net/api/proxy",
    });

    // Create a link that adds a custom header to all requests
    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
            },
        };
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });

    const [stationIds, setStationIds] = useStateWithLocalStorage<Array<string>>(
        {
            localStorageKey: "stationIds",
            defaultValue: [],
        }
    );

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get("id");
        if (id != null) {
            const ids = id.split(",");
            setStationIds(ids);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const stationInfos = stationIds.map((stationId: any) => (
        <StationInfo key={stationId} stationId={stationId}></StationInfo>
    ));

    return (
        <>
            <ApolloProvider client={client}>
                <div className="container">
                    {stationInfos}
                    <Location setStationIds={setStationIds}></Location>
                </div>
            </ApolloProvider>
        </>
    );
}

export default App;
