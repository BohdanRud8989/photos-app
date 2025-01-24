"use client";

import { useReportWebVitals } from "next/web-vitals";
import { app } from "../../../config";

/**
 * Monitor web vitals globally
 * @returns {null}
 */
export default function WebVitalsListener() {
  useReportWebVitals((metric) => {
    if (app.isDevEnv) {
      console.log("Web-vitals metric: ", metric);
    }
  });

  return null;
}
