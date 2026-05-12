const root = document.documentElement;
const startScreen = document.querySelector(".start-screen");
const textCompositions = [...document.querySelectorAll(".text-composition")];
const composition = textCompositions[0];
const runeLogo = document.querySelector(".rune-logo");
const morphSymbols = [...document.querySelectorAll(".morph-symbol")];
const frameDots = [...document.querySelectorAll(".frame-dot")];
const introLines = [
  ...document.querySelectorAll(".intro-section .line"),
  ...document.querySelectorAll(".story-section .line"),
  ...document.querySelectorAll(".contact-section .line"),
  ...document.querySelectorAll(".catalog-hide-line"),
];
const catalogRevealLines = [
  ...document.querySelectorAll(".live-catalog-frame .line"),
  ...document.querySelectorAll(".catalog-details .line"),
];
const liveCatalogFrame = document.querySelector(".live-catalog-frame");
const liveProduct = document.querySelector(".live-product");
const catalogDetails = document.querySelector(".catalog-details");
const catalogImages = [...document.querySelectorAll(".catalog-image")];
const catalogTitle = document.querySelector(".catalog-title");
const catalogDescription = document.querySelector(".catalog-description");
const catalogBuy = document.querySelector(".catalog-buy");
const catalogBuyDot = document.querySelector(".catalog-buy-dot");

let isCatalogOpen = false;
let catalogPageHeight =
  window.visualViewport?.height || window.innerHeight || 1;

function getVisibleViewportHeight() {
  return window.visualViewport?.height || window.innerHeight || 1;
}

function isIosSafari() {
  const userAgent = navigator.userAgent;
  return (
    /iP(hone|ad|od)/.test(userAgent) &&
    /Safari/.test(userAgent) &&
    !/CriOS|FxiOS|EdgiOS|OPiOS/.test(userAgent)
  );
}

function measureViewportUnit(unit) {
  const marker = document.createElement("div");
  marker.style.cssText = [
    "position:fixed",
    "left:0",
    "top:0",
    "width:0",
    `height:${unit}`,
    "visibility:hidden",
    "pointer-events:none",
    "z-index:-1",
  ].join(";");

  document.body.appendChild(marker);
  const height = marker.getBoundingClientRect().height;
  marker.remove();
  return height || 0;
}

function getCatalogViewportHeight() {
  const visibleHeight = getVisibleViewportHeight();
  if (!isIosSafari()) return visibleHeight;

  const largeViewportHeight = CSS.supports("height", "100lvh")
    ? measureViewportUnit("100lvh")
    : measureViewportUnit("100vh");

  return Math.max(visibleHeight, window.innerHeight || 0, largeViewportHeight);
}

function setViewportVars(appHeight, visibleHeight = appHeight) {
  const chromeHeight = Math.max(0, appHeight - visibleHeight);
  root.style.setProperty("--app-height", `${appHeight}px`);
  root.style.setProperty("--visible-height", `${visibleHeight}px`);
  root.style.setProperty("--catalog-page-height", `${appHeight}px`);
  root.style.setProperty("--catalog-browser-chrome", `${chromeHeight}px`);
}

function syncViewportHeight() {
  const viewportHeight = getVisibleViewportHeight();
  if (isCatalogOpen) return;

  setViewportVars(viewportHeight);
  catalogPageHeight = viewportHeight;
}

syncViewportHeight();
window.addEventListener("resize", syncViewportHeight);
window.visualViewport?.addEventListener("resize", syncViewportHeight);
window.visualViewport?.addEventListener("scroll", syncViewportHeight);

const catalogItems = [
  {
    slug: "bird",
    title: "BIRD — $130",
    description: "Lip cuff with stones.",
  },
  {
    slug: "snowdrop",
    title: "SNOWDROP — $500",
    description: "Three-part transformer earrings.",
    fit: "cover",
  },
  {
    slug: "birds-bracelet",
    title: "BIRDS — $300",
    description: "Sterling silver bracelet.",
  },
  {
    slug: "aiyy-tyyna-body-chain-2",
    title: "AIYY TYYNA — $800",
    description: "Sterling silver body chain.",
    fit: "cover",
  },
  {
    slug: "aiyy-tyyna-body-chain",
    title: "AIYY TYYNA — $800",
    description: "Sterling silver body chain.",
    fit: "cover",
  },
  {
    slug: "ice-sun-ring",
    title: "ICE SUN — $200",
    description: "Sterling silver ring.",
  },
  {
    slug: "fox-ring",
    title: "FOX — $200",
    description: "Sterling silver ring.",
    fit: "cover",
  },
  {
    slug: "choker",
    title: "CHOKER — $550",
    description: "Sterling silver choker.",
  },
  {
    slug: "wolf-ring",
    title: "WOLF — $250",
    description: "Sterling silver ring.",
    fit: "cover",
  },
  {
    slug: "birds-necklace",
    title: "BIRDS — $250",
    description: "Sterling silver necklace.",
  },
  {
    slug: "aiyy-tyyna-studs",
    title: "AIYY TYYNA — $200",
    description: "Sterling silver studs.",
    fit: "cover",
  },
  {
    slug: "fox-pendant",
    title: "FOX — $150",
    description: "Sterling silver pendant.",
  },
  {
    slug: "aiyy-tyyna-bracelet",
    title: "AIYY TYYNA — $200",
    description: "Sterling silver bracelet with one symbol.",
    fit: "cover",
  },
  {
    slug: "bear-pendant",
    title: "BEAR — $120",
    description: "Sterling silver pendant.",
  },
  {
    slug: "aiyy-tyyna-mono-earring",
    title: "AIYY TYYNA — $500",
    description: "Mono earring with horsehair.",
    fit: "cover",
  },
  {
    slug: "eagle-pendant",
    title: "EAGLE — $120",
    description: "Sterling silver pendant.",
  },
  {
    slug: "snowdrop-2",
    title: "SNOWDROP — $500",
    description: "Three-part transformer earrings.",
    fit: "cover",
  },
  {
    slug: "unicorn-pendant",
    title: "UNICORN — $120",
    description: "Sterling silver pendant.",
  },
  {
    slug: "icicle",
    title: "ICICLE — $130",
    description: "Sterling silver pin earring.",
    fit: "cover",
  },
  {
    slug: "deer-pendant",
    title: "DEER — $120",
    description: "Sterling silver pendant.",
  },
  {
    slug: "leaf-pin-ear-cuff",
    title: "LEAF — $100",
    description: "Pin ear cuff with stones.",
    fit: "cover",
  },
  {
    slug: "horse-pendant",
    title: "HORSE — $120",
    description: "Sterling silver pendant.",
  },
  {
    slug: "leaf-lip-cuff",
    title: "LEAF — $100",
    description: "Lip cuff with stones.",
    fit: "cover",
  },
  {
    slug: "ice",
    title: "ICE — $300",
    description: "Sterling silver ear jacket with stones.",
  },
  {
    slug: "ice-sun-necklace",
    title: "ICE SUN — $250",
    description: "Sterling silver necklace.",
    fit: "cover",
  },
  {
    slug: "wolf-earrings",
    title: "WOLF — $250",
    description: "Sterling silver earrings with leverback closure.",
  },
  {
    slug: "snowdrop-3",
    title: "SNOWDROP — $500",
    description: "Three-part transformer earrings.",
  },
];

let currentCatalogIndex = 0;
let catalogSyncFrame = 0;
let glyphMode = false;
let isBlockHot = false;
let isBuyHot = false;
let startSwipe = null;
let catalogSwipe = null;
let suppressNextIntroClick = false;
let suppressNextCatalogClick = false;

const introSwipeThreshold = 36;
const catalogSwipeThreshold = 4;

catalogRevealLines.forEach((line) => line.classList.add("retype-hidden"));

function getItemName(item) {
  return item.title.split(/\s+[—-]\s+\$/)[0].trim();
}

function getCatalogSlugFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const querySlug = params.get("item");
  if (querySlug) return querySlug;

  const hashSlug = window.location.hash.replace(/^#\/?/, "");
  if (hashSlug) return hashSlug;

  return "";
}

function getCatalogIndexFromUrl() {
  const slug = getCatalogSlugFromUrl();
  return catalogItems.findIndex((item) => item.slug === slug);
}

function updateCatalogUrl(index) {
  if (!isCatalogOpen || !window.history?.replaceState) return;

  const slug = catalogItems[index]?.slug;
  if (!slug) return;

  const nextUrl = `${window.location.pathname}#${slug}`;

  if (nextUrl !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
    window.history.replaceState({ catalogIndex: index }, "", nextUrl);
  }
}

function updateHomeUrl() {
  if (!window.history?.replaceState) return;
  window.history.replaceState({}, "", window.location.pathname);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getViewportHeight() {
  return catalogPageHeight || window.visualViewport?.height || window.innerHeight || 1;
}

function freezeCatalogPageHeight() {
  const visibleHeight = getVisibleViewportHeight();
  catalogPageHeight = getCatalogViewportHeight();
  setViewportVars(catalogPageHeight, visibleHeight);
}

function renderCatalogMediaState() {
  catalogImages.forEach((image, imageIndex) => {
    image.classList.toggle("is-active", imageIndex === currentCatalogIndex);
    image.classList.toggle(
      "is-cover-image",
      catalogItems[imageIndex]?.fit === "cover"
    );
  });
}

function scrollCatalogToIndex(index, behavior = "smooth") {
  if (!liveProduct) return;
  liveProduct.scrollTo({
    top: index * getViewportHeight(),
    behavior,
  });
}

function setCatalogItem(index, shouldScroll = false, behavior = "smooth") {
  const safeIndex = clamp(index, 0, catalogImages.length - 1);
  currentCatalogIndex = safeIndex;

  const item = catalogItems[safeIndex] || catalogItems[0];
  if (catalogTitle) catalogTitle.textContent = item.title;
  if (catalogDescription) catalogDescription.textContent = item.description;
  if (catalogBuy) {
    const itemName = getItemName(item);
    catalogBuy.setAttribute("aria-label", `Message to buy ${itemName}`);
  }
  renderCatalogMediaState();
  updateCatalogUrl(safeIndex);

  if (shouldScroll) {
    scrollCatalogToIndex(safeIndex, behavior);
  }
}

function stepCatalog(direction) {
  if (catalogImages.length < 2) return;

  const nextIndex = clamp(
    currentCatalogIndex + direction,
    0,
    catalogImages.length - 1
  );
  setCatalogItem(nextIndex, true);
}

function syncCatalogFromScroll() {
  if (!liveProduct) return;

  const nextIndex = clamp(
    Math.round(liveProduct.scrollTop / getViewportHeight()),
    0,
    catalogImages.length - 1
  );

  if (nextIndex !== currentCatalogIndex) {
    setCatalogItem(nextIndex, false);
  }
}

function requestCatalogSync() {
  if (catalogSyncFrame) return;

  catalogSyncFrame = window.requestAnimationFrame(() => {
    catalogSyncFrame = 0;
    syncCatalogFromScroll();
  });
}

function finishCatalogScroll() {
  if (catalogSyncFrame) {
    window.cancelAnimationFrame(catalogSyncFrame);
    catalogSyncFrame = 0;
  }

  syncCatalogFromScroll();
}

function preventCatalogOverscroll(event) {
  if (!isCatalogOpen || !liveProduct) return;

  const maxScrollTop = liveProduct.scrollHeight - liveProduct.clientHeight;
  const atStart = liveProduct.scrollTop <= 1;
  const atEnd = liveProduct.scrollTop >= maxScrollTop - 1;

  if ((atStart && event.deltaY < 0) || (atEnd && event.deltaY > 0)) {
    event.preventDefault();
  }
}

function scrollCatalogBy(deltaY) {
  if (!liveProduct) return;

  const maxScrollTop = liveProduct.scrollHeight - liveProduct.clientHeight;
  liveProduct.scrollTop = clamp(liveProduct.scrollTop + deltaY, 0, maxScrollTop);
}

function isInteractiveTarget(target) {
  return Boolean(target?.closest?.("a, button"));
}

function openCatalogFromIntro() {
  if (isCatalogOpen) return;
  isCatalogOpen = true;
  renderScreen();
}

function shouldProxyCatalogScroll(target) {
  if (!isCatalogOpen || !liveProduct) return false;
  if (liveProduct.contains(target)) return false;

  return Boolean(target?.closest?.(".catalog-action, .catalog-details"));
}

function beginCatalogOverlayScroll(event) {
  if (event.pointerType === "mouse" || !shouldProxyCatalogScroll(event.target)) {
    return false;
  }

  catalogSwipe = {
    pointerId: event.pointerId,
    startY: event.clientY,
    lastY: event.clientY,
    moved: false,
  };

  startScreen?.setPointerCapture?.(event.pointerId);
  return true;
}

function suppressCatalogClickOnce() {
  suppressNextCatalogClick = true;
  window.setTimeout(() => {
    suppressNextCatalogClick = false;
  }, 300);
}

function endCatalogOverlayScroll(event) {
  if (!catalogSwipe || event.pointerId !== catalogSwipe.pointerId) return false;

  const didMove = catalogSwipe.moved;
  catalogSwipe = null;
  startScreen?.releasePointerCapture?.(event.pointerId);

  if (!didMove) return false;

  event.preventDefault();
  suppressCatalogClickOnce();
  finishCatalogScroll();
  scrollCatalogToIndex(currentCatalogIndex);
  return true;
}

function swapGlyph(element, value) {
  if (element.textContent === value) return;
  element.textContent = value;
}

function renderFrameDots() {
  const dotValue = glyphMode || isBlockHot ? "●" : "○";
  frameDots.forEach((dot) => swapGlyph(dot, dotValue));
}

function renderCatalogBuyDot() {
  if (!catalogBuyDot) return;
  swapGlyph(catalogBuyDot, isBuyHot ? "●" : "○");
}

function setGlyphMode(nextMode) {
  if (glyphMode === nextMode) {
    renderFrameDots();
    return;
  }

  glyphMode = nextMode;
  morphSymbols.forEach((symbol) => {
    swapGlyph(symbol, glyphMode ? symbol.dataset.catalog : symbol.dataset.intro);
  });
  renderFrameDots();
  renderCatalogBuyDot();
}

function renderScreen() {
  setGlyphMode(isCatalogOpen);

  introLines.forEach((line) => {
    line.classList.toggle("retype-hidden", isCatalogOpen);
  });

  catalogRevealLines.forEach((line) => {
    line.classList.toggle("retype-hidden", !isCatalogOpen);
  });

  liveCatalogFrame?.classList.toggle("is-visible", isCatalogOpen);
  liveProduct?.classList.toggle("is-visible", isCatalogOpen);
  catalogDetails?.classList.toggle("is-visible", isCatalogOpen);
  document.body.classList.toggle("is-catalog-open", isCatalogOpen);
  root.style.setProperty("--catalog-progress", isCatalogOpen ? "1" : "0");

  if (isCatalogOpen) {
    freezeCatalogPageHeight();
    updateCatalogUrl(currentCatalogIndex);
    window.requestAnimationFrame(() => {
      scrollCatalogToIndex(currentCatalogIndex, "auto");
    });
  } else {
    updateHomeUrl();
    syncViewportHeight();
  }
}

const initialCatalogIndex = getCatalogIndexFromUrl();
if (initialCatalogIndex >= 0) {
  isCatalogOpen = true;
  setCatalogItem(initialCatalogIndex);
} else {
  setCatalogItem(0);
}
renderScreen();

function syncCatalogPosition() {
  if (!isCatalogOpen) return;
  freezeCatalogPageHeight();
  scrollCatalogToIndex(currentCatalogIndex, "auto");
}

window.addEventListener("resize", syncCatalogPosition);

window.addEventListener("popstate", () => {
  const nextIndex = getCatalogIndexFromUrl();
  isCatalogOpen = nextIndex >= 0;
  setCatalogItem(nextIndex >= 0 ? nextIndex : 0, isCatalogOpen, "auto");
  renderScreen();
});

liveProduct?.addEventListener("scroll", requestCatalogSync, { passive: true });
liveProduct?.addEventListener("scrollend", finishCatalogScroll, { passive: true });
liveProduct?.addEventListener("wheel", preventCatalogOverscroll, { passive: false });

const catalogAction = document.querySelector(".catalog-action");
if (catalogAction) {
  catalogAction.addEventListener("click", (event) => {
    if (suppressNextCatalogClick) {
      event.preventDefault();
      event.stopPropagation();
      suppressNextCatalogClick = false;
      return;
    }

    if (!isCatalogOpen) return;
    event.preventDefault();
    event.stopPropagation();
    isCatalogOpen = false;
    renderScreen();
  });
}

if (startScreen) {
  startScreen.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (suppressNextCatalogClick) {
        event.preventDefault();
        suppressNextCatalogClick = false;
      }

      event.stopPropagation();
    });
  });

  startScreen.addEventListener("pointerdown", (event) => {
    if (beginCatalogOverlayScroll(event)) return;
    if (isCatalogOpen || isInteractiveTarget(event.target)) return;

    startSwipe = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
  });

  startScreen.addEventListener(
    "pointermove",
    (event) => {
      if (!catalogSwipe || event.pointerId !== catalogSwipe.pointerId) return;

      const totalY = event.clientY - catalogSwipe.startY;
      const deltaY = catalogSwipe.lastY - event.clientY;
      catalogSwipe.lastY = event.clientY;

      if (!catalogSwipe.moved && Math.abs(totalY) < catalogSwipeThreshold) {
        return;
      }

      catalogSwipe.moved = true;
      event.preventDefault();
      scrollCatalogBy(deltaY);
    },
    { passive: false }
  );

  startScreen.addEventListener("pointerup", (event) => {
    if (endCatalogOverlayScroll(event)) return;

    if (!startSwipe || isCatalogOpen) {
      startSwipe = null;
      return;
    }

    if (event.pointerId !== startSwipe.pointerId) return;

    const deltaX = event.clientX - startSwipe.x;
    const deltaY = event.clientY - startSwipe.y;
    const isVerticalSwipe =
      Math.abs(deltaY) >= introSwipeThreshold &&
      Math.abs(deltaY) > Math.abs(deltaX);

    startSwipe = null;

    if (!isVerticalSwipe) return;

    event.preventDefault();
    suppressNextIntroClick = true;
    openCatalogFromIntro();
  });

  startScreen.addEventListener("pointercancel", (event) => {
    if (catalogSwipe?.pointerId === event.pointerId) {
      catalogSwipe = null;
    }

    startSwipe = null;
  });

  startScreen.addEventListener("click", (event) => {
    if (suppressNextCatalogClick) {
      event.preventDefault();
      suppressNextCatalogClick = false;
      return;
    }

    if (isCatalogOpen) return;
    if (suppressNextIntroClick) {
      suppressNextIntroClick = false;
      return;
    }
    event.preventDefault();
    openCatalogFromIntro();
  });
}

if (runeLogo) {
  runeLogo.addEventListener("pointerenter", () => {
    isBlockHot = true;
    renderFrameDots();
  });

  runeLogo.addEventListener("pointerleave", () => {
    isBlockHot = false;
    renderFrameDots();
  });
}

window.addEventListener(
  "wheel",
  (event) => {
    if (!isCatalogOpen) return;
    if (liveProduct?.contains(event.target)) return;
    event.preventDefault();
    scrollCatalogBy(event.deltaY);
  },
  { passive: false }
);

window.addEventListener("keydown", (event) => {
  if (!isCatalogOpen) return;

  if (["ArrowDown", "PageDown", "ArrowRight", " "].includes(event.key)) {
    event.preventDefault();
    stepCatalog(1);
  }

  if (["ArrowUp", "PageUp", "ArrowLeft"].includes(event.key)) {
    event.preventDefault();
    stepCatalog(-1);
  }
});

if (catalogBuy) {
  catalogBuy.addEventListener("pointerenter", () => {
    isBuyHot = true;
    renderCatalogBuyDot();
  });

  catalogBuy.addEventListener("pointerleave", () => {
    isBuyHot = false;
    renderCatalogBuyDot();
  });

  catalogBuy.addEventListener("focus", () => {
    isBuyHot = true;
    renderCatalogBuyDot();
  });

  catalogBuy.addEventListener("blur", () => {
    isBuyHot = false;
    renderCatalogBuyDot();
  });
}
