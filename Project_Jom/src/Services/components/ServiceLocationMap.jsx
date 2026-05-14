import { useEffect, useMemo, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const ROUTE_API =
    "https://9pidtz8z27.execute-api.us-east-1.amazonaws.com/services/calculate-route";

function ServiceLocationMap({ locations = [] }) {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    const [userLocation, setUserLocation] = useState(null);
    const [routeResults, setRouteResults] = useState({});
    const [routeLoadingId, setRouteLoadingId] = useState("");
    const [locationError, setLocationError] = useState("");

    const validLocations = useMemo(() => {
        return locations.filter(
            (location) =>
                typeof location.latitude === "number" &&
                typeof location.longitude === "number"
        );
    }, [locations]);

    useEffect(() => {
        if (!mapContainerRef.current) return;
        if (validLocations.length === 0) return;

        const region = import.meta.env.VITE_AWS_LOCATION_REGION;
        const apiKey = import.meta.env.VITE_AWS_LOCATION_API_KEY;
        const mapStyle = import.meta.env.VITE_AWS_LOCATION_MAP_STYLE || "Standard";

        const firstLocation = validLocations[0];

        const styleUrl = `https://maps.geo.${region}.amazonaws.com/v2/styles/${mapStyle}/descriptor?key=${apiKey}`;

        const map = new maplibregl.Map({
            container: mapContainerRef.current,
            style: styleUrl,
            center: [firstLocation.longitude, firstLocation.latitude],
            zoom: 14,
        });

        map.addControl(new maplibregl.NavigationControl(), "top-right");

        const bounds = new maplibregl.LngLatBounds();

        validLocations.forEach((location) => {
            bounds.extend([location.longitude, location.latitude]);

            const popup = new maplibregl.Popup({ offset: 25 }).setHTML(`
        <strong>${location.name || "Service location"}</strong><br/>
        ${location.address || "Address not stated"}
      `);

            new maplibregl.Marker()
                .setLngLat([location.longitude, location.latitude])
                .setPopup(popup)
                .addTo(map);
        });

        if (validLocations.length > 1) {
            map.fitBounds(bounds, {
                padding: 60,
                maxZoom: 15,
            });
        }

        mapRef.current = map;

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, [validLocations]);

    const getLocationId = (location) => {
        return location.locationId || location.name || location.address;
    };

    const handleUseMyLocation = () => {
        setLocationError("");

        if (!navigator.geolocation) {
            setLocationError("Your browser does not support location access.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const nextUserLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };

                setUserLocation(nextUserLocation);

                if (mapRef.current) {
                    new maplibregl.Marker({ color: "#2563eb" })
                        .setLngLat([
                            nextUserLocation.longitude,
                            nextUserLocation.latitude,
                        ])
                        .setPopup(
                            new maplibregl.Popup({ offset: 25 }).setHTML(
                                "<strong>Your location</strong>"
                            )
                        )
                        .addTo(mapRef.current);

                    mapRef.current.flyTo({
                        center: [
                            nextUserLocation.longitude,
                            nextUserLocation.latitude,
                        ],
                        zoom: 13,
                    });
                }
            },
            () => {
                setLocationError(
                    "Unable to access your location. Please allow location permission."
                );
            }
        );
    };

    const handleCalculateRoute = async (location) => {
        if (!userLocation) {
            handleUseMyLocation();
            return;
        }

        const locationId = getLocationId(location);

        try {
            setRouteLoadingId(locationId);

            const res = await fetch(ROUTE_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    origin: userLocation,
                    destination: {
                        latitude: location.latitude,
                        longitude: location.longitude,
                    },
                    travelMode: "Car",
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to calculate route");
            }

            setRouteResults((prev) => ({
                ...prev,
                [locationId]: data,
            }));

            if (data.routeCoordinates?.length > 0) {
                if (mapRef.current?.loaded()) {
                    drawRouteLine(data.routeCoordinates);
                } else {
                    mapRef.current?.once("load", () => {
                        drawRouteLine(data.routeCoordinates);
                    });
                }
            }
        } catch (error) {
            console.error(error);

            setRouteResults((prev) => ({
                ...prev,
                [locationId]: {
                    error: error.message,
                },
            }));
        } finally {
            setRouteLoadingId("");
        }
    };

    const drawRouteLine = (coordinates) => {
        if (!mapRef.current || !Array.isArray(coordinates)) return;

        const map = mapRef.current;

        const sourceId = "selected-route-source";
        const layerId = "selected-route-layer";

        if (map.getLayer(layerId)) {
            map.removeLayer(layerId);
        }

        if (map.getSource(sourceId)) {
            map.removeSource(sourceId);
        }

        map.addSource(sourceId, {
            type: "geojson",
            data: {
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates,
                },
                properties: {},
            },
        });

        map.addLayer({
            id: layerId,
            type: "line",
            source: sourceId,
            layout: {
                "line-join": "round",
                "line-cap": "round",
            },
            paint: {
                "line-color": "#c1121f",
                "line-width": 5,
                "line-opacity": 0.9,
            },
        });

        const bounds = new maplibregl.LngLatBounds();

        coordinates.forEach((coord) => {
            bounds.extend(coord);
        });

        map.fitBounds(bounds, {
            padding: 70,
            maxZoom: 15,
        });
    };

    const openGoogleDirections = (location) => {
        if (!location.latitude || !location.longitude) return;

        const destination = `${location.latitude},${location.longitude}`;

        window.open(
            `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
            "_blank"
        );
    };

    const openGoogleMapsLocation = (location) => {
        if (!location.latitude || !location.longitude) return;

        const query = `${location.latitude},${location.longitude}`;

        window.open(
            `https://www.google.com/maps/search/?api=1&query=${query}`,
            "_blank"
        );
    };

    if (locations.length === 0) {
        return null;
    }

    return (
        <div className="service-location-section">
            <div className="service-location-header">
                <span className="service-guide-pill">Onsite Support</span>

                <h2>Where you can get help</h2>

                <p>
                    These locations are listed to help you plan your visit. Please check
                    the official source before going down.
                </p>

                {validLocations.length > 0 && (
                    <button
                        type="button"
                        className="use-location-btn"
                        onClick={handleUseMyLocation}
                    >
                        Use my current location
                    </button>
                )}

                {userLocation && (
                    <p className="location-success-text">
                        Your location is ready. You can now estimate travel time.
                    </p>
                )}

                {locationError && (
                    <p className="location-error-text">{locationError}</p>
                )}
            </div>

            {validLocations.length > 0 ? (
                <div ref={mapContainerRef} className="service-location-map" />
            ) : (
                <div className="service-location-no-map">
                    Map preview is not available yet because coordinates are not stored for
                    this location.
                </div>
            )}

            <div className="service-location-list">
                {locations.map((location) => {
                    const locationId = getLocationId(location);
                    const routeResult = routeResults[locationId];
                    const hasCoordinates =
                        typeof location.latitude === "number" &&
                        typeof location.longitude === "number";

                    return (
                        <div
                            key={locationId}
                            className="service-location-card"
                        >
                            <h3>{location.name}</h3>

                            <p>{location.address || "Address not stated"}</p>

                            <div className="service-location-meta">
                                <span>{location.locationType || "Location"}</span>
                                <span>{location.openingHours || "Opening hours not stated"}</span>
                                <span>{location.confidence || "Check before visiting"}</span>
                            </div>

                            {routeResult && !routeResult.error && (
                                <div className="route-result-box">
                                    <strong>
                                        About {routeResult.distanceKm} km away
                                    </strong>

                                    <p>
                                        Estimated travel time:{" "}
                                        {routeResult.durationMinutes
                                            ? `${routeResult.durationMinutes} minutes by car.`
                                            : "Not available."}
                                    </p>
                                </div>
                            )}

                            {routeResult?.error && (
                                <p className="location-error-text">
                                    {routeResult.error}
                                </p>
                            )}

                            {location.notes && (
                                <p className="service-location-note">{location.notes}</p>
                            )}

                            <div className="service-location-actions">
                                {hasCoordinates && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handleCalculateRoute(location)}
                                        >
                                            {routeLoadingId === locationId
                                                ? "Calculating..."
                                                : userLocation
                                                    ? "Estimate travel time"
                                                    : "Use location for travel time"}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => openGoogleDirections(location)}
                                        >
                                            Get Directions
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => openGoogleMapsLocation(location)}
                                        >
                                            Open Map
                                        </button>
                                    </>
                                )}

                                {location.sourceUrl && (
                                    <a
                                        href={location.sourceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="service-location-link"
                                    >
                                        Check official source
                                    </a>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ServiceLocationMap;