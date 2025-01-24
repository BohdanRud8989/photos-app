export const theme = {
  colors: {
    "base-font-color": "#333",
    "secondary-color": "#777",
    "accent-color": "#ff6f61",
    "accent-color-lighter": "#f68f85",
    "bg-color": "#f9f9f9",
    "border-color": "#e5e5e5",
    primary: "#6b778c",
    "primary-light": "#f7fbff",
    light: "#ffffff",
    success: "#22b02e",
    "green-light": "#9bf7a3",
    error: "#ff4d4f",
    "gray-2": "#42526e",
    "gray-3": "#e2e4e5",
    "gray-4": "#66788a",
  },
  fontSizes: {
    base: "16px",
    xs: "12px",
    sm: "14px",
    xl: "32px",
  },
  spacings: {
    mobile: "12px",
    tablet: "24px",
  },
  borders: {
    "radius-1": "8px",
    "radius-2": "4px",
  },
  mediaQueries: {
    desktop: "1200px",
    tabletPortrait: "769px",
    mobile: "556px",
  },
};

export type ThemeType = typeof theme;
