export const GA_TRACKING_ID = "G-7SJ7G9JDPD";

export const script = `
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', '${GA_TRACKING_ID}');
`;
