export const createAds = () => {
  const monetagAd = document.getElementById("monetag-ad");
  const acknowledgedDisclaimer = localStorage.getItem("disclaimer_acknowledged");

  if (!monetagAd && !acknowledgedDisclaimer) {
    const script = document.createElement("script");
    script.id = "monetag-ad";
    script.async = true;
    // script.src = "https://aistekso.net/401/7315485";
    script.src = "//thubanoa.com/1?z=7315523";
    document.head.appendChild(script);
  }
};
