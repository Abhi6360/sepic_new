/**
 * Signal Flow Animation — Signature PCB Trace Effect
 * Animated SVG PCB traces with glowing signal pulses traveling along paths.
 * Powered by GSAP for smooth, performant animation control.
 */
(function () {
  "use strict";

  const SVG_NS = "http://www.w3.org/2000/svg";
  const container = document.getElementById("signal-flow-stage");
  if (!container) return;

  /* ── colour palette (matches site dark theme) ── */
  const COLORS = {
    trace: [
      { stroke: "#67d9ff", glow: "#67d9ff" },
      { stroke: "#5f9cff", glow: "#5f9cff" },
      { stroke: "#8fe388", glow: "#8fe388" },
      { stroke: "#f4b84a", glow: "#f4b84a" },
      { stroke: "#87e5ff", glow: "#87e5ff" },
      { stroke: "#74a9ff", glow: "#74a9ff" },
    ],
    pad: "#d9ae50",
    via: "rgba(103,217,255,0.35)",
    chip: "#10151d",
    chipBorder: "rgba(103,217,255,0.22)",
    grid: "rgba(103,217,255,0.045)",
  };

  /* ── SVG setup ── */
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", "0 0 1200 700");
  svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
  svg.setAttribute("aria-hidden", "true");
  svg.classList.add("signal-flow-svg");
  container.appendChild(svg);

  /* ── Defs: filters & gradients ── */
  const defs = document.createElementNS(SVG_NS, "defs");
  svg.appendChild(defs);

  /* Glow filter for pulses */
  const glowFilter = document.createElementNS(SVG_NS, "filter");
  glowFilter.setAttribute("id", "pulse-glow");
  glowFilter.setAttribute("x", "-80%");
  glowFilter.setAttribute("y", "-80%");
  glowFilter.setAttribute("width", "260%");
  glowFilter.setAttribute("height", "260%");
  glowFilter.innerHTML = `
    <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur"/>
    <feComposite in="SourceGraphic" in2="blur" operator="over"/>
  `;
  defs.appendChild(glowFilter);

  /* Stronger glow for the tail/comet effect */
  const cometFilter = document.createElementNS(SVG_NS, "filter");
  cometFilter.setAttribute("id", "comet-glow");
  cometFilter.setAttribute("x", "-100%");
  cometFilter.setAttribute("y", "-100%");
  cometFilter.setAttribute("width", "300%");
  cometFilter.setAttribute("height", "300%");
  cometFilter.innerHTML = `
    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
    <feComposite in="SourceGraphic" in2="blur" operator="over"/>
  `;
  defs.appendChild(cometFilter);

  /* Subtle glow for traces */
  const traceFilter = document.createElementNS(SVG_NS, "filter");
  traceFilter.setAttribute("id", "trace-glow");
  traceFilter.setAttribute("x", "-20%");
  traceFilter.setAttribute("y", "-20%");
  traceFilter.setAttribute("width", "140%");
  traceFilter.setAttribute("height", "140%");
  traceFilter.innerHTML = `
    <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur"/>
    <feComposite in="SourceGraphic" in2="blur" operator="over"/>
  `;
  defs.appendChild(traceFilter);

  /* ── Background grid ── */
  const gridGroup = document.createElementNS(SVG_NS, "g");
  gridGroup.setAttribute("class", "sf-grid");
  svg.appendChild(gridGroup);

  for (let x = 0; x <= 1200; x += 40) {
    const line = document.createElementNS(SVG_NS, "line");
    line.setAttribute("x1", x);
    line.setAttribute("y1", 0);
    line.setAttribute("x2", x);
    line.setAttribute("y2", 700);
    line.setAttribute("stroke", COLORS.grid);
    line.setAttribute("stroke-width", "0.5");
    gridGroup.appendChild(line);
  }
  for (let y = 0; y <= 700; y += 40) {
    const line = document.createElementNS(SVG_NS, "line");
    line.setAttribute("x1", 0);
    line.setAttribute("y1", y);
    line.setAttribute("x2", 1200);
    line.setAttribute("y2", y);
    line.setAttribute("stroke", COLORS.grid);
    line.setAttribute("stroke-width", "0.5");
    gridGroup.appendChild(line);
  }

  /* ── PCB Trace paths ── */
  const traceData = [
    {
      d: "M 40,350 L 140,350 L 200,240 L 360,240 L 420,180 L 580,180 L 640,280 L 780,280 L 840,200 L 960,200 L 1020,300 L 1160,300",
      color: 0,
      width: 2.4,
    },
    {
      d: "M 40,420 L 120,420 L 180,500 L 340,500 L 400,420 L 520,420 L 580,480 L 720,480 L 800,380 L 920,380 L 1000,460 L 1160,460",
      color: 1,
      width: 2.0,
    },
    {
      d: "M 40,260 L 180,260 L 240,160 L 380,160 L 440,260 L 600,260 L 660,160 L 800,160 L 860,100 L 1000,100 L 1060,180 L 1160,180",
      color: 2,
      width: 2.2,
    },
    {
      d: "M 40,540 L 200,540 L 260,600 L 440,600 L 500,540 L 660,540 L 720,600 L 860,600 L 920,520 L 1060,520 L 1100,560 L 1160,560",
      color: 3,
      width: 1.8,
    },
    {
      d: "M 40,140 L 160,140 L 220,80 L 400,80 L 460,140 L 620,140 L 680,80 L 840,80 L 900,140 L 1040,140 L 1080,100 L 1160,100",
      color: 4,
      width: 1.6,
    },
    {
      d: "M 40,620 L 140,620 L 200,660 L 360,660 L 420,600 L 540,600 L 600,660 L 740,660 L 800,600 L 940,600 L 1000,640 L 1160,640",
      color: 5,
      width: 1.4,
    },
  ];

  const traceGroup = document.createElementNS(SVG_NS, "g");
  traceGroup.setAttribute("class", "sf-traces");
  svg.appendChild(traceGroup);

  const tracePaths = [];

  traceData.forEach(function (t) {
    var c = COLORS.trace[t.color];

    /* Glow shadow path */
    var glow = document.createElementNS(SVG_NS, "path");
    glow.setAttribute("d", t.d);
    glow.setAttribute("fill", "none");
    glow.setAttribute("stroke", c.glow);
    glow.setAttribute("stroke-width", String(t.width + 4));
    glow.setAttribute("stroke-linecap", "round");
    glow.setAttribute("stroke-linejoin", "round");
    glow.setAttribute("opacity", "0.08");
    glow.setAttribute("filter", "url(#trace-glow)");
    traceGroup.appendChild(glow);

    /* Main trace path */
    var path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", t.d);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", c.stroke);
    path.setAttribute("stroke-width", String(t.width));
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("opacity", "0.35");
    traceGroup.appendChild(path);

    tracePaths.push({ path: path, color: c, data: t });
  });

  /* ── IC Chips (rectangles with pin rows) ── */
  var chipGroup = document.createElementNS(SVG_NS, "g");
  chipGroup.setAttribute("class", "sf-chips");
  svg.appendChild(chipGroup);

  var chipDefs = [
    { x: 340, y: 200, w: 100, h: 70 },
    { x: 700, y: 140, w: 80, h: 55 },
    { x: 520, y: 440, w: 110, h: 65 },
    { x: 900, y: 350, w: 90, h: 60 },
    { x: 180, y: 470, w: 75, h: 50 },
  ];

  chipDefs.forEach(function (chip) {
    /* Chip body */
    var rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttribute("x", chip.x);
    rect.setAttribute("y", chip.y);
    rect.setAttribute("width", chip.w);
    rect.setAttribute("height", chip.h);
    rect.setAttribute("rx", "4");
    rect.setAttribute("fill", COLORS.chip);
    rect.setAttribute("stroke", COLORS.chipBorder);
    rect.setAttribute("stroke-width", "1");
    chipGroup.appendChild(rect);

    /* Pins (top and bottom) */
    var pinCount = Math.floor(chip.w / 12);
    var pinSpacing = chip.w / (pinCount + 1);
    for (var i = 1; i <= pinCount; i++) {
      var px = chip.x + i * pinSpacing;
      /* Top pins */
      var pinT = document.createElementNS(SVG_NS, "rect");
      pinT.setAttribute("x", String(px - 2));
      pinT.setAttribute("y", String(chip.y - 8));
      pinT.setAttribute("width", "4");
      pinT.setAttribute("height", "8");
      pinT.setAttribute("rx", "1");
      pinT.setAttribute("fill", COLORS.pad);
      pinT.setAttribute("opacity", "0.6");
      chipGroup.appendChild(pinT);
      /* Bottom pins */
      var pinB = document.createElementNS(SVG_NS, "rect");
      pinB.setAttribute("x", String(px - 2));
      pinB.setAttribute("y", String(chip.y + chip.h));
      pinB.setAttribute("width", "4");
      pinB.setAttribute("height", "8");
      pinB.setAttribute("rx", "1");
      pinB.setAttribute("fill", COLORS.pad);
      pinB.setAttribute("opacity", "0.6");
      chipGroup.appendChild(pinB);
    }
  });

  /* ── Vias (small circles scattered on traces) ── */
  var viaGroup = document.createElementNS(SVG_NS, "g");
  viaGroup.setAttribute("class", "sf-vias");
  svg.appendChild(viaGroup);

  var viaPositions = [
    [200, 240], [420, 180], [640, 280], [840, 200], [1020, 300],
    [180, 500], [400, 420], [580, 480], [800, 380], [1000, 460],
    [240, 160], [440, 260], [660, 160], [860, 100], [1060, 180],
    [260, 600], [500, 540], [720, 600], [920, 520], [1100, 560],
    [220, 80], [460, 140], [680, 80], [900, 140], [1080, 100],
    [360, 660], [600, 660], [800, 600], [1000, 640],
  ];

  viaPositions.forEach(function (pos) {
    var outer = document.createElementNS(SVG_NS, "circle");
    outer.setAttribute("cx", pos[0]);
    outer.setAttribute("cy", pos[1]);
    outer.setAttribute("r", "5");
    outer.setAttribute("fill", "none");
    outer.setAttribute("stroke", COLORS.via);
    outer.setAttribute("stroke-width", "1.2");
    viaGroup.appendChild(outer);

    var inner = document.createElementNS(SVG_NS, "circle");
    inner.setAttribute("cx", pos[0]);
    inner.setAttribute("cy", pos[1]);
    inner.setAttribute("r", "2");
    inner.setAttribute("fill", COLORS.via);
    viaGroup.appendChild(inner);
  });

  /* ── Pads at trace endpoints ── */
  var padGroup = document.createElementNS(SVG_NS, "g");
  padGroup.setAttribute("class", "sf-pads");
  svg.appendChild(padGroup);

  var padPositions = [
    [40, 350], [1160, 300], [40, 420], [1160, 460],
    [40, 260], [1160, 180], [40, 540], [1160, 560],
    [40, 140], [1160, 100], [40, 620], [1160, 640],
  ];

  padPositions.forEach(function (pos) {
    var pad = document.createElementNS(SVG_NS, "circle");
    pad.setAttribute("cx", pos[0]);
    pad.setAttribute("cy", pos[1]);
    pad.setAttribute("r", "7");
    pad.setAttribute("fill", COLORS.pad);
    pad.setAttribute("opacity", "0.7");
    padGroup.appendChild(pad);

    var ring = document.createElementNS(SVG_NS, "circle");
    ring.setAttribute("cx", pos[0]);
    ring.setAttribute("cy", pos[1]);
    ring.setAttribute("r", "11");
    ring.setAttribute("fill", "none");
    ring.setAttribute("stroke", COLORS.pad);
    ring.setAttribute("stroke-width", "1");
    ring.setAttribute("opacity", "0.35");
    padGroup.appendChild(ring);
  });

  /* ── Signal Pulses (the signature effect) ── */
  var pulseGroup = document.createElementNS(SVG_NS, "g");
  pulseGroup.setAttribute("class", "sf-pulses");
  svg.appendChild(pulseGroup);

  /* Check for reduced-motion preference */
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  tracePaths.forEach(function (item, index) {
    var pathEl = item.path;
    var color = item.color;
    var pathLength = pathEl.getTotalLength();

    /* Create animated gradient for the lit-up section */
    var gradId = "pulse-grad-" + index;
    var grad = document.createElementNS(SVG_NS, "linearGradient");
    grad.setAttribute("id", gradId);
    grad.setAttribute("gradientUnits", "userSpaceOnUse");
    defs.appendChild(grad);

    /* Lit trace overlay — shows the glowing section */
    var litTrace = document.createElementNS(SVG_NS, "path");
    litTrace.setAttribute("d", item.data.d);
    litTrace.setAttribute("fill", "none");
    litTrace.setAttribute("stroke", "url(#" + gradId + ")");
    litTrace.setAttribute("stroke-width", String(item.data.width + 1));
    litTrace.setAttribute("stroke-linecap", "round");
    litTrace.setAttribute("stroke-linejoin", "round");
    litTrace.setAttribute("filter", "url(#trace-glow)");
    pulseGroup.appendChild(litTrace);

    /* Glowing dot */
    var dot = document.createElementNS(SVG_NS, "circle");
    dot.setAttribute("r", "5");
    dot.setAttribute("fill", color.glow);
    dot.setAttribute("filter", "url(#pulse-glow)");
    dot.setAttribute("opacity", "0");
    pulseGroup.appendChild(dot);

    /* Outer glow ring around dot */
    var outerGlow = document.createElementNS(SVG_NS, "circle");
    outerGlow.setAttribute("r", "12");
    outerGlow.setAttribute("fill", color.glow);
    outerGlow.setAttribute("filter", "url(#comet-glow)");
    outerGlow.setAttribute("opacity", "0");
    pulseGroup.appendChild(outerGlow);

    if (prefersReducedMotion) {
      /* For reduced-motion: just show static dots at midpoint */
      var mid = pathEl.getPointAtLength(pathLength * 0.5);
      dot.setAttribute("cx", mid.x);
      dot.setAttribute("cy", mid.y);
      dot.setAttribute("opacity", "0.7");
      return;
    }

    /* ── GSAP Animation ── */
    var duration = 3.5 + index * 0.6;
    var delay = index * 0.7;
    var progress = { value: 0 };

    /* Tail length (fraction of path to illuminate) */
    var tailFraction = 0.18;

    gsap.to(progress, {
      value: 1,
      duration: duration,
      delay: delay,
      ease: "none",
      repeat: -1,
      onUpdate: function () {
        var p = progress.value;
        var point = pathEl.getPointAtLength(p * pathLength);

        /* Position the dot */
        dot.setAttribute("cx", point.x);
        dot.setAttribute("cy", point.y);
        outerGlow.setAttribute("cx", point.x);
        outerGlow.setAttribute("cy", point.y);

        /* Compute tail start and end for gradient */
        var tailStart = Math.max(0, p - tailFraction);
        var pStart = pathEl.getPointAtLength(tailStart * pathLength);
        var pEnd = pathEl.getPointAtLength(p * pathLength);

        grad.setAttribute("x1", pStart.x);
        grad.setAttribute("y1", pStart.y);
        grad.setAttribute("x2", pEnd.x);
        grad.setAttribute("y2", pEnd.y);

        /* Update gradient stops: transparent -> full color */
        while (grad.firstChild) grad.removeChild(grad.firstChild);
        [
          { offset: "0%",   opacity: "0"   },
          { offset: "70%",  opacity: "0.6" },
          { offset: "100%", opacity: "0.9" },
        ].forEach(function (s) {
          var stop = document.createElementNS(SVG_NS, "stop");
          stop.setAttribute("offset",       s.offset);
          stop.setAttribute("stop-color",   color.glow);
          stop.setAttribute("stop-opacity", s.opacity);
          grad.appendChild(stop);
        });

        /* Update the lit trace with a dash pattern that only shows the tail */
        var litLen = (p - tailStart) * pathLength;
        var preLen = tailStart * pathLength;
        litTrace.setAttribute(
          "stroke-dasharray",
          litLen + " " + (pathLength - litLen)
        );
        litTrace.setAttribute("stroke-dashoffset", String(-preLen));
      },
    });

    /* Fade dot in */
    gsap.to(dot, {
      opacity: 0.95,
      duration: 0.6,
      delay: delay,
    });

    gsap.to(outerGlow, {
      opacity: 0.25,
      duration: 0.6,
      delay: delay,
    });

    /* Pulsing glow on the dot */
    gsap.to(dot, {
      attr: { r: 7 },
      duration: 0.8,
      delay: delay,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(outerGlow, {
      attr: { r: 18 },
      opacity: 0.1,
      duration: 1.2,
      delay: delay,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });

  /* ── Via twinkle animation ── */
  if (!prefersReducedMotion) {
    var viaCircles = viaGroup.querySelectorAll("circle:nth-child(even)");
    viaCircles.forEach(function (via, i) {
      gsap.to(via, {
        opacity: 0.7,
        duration: 1.5 + Math.random() * 1.5,
        delay: Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }

  /* ── Fade-in entrance ── */
  gsap.from(svg, {
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
  });

  container.classList.add("signal-flow-ready");
})();
