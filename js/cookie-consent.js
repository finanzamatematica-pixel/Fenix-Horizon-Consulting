(function () {
  var STORAGE_KEY = "fhc_cookie_consent"; // "accepted" | "rejected"
  var banner = document.getElementById("cookie-banner");
  if (!banner) return;

  function getConsent() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function setConsent(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
  }

  function loadNonEssentialScripts() {
    // Placeholder: only runs if the visitor accepts non-essential cookies.
    // Add analytics / marketing script tags here when needed, e.g.:
    // var s = document.createElement('script'); s.src = '...'; document.body.appendChild(s);
    document.dispatchEvent(new CustomEvent("fhc:cookies-accepted"));
  }

  var existing = getConsent();
  if (existing === "accepted") {
    loadNonEssentialScripts();
  } else if (!existing) {
    banner.classList.add("show");
  }

  var acceptBtn = document.getElementById("cookie-accept");
  var rejectBtn = document.getElementById("cookie-reject");

  if (acceptBtn) {
    acceptBtn.addEventListener("click", function () {
      setConsent("accepted");
      banner.classList.remove("show");
      loadNonEssentialScripts();
    });
  }
  if (rejectBtn) {
    rejectBtn.addEventListener("click", function () {
      setConsent("rejected");
      banner.classList.remove("show");
    });
  }
})();
