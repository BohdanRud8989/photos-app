import { createClient } from "pexels";
import { app } from "../config";

export const pexelsClient = createClient(app.pexelsApiKey);

export const DEFAULT_PAGE = 1;
export const PAGE_OFFSET = 9;

export const MEDIUM_SIZE_IMG_SCALE_FACTOR = 5;
export const SMALL_SIZE_IMG_SCALE_FACTOR = 15;
