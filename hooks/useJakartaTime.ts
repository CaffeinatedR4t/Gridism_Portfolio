"use client";

import { useEffect, useState } from "react";

export const useJakartaTime = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const jakartaTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());
      
      setTime(jakartaTime);
    };

    // Update immediately
    updateTime();

    // Update every minute (no need for seconds)
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return time;
};