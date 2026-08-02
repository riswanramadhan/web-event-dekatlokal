"use client";

import { useReducedMotion } from "framer-motion";
import { NavArrowLeft, NavArrowRight } from "iconoir-react";
import HTMLFlipBook from "react-pageflip";
import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  sponsorshipProposalMeta,
  sponsorshipProposalPages,
} from "@/data/sponsorship-proposal-pages";

import { FlipbookControls } from "./flipbook-controls";
import { ProposalPage } from "./proposal-page";

type PageOrientation = "portrait" | "landscape";

type PageFlipApi = {
  flipNext: () => void;
  flipPrev: () => void;
  turnToNextPage: () => void;
  turnToPrevPage: () => void;
  turnToPage: (pageIndex: number) => void;
  update: () => void;
};

type FlipbookHandle = {
  pageFlip: () => PageFlipApi | undefined;
};

type PageFlipEvent<T> = {
  data: T;
};

type InitEventData = {
  page: number;
  mode: PageOrientation;
};

const PAGE_WIDTH = 440;
const PAGE_HEIGHT = 622;
const MIN_PAGE_WIDTH = 280;
const MIN_PAGE_HEIGHT = 396;

// Space reserved beside the book (desktop only) for the prev/next arrows,
// matching the `lg:px-16` padding on the book frame below.
const ARROW_GUTTER = 64;
const ARROW_BUTTON_SIZE = 44;
const ARROW_BASE_OFFSET = (ARROW_GUTTER - ARROW_BUTTON_SIZE) / 2;

// While fullscreen, the book is scaled up (via CSS transform, not by
// remounting react-pageflip with different dimensions -- the library only
// reads its width/height props once at construction, so changing them later
// requires destroying and recreating the instance, which proved unreliable).
const FULLSCREEN_SCALE_CEILING = 1.6;
const FULLSCREEN_CONTROLS_RESERVED_HEIGHT = 160;

function clampPageIndex(pageIndex: number) {
  return Math.min(
    Math.max(0, pageIndex),
    sponsorshipProposalMeta.totalPages - 1,
  );
}

const arrowButtonClassName =
  "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-[0_14px_32px_rgba(1,34,98,0.14)] transition-[left,right,opacity] duration-500 ease-out hover:border-brand-200 hover:bg-brand-50 hover:text-brand disabled:pointer-events-none disabled:opacity-40 lg:inline-flex motion-reduce:transition-none";

export function SponsorshipFlipbookClient() {
  const flipbookRef = useRef<FlipbookHandle | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const bookFrameRef = useRef<HTMLDivElement | null>(null);
  const bookRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [orientation, setOrientation] =
    useState<PageOrientation>("portrait");
  const [isTurning, setIsTurning] = useState(false);
  const [bookWidth, setBookWidth] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenScale, setFullscreenScale] = useState(1);

  const getPageFlip = useCallback(
    () => flipbookRef.current?.pageFlip(),
    [],
  );

  const goToPrevious = useCallback(() => {
    const pageFlip = getPageFlip();
    if (!pageFlip) return;

    setIsTurning(true);
    if (shouldReduceMotion) {
      pageFlip.turnToPrevPage();
    } else {
      pageFlip.flipPrev();
    }
  }, [getPageFlip, shouldReduceMotion]);

  const goToNext = useCallback(() => {
    const pageFlip = getPageFlip();
    if (!pageFlip) return;

    setIsTurning(true);
    if (shouldReduceMotion) {
      pageFlip.turnToNextPage();
    } else {
      pageFlip.flipNext();
    }
  }, [getPageFlip, shouldReduceMotion]);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
      return;
    }

    void viewportRef.current?.requestFullscreen();
  }, []);

  const handleFlip = useCallback((event: PageFlipEvent<number>) => {
    setCurrentPageIndex(clampPageIndex(event.data));
    setIsTurning(false);
  }, []);

  const handleInit = useCallback(
    (event: PageFlipEvent<InitEventData>) => {
      setCurrentPageIndex(clampPageIndex(event.data.page));
      setOrientation(event.data.mode);
    },
    [],
  );

  const handleOrientationChange = useCallback(
    (event: PageFlipEvent<PageOrientation>) => {
      setOrientation(event.data);
    },
    [],
  );

  const handleStateChange = useCallback(
    (event: PageFlipEvent<string>) => {
      if (event.data === "flipping") {
        setIsTurning(true);
      } else if (event.data === "read") {
        setIsTurning(false);
      }
    },
    [],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      }
    },
    [goToNext, goToPrevious],
  );

  // react-pageflip re-clones its children whenever this array's reference
  // changes, so it must stay stable across re-renders (page flips,
  // orientation changes, etc.) instead of being recreated on every render.
  const proposalPageElements = useMemo(
    () =>
      sponsorshipProposalPages.map((page) => (
        <ProposalPage key={page.pageNumber} page={page} onOpenCover={goToNext} />
      )),
    [goToNext],
  );

  useEffect(() => {
    const book = bookRef.current;
    if (!book || typeof ResizeObserver === "undefined") return;

    let animationFrame = 0;
    let lastWidth = 0;
    const resizeObserver = new ResizeObserver((entries) => {
      const nextWidth = Math.round(entries[0]?.contentRect.width ?? 0);
      if (nextWidth <= 0 || nextWidth === lastWidth) return;

      lastWidth = nextWidth;
      setBookWidth(nextWidth);
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        getPageFlip()?.update();
      });
    });

    resizeObserver.observe(book);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, [getPageFlip]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === viewportRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange,
      );
  }, []);

  useEffect(() => {
    if (!isFullscreen) return;

    const viewport = viewportRef.current;
    const frame = bookFrameRef.current;
    if (!viewport || !frame || typeof ResizeObserver === "undefined") {
      return;
    }

    const recompute = () => {
      const naturalWidth = frame.offsetWidth;
      const naturalHeight = frame.offsetHeight;
      if (naturalWidth <= 0 || naturalHeight <= 0) return;

      const viewportStyle = window.getComputedStyle(viewport);
      const paddingX =
        parseFloat(viewportStyle.paddingLeft) +
        parseFloat(viewportStyle.paddingRight);
      const paddingY =
        parseFloat(viewportStyle.paddingTop) +
        parseFloat(viewportStyle.paddingBottom);

      const availableWidth = viewport.clientWidth - paddingX;
      const availableHeight =
        viewport.clientHeight - paddingY - FULLSCREEN_CONTROLS_RESERVED_HEIGHT;
      if (availableWidth <= 0 || availableHeight <= 0) return;

      const nextScale = Math.min(
        availableWidth / naturalWidth,
        availableHeight / naturalHeight,
        FULLSCREEN_SCALE_CEILING,
      );

      setFullscreenScale(Math.max(1, nextScale));
    };

    recompute();
    const observer = new ResizeObserver(recompute);
    observer.observe(viewport);
    observer.observe(frame);

    return () => observer.disconnect();
  }, [isFullscreen]);

  const visibleEndIndex =
    orientation === "landscape" &&
    currentPageIndex > 0 &&
    currentPageIndex < sponsorshipProposalMeta.totalPages - 1
      ? Math.min(
          currentPageIndex + 1,
          sponsorshipProposalMeta.totalPages - 1,
        )
      : currentPageIndex;

  const isFirst = currentPageIndex === 0;
  const isLast = currentPageIndex >= sponsorshipProposalMeta.totalPages - 1;

  const closedBookShift =
    orientation === "landscape" && !isTurning
      ? currentPageIndex === 0
        ? "translateX(-25%)"
        : currentPageIndex === sponsorshipProposalMeta.totalPages - 1
          ? "translateX(25%)"
          : "translateX(0)"
      : "translateX(0)";

  // While closed on the cover (or back cover), the book only shows a single
  // page inside its double-page-wide frame, so the visible page content is
  // inset from the frame's true edges. Slide the side arrows in to match, so
  // they always hug the visible page instead of floating over blank space.
  const isHalfSpread =
    orientation === "landscape" && !isTurning && (isFirst || isLast);
  const arrowOffset =
    ARROW_BASE_OFFSET + (isHalfSpread ? bookWidth / 4 : 0);

  return (
    <div
      ref={viewportRef}
      id="sponsorship-proposal-book"
      className={
        isFullscreen
          ? "flex w-full flex-col items-center justify-center gap-6 bg-white p-4 sm:p-8 md:p-12"
          : "rounded-[1.5rem] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand/45"
      }
      role="region"
      aria-label={`Flipbook proposal sponsorship, ${sponsorshipProposalMeta.totalPages} halaman`}
      aria-describedby="flipbook-keyboard-instructions"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      data-flipbook-orientation={orientation}
    >
      <p id="flipbook-keyboard-instructions" className="sr-only">
        Gunakan tombol panah kiri dan kanan untuk berpindah halaman.
      </p>

      <div
        ref={bookFrameRef}
        className="relative mx-auto w-full max-w-[55rem] box-border lg:max-w-[63rem] lg:px-16"
        style={
          isFullscreen && fullscreenScale !== 1
            ? { transform: `scale(${fullscreenScale})` }
            : undefined
        }
      >
        <div ref={bookRef} className="overflow-hidden rounded-[1.5rem]">
          <div
            className="mx-auto w-full transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{ transform: closedBookShift }}
          >
            <HTMLFlipBook
              ref={flipbookRef}
              className="mx-auto"
              style={{ margin: "0 auto" }}
              width={PAGE_WIDTH}
              height={PAGE_HEIGHT}
              size="stretch"
              minWidth={MIN_PAGE_WIDTH}
              maxWidth={PAGE_WIDTH}
              minHeight={MIN_PAGE_HEIGHT}
              maxHeight={PAGE_HEIGHT}
              drawShadow
              flippingTime={shouldReduceMotion ? 1 : 650}
              usePortrait
              startZIndex={1}
              autoSize
              maxShadowOpacity={0.18}
              showCover
              mobileScrollSupport
              clickEventForward
              useMouseEvents
              swipeDistance={30}
              showPageCorners={!shouldReduceMotion}
              disableFlipByClick={false}
              startPage={0}
              renderOnlyPageLengthChange
              onFlip={handleFlip}
              onInit={handleInit}
              onUpdate={handleInit}
              onChangeOrientation={handleOrientationChange}
              onChangeState={handleStateChange}
            >
              {proposalPageElements}
            </HTMLFlipBook>
          </div>
        </div>

        <button
          type="button"
          onClick={goToPrevious}
          disabled={isFirst}
          aria-label="Ke halaman sebelumnya"
          aria-controls="sponsorship-proposal-book"
          className={arrowButtonClassName}
          style={{ left: `${arrowOffset}px` }}
          data-flipbook-control="previous-desktop"
        >
          <NavArrowLeft className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={goToNext}
          disabled={isLast}
          aria-label="Ke halaman berikutnya"
          aria-controls="sponsorship-proposal-book"
          className={arrowButtonClassName}
          style={{ right: `${arrowOffset}px` }}
          data-flipbook-control="next-desktop"
        >
          <NavArrowRight className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>

      <FlipbookControls
        currentPageIndex={currentPageIndex}
        visibleEndIndex={visibleEndIndex}
        totalPages={sponsorshipProposalMeta.totalPages}
        onPrevious={goToPrevious}
        onNext={goToNext}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />
    </div>
  );
}
