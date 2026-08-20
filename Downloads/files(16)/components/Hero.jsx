'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// math helpers
// ---------------------------------------------------------------------------
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const lerp = (a, b, t) => a + (b - a) * t;
const deg2rad = (d) => (d * Math.PI) / 180;

function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function sampleCurve(progress, keys) {
  if (progress <= keys[0][0]) return keys[0][1];
  const last = keys[keys.length - 1];
  if (progress >= last[0]) return last[1];
  for (let i = 0; i < keys.length - 1; i++) {
    const [t0, v0] = keys[i];
    const [t1, v1] = keys[i + 1];
    if (progress >= t0 && progress <= t1) {
      return lerp(v0, v1, smoothstep(t0, t1, progress));
    }
  }
  return last[1];
}

// ---------------------------------------------------------------------------
// choreography — a real perspective camera orbits a real GLTF model.
// SHOT 01  0.00–0.20  darkness, object discovery
// SHOT 02  0.20–0.40  camera approach, material reveal
// SHOT 03  0.40–0.58  rotation, camera begins pitching underneath
// SHOT 04  0.58–0.73  camera swings under the visor
// SHOT 05  0.73–1.00  product reveal, typography, dissolve
// ---------------------------------------------------------------------------
const BASE_AZIMUTH_DEG = 143;
const MODEL_ROTATION_Y = 3.3;

const RADIUS_KEYS = [
  [0.0, 5.2], [0.15, 4.6], [0.3, 3.6], [0.4, 3.0], [0.55, 2.6],
  [0.6, 2.5], [0.62, 2.3], [0.65, 1.9], [0.67, 1.45], [0.69, 1.25],
  [0.705, 1.25], [0.715, 2.6], [0.73, 2.3], [0.85, 2.35], [1.0, 2.9],
];
const POLAR_KEYS = [
  [0.0, 78], [0.3, 78], [0.45, 74], [0.58, 92], [0.62, 118],
  [0.65, 142], [0.67, 154], [0.69, 160], [0.705, 160], [0.715, 96],
  [0.73, 98], [0.85, 100], [1.0, 97],
];
const AZIMUTH_OFFSET_KEYS = [
  [0.0, 0], [0.3, 0], [0.45, 30], [0.58, 70], [0.62, 105],
  [0.65, 132], [0.67, 150], [0.69, 165], [0.705, 168], [0.715, 40],
  [0.73, 30], [0.85, 24], [1.0, 18],
];
// material presence — reaches full and holds, does not fade after the climax
const ORANGE_KEYS = [
  [0.4, 0], [0.45, 0.03], [0.5, 0.08], [0.56, 0.22], [0.6, 0.38],
  [0.65, 0.68], [0.68, 0.9], [0.71, 1.0], [1.0, 1.0],
];
// local emission (level B) — sharp, near-field glow, peaks with the flash
const EMISSION_KEYS = [
  [0.4, 0], [0.5, 0.04], [0.56, 0.09], [0.6, 0.16], [0.63, 0.28],
  [0.65, 0.45], [0.68, 0.8], [0.7, 1.0], [0.72, 1.0], [0.75, 0.4],
  [0.78, 0.22], [0.9, 0.14], [1.0, 0.08],
];
// environmental bounce (level C) — broad, soft, drives lights/atmosphere/
// floor glow rather than the underbrim material itself
const BOUNCE_KEYS = [
  [0.4, 0], [0.5, 0.03], [0.56, 0.07], [0.6, 0.13], [0.63, 0.24],
  [0.65, 0.4], [0.68, 0.72], [0.7, 0.95], [0.72, 1.0], [0.75, 0.42],
  [0.78, 0.24], [0.9, 0.15], [1.0, 0.1],
];
const GRAPHITE_KEYS = [[0.1, 0], [0.22, 0.14], [0.4, 0.12], [0.55, 0.04], [1.0, 0]];
const VIGNETTE_KEYS = [
  [0.0, 0.88], [0.15, 0.65], [0.3, 0.45], [0.6, 0.35], [0.67, 0.7],
  [0.705, 0.85], [0.73, 0.35], [0.85, 0.4], [1.0, 0.72],
];
const FLASH_KEYS = [[0.695, 0], [0.71, 0.88], [0.725, 0]];
const LEAK_KEYS = [[0.6, 0], [0.655, 0.35], [0.685, 0.1], [0.7, 0]];
const OPACITY_KEYS = [[0.0, 0], [0.08, 0.35], [0.2, 1]];
const ELEVATION_KEYS = [
  [0, 0], [0.3, 0], [0.58, 0], [0.62, -0.08], [0.67, -0.22],
  [0.69, -0.26], [0.705, -0.26], [0.715, 0.06], [0.73, 0.03], [1, 0],
];
const BLUR_KEYS = [[0, 0], [0.1, 0], [0.16, 3], [0.22, 0], [0.9, 0], [1.0, 5]];

// editorial typography — cut to the camera's rhythm: appears as the glow
// registers, quiets during the swing under the visor, vanishes behind the
// flash, reintroduces once the camera settles
const TYPO_KICKER_KEYS = [
  [0.46, 0], [0.53, 0.85], [0.58, 0.85], [0.63, 0.3], [0.68, 0.1],
  [0.695, 0], [0.715, 0], [0.73, 0.9], [0.85, 1.0], [0.96, 0.7], [1.0, 0.65],
];
const TYPO_TITLE_KEYS = [
  [0.5, 0], [0.58, 1], [0.63, 1], [0.67, 0.3], [0.69, 0.08],
  [0.695, 0], [0.715, 0], [0.74, 1], [0.85, 1], [0.96, 0.78], [1.0, 0.72],
];
const TYPO_META_KEYS = [
  [0.55, 0], [0.63, 0.7], [0.66, 0.7], [0.69, 0.15], [0.695, 0],
  [0.715, 0], [0.76, 0.85], [0.88, 1], [0.96, 0.6], [1.0, 0.55],
];
const TYPO_ANNOTATION_KEYS = [[0.82, 0], [0.92, 0.55], [1.0, 0.55]];
// leader-line callouts only appear once the camera has settled
const CALLOUT_KEYS = [[0.8, 0], [0.9, 1], [1.0, 1]];

function computeState(progress, velocity, velocitySign, mouse) {
  const radius = sampleCurve(progress, RADIUS_KEYS);
  const polarDeg = clamp(sampleCurve(progress, POLAR_KEYS) + mouse.y * 4, 5, 175);
  const azimuthDeg = BASE_AZIMUTH_DEG + sampleCurve(progress, AZIMUTH_OFFSET_KEYS) + mouse.x * 5;
  const orange = sampleCurve(progress, ORANGE_KEYS);
  const emission = sampleCurve(progress, EMISSION_KEYS);
  const bounce = sampleCurve(progress, BOUNCE_KEYS);
  const graphite = sampleCurve(progress, GRAPHITE_KEYS);
  const vignette = sampleCurve(progress, VIGNETTE_KEYS);
  const flash = sampleCurve(progress, FLASH_KEYS);
  const lightLeak = sampleCurve(progress, LEAK_KEYS);
  const opacity = sampleCurve(progress, OPACITY_KEYS);
  const elevation = sampleCurve(progress, ELEVATION_KEYS);
  const blur = sampleCurve(progress, BLUR_KEYS);
  const typo = {
    kicker: sampleCurve(progress, TYPO_KICKER_KEYS),
    title: sampleCurve(progress, TYPO_TITLE_KEYS),
    meta: sampleCurve(progress, TYPO_META_KEYS),
    annotation: sampleCurve(progress, TYPO_ANNOTATION_KEYS),
    callouts: sampleCurve(progress, CALLOUT_KEYS),
  };

  return {
    progress, velocity, velocitySign,
    camera: { radius, polarDeg, azimuthDeg, elevation },
    object: { opacity },
    material: { orange, emission, bounce },
    lighting: { graphite },
    lens: { vignette, flash, lightLeak, blur },
    typo,
  };
}

function ArcText({ text }) {
  const chars = text.split('');
  return (
    <div style={{ display: 'flex' }}>
      {chars.map((ch, i) => (
        <span
          key={i}
          className="neon-letter"
          style={{
            display: 'inline-block',
            opacity: 0,
            fontFamily: 'var(--font-stalinist), sans-serif',
            fontStyle: 'normal',
            fontSize: '17px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(255,130,40,0.92)',
            textShadow: '0 0 18px rgba(255,120,40,0.55)',
          }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </div>
  );
}

// a broad, soft-edged plateau — not a hotspot with hard radial falloff, but
// not a perfectly flat painted shape either. A blurred rounded-rect gives
// the "material across a surface" coverage; a very gentle multiply-blended
// radial gradient on top adds just enough center-to-edge gradation that it
// reads as a surface catching light unevenly, the way a real lit brim would.
function makeUniformGlowTexture() {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const margin = size * 0.22;
  const r = size * 0.24;
  const x = margin;
  const y = margin;
  const w = size - margin * 2;
  const h = size - margin * 2;
  ctx.filter = `blur(${margin * 1.3}px)`;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fill();
  ctx.filter = 'none';

  ctx.globalCompositeOperation = 'multiply';
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size * 0.62);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.55, 'rgba(255,255,255,0.88)');
  g.addColorStop(1, 'rgba(255,255,255,0.4)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  ctx.globalCompositeOperation = 'source-over';

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// soft radial gradient — bright orange center fading through a warmer red
// mid-range to a transparent edge. Used as additive-blended transparent
// cards positioned just under the brim.
function createGlowShaderMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uIntensity: { value: 0 },
      uColor: { value: new THREE.Color(1.0, 0.42, 0.08) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uIntensity;
      uniform vec3 uColor;
      varying vec2 vUv;
      void main() {
        // ellipse shape comes from the plane geometry's own width/height
        // (see glowLayers below); no extra aspect scaling, so the falloff
        // reaches exactly zero at the true geometric edge in every direction
        vec2 p = vUv - 0.5;
        float d = length(p);
        float glow = 1.0 - smoothstep(0.0, 0.5, d);
        glow = pow(glow, 3.2);
        vec3 warmEdge = vec3(1.0, 0.28, 0.04);
        float colorMix = smoothstep(0.0, 0.35, 1.0 - d);
        vec3 col = mix(warmEdge, uColor, colorMix);
        gl_FragColor = vec4(col, glow * uIntensity);
      }
    `,
    transparent: true,
    depthWrite: false,
    // these cards represent light spilling into open air below the brim,
    // not surface material, so they shouldn't be occluded by the crown
    depthTest: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}

// finds the visor's underside. The model is a single-sided, single-layer
// shell with no separate underside geometry, so this scans from above for
// the lowest point of the mesh in the front/low region; the caller orients
// the decal facing opposite the hit normal so it projects onto the side
// visible from underneath.
function findUnderbrimHit(THREE, targetMesh, box, rotationY) {
  const raycaster = new THREE.Raycaster();
  const sizeX = box.max.x - box.min.x;
  const sizeZ = box.max.z - box.min.z;
  const topProbeY = box.max.y + 0.1;
  const yLimit = box.min.y + (box.max.y - box.min.y) * 0.5;
  const bound = Math.max(sizeX, sizeZ);

  // the model's true left-right axis (capGroup's rotationY isn't a clean
  // 180°, so raw world X is off the cap's bilateral symmetry line)
  const lr = new THREE.Vector3(Math.cos(rotationY), 0, -Math.sin(rotationY));
  const fb = new THREE.Vector3(Math.sin(rotationY), 0, Math.cos(rotationY));

  function collect(maxOffset) {
    const found = [];
    const steps = 28;
    for (let i = 0; i <= steps; i++) {
      for (let j = 0; j <= steps; j++) {
        const x = box.min.x + (i / steps) * sizeX;
        const z = box.min.z + (j / steps) * sizeZ;
        const lrOffset = x * lr.x + z * lr.z; // model center sits at world origin
        if (Math.abs(lrOffset) > maxOffset) continue;
        const fbCoord = x * fb.x + z * fb.z;
        if (fbCoord < 0) continue; // stay on the visor's own side, away from the back strap/opening
        raycaster.set(new THREE.Vector3(x, topProbeY, z), new THREE.Vector3(0, -1, 0));
        const hit = raycaster.intersectObject(targetMesh, true)[0];
        if (!hit || hit.point.y > yLimit) continue;
        found.push({ hit, fbCoord });
      }
    }
    return found;
  }

  // search a narrow band around true center first, keeping the glow under
  // the middle of the visor; widen only if that band misses the mesh
  const candidates =
    collect(bound * 0.05).length ? collect(bound * 0.05) :
    collect(bound * 0.12).length ? collect(bound * 0.12) :
    collect(bound * 0.3).length ? collect(bound * 0.3) :
    collect(bound);
  if (!candidates.length) return null;

  // the crown overhangs the visor's back portion, so only the outer half of
  // the true underbrim is reachable by a straight ray from above. Target
  // the inner edge of that verified range, closest to the crown.
  let minFb = Infinity;
  let maxFb = -Infinity;
  for (const c of candidates) {
    minFb = Math.min(minFb, c.fbCoord);
    maxFb = Math.max(maxFb, c.fbCoord);
  }
  const targetFb = minFb + (maxFb - minFb) * 0.15;

  let best = null;
  let bestDist = Infinity;
  for (const c of candidates) {
    const d = Math.abs(c.fbCoord - targetFb);
    if (d < bestDist) {
      bestDist = d;
      best = c.hit;
    }
  }
  best.worldNormal = best.face.normal.clone().transformDirection(targetMesh.matrixWorld).normalize();
  return best;
}

// projects a 3D world point to CSS-pixel screen space, for leader-line
// callouts that track real geometry instead of guessed fixed positions
function projectToScreen(point, camera, w, h) {
  const p = point.clone().project(camera);
  return { x: (p.x * 0.5 + 0.5) * w, y: (1 - (p.y * 0.5 + 0.5)) * h, behind: p.z > 1 };
}

export default function Hero() {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const glCanvasRef = useRef(null);
  const particlesCanvasRef = useRef(null);

  const graphiteRef = useRef(null);
  const warmRef = useRef(null);
  const floorGlowRef = useRef(null);
  const vignetteRef = useRef(null);
  const grainRef = useRef(null);
  const flashRef = useRef(null);
  const leakRef = useRef(null);

  // shot 1 intro — unchanged, GSAP-driven
  const kickerRef = useRef(null);
  const titleRef = useRef(null);
  const scrollHintRef = useRef(null);

  // editorial NEON ORANGE / UNDERBRIM block — driven directly by
  // computeState()'s typo curves, cut to the camera's rhythm
  const neonKickerRef = useRef(null);
  const underbrimTitleRef = useRef(null);
  const editorialMetaRef = useRef(null);
  const annotationRef = useRef(null);

  // product callouts — leader lines projected from real 3D anchor points,
  // visible only once the camera settles into the final shot
  const calloutsSvgRef = useRef(null);
  const calloutLineFabricRef = useRef(null);
  const calloutDotFabricRef = useRef(null);
  const calloutTextFabricRef = useRef(null);
  const calloutLineGlowRef = useRef(null);
  const calloutDotGlowRef = useRef(null);
  const calloutTextGlowRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const glCanvas = glCanvasRef.current;
    const particlesCanvas = particlesCanvasRef.current;
    if (!container || !stage || !glCanvas || !particlesCanvas) return;

    let disposed = false;
    let rafId = null;
    let trigger = null;
    let gsapCtx = null;
    let io = null;
    let composer = null;
    let renderer = null;
    let capMesh = null;
    let bounceLight = null;
    let rimLight = null;
    const particlesCtx = particlesCanvas.getContext('2d');
    const particles = Array.from({ length: 26 }, () => ({
      seed: Math.random() * 1000,
      speed: 0.4 + Math.random() * 1.2,
      radius: 40 + Math.random() * 90,
      amplitude: 4 + Math.random() * 10,
      size: 0.6 + Math.random() * 1.6,
      flicker: 0.5 + Math.random() * 1.5,
      baseOpacity: 0.12 + Math.random() * 0.28,
    }));

    let cssW = 0;
    let cssH = 0;

    async function init() {
      const [
        { GLTFLoader },
        { DRACOLoader },
        { RoomEnvironment },
        { DecalGeometry },
        { EffectComposer },
        { RenderPass },
        { UnrealBloomPass },
      ] = await Promise.all([
        import('three/addons/loaders/GLTFLoader.js'),
        import('three/addons/loaders/DRACOLoader.js'),
        import('three/addons/environments/RoomEnvironment.js'),
        import('three/addons/geometries/DecalGeometry.js'),
        import('three/addons/postprocessing/EffectComposer.js'),
        import('three/addons/postprocessing/RenderPass.js'),
        import('three/addons/postprocessing/UnrealBloomPass.js'),
      ]);
      if (disposed) return;

      renderer = new THREE.WebGLRenderer({ canvas: glCanvas, antialias: true });
      renderer.setClearColor(0x050505, 1);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);

      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
      keyLight.position.set(3, 5, 4);
      scene.add(keyLight);
      scene.add(new THREE.AmbientLight(0xffffff, 0.25));

      // level C (environmental bounce): broad, soft point light seated at
      // the underbrim, short-range so it reads as a tight bounce there
      bounceLight = new THREE.PointLight(0xff6a1a, 0, 2.1, 1.8);
      scene.add(bounceLight);

      // dimmer warm light toward the crown-visor seam, for a selective
      // warm reflection on the inner brim edge and lower crown
      rimLight = new THREE.PointLight(0xff7a28, 0, 1.1, 2.0);
      scene.add(rimLight);

      const renderPass = new RenderPass(scene, camera);
      const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.5, 0.22, 0.45);
      composer = new EffectComposer(renderer);
      composer.addPass(renderPass);
      composer.addPass(bloomPass);

      function resize() {
        cssW = stage.clientWidth;
        cssH = stage.clientHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        renderer.setPixelRatio(dpr);
        renderer.setSize(cssW, cssH, false);
        composer.setSize(cssW, cssH);
        camera.aspect = cssW / Math.max(1, cssH);
        camera.updateProjectionMatrix();
        particlesCanvas.width = cssW * dpr;
        particlesCanvas.height = cssH * dpr;
        particlesCanvas.style.width = cssW + 'px';
        particlesCanvas.style.height = cssH + 'px';
        particlesCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      resize();
      window.addEventListener('resize', resize);

      // ---- load the model ----
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
      const gltfLoader = new GLTFLoader();
      gltfLoader.setDRACOLoader(dracoLoader);

      let capGroup = null;
      let capHeight = 1.6;
      let target = new THREE.Vector3(0, 0.42, 0);

      try {
        const gltf = await gltfLoader.loadAsync('/cap-real.glb');
        if (disposed) return;
        capGroup = gltf.scene;
        capGroup.rotation.y = MODEL_ROTATION_Y;

        const fabricLoader = new THREE.TextureLoader();
        const albedo = fabricLoader.load('/fabric_albedo.jpg');
        const normal = fabricLoader.load('/fabric_normal.jpg');
        const rough = fabricLoader.load('/fabric_rough.jpg');
        albedo.colorSpace = THREE.SRGBColorSpace;
        [albedo, normal, rough].forEach((t) => {
          t.wrapS = t.wrapT = THREE.RepeatWrapping;
          t.repeat.set(3, 3);
          t.anisotropy = 8;
        });

        capGroup.traverse((o) => {
          if (o.isMesh) {
            o.material = new THREE.MeshStandardMaterial({
              color: 0x111111,
              map: albedo,
              normalMap: normal,
              normalScale: new THREE.Vector2(0.7, 0.7),
              roughnessMap: rough,
              roughness: 0.85,
              metalness: 0.0,
              transparent: true,
              opacity: 0,
              side: THREE.DoubleSide,
            });
            capMesh = o;
          }
        });

        // fit: center horizontally, sit on the floor, scale to ~1.6 units
        const box0 = new THREE.Box3().setFromObject(capGroup);
        const size0 = box0.getSize(new THREE.Vector3());
        const scale = 1.6 / Math.max(size0.x, size0.y, size0.z);
        capGroup.scale.setScalar(scale);
        capGroup.updateMatrixWorld(true);
        const box1 = new THREE.Box3().setFromObject(capGroup);
        const center = box1.getCenter(new THREE.Vector3());
        capGroup.position.sub(new THREE.Vector3(center.x, box1.min.y, center.z));
        capGroup.updateMatrixWorld(true);

        scene.add(capGroup);

        const box = new THREE.Box3().setFromObject(capMesh);
        capHeight = box.max.y - box.min.y;
        target = new THREE.Vector3(0, capHeight * 0.42, 0);

        // ---- underbrim glow: three light levels, not one orange circle ----
        const hit = findUnderbrimHit(THREE, capMesh, box, MODEL_ROTATION_Y);
        if (hit) {
          // decal faces opposite the hit normal, projecting onto the side
          // visible when the camera swings underneath
          const n = hit.worldNormal.clone().multiplyScalar(-1);
          const dummy = new THREE.Object3D();
          dummy.position.copy(hit.point);
          dummy.lookAt(hit.point.clone().add(n));

          // A + B — the underbrim material itself: a small emissive decal.
          // Kept well within the visor's real surface bounds — DecalGeometry
          // clips to real geometry before reaching the texture's soft
          // margin, so an oversized box produces a hard edge no texture
          // blur can soften. The glow cards below carry the broader visual
          // coverage; this decal only needs to tint the surface itself.
          const coreTex = makeUniformGlowTexture();
          const coreGeo = new DecalGeometry(capMesh, hit.point, dummy.rotation, new THREE.Vector3(0.16, 0.11, 0.06));
          // no normalMap/roughnessMap — the cap's fabric grain textures
          // produce a blotchy camo pattern over an emissive orange base
          const decalMat = new THREE.MeshStandardMaterial({
            map: coreTex,
            emissive: new THREE.Color(0xff7a20),
            emissiveMap: coreTex,
            emissiveIntensity: 0,
            color: 0xffa050,
            transparent: true,
            opacity: 0,
            depthTest: true,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -4,
            roughness: 0.85,
            envMapIntensity: 0.08,
            side: THREE.DoubleSide,
          });
          scene.add(new THREE.Mesh(coreGeo, decalMat));

          // C — environmental bounce: one light at the underbrim (broad
          // spill onto atmosphere/floor), a second pulled toward the
          // crown/visor seam for a selective warm reflection
          bounceLight.position.copy(hit.point).add(n.clone().multiplyScalar(0.12));
          rimLight.position.copy(hit.point.clone().lerp(target, 0.18)).add(new THREE.Vector3(0, 0.03, 0));

          init.decalMat = decalMat;
          // anchor for the "NEON ORANGE UNDERBRIM" callout leader line
          init.glowPoint = hit.point.clone();

          // ---- cinematic glow cards: visible soft orange halo ----
          // three transparent additive-blended planes producing bright core
          // → soft halo → atmospheric spill, offset into open air below the
          // brim so the glow reads as light escaping past its edge
          const glowLayers = [
            // Layer 1 — concentrated core
            { w: 0.85, h: 0.55, offset: 0.06, maxIntensity: 1.2 },
            // Layer 2 — soft halo: medium, moderate opacity
            { w: 1.7, h: 1.0, offset: 0.28, maxIntensity: 0.46 },
            // Layer 3 — atmospheric spill: large, very faint
            { w: 3.0, h: 1.8, offset: 0.55, maxIntensity: 0.12 },
          ];
          init.glowLayers = [];
          for (const layer of glowLayers) {
            const geo = new THREE.PlaneGeometry(layer.w, layer.h);
            const mat = createGlowShaderMaterial();
            const mesh = new THREE.Mesh(geo, mat);
            const pos = hit.point.clone().add(n.clone().multiplyScalar(layer.offset));
            mesh.position.copy(pos);
            mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), n.clone().normalize());
            scene.add(mesh);
            init.glowLayers.push({ mesh, mat, maxIntensity: layer.maxIntensity });
          }
        } else {
          console.warn('underbrim decal: no hit found, skipping glow');
        }

        // approximate anchor on the crown's side, for the "PREMIUM FABRIC" callout
        init.fabricPoint = new THREE.Vector3(
          box.min.x + (box.max.x - box.min.x) * 0.72,
          box.min.y + (box.max.y - box.min.y) * 0.62,
          box.min.z + (box.max.z - box.min.z) * 0.42
        );
      } catch (err) {
        console.error('cap model failed to load', err);
      }

      // ---- scroll-driven progress + velocity ----
      const progressRef = { current: 0 };
      const velocityRef = { current: 0 };
      const smoothedProgress = { current: 0 };

      trigger = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          velocityRef.current = self.getVelocity();
        },
      });

      gsapCtx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: container, start: 'top top', end: 'bottom bottom', scrub: 1 },
        });

        tl.fromTo(kickerRef.current, { opacity: 0 }, { opacity: 0.35, duration: 0.06 }, 0)
          .to(kickerRef.current, { opacity: 0, duration: 0.06 }, 0.16);

        tl.fromTo(titleRef.current, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.08, ease: 'power2.out' }, 0.02)
          .to(titleRef.current, { opacity: 0, filter: 'blur(14px)', duration: 0.1 }, 0.18);

        tl.fromTo(scrollHintRef.current, { opacity: 0 }, { opacity: 0.3, duration: 0.06 }, 0)
          .to(scrollHintRef.current, { opacity: 0, duration: 0.06 }, 0.1);

        tl.fromTo(
          '.neon-letter',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.01, stagger: 0.004, ease: 'power2.out' },
          0.75
        );

        // the NEON ORANGE / UNDERBRIM editorial block is driven directly in
        // renderScene() from computeState()'s typo curves, not GSAP — it
        // needs to disappear/reintroduce around the flash cut
      }, container);

      const mouseTarget = { x: 0, y: 0 };
      const mouseDamped = { x: 0, y: 0 };
      function onPointerMove(e) {
        mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseTarget.y = (e.clientY / window.innerHeight) * 2 - 1;
      }
      window.addEventListener('pointermove', onPointerMove);

      let visible = true;
      io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && rafId === null) rafId = requestAnimationFrame(loop);
      });
      io.observe(container);

      const spherical = new THREE.Spherical();

      function renderScene(state, time) {
        if (capMesh) {
          capMesh.material.opacity = state.object.opacity;
        }
        // gates the underbrim glow by camera angle — the model is a thin
        // single-sided shell with nothing to naturally occlude the decal,
        // so visibility has to be explicit
        const underbrimVisibility = smoothstep(90, 99, state.camera.polarDeg);

        // A + B: the underbrim decal, kept faint — just enough to tint the
        // surface. The shader-based glow cards below carry the visible glow.
        if (init.decalMat) {
          init.decalMat.opacity = state.material.orange * 0.05 * underbrimVisibility;
          init.decalMat.emissiveIntensity = (0.03 + state.material.emission * 0.08) * underbrimVisibility;
        }
        // C: environmental bounce — broad spill at the underbrim itself, and
        // a dimmer, separate catch on the crown/inner-brim seam
        if (bounceLight) {
          bounceLight.intensity = state.material.bounce * 0.66 * underbrimVisibility;
        }
        if (rimLight) {
          rimLight.intensity = state.material.bounce * 0.15 * underbrimVisibility;
        }
        bloomPass.strength = 0.08 + state.material.emission * 0.22 * underbrimVisibility;

        // cinematic glow cards — visible soft orange halo beneath the brim.
        // core reads mostly as the near-field flash, outer atmospheric
        // layer reads mostly as ambient bounce.
        if (init.glowLayers) {
          const m = state.material;
          const weights = [
            m.emission, // layer 0 — concentrated core
            m.emission * 0.6 + m.bounce * 0.4, // layer 1 — soft halo
            m.emission * 0.25 + m.bounce * 0.75, // layer 2 — atmospheric spill
          ];
          init.glowLayers.forEach((layer, i) => {
            layer.mat.uniforms.uIntensity.value =
              m.orange * weights[i] * layer.maxIntensity * underbrimVisibility;
          });
        }

        spherical.set(state.camera.radius, deg2rad(state.camera.polarDeg), deg2rad(state.camera.azimuthDeg));
        camera.position.setFromSpherical(spherical);
        camera.position.y += target.y;
        camera.lookAt(target.x, target.y + state.camera.elevation, target.z);
        camera.updateMatrixWorld();

        glCanvas.style.filter = state.lens.blur > 0.05 ? `blur(${state.lens.blur}px)` : 'none';

        graphiteRef.current.style.opacity = state.lighting.graphite;
        warmRef.current.style.opacity = state.material.bounce * 0.32;
        floorGlowRef.current.style.opacity = state.material.bounce * 0.19;
        vignetteRef.current.style.opacity = state.lens.vignette;
        grainRef.current.style.opacity = 0.035 + state.material.bounce * 0.04;
        flashRef.current.style.opacity = state.lens.flash;
        leakRef.current.style.opacity = state.lens.lightLeak;

        const t = state.typo;
        neonKickerRef.current.style.opacity = t.kicker;
        neonKickerRef.current.style.transform = `translateY(${(1 - t.kicker) * 8}px)`;
        underbrimTitleRef.current.style.opacity = t.title;
        underbrimTitleRef.current.style.transform = `translateY(${(1 - t.title) * 10}px)`;
        editorialMetaRef.current.style.opacity = t.meta;
        editorialMetaRef.current.style.transform = `translateY(${(1 - t.meta) * 6}px)`;
        annotationRef.current.style.opacity = t.annotation;

        // product callouts — real leader lines from the actual 3D surface
        // points to their labels, like a studio product-sheet annotation
        if (t.callouts > 0.01 && init.fabricPoint && init.glowPoint) {
          calloutsSvgRef.current.style.opacity = t.callouts;
          calloutTextFabricRef.current.style.opacity = t.callouts;
          calloutTextGlowRef.current.style.opacity = t.callouts;

          const pf = projectToScreen(init.fabricPoint, camera, cssW, cssH);
          const fx2 = pf.x - 150;
          const fy2 = pf.y - 55;
          calloutDotFabricRef.current.setAttribute('cx', pf.x);
          calloutDotFabricRef.current.setAttribute('cy', pf.y);
          calloutLineFabricRef.current.setAttribute('x1', pf.x);
          calloutLineFabricRef.current.setAttribute('y1', pf.y);
          calloutLineFabricRef.current.setAttribute('x2', fx2);
          calloutLineFabricRef.current.setAttribute('y2', fy2);
          calloutTextFabricRef.current.style.left = 'auto';
          calloutTextFabricRef.current.style.right = cssW - fx2 + 8 + 'px';
          calloutTextFabricRef.current.style.top = fy2 - 18 + 'px';

          const pg = projectToScreen(init.glowPoint, camera, cssW, cssH);
          const gx2 = pg.x + 160;
          const gy2 = pg.y + 45;
          calloutDotGlowRef.current.setAttribute('cx', pg.x);
          calloutDotGlowRef.current.setAttribute('cy', pg.y);
          calloutLineGlowRef.current.setAttribute('x1', pg.x);
          calloutLineGlowRef.current.setAttribute('y1', pg.y);
          calloutLineGlowRef.current.setAttribute('x2', gx2);
          calloutLineGlowRef.current.setAttribute('y2', gy2);
          calloutTextGlowRef.current.style.left = gx2 + 8 + 'px';
          calloutTextGlowRef.current.style.top = gy2 - 18 + 'px';
        } else {
          calloutsSvgRef.current.style.opacity = 0;
          calloutTextFabricRef.current.style.opacity = 0;
          calloutTextGlowRef.current.style.opacity = 0;
        }

        particlesCtx.clearRect(0, 0, cssW, cssH);
        if (state.material.bounce > 0.15) {
          const pcx = cssW / 2;
          const pcy = cssH * 0.5;
          particlesCtx.save();
          for (const p of particles) {
            const drift = Math.sin(time * 0.0003 * p.speed + p.seed) * p.amplitude;
            const orbit = time * 0.00005 * p.speed + p.seed;
            const px = pcx + Math.cos(orbit) * p.radius * 0.9 + drift;
            const py = pcy + Math.sin(orbit) * p.radius * 0.35 + Math.cos(time * 0.0002 + p.seed) * p.amplitude;
            const flicker = 0.5 + 0.5 * Math.sin(time * 0.002 * p.flicker + p.seed);
            const alpha = p.baseOpacity * state.material.bounce * flicker;
            if (alpha < 0.01) continue;
            particlesCtx.beginPath();
            particlesCtx.fillStyle = `rgba(255,${180 + state.material.bounce * 40},140,${alpha})`;
            particlesCtx.arc(px, py, p.size, 0, Math.PI * 2);
            particlesCtx.fill();
          }
          particlesCtx.restore();
        }

        composer.render();
      }

      function loop(time) {
        if (!visible) {
          rafId = null;
          return;
        }
        mouseDamped.x = lerp(mouseDamped.x, mouseTarget.x, 0.06);
        mouseDamped.y = lerp(mouseDamped.y, mouseTarget.y, 0.06);
        smoothedProgress.current = lerp(smoothedProgress.current, progressRef.current, 0.14);

        const velocityMag = clamp(Math.abs(velocityRef.current) / 3000, 0, 1);
        const velocitySign = Math.sign(velocityRef.current) || 1;
        const state = computeState(smoothedProgress.current, velocityMag, velocitySign, mouseDamped);

        renderScene(state, time);
        rafId = requestAnimationFrame(loop);
      }
      rafId = requestAnimationFrame(loop);

      init.cleanup = () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('pointermove', onPointerMove);
      };
    }

    init();

    return () => {
      disposed = true;
      if (init.cleanup) init.cleanup();
      if (io) io.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (trigger) trigger.kill();
      if (gsapCtx) gsapCtx.revert();
      if (composer) composer.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative" style={{ height: '500vh', background: '#050505' }}>
      <div ref={stageRef} className="sticky top-0 overflow-hidden" style={{ height: '100vh' }}>
        <canvas ref={glCanvasRef} className="absolute inset-0" />

        <div
          ref={graphiteRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0,
            background: 'radial-gradient(ellipse 60% 55% at 50% 45%, rgba(120,130,140,0.3), transparent 70%)',
          }}
        />
        <div
          ref={warmRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0,
            background: 'radial-gradient(ellipse 90% 85% at 50% 54%, rgba(255,110,30,0.4), transparent 75%)',
            mixBlendMode: 'screen',
          }}
        />
        {/* soft warm floor reflection — not a neon platform, just light
            touching a dark studio floor beneath the underbrim */}
        <div
          ref={floorGlowRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0,
            background: 'radial-gradient(ellipse 34% 10% at 50% 82%, rgba(255,120,40,0.6), transparent 78%)',
            mixBlendMode: 'screen',
          }}
        />

        <canvas ref={particlesCanvasRef} className="absolute inset-0" style={{ pointerEvents: 'none' }} />

        <div
          ref={leakRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0,
            background: 'linear-gradient(115deg, transparent 40%, rgba(255,200,150,0.25) 50%, transparent 60%)',
          }}
        />
        <div
          ref={vignetteRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.88,
            background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.95) 100%)',
          }}
        />
        <div
          ref={grainRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.035,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '300px',
          }}
        />
        <div
          ref={flashRef}
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: 0, background: 'radial-gradient(circle at 50% 55%, #ffb066, #170700 75%)' }}
        />

        {/* Typography */}
        <div
          ref={kickerRef}
          className="absolute top-10 left-1/2 -translate-x-1/2"
          style={{
            opacity: 0,
            fontFamily: 'var(--font-stalinist), sans-serif',
            fontSize: '10px',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          SS 2026 · Limited Edition
        </div>

        <div ref={titleRef} className="absolute inset-0 flex items-center justify-center" style={{ opacity: 0 }}>
          <h1
            style={{
              fontFamily: 'var(--font-stalinist), sans-serif',
              fontSize: 'clamp(48px, 7vw, 88px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              color: 'rgba(255,255,255,0.92)',
              textAlign: 'center',
              userSelect: 'none',
            }}
          >
            THE{' '}
            <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>CAP</em>
          </h1>
        </div>

        <div
          ref={scrollHintRef}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: 0 }}
        >
          <p style={{ fontFamily: 'var(--font-stalinist), sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
            Scroll to reveal
          </p>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }} />
        </div>

        <div className="absolute pointer-events-none" style={{ left: '35%', top: '46%' }}>
          <ArcText text="NEON ORANGE" />
        </div>

        {/* editorial composition — lives beside the product in negative
            space, not stacked underneath it; three tiers: small kicker,
            large upright editorial serif title, tiny metadata */}
        <div
          className="absolute pointer-events-none"
          style={{ top: '12%', left: '7%', maxWidth: '46vw' }}
        >
          <p
            ref={neonKickerRef}
            style={{
              opacity: 0,
              fontFamily: 'var(--font-stalinist), sans-serif',
              fontSize: '11px',
              letterSpacing: '0.42em',
              textTransform: 'uppercase',
              color: 'rgba(255,150,80,0.85)',
              marginBottom: '14px',
            }}
          >
            NEON ORANGE
          </p>
          <h2
            ref={underbrimTitleRef}
            style={{
              opacity: 0,
              fontFamily: 'var(--font-stalinist), sans-serif',
              fontWeight: 500,
              fontSize: 'clamp(34px, 4.4vw, 58px)',
              letterSpacing: '-0.01em',
              lineHeight: 0.98,
              color: 'rgba(255,255,255,0.94)',
              margin: 0,
            }}
          >
            Underbrim
          </h2>
          <div
            ref={editorialMetaRef}
            style={{ opacity: 0, marginTop: '18px' }}
          >
            <div style={{ width: '26px', height: '1px', background: 'rgba(255,150,70,0.5)', marginBottom: '10px' }} />
            <p style={{ fontFamily: 'var(--font-stalinist), sans-serif', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
              Limited Run / 001
            </p>
          </div>
        </div>

        {/* tiny editorial annotation — numbered, restrained, a closing
            detail rather than an infographic */}
        <div
          ref={annotationRef}
          className="absolute pointer-events-none flex flex-col gap-2"
          style={{ opacity: 0, bottom: '9%', left: '7%' }}
        >
          {[
            ['01', 'Handcrafted'],
            ['02', 'Premium Fabric'],
            ['03', 'Limited to 50'],
          ].map(([n, label]) => (
            <div key={n} className="flex items-baseline gap-3">
              <span
                style={{
                  fontFamily: 'var(--font-stalinist), sans-serif',
                  fontSize: '9px',
                  letterSpacing: '0.1em',
                  color: 'rgba(255,150,80,0.75)',
                }}
              >
                {n}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-stalinist), sans-serif',
                  fontSize: '9px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* product callouts — leader lines projected each frame from the
            underbrim glow's and the crown fabric's real 3D positions, only
            shown once the camera has settled into the final resting shot */}
        <svg ref={calloutsSvgRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0, width: '100%', height: '100%' }}>
          <line ref={calloutLineFabricRef} stroke="rgba(255,150,80,0.45)" strokeWidth="1" />
          <circle ref={calloutDotFabricRef} r="2.5" fill="rgba(255,150,80,0.85)" />
          <line ref={calloutLineGlowRef} stroke="rgba(255,150,80,0.45)" strokeWidth="1" />
          <circle ref={calloutDotGlowRef} r="2.5" fill="rgba(255,150,80,0.85)" />
        </svg>
        <div
          ref={calloutTextFabricRef}
          className="absolute pointer-events-none"
          style={{ opacity: 0, fontFamily: 'var(--font-stalinist), sans-serif', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'right', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, whiteSpace: 'nowrap' }}
        >
          Premium Fabric<br />
          <span style={{ color: 'rgba(255,255,255,0.32)' }}>Structured Fit</span>
        </div>
        <div
          ref={calloutTextGlowRef}
          className="absolute pointer-events-none"
          style={{ opacity: 0, fontFamily: 'var(--font-stalinist), sans-serif', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, whiteSpace: 'nowrap' }}
        >
          <span style={{ fontSize: '15px', fontStyle: 'normal', fontWeight: 500, letterSpacing: '0.12em', color: 'rgba(255,140,50,0.95)' }}>NEON ORANGE</span><br />
          UNDERBRIM
        </div>

        <div
          className="absolute bottom-1 right-2 pointer-events-none"
          style={{ fontFamily: 'var(--font-stalinist), sans-serif', fontSize: '8px', letterSpacing: '0.02em', color: 'rgba(255,255,255,0.18)' }}
        >
          &ldquo;Baseball Cap&rdquo; by jomalon (Sketchfab), CC BY 4.0
        </div>
      </div>
    </section>
  );
}
