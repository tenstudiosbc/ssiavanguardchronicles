(function () {
  "use strict";

  const MAP_CONFIG = {
    minScale: 0.65,
    maxScale: 4,
    initialScale: 1.25,
    zoomStep: 0.22,
    doubleTapZoomStep: 0.55,
    imageUrl: "https://i.ibb.co.com/xt3SZt20/Untitled2-20250918125156.png"
  };

  const state = {
    viewport: null,
    stage: null,
    image: null,
    zoomLabel: null,
    scale: MAP_CONFIG.initialScale,
    x: 0,
    y: 0,
    isDragging: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    touches: new Map(),
    pinchStartDistance: 0,
    pinchStartScale: MAP_CONFIG.initialScale,
    pinchCenter: { x: 0, y: 0 },
    lastTap: 0
  };

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function getViewportRect() {
    return state.viewport.getBoundingClientRect();
  }

  function updateZoomLabel() {
    if (!state.zoomLabel) return;
    state.zoomLabel.textContent = `ZOOM ${Math.round(state.scale * 100)}%`;
  }

  function applyTransform() {
    if (!state.stage) return;
    state.stage.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) scale(${state.scale})`;
    updateZoomLabel();
  }

  function centerMap(scale) {
    const rect = getViewportRect();
    const imageWidth = state.image ? state.image.offsetWidth : rect.width;
    const imageHeight = state.image ? state.image.offsetHeight : rect.height;

    state.scale = clamp(scale || MAP_CONFIG.initialScale, MAP_CONFIG.minScale, MAP_CONFIG.maxScale);
    state.x = (rect.width - imageWidth * state.scale) / 2;
    state.y = (rect.height - imageHeight * state.scale) / 2;
    applyTransform();
  }

  function zoomAt(clientX, clientY, nextScale) {
    const rect = getViewportRect();
    const oldScale = state.scale;
    const newScale = clamp(nextScale, MAP_CONFIG.minScale, MAP_CONFIG.maxScale);

    if (Math.abs(newScale - oldScale) < 0.001) return;

    const pointX = clientX - rect.left;
    const pointY = clientY - rect.top;
    const worldX = (pointX - state.x) / oldScale;
    const worldY = (pointY - state.y) / oldScale;

    state.scale = newScale;
    state.x = pointX - worldX * newScale;
    state.y = pointY - worldY * newScale;
    applyTransform();
  }

  function zoomBy(delta) {
    const rect = getViewportRect();
    zoomAt(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
      state.scale + delta
    );
  }

  function getDistance(a, b) {
    const dx = a.clientX - b.clientX;
    const dy = a.clientY - b.clientY;
    return Math.hypot(dx, dy);
  }

  function getCenter(a, b) {
    return {
      clientX: (a.clientX + b.clientX) / 2,
      clientY: (a.clientY + b.clientY) / 2
    };
  }

  function onWheel(event) {
    event.preventDefault();
    const zoomDirection = event.deltaY < 0 ? 1 : -1;
    const scaleDelta = zoomDirection * MAP_CONFIG.zoomStep;
    zoomAt(event.clientX, event.clientY, state.scale + scaleDelta);
  }

  function onPointerDown(event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    state.viewport.setPointerCapture(event.pointerId);
    state.touches.set(event.pointerId, event);

    if (state.touches.size === 2) {
      const points = Array.from(state.touches.values());
      state.pinchStartDistance = getDistance(points[0], points[1]);
      state.pinchStartScale = state.scale;
      state.pinchCenter = getCenter(points[0], points[1]);
      state.isDragging = false;
      state.viewport.classList.remove("is-dragging");
      return;
    }

    state.isDragging = true;
    state.pointerId = event.pointerId;
    state.startX = event.clientX;
    state.startY = event.clientY;
    state.originX = state.x;
    state.originY = state.y;
    state.viewport.classList.add("is-dragging");
  }

  function onPointerMove(event) {
    if (state.touches.has(event.pointerId)) {
      state.touches.set(event.pointerId, event);
    }

    if (state.touches.size === 2) {
      event.preventDefault();
      const points = Array.from(state.touches.values());
      const currentDistance = getDistance(points[0], points[1]);
      const center = getCenter(points[0], points[1]);

      if (state.pinchStartDistance > 0) {
        const scaleFactor = currentDistance / state.pinchStartDistance;
        zoomAt(center.clientX, center.clientY, state.pinchStartScale * scaleFactor);
      }
      return;
    }

    if (!state.isDragging || state.pointerId !== event.pointerId) return;

    event.preventDefault();
    state.x = state.originX + (event.clientX - state.startX);
    state.y = state.originY + (event.clientY - state.startY);
    applyTransform();
  }

  function onPointerUp(event) {
    state.touches.delete(event.pointerId);

    if (state.pointerId === event.pointerId) {
      state.isDragging = false;
      state.pointerId = null;
      state.viewport.classList.remove("is-dragging");
    }

    if (state.touches.size < 2) {
      state.pinchStartDistance = 0;
    }
  }

  function onDoubleClick(event) {
    event.preventDefault();
    zoomAt(event.clientX, event.clientY, state.scale + MAP_CONFIG.doubleTapZoomStep);
  }

  function onTouchTap(event) {
    const now = Date.now();
    if (now - state.lastTap < 280) {
      const touch = event.changedTouches && event.changedTouches[0];
      if (touch) {
        event.preventDefault();
        zoomAt(touch.clientX, touch.clientY, state.scale + MAP_CONFIG.doubleTapZoomStep);
      }
    }
    state.lastTap = now;
  }

  function onKeyDown(event) {
    const panStep = event.shiftKey ? 80 : 40;
    let used = true;

    switch (event.key) {
      case "+":
      case "=":
        zoomBy(MAP_CONFIG.zoomStep);
        break;
      case "-":
      case "_":
        zoomBy(-MAP_CONFIG.zoomStep);
        break;
      case "0":
        centerMap(MAP_CONFIG.initialScale);
        break;
      case "ArrowLeft":
        state.x += panStep;
        applyTransform();
        break;
      case "ArrowRight":
        state.x -= panStep;
        applyTransform();
        break;
      case "ArrowUp":
        state.y += panStep;
        applyTransform();
        break;
      case "ArrowDown":
        state.y -= panStep;
        applyTransform();
        break;
      default:
        used = false;
    }

    if (used) event.preventDefault();
  }

  function forceWorldMapPageVisible() {
    document.body.classList.remove("loading", "is-loading");
    document.body.style.overflowX = "hidden";
    setupNavbarFallback();

    const loader = document.getElementById("page-loader");
    if (loader) loader.remove();

    document.querySelectorAll(".worldmap-header, .section-wrapper, .worldmap-section, .worldmap-topbar, .worldmap-shell, .reveal")
      .forEach(element => {
        element.style.opacity = "1";
        element.style.visibility = "visible";
        element.style.transform = "none";
      });
  }

  function setupNavbarFallback() {
    const navbar = document.getElementById("navbar-container");
    if (!navbar || navbar.dataset.worldmapNavFallback === "ready") return;

    navbar.dataset.worldmapNavFallback = "ready";

    const menuSelector = ".nav-links, .navbar-links, .nav-menu, .mobile-menu, .menu, nav ul";
    const toggleSelector = ".nav-toggle, .navbar-toggle, .menu-toggle, .mobile-menu-toggle, .mobile-menu-btn, .hamburger, .hamburger-menu, .menu-icon, #menu-toggle, [aria-label*='menu' i], [aria-label*='navigation' i]";

    navbar.addEventListener("click", event => {
      const toggle = event.target.closest(toggleSelector);
      if (!toggle || !navbar.contains(toggle)) return;

      const menu = navbar.querySelector(menuSelector);
      const wasOpen =
        toggle.classList.contains("active") ||
        toggle.classList.contains("open") ||
        (menu && (menu.classList.contains("active") || menu.classList.contains("open") || menu.classList.contains("show"))) ||
        document.body.classList.contains("menu-open");

      setTimeout(() => {
        const isOpenAfterOriginal =
          toggle.classList.contains("active") ||
          toggle.classList.contains("open") ||
          (menu && (menu.classList.contains("active") || menu.classList.contains("open") || menu.classList.contains("show"))) ||
          document.body.classList.contains("menu-open");

        const shouldOpen = isOpenAfterOriginal === wasOpen ? !wasOpen : isOpenAfterOriginal;

        toggle.classList.toggle("active", shouldOpen);
        toggle.classList.toggle("open", shouldOpen);
        toggle.setAttribute("aria-expanded", shouldOpen ? "true" : "false");

        if (menu) {
          menu.classList.toggle("active", shouldOpen);
          menu.classList.toggle("open", shouldOpen);
          menu.classList.toggle("show", shouldOpen);
        }

        document.body.classList.toggle("menu-open", shouldOpen);
        document.body.classList.toggle("worldmap-nav-open", shouldOpen);
      }, 30);
    });

    navbar.addEventListener("click", event => {
      const link = event.target.closest("a");
      if (!link || !navbar.contains(link)) return;
      document.body.classList.remove("worldmap-nav-open");
    });
  }

  function initWorldMap() {
    state.viewport = document.getElementById("worldmap-viewport");
    state.stage = document.getElementById("worldmap-stage");
    state.image = document.getElementById("worldmap-image");
    state.zoomLabel = document.getElementById("map-zoom-label");

    forceWorldMapPageVisible();

    if (!state.viewport || !state.stage || !state.image) return;

    if (!state.image.getAttribute("src")) {
      state.image.src = MAP_CONFIG.imageUrl;
    }

    const zoomIn = document.getElementById("map-zoom-in");
    const zoomOut = document.getElementById("map-zoom-out");
    const reset = document.getElementById("map-reset");

    state.viewport.addEventListener("wheel", onWheel, { passive: false });
    state.viewport.addEventListener("pointerdown", onPointerDown);
    state.viewport.addEventListener("pointermove", onPointerMove);
    state.viewport.addEventListener("pointerup", onPointerUp);
    state.viewport.addEventListener("pointercancel", onPointerUp);
    state.viewport.addEventListener("dblclick", onDoubleClick);
    state.viewport.addEventListener("touchend", onTouchTap, { passive: false });
    state.viewport.addEventListener("keydown", onKeyDown);

    if (zoomIn) zoomIn.addEventListener("click", () => zoomBy(MAP_CONFIG.zoomStep));
    if (zoomOut) zoomOut.addEventListener("click", () => zoomBy(-MAP_CONFIG.zoomStep));
    if (reset) reset.addEventListener("click", () => centerMap(MAP_CONFIG.initialScale));

    if (state.image.complete) {
      centerMap(MAP_CONFIG.initialScale);
    } else {
      state.image.addEventListener("load", () => centerMap(MAP_CONFIG.initialScale), { once: true });
      centerMap(MAP_CONFIG.initialScale);
    }

    window.addEventListener("resize", () => centerMap(state.scale));
  }

  document.addEventListener("DOMContentLoaded", initWorldMap);
  window.addEventListener("load", () => setTimeout(forceWorldMapPageVisible, 100));
  window.SSIAWorldMap = { reset: () => centerMap(MAP_CONFIG.initialScale) };
})();
