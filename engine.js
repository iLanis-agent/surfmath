/* SurfMath engine - honest surf math. */
(function (root) {
  "use strict";

  /* Relative wave power: energy flux scales with height squared times
     period. 3ft @ 10s = 90 relative units; a 6ft wave at the same period
     packs 4x, not 2x. */
  function wavePower(heightFt, periodSec) {
    if (heightFt <= 0 || periodSec <= 0) return 0;
    return Math.round(heightFt * heightFt * periodSec);
  }

  function powerVerdict(p) {
    if (p < 40) return "mellow - longboard and learning territory";
    if (p < 100) return "fun-zone for most surfers";
    if (p < 250) return "solid - fitness and duck-diving required";
    return "heavy water - for experienced surfers only";
  }

  /* Board volume in liters: weight(kg) times a skill factor.
     Beginner 1.0 L/kg (80kg -> 80L foamie), intermediate 0.6,
     advanced 0.4, pro shortboarders ~0.36. */
  function boardLiters(weightLb, skill) {
    var kg = weightLb / 2.205;
    var f = 1.0;
    if (skill === "intermediate") f = 0.6;
    else if (skill === "advanced") f = 0.4;
    else if (skill === "pro") f = 0.36;
    return Math.round(kg * f * 10) / 10;
  }

  function volumeVerdict(liters, weightLb) {
    var kg = weightLb / 2.205;
    var ratio = liters / kg;
    if (ratio >= 0.9) return "maximum float - stable paddle and easy pop-up";
    if (ratio >= 0.55) return "funboard band - still paddles well";
    if (ratio >= 0.38) return "performance volume - duck-dives, demands fitness";
    return "sliver - only floats a fit, skilled surfer";
  }

  /* Rides per session: sets per hour times waves per set, divided by
     crowd sharing. Honest position keeps maybe a third of the waves. */
  function ridesPerSession(opts) {
    var minutes = opts && typeof opts.minutes === "number" ? opts.minutes : 90;
    var setMin = opts && typeof opts.setIntervalMin === "number" ? opts.setIntervalMin : 12;
    var perSet = opts && typeof opts.wavesPerSet === "number" ? opts.wavesPerSet : 3;
    var crowd = opts && typeof opts.crowd === "number" ? opts.crowd : 4;
    var keep = opts && typeof opts.position === "string" && opts.position === "good" ? 0.5 : 0.33;
    var setsTotal = (minutes / setMin);
    return Math.max(0, Math.round(setsTotal * perSet * keep / Math.max(1, crowd)));
  }

  /* Wetsuit thickness by water temperature (F). */
  function wetsuitMm(waterF) {
    if (waterF >= 72) return "none - rashguard or boardshorts";
    if (waterF >= 65) return "2mm shorty or springsuit";
    if (waterF >= 58) return "3/2mm full suit";
    if (waterF >= 50) return "4/3mm full suit with boots";
    if (waterF >= 43) return "5/4mm with boots, gloves, hood";
    return "6/5mm or drysuit - serious cold-water gear";
  }

  /* Swell travel: deep-water group speed is about 1.5 knots per second of
     period. Hours for a swell to cross a given distance. */
  function swellHours(distanceNm, periodSec) {
    if (periodSec <= 0) return Infinity;
    var knots = 1.5 * periodSec;
    return Math.round((distanceNm / knots) * 10) / 10;
  }

  /* Rip current escape: swim parallel, not against. Time to exit a rip
     of width yards at a parallel swim pace of 0.8 mph (honest in surf). */
  function ripEscapeMin(widthYd) {
    var mph = 0.8;
    var ypm = mph * 1760 / 60;
    return Math.round((widthYd / ypm) * 10) / 10;
  }

  /* Session calories: surfing burns roughly 400-500 kcal/hour depending
     on conditions; paddling against current is the big burner. */
  function sessionKcal(minutes, conditions) {
    var perHour = conditions === "pumping" ? 500 : (conditions === "small" ? 250 : 400);
    return Math.round(perHour * minutes / 60);
  }

  var api = {
    wavePower: wavePower,
    powerVerdict: powerVerdict,
    boardLiters: boardLiters,
    volumeVerdict: volumeVerdict,
    ridesPerSession: ridesPerSession,
    wetsuitMm: wetsuitMm,
    swellHours: swellHours,
    ripEscapeMin: ripEscapeMin,
    sessionKcal: sessionKcal
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.SurfMath = api;
})(typeof window !== "undefined" ? window : globalThis);
