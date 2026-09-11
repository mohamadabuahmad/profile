import ReactGA from "react-ga4";

const TRACKING_ID = "G-MMNFP0VBWV"; // Replace with your Google Analytics ID

export const initGA = () => {
  ReactGA.initialize(TRACKING_ID);
};

export const logPageView = () => {
  ReactGA.send("pageview");
};

// Conversion events, e.g. trackEvent("Services", "lead_form_submit", "hero")
export const trackEvent = (category, action, label) => {
  ReactGA.event({ category, action, label });
};
