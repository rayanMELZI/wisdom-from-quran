/* Aurora Field — interactive WebGL shader background.
 * Volumetric, domain-warped fbm "smoke" over a deep cool-navy base,
 * lit with a cyan-teal aurora and a fine gold rim.
 *
 * Interactions:
 *   - mouse position warps the flow and lifts a soft cursor light
 *   - click sends an expanding ripple of light (up to 8 concurrent)
 *   - idle auto-drift keeps it breathing when the pointer is still
 *
 * Usage:  AuroraField.mount(canvasEl, { ...config })
 * Live config:  field.set({ intensity: 0.6, palette: 'cool' })
 */
(function () {
  const PALETTES = {
    // base (deep bg)      low light          high light         gold accent
    cool: {
      base: [0.016, 0.055, 0.105],
      lo:   [0.055, 0.215, 0.345],
      hi:   [0.330, 0.720, 0.910],
      gold: [0.870, 0.760, 0.560],
    },
    midnight: {
      base: [0.020, 0.045, 0.092],
      lo:   [0.105, 0.180, 0.420],
      hi:   [0.400, 0.540, 0.960],
      gold: [0.910, 0.800, 0.600],
    },
    teal: {
      base: [0.010, 0.062, 0.080],
      lo:   [0.030, 0.255, 0.285],
      hi:   [0.270, 0.800, 0.770],
      gold: [0.850, 0.780, 0.560],
    },
  };

  const VERT = `
    attribute vec2 a_pos;
    void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
  `;

  const FRAG = `
    precision highp float;

    uniform vec2  u_res;
    uniform float u_time;
    uniform vec2  u_mouse;      // 0..1, y up
    uniform float u_mouseOn;    // 0/1 smoothed presence
    uniform float u_intensity;  // motion/brightness multiplier
    uniform float u_glow;       // cursor light strength
    uniform float u_goldMix;    // amount of gold accent
    uniform vec3  u_base;
    uniform vec3  u_lo;
    uniform vec3  u_hi;
    uniform vec3  u_gold;
    uniform vec4  u_ripples[8]; // xy = pos(0..1), z = age(s), w = active

    // -- hash / value noise --
    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      float a = hash(i + vec2(0.0, 0.0));
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    }
    float fbm(vec2 p) {
      float v = 0.0;
      float amp = 0.55;
      mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
      for (int i = 0; i < 6; i++) {
        v += amp * noise(p);
        p = rot * p * 2.02 + 11.5;
        amp *= 0.52;
      }
      return v;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_res;
      float aspect = u_res.x / u_res.y;
      vec2 p = uv;
      p.x *= aspect;

      vec2 m = u_mouse;
      m.x *= aspect;

      float t = u_time * 0.045 * (0.5 + u_intensity);

      // pointer pulls the flow field toward it (gentle gravity on the smoke)
      vec2 toM = m - p;
      float md = length(toM);
      vec2 pull = toM * exp(-md * 2.3) * 0.22 * u_mouseOn;

      // domain warp -> smoky aurora
      vec2 q = p * 1.6 + pull;
      vec2 warp1 = vec2(
        fbm(q + vec2(0.0, t)),
        fbm(q + vec2(5.2, -t * 0.8) + 1.7)
      );
      vec2 warp2 = vec2(
        fbm(q * 1.3 + warp1 * 1.4 + vec2(t * 0.6, 0.0)),
        fbm(q * 1.3 + warp1 * 1.4 + vec2(0.0, -t * 0.5) + 3.3)
      );
      float density = fbm(q + warp2 * 1.9 + vec2(0.0, t * 0.4));

      // vertical aurora gradient + curtain banding
      float curtain = 0.5 + 0.5 * sin((uv.y * 3.0 + warp2.x * 2.2 - t * 2.0) * 1.7);
      density = mix(density, density * (0.78 + 0.5 * curtain), 0.5);
      density = clamp(density * 1.45, 0.0, 1.0);
      density = pow(density, 0.82);

      // ripples from clicks
      float ripGlow = 0.0;
      for (int i = 0; i < 8; i++) {
        vec4 r = u_ripples[i];
        if (r.w < 0.5) continue;
        vec2 rp = r.xy; rp.x *= aspect;
        float d = length(p - rp);
        float age = r.z;
        float radius = age * 0.55;
        float ring = exp(-pow((d - radius) * 9.0, 2.0));
        float life = exp(-age * 1.6);
        ripGlow += ring * life * 1.4;
      }
      density += ripGlow * 0.6;

      // base color ramp
      vec3 col = u_base;
      col = mix(col, u_lo, smoothstep(0.02, 0.42, density));
      col = mix(col, u_hi, smoothstep(0.32, 0.92, density) * (0.85 + 0.4 * u_intensity));

      // gold rim where the smoke thins into the dark
      float rim = smoothstep(0.28, 0.52, density) * (1.0 - smoothstep(0.52, 0.78, density));
      col += u_gold * rim * u_goldMix * 0.5;

      // cursor light bloom (kept subtle)
      float bloom = exp(-md * md * 10.0) * u_glow * u_mouseOn;
      col += mix(u_hi, u_gold, 0.30) * bloom * (0.3 + 0.35 * density);

      // ripple light tint
      col += mix(u_hi, u_gold, 0.2) * ripGlow * 0.5;

      // subtle vignette for depth
      float vig = smoothstep(1.35, 0.2, length((uv - 0.5) * vec2(aspect, 1.0)));
      col *= 0.86 + 0.14 * vig;

      // faint grain to kill banding
      float g = (hash(gl_FragCoord.xy + u_time) - 0.5) * 0.025;
      col += g;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function compile(gl, type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(s) || 'shader compile failed');
    }
    return s;
  }

  function mount(canvas, opts) {
    opts = opts || {};
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false, preserveDrawingBuffer: true });
    if (!gl) { console.warn('[aurora] WebGL unavailable'); return null; }

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(prog) || 'link failed');
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = {};
    ['u_res','u_time','u_mouse','u_mouseOn','u_intensity','u_glow','u_goldMix',
     'u_base','u_lo','u_hi','u_gold','u_ripples'].forEach(n => U[n] = gl.getUniformLocation(prog, n));

    const cfg = {
      intensity: opts.intensity != null ? opts.intensity : 0.5,
      glow: opts.glow != null ? opts.glow : 0.4,
      goldMix: opts.goldMix != null ? opts.goldMix : 0.8,
      palette: opts.palette || 'cool',
    };

    const state = {
      mouse: [0.5, 0.55],
      target: [0.5, 0.55],
      mouseOn: 0,
      mouseTargetOn: 0,
      ripples: [], // {x,y,t0}
      raf: 0,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    };

    function resize() {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.max(1, Math.floor(w * state.dpr));
      canvas.height = Math.max(1, Math.floor(h * state.dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    window.addEventListener('resize', resize);
    resize();

    // pointer
    function toUV(e) {
      const r = canvas.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = 1 - (e.clientY - r.top) / r.height;
      return [Math.min(1, Math.max(0, x)), Math.min(1, Math.max(0, y))];
    }
    window.addEventListener('pointermove', (e) => {
      state.target = toUV(e);
      state.mouseTargetOn = 1;
    }, { passive: true });
    window.addEventListener('pointerdown', (e) => {
      const uv = toUV(e);
      state.ripples.push({ x: uv[0], y: uv[1], t0: performance.now() / 1000 });
      if (state.ripples.length > 8) state.ripples.shift();
      state.target = uv;
      state.mouseTargetOn = 1;
    }, { passive: true });
    window.addEventListener('pointerleave', () => { state.mouseTargetOn = 0; });
    document.addEventListener('mouseleave', () => { state.mouseTargetOn = 0; });

    const start = performance.now();
    const rip = new Float32Array(8 * 4);

    function frame() {
      const now = performance.now();
      const time = (now - start) / 1000;

      // ease pointer + presence
      state.mouse[0] += (state.target[0] - state.mouse[0]) * 0.06;
      state.mouse[1] += (state.target[1] - state.mouse[1]) * 0.06;
      state.mouseOn += (state.mouseTargetOn - state.mouseOn) * 0.04;

      // idle drift — when pointer absent, slowly orbit a point
      if (state.mouseTargetOn < 0.5) {
        const dx = 0.5 + 0.22 * Math.cos(time * 0.13);
        const dy = 0.5 + 0.18 * Math.sin(time * 0.17);
        state.target[0] += (dx - state.target[0]) * 0.01;
        state.target[1] += (dy - state.target[1]) * 0.01;
      }

      // pack ripples
      rip.fill(0);
      let n = 0;
      for (let i = 0; i < state.ripples.length; i++) {
        const r = state.ripples[i];
        const age = time - (r.t0 - start / 1000) - (start / 1000); // align to time base
        const a = (now / 1000) - r.t0;
        if (a > 3.2) continue;
        rip[n * 4 + 0] = r.x;
        rip[n * 4 + 1] = r.y;
        rip[n * 4 + 2] = a;
        rip[n * 4 + 3] = 1;
        n++;
      }
      // prune old
      state.ripples = state.ripples.filter(r => (now / 1000) - r.t0 <= 3.2);

      const pal = PALETTES[cfg.palette] || PALETTES.cool;
      gl.uniform2f(U.u_res, canvas.width, canvas.height);
      gl.uniform1f(U.u_time, time);
      gl.uniform2f(U.u_mouse, state.mouse[0], state.mouse[1]);
      gl.uniform1f(U.u_mouseOn, state.mouseOn);
      gl.uniform1f(U.u_intensity, cfg.intensity);
      gl.uniform1f(U.u_glow, cfg.glow);
      gl.uniform1f(U.u_goldMix, cfg.goldMix);
      gl.uniform3fv(U.u_base, pal.base);
      gl.uniform3fv(U.u_lo, pal.lo);
      gl.uniform3fv(U.u_hi, pal.hi);
      gl.uniform3fv(U.u_gold, pal.gold);
      gl.uniform4fv(U.u_ripples, rip);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      state.raf = requestAnimationFrame(frame);
    }
    state.raf = requestAnimationFrame(frame);

    return {
      set(next) { Object.assign(cfg, next || {}); },
      get() { return Object.assign({}, cfg); },
      palettes: Object.keys(PALETTES),
      destroy() {
        cancelAnimationFrame(state.raf);
        window.removeEventListener('resize', resize);
      },
    };
  }

  window.AuroraField = { mount, PALETTES };
})();
