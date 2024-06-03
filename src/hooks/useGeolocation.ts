import { useState, useEffect } from "react";

type Position = {
  lat: number;
  lng: number;
} | null;

export function useGeolocation(defaultPosition: Position = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    function getPosition() {
      if (!navigator.geolocation) {
        setError("Your browser does not support geolocation");
        return;
      }

      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setIsLoading(false);
        },
        (error) => {
          setError(error.message);
          setIsLoading(false);
        },
      );
    }

    getPosition();
  }, []); 

  return { isLoading, position, error };
}
