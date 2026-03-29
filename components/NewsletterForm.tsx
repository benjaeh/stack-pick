"use client";

import { useEffect } from "react";

export default function NewsletterForm() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://stack-pick.kit.com/38270535ef/index.js";
    script.async = true;
    script.setAttribute("data-uid", "38270535ef");
    document.getElementById("newsletter-form-container")?.appendChild(script);
  }, []);

  return <div id="newsletter-form-container" />;
}
