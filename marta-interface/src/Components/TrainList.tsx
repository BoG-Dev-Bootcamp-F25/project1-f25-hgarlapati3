
import "./TrainList.css";
import Train from "./Train";
import React from 'react';

interface TrainData {
  DESTINATION: string;
  DIRECTION: string;
  EVENT_TIME: string;
  LINE: string;
  NEXT_ARR: string;
  STATION: string;
  TRAIN_ID: string;
  WAITING_SECONDS: string;
  WAITING_TIME: string;
  DELAY: string;
}

interface TrainListProps {
  color: string;
  data: TrainData[];
  selectedStation: string | null;
  filters: {
    arriving: boolean;
    scheduled: boolean;
    direction1: boolean;
    direction2: boolean;
  };
}

export default function TrainList({ color, data, selectedStation, filters }: TrainListProps) {
  const normalize = (s: string) =>
    (s || "")
      .toUpperCase()
      .replace(/\bSTATION\b/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const isEastWest = color.toLowerCase() === "green" || color.toLowerCase() === "blue";
  const direction1 = isEastWest ? "E" : "N";
  const direction2 = isEastWest ? "W" : "S";

  // base filter
  let trains = data.filter((t) => (t.LINE || "").toLowerCase() === color.toLowerCase());

  // station filter
  if (selectedStation && normalize(selectedStation) !== "ALL STATIONS") {
    const target = normalize(selectedStation);
    trains = trains.filter((t) => {
      const s = normalize(t.STATION);
      return s === target || s.includes(target) || target.includes(s);
    });
  }

  // arriving/scheduled
  if (filters.arriving || filters.scheduled) {
    trains = trains.filter((t) => {
      const next = (t.NEXT_ARR || "").toUpperCase();
      const wait = (t.WAITING_TIME || "").toUpperCase();
      const arriving = next === "ARRIVING" || wait === "ARRIVING" || wait === "0 MIN";
      if (filters.arriving && arriving) return true;
      if (filters.scheduled && !arriving) return true;
      return !(filters.arriving || filters.scheduled);
    });
  }

  // directions
  if (filters.direction1 || filters.direction2) {
    trains = trains.filter((t) => {
      const dir = (t.DIRECTION || "").toUpperCase();
      if (filters.direction1 && dir === direction1) return true;
      if (filters.direction2 && dir === direction2) return true;
      return !(filters.direction1 || filters.direction2);
    });
  }

  if (!trains.length) {
    return <div className="no-trains-message">No Current Trains Match Filters</div>;
  }

  return (
    <div className="train-list-container">
      {trains.map((t, i) => (
        <Train key={i} {...t} />
      ))}
    </div>
  );
}
