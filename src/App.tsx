import React, { useEffect } from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import "./App.css";
import useStateWithLocalStorage from "./hooks/useStateWithLocalStorage";
import StationInfo from "./components/StationInfo";
import Location from "./components/Location";

const App = () => {
    const httpLink = createHttpLink({
        uri: process.env.REACT_APP_API_URL || "http://localhost:7071/api/proxy",
    });

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

        if (id) {
            const ids = id.split(",");
            setStationIds(ids);
        }
    }, [setStationIds]);

    const stationInfos = stationIds.map((stationId) => (
        <StationInfo key={stationId} stationId={stationId} />
    ));

    return (
        <ApolloProvider client={client}>
            <div className="container">
                {stationInfos}
                <Location setStationIds={setStationIds} />
            </div>
        </ApolloProvider>
    );
};

export default App;
