(() => {
  const root = document.getElementById("resonance-wheel"),
    select = root.querySelector("#res-power"),
    svg = root.querySelector("#res-ring"),
    detail = root.querySelector("#res-detail");
  // Power rows: name, category, abilities, limitations.
  // Matchup indices below refer to this ordering; keep them in sync.
  const powers = [
    [
      "Kindlecraft",
      "Fire / heat",
      "Guide flames, ignite fuel, transfer heat.",
      "Needs fuel or stored heat; heat buildup exhausts the user.",
    ],
    [
      "Tidecraft",
      "Water",
      "Move existing water into currents, jets and shields.",
      "Needs accessible water; large volumes reduce precision.",
    ],
    [
      "Stonecraft",
      "Earth",
      "Shape soil and stone; exploit structural weak points.",
      "Dense mass and unfamiliar material resist control.",
    ],
    [
      "Galecraft",
      "Air / pressure",
      "Gusts, pressure pulses, softened falls and gliding.",
      "Restricted airflow and sustained lift increase the cost.",
    ],
    [
      "Gravcraft",
      "Gravity / weight",
      "Alter local weight, pin objects and slow falls.",
      "Small fields only; mass and duration cause vertigo.",
    ],
    [
      "Sparkcraft",
      "Electricity",
      "Guide charge, release arcs and disrupt machinery.",
      "Needs charge; grounding and insulation interrupt attacks.",
    ],
    [
      "Echocraft",
      "Sound / vibration",
      "Dampen sound, sense movement and fracture brittle targets.",
      "Soft surfaces dampen effects; precise fracture needs time.",
    ],
    [
      "Gleamcraft",
      "Light / images",
      "Redirect light, create glare and project silent illusions.",
      "Needs light; illusions have no physical substance.",
    ],
    [
      "Verdantcraft",
      "Plants",
      "Guide roots, vines and living plant growth.",
      "Needs existing plants, water, nutrients and time.",
    ],
    [
      "Rimework",
      "Ice · Tidecraft branch",
      "Freeze or thaw limited water by transferring heat.",
      "Requires water and heat disposal; cold does not create matter.",
    ],
    [
      "Alloywork",
      "Metal · Stonecraft branch",
      "Bend, move or reshape familiar metals.",
      "Refined alloys are difficult; contact improves precision.",
    ],
  ];
  // Each edge is a proposed situational advantage, never an automatic victory.
  // Matchup rows: advantaged power index, vulnerable power index, explanation.
  const edges = [
    [
      1,
      0,
      "Water cools heat and smothers ordinary flames; extreme heat can instead turn limited water into steam.",
    ],
    [
      2,
      1,
      "Stone barriers redirect currents and shelter the user from water jets.",
    ],
    [
      3,
      0,
      "Controlled gusts disrupt narrow flame attacks; careless wind feeds fire instead.",
    ],
    [
      0,
      8,
      "Heat dries vines and burns exposed plants when fuel and air are available.",
    ],
    [
      8,
      2,
      "Established roots widen cracks and destabilize loose earth over time.",
    ],
    [
      2,
      5,
      "Dry, nonconductive stone shields block direct electrical paths; mineral-rich wet stone may fail.",
    ],
    [
      5,
      1,
      "Charge can exploit connected water as a conductive path; conductivity and grounding determine the result.",
    ],
    [
      4,
      3,
      "A heavier target is harder to lift or keep gliding; the Anchor must hold the field.",
    ],
    [
      6,
      2,
      "Tuned vibration fractures brittle stone after its weak frequency is found.",
    ],
    [
      6,
      7,
      "Contact-based vibration sensing can locate movement hidden by a visual illusion.",
    ],
    [
      7,
      4,
      "Glare or a decoy can spoil precise visual targeting; sensed or touched targets remain usable.",
    ],
    [8, 6, "Dense soft vegetation dampens vibration and muffles sound."],
    [
      3,
      7,
      "Moving airborne dust or mist can expose the empty space inside a false image.",
    ],
    [
      0,
      9,
      "Heat melts ice if the Kindler supplies enough energy; the resulting water may become a threat.",
    ],
    [
      9,
      1,
      "Freezing a small available stream can immobilize it, provided the heat can be dispersed.",
    ],
    [
      9,
      8,
      "Sustained frost slows and damages exposed plant growth; it is not instant forest destruction.",
    ],
    [6, 9, "Ice is brittle and vulnerable to correctly tuned vibration."],
    [
      10,
      5,
      "A connected metal shield can divert charge to ground; an ungrounded shield endangers its wearer.",
    ],
    [
      5,
      10,
      "Exposed ungrounded metal gives electricity an easy path toward an Alloyworker.",
    ],
    [
      4,
      10,
      "Increasing a metal object’s weight raises the effort needed to move it.",
    ],
    [10, 8, "Metal edges and barriers cut or restrain exposed vines."],
    [
      0,
      10,
      "Prolonged heating makes a metal tool unsafe to hold; it does not instantly melt every alloy.",
    ],
  ];
  powers.forEach((p, i) => select.add(new Option(p[0] + " — " + p[1], i)));
  let selectedPowerIndex = 0;
  const saved = window.openai?.widgetState?.modelContent?.power;
  if (Number.isInteger(saved) && saved >= 0 && saved < powers.length)
    selectedPowerIndex = saved;
  select.value = selectedPowerIndex;
  const escapeHtml = (s) =>
    s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  function renderChart() {
    const w = root.clientWidth,
      h = Math.max(400, w * 0.82),
      cx = w / 2,
      cy = h * 0.43,
      radius = Math.min(w * 0.36, h * 0.32),
      narrow = w < 500;
    const nw = narrow ? 82 : 112,
      nh = 40,
      coords = [];
    for (let i = 0; i < 9; i++) {
      let a = -Math.PI / 2 + (i * 2 * Math.PI) / 9;
      coords.push([cx + radius * Math.cos(a), cy + radius * Math.sin(a)]);
    }
    coords.push([w * 0.25, h - 34], [w * 0.75, h - 34]);
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.style.height = h + "px";
    let out =
      '<defs><marker id="res-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--viz-series-1)"/></marker><marker id="res-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--viz-series-2)"/></marker><marker id="res-c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted-foreground)"/></marker></defs>';
    function renderArrow(a, b, cls, mark, bend = 0) {
      const [x, y] = coords[a],
        [xx, yy] = coords[b],
        dx = xx - x,
        dy = yy - y,
        dist = Math.hypot(dx, dy),
        ux = dx / dist,
        uy = dy / dist;
      const trim =
        Math.min(
          nw / 2 / Math.max(Math.abs(ux), 0.01),
          nh / 2 / Math.max(Math.abs(uy), 0.01),
        ) + 5;
      const sx = x + ux * trim,
        sy = y + uy * trim,
        ex = xx - ux * trim,
        ey = yy - uy * trim;
      out += `<path class="edge ${cls}" marker-end="url(#${mark})" d="M${sx},${sy} Q${(sx + ex) / 2 - uy * bend},${(sy + ey) / 2 + ux * bend} ${ex},${ey}"/>`;
    }
    edges
      .filter((e) => e[0] === selectedPowerIndex || e[1] === selectedPowerIndex)
      .forEach((e) =>
        renderArrow(
          e[0],
          e[1],
          e[0] === selectedPowerIndex ? "" : "incoming",
          e[0] === selectedPowerIndex ? "res-a" : "res-b",
          edges.some((z) => z[0] === e[1] && z[1] === e[0]) ? 20 : 0,
        ),
      );
    renderArrow(1, 9, "branch", "res-c");
    renderArrow(2, 10, "branch", "res-c");
    out += `<text x="${cx}" y="${cy - 8}" text-anchor="middle">RESONANCE</text><text x="${cx}" y="${cy + 13}" text-anchor="middle" class="text-small">${narrow ? "Selected matchups" : "Selected power’s matchups"}</text>`;
    powers.forEach((p, i) => {
      let [x, y] = coords[i];
      out += `<g class="node-group" role="button" tabindex="0" data-power="${i}" aria-label="Select ${p[0]}"><rect class="node ${i === selectedPowerIndex ? "active" : ""}" x="${x - nw / 2}" y="${y - nh / 2}" width="${nw}" height="${nh}" rx="6"/><text class="${i === selectedPowerIndex ? "active-label" : ""}" x="${x}" y="${y - 2}" text-anchor="middle">${p[0]}</text><text class="text-small ${i === selectedPowerIndex ? "active-label" : ""}" x="${x}" y="${y + 13}" text-anchor="middle">${i === 9 ? "Water branch" : i === 10 ? "Earth branch" : p[1]}</text></g>`;
    });
    svg.innerHTML = out;
    svg.querySelectorAll("[data-power]").forEach((node) => {
      const activate = () => {
        selectedPowerIndex = Number(node.dataset.power);
        select.value = selectedPowerIndex;
        renderChart();
      };
      node.addEventListener("click", activate);
      node.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      });
    });
    const p = powers[selectedPowerIndex],
      adv = edges.filter((e) => e[0] === selectedPowerIndex),
      weak = edges.filter((e) => e[1] === selectedPowerIndex);
    function renderMatchupList(es, incoming) {
      return es.length
        ? "<ul>" +
            es
              .map(
                (e) =>
                  `<li><strong>${powers[incoming ? e[0] : e[1]][0]}</strong>: ${escapeHtml(e[2])}</li>`,
              )
              .join("") +
            "</ul>"
        : "<p>No specific counter established; resources, positioning and concentration still matter.</p>";
    }
    detail.innerHTML = `<h3>${p[0]}</h3><p>${escapeHtml(p[2])} ${escapeHtml(p[3])}</p><div class="notes"><section><h3>Advantages →</h3>${renderMatchupList(adv, false)}</section><section><h3>Vulnerable to ←</h3>${renderMatchupList(weak, true)}</section></div>`;
  }
  select.addEventListener("change", () => {
    selectedPowerIndex = Number(select.value);
    renderChart();
    window.openai
      ?.setWidgetState({
        modelContent: { power: selectedPowerIndex },
        privateContent: null,
      })
      .catch(() => {});
  });
  window.addEventListener("openai:set_globals", (e) => {
    const n = e.detail?.globals?.widgetState?.modelContent?.power;
    if (Number.isInteger(n) && n >= 0 && n < powers.length) {
      selectedPowerIndex = n;
      select.value = n;
      renderChart();
    }
  });
  new ResizeObserver(() => {
    if (root.clientWidth !== lastWidth) {
      lastWidth = root.clientWidth;
      renderChart();
    }
  }).observe(root);
  let lastWidth = root.clientWidth;
  renderChart();
})();
