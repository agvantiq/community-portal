/**
 * vantiq-events.js
 * Page-specific interactivity for /events: the month-grid calendar with
 * previous/next month navigation. Load after vantiq-interface.js, on the
 * Events page only. Plain JS, zero dependencies, no build step.
 *
 * The calendar's data comes from a JSON block the PHP template prints from
 * the events query — this file never fetches anything:
 *
 *   <div class="vq-card vq-shadow-card vq-calendar" data-vq-calendar>
 *     <div class="vq-calendar__head">
 *       <h2 class="vq-calendar__title" data-vq-calendar-title>October 2026</h2>
 *       <div class="vq-calendar__nav">
 *         <button type="button" class="vq-btn vq-btn--outline vq-btn--icon"
 *                 data-vq-calendar-prev aria-label="Previous month">‹</button>
 *         <button type="button" class="vq-btn vq-btn--outline vq-btn--icon"
 *                 data-vq-calendar-next aria-label="Next month">›</button>
 *       </div>
 *     </div>
 *     <div class="vq-calendar__legend">...</div>
 *     <div class="vq-calendar__grid" data-vq-calendar-grid>
 *       <div class="vq-calendar__weekday">Sun</div> ... <div class="vq-calendar__weekday">Sat</div>
 *       <!-- day cells are written here by this file -->
 *     </div>
 *     <script type="application/json" data-vq-calendar-events>
 *       [{ "date": "2026-10-21", "title": "Partner Office Hours", "category": "Office Hours" },
 *        { "date": "2026-11-04", "title": "Vantiq Summit", "category": "Summit" }]
 *     </script>
 *   </div>
 *
 * `date` is YYYY-MM-DD in the site's timezone. `category` only matters for
 * the dot color: "Summit" is violet, anything else is teal (same two-tone
 * rule as the app's lib/events-data.ts).
 *
 * Optional: data-vq-calendar-start="2026-10" on the outer element opens a
 * month other than the current one.
 *
 * Without JS the weekday row still renders and the event lists below the
 * calendar (plain PHP) carry the same information, so nothing is lost.
 *
 * Version: 1.2.0 — 2026-10-15
 */
(function () {
  "use strict";

  var MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  function pad(n) {
    return (n < 10 ? "0" : "") + n;
  }
  function key(y, m, d) {
    return y + "-" + pad(m + 1) + "-" + pad(d);
  }

  function readEvents(cal) {
    var blob = cal.querySelector("[data-vq-calendar-events]");
    var byDate = {};
    if (!blob) return byDate;
    var list;
    try {
      list = JSON.parse(blob.textContent || "[]");
    } catch (e) {
      // A malformed blob shouldn't take the page down — show an empty month.
      if (window.console) console.warn("vantiq-events.js: invalid data-vq-calendar-events JSON", e);
      return byDate;
    }
    list.forEach(function (ev) {
      if (!ev || !ev.date) return;
      (byDate[ev.date] = byDate[ev.date] || []).push(ev);
    });
    return byDate;
  }

  function render(cal, state) {
    var grid = cal.querySelector("[data-vq-calendar-grid]");
    var title = cal.querySelector("[data-vq-calendar-title]");
    if (!grid) return;
    var y = state.year, m = state.month;
    if (title) title.textContent = MONTHS[m] + " " + y;

    grid.querySelectorAll(".vq-calendar__day").forEach(function (el) { el.remove(); });

    var now = new Date();
    var todayKey = key(now.getFullYear(), now.getMonth(), now.getDate());
    var startWeekday = new Date(y, m, 1).getDay();
    var daysInMonth = new Date(y, m + 1, 0).getDate();
    var daysInPrev = new Date(y, m, 0).getDate();
    var cells = [];
    var i, d;

    // Six full weeks (42 cells): leading/trailing days from adjacent months.
    for (i = startWeekday - 1; i >= 0; i--) {
      d = daysInPrev - i;
      cells.push({ day: d, k: key(m === 0 ? y - 1 : y, m === 0 ? 11 : m - 1, d), inMonth: false });
    }
    for (d = 1; d <= daysInMonth; d++) cells.push({ day: d, k: key(y, m, d), inMonth: true });
    for (d = 1; cells.length < 42; d++) {
      cells.push({ day: d, k: key(m === 11 ? y + 1 : y, m === 11 ? 0 : m + 1, d), inMonth: false });
    }

    var frag = document.createDocumentFragment();
    cells.forEach(function (c) {
      var cell = document.createElement("div");
      cell.className = "vq-calendar__day" +
        (c.inMonth ? "" : " vq-calendar__day--outside") +
        (c.inMonth && c.k === todayKey ? " vq-calendar__day--today" : "");
      var num = document.createElement("span");
      num.className = "vq-calendar__num";
      num.textContent = c.day;
      cell.appendChild(num);

      var evs = state.events[c.k];
      if (evs && evs.length) {
        var dots = document.createElement("div");
        dots.className = "vq-calendar__dots";
        evs.forEach(function (ev) {
          var dot = document.createElement("span");
          dot.className = "vq-calendar__dot" + (ev.category === "Summit" ? " vq-calendar__dot--summit" : "");
          dot.title = ev.title || "";
          dots.appendChild(dot);
        });
        cell.appendChild(dots);
        // Dots are color-only; give screen readers the titles.
        cell.setAttribute("aria-label", c.day + ": " + evs.map(function (ev) { return ev.title; }).join(", "));
      }
      frag.appendChild(cell);
    });
    grid.appendChild(frag);
  }

  function init(container) {
    var root = container || document;
    root.querySelectorAll("[data-vq-calendar]").forEach(function (cal) {
      if (cal.hasAttribute("data-vq-bound")) return;
      cal.setAttribute("data-vq-bound", "");

      var start = (cal.getAttribute("data-vq-calendar-start") || "").split("-");
      var now = new Date();
      var state = {
        year: start.length === 2 ? parseInt(start[0], 10) : now.getFullYear(),
        month: start.length === 2 ? parseInt(start[1], 10) - 1 : now.getMonth(),
        events: readEvents(cal),
      };

      function shift(delta) {
        var dt = new Date(state.year, state.month + delta, 1);
        state.year = dt.getFullYear();
        state.month = dt.getMonth();
        render(cal, state);
      }
      var prev = cal.querySelector("[data-vq-calendar-prev]");
      var next = cal.querySelector("[data-vq-calendar-next]");
      if (prev) prev.addEventListener("click", function () { shift(-1); });
      if (next) next.addEventListener("click", function () { shift(1); });

      render(cal, state);
    });
  }

  window.VantiqEvents = { init: init };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { init(document); });
  } else {
    init(document);
  }
})();
