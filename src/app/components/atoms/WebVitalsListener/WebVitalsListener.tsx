"use client";

import { useReportWebVitals } from "next/web-vitals";

/**
 * Monitor web vitals globally
 * @returns {null}
 */
export default function WebVitalsListener() {
  useReportWebVitals((metric) => {
    if (process.env.NEXT_PUBLIC_ENV === "dev") {
      console.log("Web-vitals metric: ", metric);
    }
  });

  return null;
}
