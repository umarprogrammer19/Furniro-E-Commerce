"use client";
import { useEffect } from "react";

const Chatbot = () => {
    useEffect(() => {
        const appId = process.env.NEXT_PUBLIC_KOMMUNICATE_APP_ID;

        if (!appId) {
            console.error("Kommunicate App ID is missing in environment variables!");
            return;
        }

        if (document.getElementById("kommunicate-script")) return;

        const kommunicateSettings = {
            appId,
            popupWidget: true,
            automaticChatOpenOnNavigation: true,
            onLoad: () => {
                setTimeout(() => {
                    const chatWidget = document.querySelector(
                        ".kommunicate-widget-iframe"
                    ) as HTMLElement;
                    if (chatWidget) {
                        chatWidget.style.bottom = "20px";
                        chatWidget.style.right = "20px";
                        chatWidget.style.width = "60px";
                        chatWidget.style.height = "60px";
                        chatWidget.style.zIndex = "99999";
                    }
                }, 3000); // Delay to ensure script loads
            },
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
