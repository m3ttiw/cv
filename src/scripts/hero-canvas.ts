export type HeroCanvasHandle = {
  start: () => void;
  stop: () => void;
  drawStatic: () => void;
  destroy: () => void;
};

type MeshNode = {
  x: number;
  y: number;
  ox: number;
  oy: number;
  phase: number;
  tint: number;
};

const CHEER = [
  [255, 122, 89],
  [64, 176, 232],
  [255, 196, 72],
  [72, 201, 164],
] as const;

const pointer = { x: 0, y: 0, active: false };

export const createHeroCanvas = (
  canvas: HTMLCanvasElement,
  host: HTMLElement | null = canvas.parentElement,
): HeroCanvasHandle => {
  const ctx = canvas.getContext('2d', { alpha: true });
  let nodes: MeshNode[] = [];
  let cols = 0;
  let rows = 0;
  let width = 0;
  let height = 0;
  let frame = 0;
  let running = false;
  let destroyed = false;

  const mix = (a: readonly number[], b: readonly number[], t: number): string => {
    const r = Math.round(a[0] + (b[0] - a[0]) * t);
    const g = Math.round(a[1] + (b[1] - a[1]) * t);
    const bl = Math.round(a[2] + (b[2] - a[2]) * t);
    return `${r}, ${g}, ${bl}`;
  };

  const colorFor = (node: MeshNode, alpha: number): string => {
    const slot = node.tint * (CHEER.length - 1);
    const i = Math.min(CHEER.length - 2, Math.floor(slot));
    const t = slot - i;
    return `rgba(${mix(CHEER[i], CHEER[i + 1], t)}, ${alpha})`;
  };

  const layout = (): void => {
    if (!host) return;
    const rect = host.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

    const gap = width < 700 ? 42 : 48;
    cols = Math.max(8, Math.ceil(width / gap) + 1);
    rows = Math.max(6, Math.ceil(height / gap) + 1);
    const stepX = width / (cols - 1);
    const stepY = height / (rows - 1);
    nodes = [];
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        nodes.push({
          x: col * stepX,
          y: row * stepY,
          ox: col * stepX,
          oy: row * stepY,
          phase: (col * 0.47 + row * 0.31) % (Math.PI * 2),
          tint: (col / Math.max(1, cols - 1) + row / Math.max(1, rows - 1)) * 0.5,
        });
      }
    }
  };

  const stepNodes = (time: number, withPointer: boolean): void => {
    const radius = Math.max(140, Math.min(width, height) * 0.28);
    const radiusSq = radius * radius;

    for (const node of nodes) {
      const driftX = Math.sin(time * 0.0007 + node.phase) * 11;
      const driftY = Math.cos(time * 0.0009 + node.phase * 1.25) * 9;
      let tx = node.ox + driftX;
      let ty = node.oy + driftY;

      if (withPointer && pointer.active) {
        const dx = pointer.x - node.ox;
        const dy = pointer.y - node.oy;
        const distSq = dx * dx + dy * dy;
        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq) || 1;
          const pull = (1 - dist / radius) ** 2 * 36;
          tx += (dx / dist) * pull;
          ty += (dy / dist) * pull;
        }
      }

      node.x += (tx - node.x) * 0.14;
      node.y += (ty - node.y) * 0.14;
    }
  };

  const draw = (): void => {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    ctx.lineWidth = 1;
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const node = nodes[row * cols + col];
        if (!node) continue;
        const right = col + 1 < cols ? nodes[row * cols + col + 1] : undefined;
        const down = row + 1 < rows ? nodes[(row + 1) * cols + col] : undefined;

        if (right) {
          ctx.strokeStyle = colorFor(node, 0.22);
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(right.x, right.y);
          ctx.stroke();
        }
        if (down) {
          ctx.strokeStyle = colorFor(node, 0.18);
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(down.x, down.y);
          ctx.stroke();
        }
      }
    }

    for (const node of nodes) {
      const lift = Math.min(1, Math.hypot(node.x - node.ox, node.y - node.oy) / 28);
      ctx.fillStyle = colorFor(node, 0.55 + lift * 0.35);
      ctx.beginPath();
      ctx.arc(node.x, node.y, 2.1 + lift * 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const loop = (time: number): void => {
    if (!running || destroyed) return;
    stepNodes(time, true);
    draw();
    frame = window.requestAnimationFrame(loop);
  };

  const onPointerMove = (event: PointerEvent): void => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    pointer.active = true;
  };

  const onPointerLeave = (): void => {
    pointer.active = false;
  };

  const onResize = (): void => {
    layout();
    if (!running) {
      stepNodes(0, false);
      draw();
    }
  };

  layout();
  host?.addEventListener('pointermove', onPointerMove, { passive: true });
  host?.addEventListener('pointerdown', onPointerMove, { passive: true });
  host?.addEventListener('pointerleave', onPointerLeave);
  window.addEventListener('resize', onResize);

  return {
    start: () => {
      if (destroyed || running) return;
      layout();
      running = true;
      frame = window.requestAnimationFrame(loop);
    },
    stop: () => {
      running = false;
      window.cancelAnimationFrame(frame);
    },
    drawStatic: () => {
      running = false;
      window.cancelAnimationFrame(frame);
      layout();
      for (const node of nodes) {
        node.x = node.ox;
        node.y = node.oy;
      }
      draw();
    },
    destroy: () => {
      destroyed = true;
      running = false;
      window.cancelAnimationFrame(frame);
      host?.removeEventListener('pointermove', onPointerMove);
      host?.removeEventListener('pointerdown', onPointerMove);
      host?.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', onResize);
    },
  };
};
