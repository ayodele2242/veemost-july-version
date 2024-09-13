"use client";

import React, { useEffect } from "react";

const ClarityScript = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "clarity-script";
    script.defer = true;
    script.innerHTML = `
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "ncj4520sgw");
    `;

    document.body.appendChild(script);

    return () => {
      // Cleanup the script if needed
      document.getElementById("clarity-script")?.remove();
    };
  }, []);

  return null;
};

export default ClarityScript;
