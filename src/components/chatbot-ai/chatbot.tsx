"use client";
import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_KOMMUNICATE_APP_ID;

    if (!appId) {
      console.error("Kommunicate App ID is missing in environment variables!");
      return;
    }

    // Prevent adding multiple instances of the script
    if (document.getElementById("kommunicate-script")) return;

    const kommunicateSettings = {
      appId,
      popupWidget: true,
      automaticChatOpenOnNavigation: true,
    };

    const script = document.createElement("script");
    script.id = "kommunicate-script";
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://widget.kommunicate.io/v2/kommunicate.app";

    script.onload = () => {
      (window as any).kommunicate = (window as any).kommunicate || {};
      (window as any).kommunicate._globals = kommunicateSettings;
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default Chatbot;
