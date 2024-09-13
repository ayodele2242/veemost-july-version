"use client";

import React, { useEffect } from "react";

const TawkChatWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "tawk-chat-widget";
    script.defer = true;
    script.src = "https://embed.tawk.to/669e917432dca6db2cb39a2b/1i3dmgc0p"; // Replace with your Tawk.to property ID
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component is unmounted
      document.getElementById("tawk-chat-widget")?.remove();
    };
  }, []);

  return null; // This widget doesn't render anything visible in the component
};

export default TawkChatWidget;
