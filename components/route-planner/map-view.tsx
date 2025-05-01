"use client";

import { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";

// You would need to replace this with your actual Google Maps API key
const GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
  "AIzaSyApdnBLqJeVW4c5t1Z32v8BzVBVWyJnY1g";

interface MapViewProps {
  origin: string;
  destination: string;
  className?: string;
}

const containerStyle = {
  width: "100%",
  height: "100%",
};

// Default center (Nigeria)
const defaultCenter = {
  lat: 9.082,
  lng: 8.6753,
};

export function MapView({ origin, destination, className }: MapViewProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    setIsLoaded(true);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Request directions when origin or destination changes
  useEffect(() => {
    if (!isLoaded || !origin || !destination) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
          setError(null);
        } else {
          setError(`Couldn't find directions: ${status}`);
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );
  }, [origin, destination, isLoaded]);

  return (
    <div className={`relative ${className}`}>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={5}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            styles: [
              {
                featureType: "all",
                elementType: "geometry",
                stylers: [{ color: "#242f3e" }],
              },
              {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#242f3e" }],
              },
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [{ color: "#746855" }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
              },
            ],
          }}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  strokeColor: "#3b82f6", // blue-500
                  strokeWeight: 5,
                },
                suppressMarkers: false,
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 dark:bg-background/90">
          <div className="text-center p-4 rounded-md">
            <p className="text-destructive">{error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Try a different route or check the location names
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
