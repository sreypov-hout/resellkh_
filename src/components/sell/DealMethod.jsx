"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Move } from "lucide-react";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";

const MapPicker = dynamic(() => import("./MapPicker"), { ssr: false });

const CAMBODIA_BOUNDS = {
  minLat: 9.5,
  maxLat: 15.0,
  minLng: 102.0,
  maxLng: 108.0,
};

const DealMethod = forwardRef(
  (
    { location, setLocation, telegram, setTelegram, setLatitude, setLongitude },
    ref
  ) => {
    const [mapVisible, setMapVisible] = useState(false);
    const [telegramInput, setTelegramInput] = useState("");
    const [telegramError, setTelegramError] = useState("");

    const handleLocationPick = async ({ lat, lng }) => {
      if (
        lat < CAMBODIA_BOUNDS.minLat ||
        lat > CAMBODIA_BOUNDS.maxLat ||
        lng < CAMBODIA_BOUNDS.minLng ||
        lng > CAMBODIA_BOUNDS.maxLng
      ) {
        toast.error("Please select a location within Cambodia.");
        setMapVisible(false);
        return;
      }

      setLatitude(lat);
      setLongitude(lng);

      try {
        const token = localStorage.getItem("token");
        const reverseGeocodeUrl = `/api/reverse-geocode?lat=${lat}&lon=${lng}`;

        const res = await fetch(reverseGeocodeUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error(
            `Backend Reverse Geocoding Error: ${res.status} ${res.statusText} - ${errorText}`
          );
          if (res.status === 401) {
            toast.error(
              "Unauthorized: Please log in to use location services."
            );
          } else {
            toast.error("Failed to get address for selected location.");
          }
          throw new Error(`Reverse geocoding failed: ${res.status}`);
        }

        const data = await res.json();
        setLocation(
          data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`
        );
      } catch (error) {
        console.error("Error fetching address:", error);
        setLocation(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      } finally {
        setMapVisible(false);
      }
    };

    const handleTelegramChange = (e) => {
      const value = e.target.value;
      setTelegramInput(value);
      if (telegramError) setTelegramError("");
    };

    useImperativeHandle(ref, () => ({
      validateTelegram: () => {
        let username = telegramInput.trim();

        // Remove @ if present
        if (username.startsWith("@")) {
          username = username.substring(1);
        }

        // If empty, clear and return valid empty string
        if (!username) {
          setTelegram("");
          setTelegramError("");
          return "";
        }

        // Validate username format
        const isValid = /^[a-zA-Z0-9_]{5,32}$/.test(username);

        if (!isValid) {
          toast.error("Invalid Telegram username.");
          return null;
        }

        // Format as full URL and update state
        const telegramUrl = `https://t.me/${username}`;
        setTelegram(telegramUrl);
        setTelegramError("");
        return telegramUrl;
      },
    }));

    // Sync parent telegram prop to local input
    useEffect(() => {
      if (telegram) {
        if (telegram.startsWith("https://t.me/")) {
          const username = telegram.replace("https://t.me/", "");
          setTelegramInput(username);
        } else if (telegram.startsWith("@")) {
          setTelegramInput(telegram.substring(1));
        } else {
          setTelegramInput(telegram);
        }
      } else {
        setTelegramInput("");
      }
    }, [telegram]);

    return (
      <div className="p-5 border rounded-3xl bg-white space-y-4">
        <p className="font-semibold text-[17px]">Deal Method</p>

        <div>
          <p className="text-sm text-gray-700 mb-1">Meet-up</p>
          {location && !mapVisible ? (
            <div className="space-y-2">
              <div className="mt-2 w-full rounded-2xl bg-gray-100 px-5 py-3 text-gray-800">
                {location}
              </div>
              <button
                type="button"
                onClick={() => setMapVisible(true)}
                className="text-sm text-orange-500 underline hover:opacity-80"
              >
                Change Location
              </button>
            </div>
          ) : (
            !mapVisible && (
              <button
                type="button"
                onClick={() => setMapVisible(true)}
                className="flex items-center space-x-2 text-orange-500 font-medium hover:opacity-80 mt-2"
              >
                <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white">
                  <Move className="w-4 h-4" />
                </div>
                <span>Add Location</span>
              </button>
            )
          )}
          {mapVisible && <MapPicker onLocationSelect={handleLocationPick} />}
        </div>

        <div>
          <label
            htmlFor="telegramInput"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Telegram (username only)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black">
              @
            </span>
            <input
              type="text"
              id="telegramInput"
              placeholder="username"
              value={telegramInput}
              onChange={handleTelegramChange}
              className={`w-full pl-8 rounded-2xl bg-[#f1edef] px-5 py-3 placeholder-gray-500 text-gray-800 focus:outline-none ${
                telegramError ? "border-red-500 border" : ""
              }`}
            />
            {telegramError && (
              <p className="text-red-500 text-xs mt-1">{telegramError}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

DealMethod.displayName = "DealMethod";
export default DealMethod;