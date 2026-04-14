import * as THREE from "./vendor/three.module.min.js";

const canvas = document.querySelector("#hero-3d");
const hero = document.querySelector(".hero");

if (canvas && hero) {
  try {
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 80);
    const boardGroup = new THREE.Group();
    const pulses = [];
    const rings = [];
    const mouse = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();

    renderer.setClearColor(0x050608, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    if ("outputColorSpace" in renderer) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }

    scene.add(boardGroup);

    const ambient = new THREE.AmbientLight(0xbfd8ff, 1.25);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0x7fb4ff, 2.8);
    keyLight.position.set(-3.5, 5.4, 4.5);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x67d9ff, 45, 16);
    rimLight.position.set(3.8, 2.4, 2.2);
    scene.add(rimLight);

    const boardMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0b2a4d,
      metalness: 0.18,
      roughness: 0.46,
      transparent: true,
      opacity: 0.78,
      clearcoat: 0.9,
      clearcoatRoughness: 0.18,
      side: THREE.DoubleSide,
    });

    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x071827,
      metalness: 0.28,
      roughness: 0.5,
      transparent: true,
      opacity: 0.7,
    });

    const edgeMaterial = new THREE.MeshBasicMaterial({
      color: 0x67d9ff,
      transparent: true,
      opacity: 0.35,
    });

    const traceMaterials = [
      new THREE.MeshBasicMaterial({ color: 0x87e5ff }),
      new THREE.MeshBasicMaterial({ color: 0x74a9ff }),
      new THREE.MeshBasicMaterial({ color: 0xa7f3a0 }),
      new THREE.MeshBasicMaterial({ color: 0xffca5f }),
    ];

    const pulseMaterials = [
      new THREE.MeshBasicMaterial({ color: 0x67d9ff }),
      new THREE.MeshBasicMaterial({ color: 0x5f9cff }),
      new THREE.MeshBasicMaterial({ color: 0x8fe388 }),
      new THREE.MeshBasicMaterial({ color: 0xf4b84a }),
    ];

    const chipMaterial = new THREE.MeshStandardMaterial({
      color: 0x10151d,
      metalness: 0.36,
      roughness: 0.36,
    });

    const pinMaterial = new THREE.MeshStandardMaterial({
      color: 0xcbd7e9,
      metalness: 0.7,
      roughness: 0.23,
    });

    const padMaterial = new THREE.MeshStandardMaterial({
      color: 0xd9ae50,
      metalness: 0.9,
      roughness: 0.2,
    });

    for (let layer = 0; layer < 7; layer += 1) {
      const board = new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.045, 4.55), layer % 2 ? coreMaterial : boardMaterial);
      board.position.y = layer * 0.11;
      board.position.x = layer * 0.015;
      board.position.z = layer * -0.012;
      boardGroup.add(board);

      const edge = new THREE.Mesh(new THREE.BoxGeometry(7.48, 0.01, 4.62), edgeMaterial);
      edge.position.copy(board.position);
      edge.position.y += 0.028;
      boardGroup.add(edge);
    }

    const topY = 0.82;

    const tracePaths = [
      [
        [-3.0, -1.45],
        [-1.85, -1.45],
        [-1.28, -0.54],
        [-0.22, -0.54],
        [0.34, 0.64],
        [2.8, 0.64],
      ],
      [
        [-3.18, 1.28],
        [-1.7, 1.28],
        [-1.22, 0.5],
        [0.96, 0.5],
        [1.52, -1.22],
        [3.16, -1.22],
      ],
      [
        [-2.58, 0.05],
        [-0.92, 0.05],
        [-0.22, 1.42],
        [1.14, 1.42],
        [1.82, 0.08],
        [2.95, 0.08],
      ],
      [
        [-2.92, -0.34],
        [-2.14, -0.34],
        [-1.76, -1.02],
        [0.78, -1.02],
        [1.42, 1.18],
        [2.52, 1.18],
      ],
    ];

    tracePaths.forEach((path, index) => {
      const points = path.map(([x, z]) => new THREE.Vector3(x, topY, z));
      const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.2);
      const trace = new THREE.Mesh(new THREE.TubeGeometry(curve, 96, 0.04, 12, false), traceMaterials[index]);
      boardGroup.add(trace);

      const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.085, 18, 18), pulseMaterials[index]);
      pulse.userData = {
        curve,
        speed: 0.16 + index * 0.035,
        offset: index * 0.18,
      };
      pulses.push(pulse);
      boardGroup.add(pulse);
    });

    const addChip = (x, z, width, depth, height, rotation = 0) => {
      const chip = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), chipMaterial);
      chip.position.set(x, topY + height / 2 + 0.025, z);
      chip.rotation.y = rotation;
      boardGroup.add(chip);

      const pinCount = Math.max(5, Math.round(width * 6));
      for (let side = -1; side <= 1; side += 2) {
        for (let i = 0; i < pinCount; i += 1) {
          const pin = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.035, 0.18), pinMaterial);
          const offset = -width / 2 + 0.14 + i * ((width - 0.28) / Math.max(pinCount - 1, 1));
          pin.position.set(x + offset, topY + 0.055, z + side * (depth / 2 + 0.14));
          pin.rotation.y = rotation;
          boardGroup.add(pin);
        }
      }
    };

    addChip(-0.48, 0.02, 1.18, 0.92, 0.22, 0.08);
    addChip(1.88, -0.72, 0.92, 0.68, 0.18, -0.18);
    addChip(-2.35, 0.9, 0.7, 0.55, 0.16, 0.2);

    const addAnalysisRing = (x, z, radius, color, delay) => {
      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.46,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.012, 10, 96), material);
      ring.position.set(x, topY + 0.18, z);
      ring.rotation.x = Math.PI / 2;
      ring.userData = { delay, baseRadius: radius };
      rings.push(ring);
      boardGroup.add(ring);
    };

    addAnalysisRing(-0.48, 0.02, 0.9, 0x67d9ff, 0);
    addAnalysisRing(1.88, -0.72, 0.68, 0x5f9cff, 0.8);
    addAnalysisRing(-2.35, 0.9, 0.52, 0xf4b84a, 1.35);

    const padPositions = [
      [-3.0, -1.45],
      [2.8, 0.64],
      [-3.18, 1.28],
      [3.16, -1.22],
      [-2.58, 0.05],
      [2.95, 0.08],
      [-2.92, -0.34],
      [2.52, 1.18],
    ];

    padPositions.forEach(([x, z], index) => {
      const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.035, 32), padMaterial);
      pad.position.set(x, topY + 0.035, z);
      pad.userData.floatOffset = index * 0.35;
      boardGroup.add(pad);
    });

    const viaMaterial = new THREE.MeshBasicMaterial({
      color: 0x67d9ff,
      transparent: true,
      opacity: 0.48,
    });

    for (let i = 0; i < 74; i += 1) {
      const via = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.075, 16), viaMaterial);
      via.position.set((Math.random() - 0.5) * 6.8, topY + 0.045, (Math.random() - 0.5) * 4.0);
      boardGroup.add(via);
    }

    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 1] = Math.random() * 5 - 1.6;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0x67d9ff,
        size: 0.028,
        transparent: true,
        opacity: 0.55,
      })
    );
    scene.add(particles);

    const resize = () => {
      const width = Math.max(hero.clientWidth, 1);
      const height = Math.max(hero.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.set(width < 760 ? 0.9 : 1.8, width < 760 ? 5.1 : 5.6, width < 760 ? 8.4 : 7.1);
      camera.lookAt(width < 760 ? 0.6 : 1.0, 0.25, 0);
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event) => {
      const rect = hero.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener("resize", resize);
    hero.addEventListener("pointermove", onPointerMove);
    resize();

    boardGroup.position.set(2.05, -0.18, -0.55);
    boardGroup.scale.setScalar(1.12);
    boardGroup.rotation.x = 0.16;
    boardGroup.rotation.y = -0.38;
    boardGroup.rotation.z = 0.06;

    document.body.classList.add("three-ready");

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      boardGroup.rotation.x = 0.16 + mouse.y * 0.055 + Math.sin(elapsed * 0.72) * 0.028;
      boardGroup.rotation.y = -0.38 + mouse.x * 0.12 + Math.sin(elapsed * 0.42) * 0.04;
      boardGroup.position.y = -0.18 + Math.sin(elapsed * 0.9) * 0.06;

      pulses.forEach((pulse) => {
        const progress = (elapsed * pulse.userData.speed + pulse.userData.offset) % 1;
        pulse.position.copy(pulse.userData.curve.getPointAt(progress));
        pulse.scale.setScalar(1 + Math.sin(elapsed * 8 + progress * 10) * 0.12);
      });

      rings.forEach((ring) => {
        const wave = (Math.sin(elapsed * 1.7 + ring.userData.delay) + 1) / 2;
        ring.scale.setScalar(1 + wave * 0.24);
        ring.material.opacity = 0.24 + wave * 0.34;
      });

      particles.rotation.y = elapsed * 0.025;
      particles.rotation.x = Math.sin(elapsed * 0.18) * 0.04;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();
  } catch (error) {
    hero.classList.add("hero-3d-error");
  }
}
