"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Loader2 } from "lucide-react";

interface MapViewProps {
  origin: string;
  destination: string;
  className?: string;
}

export default function MapView({
  origin,
  destination,
  className,
}: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const routingControlRef = useRef<L.Routing.Control | null>(null);
  const mapElementRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeMap = async () => {
      if (mapRef.current || !mapElementRef.current) return;

      setIsLoading(true);
      try {
        const map = L.map(mapElementRef.current);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);
        mapRef.current = map;

        // Wait for initial geocoding before setting view
        const originCoords = await geocode(origin);
        if (originCoords) {
          map.setView([originCoords[0], originCoords[1]], 13);
        }
      } catch (error) {
        console.error("Map initialization failed:", error);
      }
    };

    const geocode = async (location: string) => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          location
        )}`
      );
      const data = await response.json();
      return data.length > 0
        ? [parseFloat(data[0].lat), parseFloat(data[0].lon)]
        : null;
    };

    const updateRoute = async () => {
      if (!mapRef.current) return;

      try {
        const originCoords = await geocode(origin);
        const destinationCoords = await geocode(destination);

        if (originCoords && destinationCoords && mapRef.current) {
          if (routingControlRef.current) {
            mapRef.current.removeControl(routingControlRef.current);
          }

          routingControlRef.current = L.Routing.control({
            waypoints: [
              L.latLng(originCoords[0], originCoords[1]),
              L.latLng(destinationCoords[0], destinationCoords[1]),
            ],
            addWaypoints: false,
            routeWhileDragging: false,
          }).addTo(mapRef.current);
        }
      } catch (error) {
        console.error("Route update failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Initialize the map and update route
    initializeMap().then(() => {
      if (mapRef.current) {
        updateRoute();
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        routingControlRef.current = null;
      }
    };
  }, [origin, destination]);

  return (
    <div className="relative h-full w-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-50">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      <div
        id="map"
        ref={mapElementRef}
        className={`h-full w-full ${className}`}
      />
    </div>
  );
}
