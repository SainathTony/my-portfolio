/*
 * "Spec → shipped": a notebook page with an agent spec folds itself into a
 * paper plane, then flies with the cursor and away on scroll.
 *
 * Plain three.js (no R3F) so this lazy chunk stays small. The sheet is a dense
 * grid; each fold is a rigid rotation of the vertices on one side of a crease,
 * classified once against the fully-folded previous state. Folds run strictly
 * in sequence, so every crease axis is valid when its fold animates.
 */
import {
  BufferAttribute,
  CanvasTexture,
  Color,
  DirectionalLight,
  DoubleSide,
  Euler,
  FrontSide,
  BackSide,
  Group,
  HemisphereLight,
  MathUtils,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Quaternion,
  Scene,
  ShadowMaterial,
  SRGBColorSpace,
  Vector3,
  VSMShadowMap,
  WebGLRenderer,
} from "three";

export interface PaperPlaneOptions {
  reducedMotion: boolean;
  /** 0 → 1 as the hero scrolls out of view. */
  getScrollProgress: () => number;
  onFirstFrame?: () => void;
  onFolded?: () => void;
  /** Where the plane's tail sits (container px) once folded — the pencil trail ends there. */
  onTail?: (x: number, y: number, width: number, height: number) => void;
}

export interface PaperPlaneHandle {
  loop: () => void;
  dispose: () => void;
}

/* ---------- sheet & fold geometry (A4 proportions, sheet-space units) ---------- */
const W = 2.1;
const H = 2.97;
const A = W / 2; // half width
const TOP = H / 2;
const FIN = 0.36; // keel height (wing crease distance from centre)
const FIN_ANGLE = MathUtils.degToRad(80); // halves meet at a slight V
const DIHEDRAL = MathUtils.degToRad(9); // wings tip up a little

interface Fold {
  point: Vector3; // a point on the crease axis (in the previous folded state)
  dir: Vector3; // unit crease direction
  angle: number; // final angle, radians
  member: Uint8Array; // which vertices rotate
  stage: number; // folds in the same stage run together
}

const TIMELINE = [
  { stage: -1, start: 0.0, end: 0.75 }, // read the spec
  { stage: 0, start: 0.75, end: 1.25 }, // corners to centre
  { stage: 1, start: 1.3, end: 1.8 }, // edges to centre
  { stage: 2, start: 1.85, end: 2.35 }, // fold in half (keel)
  { stage: 3, start: 2.4, end: 2.9 }, // wings down
];
const FOLD_END = 2.9;
const POSE_START = 1.7;

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

function rotateAbout(p: Vector3, point: Vector3, dir: Vector3, angle: number) {
  return p.sub(point).applyAxisAngle(dir, angle).add(point);
}

/* ------------------------------ the spec page ------------------------------ */

function drawSpecTexture(maxAniso: number) {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 1448;
  const g = c.getContext("2d")!;

  g.fillStyle = "#FAF7F0";
  g.fillRect(0, 0, c.width, c.height);

  // grain
  const img = g.getImageData(0, 0, c.width, c.height);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * 14;
    d[i] += n;
    d[i + 1] += n;
    d[i + 2] += n * 0.8;
  }
  g.putImageData(img, 0, 0);

  // ruled lines + red margin
  const LINE = 64;
  const FIRST = 250;
  g.strokeStyle = "rgba(120, 156, 190, 0.45)";
  g.lineWidth = 2;
  for (let y = FIRST; y < c.height - 40; y += LINE) {
    g.beginPath();
    g.moveTo(0, y);
    g.lineTo(c.width, y);
    g.stroke();
  }
  g.strokeStyle = "rgba(200, 64, 42, 0.55)";
  g.lineWidth = 2.5;
  g.beginPath();
  g.moveTo(132, 0);
  g.lineTo(132, c.height);
  g.stroke();

  // header
  const ink = "#1D1B18";
  const pen = "#2347A0";
  const red = "#C8402A";
  g.fillStyle = ink;
  g.font = '700 74px "Kalam", cursive';
  g.fillText("agent.spec", 166, 160);
  g.font = '500 26px "IBM Plex Mono", monospace';
  g.fillStyle = "#5F594F";
  g.fillText("DRAFT 3", 800, 150);

  // spec lines — the way I write them before any code
  const rows: [string, string, boolean?][] = [
    ["goal", "one job, in plain words"],
    ["tools", "MCP server → real systems"],
    ["prompt", "make it smart", true],
    ["context", "fetched by tools"],
    ["guardrails", "what must it never do?"],
    ["evals", "how will we know it works?"],
    ["owner", "who signs off on risky steps?"],
    ["ship", "when people rely on it"],
  ];
  let y = FIRST + LINE - 14;
  for (const [k, v, struck] of rows) {
    g.font = '700 44px "Kalam", cursive';
    g.fillStyle = struck ? "rgba(29,27,24,0.55)" : ink;
    const kw = g.measureText(`${k}:`).width;
    g.fillText(`${k}:`, 166, y);
    g.font = '400 44px "Kalam", cursive';
    g.fillStyle = struck ? "rgba(35,71,160,0.55)" : pen;
    g.fillText(v, 166 + kw + 18, y);
    if (struck) {
      const total = kw + 18 + g.measureText(v).width;
      g.strokeStyle = red;
      g.lineWidth = 5;
      g.lineCap = "round";
      g.beginPath();
      g.moveTo(158, y - 14);
      g.quadraticCurveTo(166 + total / 2, y - 22, 176 + total, y - 12);
      g.stroke();
      g.font = '700 42px "Kalam", cursive';
      g.fillStyle = red;
      g.fillText("no.", 196 + total, y - 4);
    }
    y += LINE;
  }

  // a little doodle of the plan in the lower margin
  g.strokeStyle = pen;
  g.lineWidth = 4;
  g.lineCap = "round";
  const box = (x: number, by: number, w: number, label: string) => {
    g.strokeRect(x, by, w, 70);
    g.font = '400 34px "Kalam", cursive';
    g.fillStyle = pen;
    g.fillText(label, x + 16, by + 47);
  };
  const by = y + 30;
  box(170, by, 170, "agent");
  box(440, by, 150, "MCP");
  box(690, by, 200, "systems");
  const arrow = (x1: number, x2: number) => {
    g.beginPath();
    g.moveTo(x1, by + 35);
    g.lineTo(x2, by + 35);
    g.moveTo(x2 - 16, by + 24);
    g.lineTo(x2, by + 35);
    g.lineTo(x2 - 16, by + 46);
    g.stroke();
  };
  arrow(350, 428);
  arrow(600, 678);

  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = Math.min(8, maxAniso);
  return tex;
}

function drawBackTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 362;
  const g = c.getContext("2d")!;
  g.fillStyle = "#F7F3EA";
  g.fillRect(0, 0, c.width, c.height);
  const img = g.getImageData(0, 0, c.width, c.height);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 12;
    img.data[i] += n;
    img.data[i + 1] += n;
    img.data[i + 2] += n * 0.8;
  }
  g.putImageData(img, 0, 0);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

/* ------------------------------- fold set-up ------------------------------- */

/**
 * Builds the fold sequence. Mutates `flat`: vertices close to a crease are
 * snapped onto it (in flat sheet space), so creases land on triangle edges and
 * folded edges come out straight instead of saw-toothed.
 */
function buildFolds(flat: Float32Array, cell: number): Fold[] {
  const count = flat.length / 3;
  const cur = Float32Array.from(flat);
  const folds: Fold[] = [];
  const v = new Vector3();
  // Per-vertex 2D linear part of flat → current (flat folds are reflections): [a b; c d]
  const M = new Float32Array(count * 4);
  for (let i = 0; i < count; i++) M[i * 4] = M[i * 4 + 3] = 1;
  const SNAP = cell * 0.5;

  /** Snap vertices within SNAP of the line (p, unit dir) onto it, in current space. */
  const snap = (px: number, py: number, dx: number, dy: number) => {
    for (let i = 0; i < count; i++) {
      const x = cur[i * 3];
      const y = cur[i * 3 + 1];
      const s = dx * (y - py) - dy * (x - px); // signed distance, normal = (-dy, dx)
      if (s === 0 || Math.abs(s) > SNAP) continue;
      const ex = s * dy; // δ = -s·n
      const ey = -s * dx;
      cur[i * 3] = x + ex;
      cur[i * 3 + 1] = y + ey;
      if (dx === 0) cur[i * 3] = px; // exact for vertical creases
      // flat += Mᵀ·δ  (M is orthogonal)
      const a = M[i * 4], b = M[i * 4 + 1], c = M[i * 4 + 2], d = M[i * 4 + 3];
      flat[i * 3] += a * ex + c * ey;
      flat[i * 3 + 1] += b * ex + d * ey;
    }
  };

  const nose = new Vector3(0, TOP, 0);
  const t225 = MathUtils.degToRad(22.5);

  // Classify vertices by which side of a 2D line (through p, along dir) they're on,
  // using the reference point to pick the side that moves.
  const side2D = (x: number, y: number, p: Vector3, dir: Vector3) =>
    dir.x * (y - p.y) - dir.y * (x - p.x);

  const addFlatFold = (
    stage: number,
    dir: Vector3,
    ref: [number, number],
    lift: number,
  ) => {
    const point = new Vector3(nose.x, nose.y, lift);
    snap(point.x, point.y, dir.x, dir.y);
    const refSide = Math.sign(side2D(ref[0], ref[1], point, dir));
    const member = new Uint8Array(count);
    for (let i = 0; i < count; i++) {
      const s = side2D(cur[i * 3], cur[i * 3 + 1], point, dir);
      if (Math.sign(s) === refSide && Math.abs(s) > 1e-6) member[i] = 1;
    }
    // Fold *up* over the front (+z): pick the rotation sign that lifts the reference.
    const r = new Vector3(ref[0], ref[1], 0).sub(point);
    r.sub(dir.clone().multiplyScalar(r.dot(dir)));
    const upward = new Vector3().crossVectors(dir, r).z > 0 ? 1 : -1;
    folds.push({ point, dir, angle: Math.PI * upward, member, stage });
  };

  const applyLast = (flatFold = false) => {
    const fold = folds[folds.length - 1];
    // a half-turn about an in-plane axis is a 2D reflection across it
    const { x: dx, y: dy } = fold.dir;
    const r00 = 2 * dx * dx - 1, r01 = 2 * dx * dy, r11 = 2 * dy * dy - 1;
    for (let i = 0; i < count; i++) {
      if (!fold.member[i]) continue;
      v.set(cur[i * 3], cur[i * 3 + 1], cur[i * 3 + 2]);
      rotateAbout(v, fold.point, fold.dir, fold.angle);
      cur[i * 3] = v.x;
      cur[i * 3 + 1] = v.y;
      cur[i * 3 + 2] = v.z;
      if (flatFold) {
        const a = M[i * 4], b = M[i * 4 + 1], c = M[i * 4 + 2], d = M[i * 4 + 3];
        M[i * 4] = r00 * a + r01 * c;
        M[i * 4 + 1] = r00 * b + r01 * d;
        M[i * 4 + 2] = r01 * a + r11 * c;
        M[i * 4 + 3] = r01 * b + r11 * d;
      }
    }
  };

  // Stage 0 — top corners to the centre line. Elevated axes keep layers stacked in order.
  addFlatFold(0, new Vector3(-1, -1, 0).normalize(), [-A + 0.02, TOP - 0.02], 0.002);
  applyLast(true);
  addFlatFold(0, new Vector3(1, -1, 0).normalize(), [A - 0.02, TOP - 0.02], 0.002);
  applyLast(true);

  // Stage 1 — the new slanted edges to the centre line again.
  addFlatFold(1, new Vector3(-Math.sin(t225), -Math.cos(t225), 0), [-A * 0.95, 0], 0.006);
  applyLast(true);
  addFlatFold(1, new Vector3(Math.sin(t225), -Math.cos(t225), 0), [A * 0.95, 0], 0.006);
  applyLast(true);

  // Keel and wing creases are vertical lines in the folded-twice state.
  snap(0, 0, 0, 1);
  snap(-FIN, 0, 0, 1);
  snap(FIN, 0, 0, 1);

  // Snapshot of the flat, folded-twice state — keel & wings classify against it.
  const twice = Float32Array.from(cur);
  const EPS = 1e-6;
  const yAxis = new Vector3(0, 1, 0);

  // Stage 2 — fold in half: both halves rise to meet (front faces inside the keel).
  const half = (sign: -1 | 1) => {
    const member = new Uint8Array(count);
    for (let i = 0; i < count; i++) if (twice[i * 3] * sign > EPS) member[i] = 1;
    // left half (x<0) rotates +angle about +y to rise; right half the opposite
    folds.push({
      point: new Vector3(0, 0, 0),
      dir: yAxis.clone(),
      angle: -sign * FIN_ANGLE,
      member,
      stage: 2,
    });
    applyLast();
  };
  half(-1);
  half(1);

  // Stage 3 — wings fold out from the top of the keel.
  const wing = (sign: -1 | 1) => {
    const member = new Uint8Array(count);
    for (let i = 0; i < count; i++) if (twice[i * 3] * sign > FIN + EPS) member[i] = 1;
    const theta = -sign * FIN_ANGLE; // the half's rotation
    const crease = new Vector3(sign * FIN, 0, 0).applyAxisAngle(yAxis, theta);
    // wing currently points at angle theta; bring it to the dihedral
    const target = -sign * DIHEDRAL;
    folds.push({
      point: crease,
      dir: yAxis.clone(),
      angle: target - theta,
      member,
      stage: 3,
    });
    applyLast();
  };
  wing(-1);
  wing(1);

  return folds;
}

/* --------------------------------- scene --------------------------------- */

export function createPaperPlane(
  container: HTMLElement,
  opts: PaperPlaneOptions,
): PaperPlaneHandle {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = VSMShadowMap; // soft, paper-on-paper shadows
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.display = "block";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.setAttribute("aria-hidden", "true");
  container.appendChild(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(28, 1, 0.1, 50);
  camera.position.set(0, 0.35, 7.4);
  camera.lookAt(0, 0, 0);

  scene.add(new HemisphereLight(0xffffff, 0xf1e8d6, 2.0)); // light ground bounce: no muddy underside
  const key = new DirectionalLight(0xfff0da, 2.1);
  key.position.set(-2.2, 3.2, 6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -3.5;
  key.shadow.camera.right = 3.5;
  key.shadow.camera.top = 3.5;
  key.shadow.camera.bottom = -3.5;
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 16;
  key.shadow.radius = 9;
  key.shadow.blurSamples = 16;
  key.shadow.bias = -0.0004;
  scene.add(key);

  // Invisible "page" behind the sheet that only receives its soft shadow.
  const page = new Mesh(
    new PlaneGeometry(14, 10),
    new ShadowMaterial({ color: new Color("#4a3a22"), opacity: 0.16 }),
  );
  page.position.z = -0.9;
  page.receiveShadow = true;
  scene.add(page);

  // Sheet geometry: dense enough that creases read as paper, not as triangles.
  const small = Math.min(window.innerWidth, window.innerHeight) < 700;
  const segX = small ? 48 : 80;
  const segY = small ? 68 : 112;
  const geo = new PlaneGeometry(W, H, segX, segY);
  const posAttr = geo.getAttribute("position") as BufferAttribute;
  const uvAttr = geo.getAttribute("uv") as BufferAttribute;
  const flat = Float32Array.from(posAttr.array as Float32Array);
  const folds = buildFolds(flat, Math.hypot(W / segX, H / segY));
  // snapped vertices moved in sheet space: keep the texture glued to the paper
  for (let i = 0; i < flat.length / 3; i++) {
    uvAttr.setXY(i, flat[i * 3] / W + 0.5, flat[i * 3 + 1] / H + 0.5);
  }
  uvAttr.needsUpdate = true;
  const tmp = new Vector3();

  const front = drawSpecTexture(renderer.capabilities.getMaxAnisotropy());
  const back = drawBackTexture();
  const frontMat = new MeshStandardMaterial({
    map: front,
    roughness: 0.9,
    metalness: 0,
    side: FrontSide,
    flatShading: true,
  });
  const backMat = new MeshStandardMaterial({
    map: back,
    roughness: 0.92,
    metalness: 0,
    side: BackSide,
    flatShading: true,
  });
  const frontMesh = new Mesh(geo, frontMat);
  const backMesh = new Mesh(geo, backMat);
  frontMesh.castShadow = backMesh.castShadow = true;
  // no self-shadowing: VSM on thin stacked layers bleeds light
  frontMesh.receiveShadow = backMesh.receiveShadow = false;
  // shadow depth uses both faces so thin layers still cast
  const depthSide = DoubleSide;
  frontMat.shadowSide = depthSide;
  backMat.shadowSide = depthSide;

  const sheet = new Group(); // holds the folding paper (sheet space)
  sheet.add(frontMesh, backMesh);
  const flight = new Group(); // pose, mouse sway, scroll flight
  flight.add(sheet);
  scene.add(flight);

  /* -------------------------------- poses -------------------------------- */
  // Flat: the page faces you, a little askew, like it's been set on a desk.
  const qFlat = new Quaternion().setFromEuler(new Euler(-0.16, 0.22, 0.05));
  // Plane: sheet +y (nose) → forward-right-up, sheet +z (keel→wings) → up, tilted to show the wing tops.
  const fwd = new Vector3(1, 0.3, 0.48).normalize();
  const upHint = new Vector3(-0.08, 1, 0.78).normalize();
  const up = upHint.sub(fwd.clone().multiplyScalar(upHint.dot(fwd))).normalize();
  const side = new Vector3().crossVectors(fwd, up);
  const qPlane = new Quaternion().setFromRotationMatrix(
    new Matrix4().makeBasis(side, fwd, up),
  );
  const planeOffset = new Vector3(0.32, -0.02, 0); // nudge right: room for the trail behind it
  const FINAL_SCALE = 0.86;
  const qTmp = new Quaternion();

  function reportTail() {
    if (!opts.onTail) return;
    const p = new Vector3(0, -TOP, FIN * 0.5)
      .multiplyScalar(FINAL_SCALE)
      .applyQuaternion(qPlane)
      .add(planeOffset)
      .project(camera);
    const w = container.clientWidth;
    const h = container.clientHeight;
    opts.onTail(((p.x + 1) / 2) * w, ((1 - p.y) / 2) * h, w, h);
  }

  /* ------------------------------- animation ------------------------------- */
  const reduce = opts.reducedMotion;
  let foldT = reduce ? FOLD_END : 0;
  let foldArmed = false; // the fold waits until the sheet is properly on screen
  let foldedNotified = false;
  let lastFoldKey = "";

  function applyFolds(t: number) {
    const progress = new Map<number, number>();
    for (const seg of TIMELINE) {
      if (seg.stage < 0) continue;
      progress.set(seg.stage, easeInOut(clamp01((t - seg.start) / (seg.end - seg.start))));
    }
    const key = [...progress.values()].map((p) => p.toFixed(4)).join("|");
    if (key === lastFoldKey) return;
    lastFoldKey = key;

    const arr = posAttr.array as Float32Array;
    const n = arr.length / 3;
    for (let i = 0; i < n; i++) {
      tmp.set(flat[i * 3], flat[i * 3 + 1], flat[i * 3 + 2]);
      for (const fold of folds) {
        if (!fold.member[i]) continue;
        const p = progress.get(fold.stage) ?? 0;
        if (p <= 0) continue;
        rotateAbout(tmp, fold.point, fold.dir, fold.angle * p);
      }
      arr[i * 3] = tmp.x;
      arr[i * 3 + 1] = tmp.y;
      arr[i * 3 + 2] = tmp.z;
    }
    posAttr.needsUpdate = true;
    geo.computeBoundingSphere();
  }

  // pointer → gentle yaw / roll / pitch
  const pointer = { x: 0, y: 0 };
  const onPointer = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  if (!reduce) window.addEventListener("pointermove", onPointer, { passive: true });

  const sway = { yaw: 0, roll: 0, pitch: 0 };
  let loopStart = -1;
  let clock = 0;
  let last = performance.now();
  let raf = 0;
  let visible = true;
  let firstFrame = false;
  const swayQ = new Quaternion();
  const loopQ = new Quaternion();
  const swayAxis = { yaw: new Vector3(0, 1, 0), roll: new Vector3(0, 0, 1), pitch: new Vector3(1, 0, 0) };
  const loopAxis = new Vector3(0, 0, 1);
  const q1 = new Quaternion();
  const q2 = new Quaternion();
  const q3 = new Quaternion();

  function frame(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    clock += dt;

    if (!reduce && foldArmed && foldT < FOLD_END) foldT = Math.min(FOLD_END, foldT + dt);
    applyFolds(foldT);
    if (foldT >= FOLD_END && !foldedNotified) {
      foldedNotified = true;
      reportTail();
      opts.onFolded?.();
    }

    // flat → plane pose, overlapping the last folds
    const poseP = easeInOut(clamp01((foldT - POSE_START) / (FOLD_END - POSE_START)));
    qTmp.copy(qFlat).slerp(qPlane, poseP);
    sheet.quaternion.copy(qTmp);
    sheet.position.copy(planeOffset).multiplyScalar(poseP);
    const scale = MathUtils.lerp(0.98, FINAL_SCALE, poseP);
    sheet.scale.setScalar(scale);

    // mouse sway, damped
    const k = 1 - Math.exp(-5 * dt);
    const live = poseP; // only sway once it's a plane
    sway.yaw += (pointer.x * 0.28 * live - sway.yaw) * k;
    sway.roll += (-pointer.x * 0.22 * live - sway.roll) * k;
    sway.pitch += (pointer.y * 0.14 * live - sway.pitch) * k;
    q1.setFromAxisAngle(swayAxis.yaw, sway.yaw);
    q2.setFromAxisAngle(swayAxis.roll, sway.roll);
    q3.setFromAxisAngle(swayAxis.pitch, sway.pitch);
    swayQ.copy(q1).multiply(q2).multiply(q3);

    // click → a loop-the-loop
    loopQ.identity();
    let loopLift = 0;
    if (loopStart >= 0) {
      const lt = (clock - loopStart) / 1.2;
      if (lt >= 1) loopStart = -1;
      else {
        const e = easeInOut(lt);
        loopQ.setFromAxisAngle(loopAxis, e * Math.PI * 2);
        loopLift = Math.sin(e * Math.PI) * 0.55;
      }
    }
    flight.quaternion.copy(swayQ).multiply(loopQ);

    // idle bob + scroll flight (off to the upper right, shrinking a touch)
    const bob = reduce ? 0 : Math.sin((clock / 4.5) * Math.PI * 2) * 0.06 * live;
    const s = reduce ? 0 : opts.getScrollProgress();
    const fly = easeInOut(clamp01(s * 1.15));
    flight.position.set(fly * 3.2, bob + loopLift + fly * 1.6, fly * 0.6);
    flight.scale.setScalar(1 - fly * 0.35);

    renderer.render(scene, camera);
    if (!firstFrame) {
      firstFrame = true;
      opts.onFirstFrame?.();
    }
    if (visible && !(reduce && firstFrame && loopStart < 0)) raf = requestAnimationFrame(frame);
  }

  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // keep the whole sheet in frame on narrow containers
    const fitH = 3.45;
    const dist = camera.position.length();
    const needFov = 2 * Math.atan(fitH / 2 / dist) * (180 / Math.PI);
    const aspectFit = camera.aspect < 0.78 ? needFov * (0.78 / camera.aspect) : needFov;
    camera.fov = Math.min(44, Math.max(26, aspectFit));
    camera.updateProjectionMatrix();
    if (foldedNotified) reportTail();
    if (reduce) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    }
  }

  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  const io = new IntersectionObserver(
    ([entry]) => {
      const was = visible;
      if (entry.intersectionRatio >= 0.45) foldArmed = true;
      visible = entry.isIntersecting && !document.hidden;
      if (visible && !was) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    },
    { threshold: [0, 0.45] },
  );
  io.observe(container);

  const onVis = () => {
    const was = visible;
    visible = !document.hidden;
    if (visible && !was) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  };
  document.addEventListener("visibilitychange", onVis);

  raf = requestAnimationFrame(frame);

  return {
    loop() {
      if (loopStart < 0 && foldT >= FOLD_END) {
        loopStart = clock;
        if (reduce) raf = requestAnimationFrame(frame);
      }
    },
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onPointer);
      geo.dispose();
      frontMat.dispose();
      backMat.dispose();
      front.dispose();
      back.dispose();
      page.geometry.dispose();
      (page.material as ShadowMaterial).dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}
