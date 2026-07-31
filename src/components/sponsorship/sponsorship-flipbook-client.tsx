"use client";

import { useReducedMotion } from "framer-motion";
import HTMLFlipBook from "react-pageflip";
import {
  type KeyboardEvent,
  useCallback,
  useEffect,
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

function clampPageIndex(pageIndex: number) {
  return Math.min(
    Math.max(0, pageIndex),
    sponsorshipProposalMeta.totalPages - 1,
  );
}

export function SponsorshipFlipbookClient() {
  const flipbookRef = useRef<FlipbookHandle | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [orientation, setOrientation] =
    useState<PageOrientation>("portrait");
  const [isTurning, setIsTurning] = useState(false);

  const getPageFlip = useCallback(
    () => flipbookRef.current?.pageFlip(),
    [],
  );

  const goToFirst = useCallback(() => {
    setIsTurning(false);
    getPageFlip()?.turnToPage(0);
  }, [getPageFlip]);

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

  const goToLast = useCallback(() => {
    setIsTurning(false);
    getPageFlip()?.turnToPage(sponsorshipProposalMeta.totalPages - 1);
  }, [getPageFlip]);

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

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || typeof ResizeObserver === "undefined") return;

    let animationFrame = 0;
    let lastWidth = 0;
    const resizeObserver = new ResizeObserver((entries) => {
      const nextWidth = Math.round(entries[0]?.contentRect.width ?? 0);
      if (nextWidth <= 0 || nextWidth === lastWidth) return;

      lastWidth = nextWidth;
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        getPageFlip()?.update();
      });
    });

    resizeObserver.observe(viewport);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, [getPageFlip]);

  const visibleEndIndex =
    orientation === "landscape" &&
    currentPageIndex > 0 &&
    currentPageIndex < sponsorshipProposalMeta.totalPages - 1
      ? Math.min(
          currentPageIndex + 1,
          sponsorshipProposalMeta.totalPages - 1,
        )
      : currentPageIndex;

  const closedBookShift =
    orientation === "landscape" && !isTurning
      ? currentPageIndex === 0
        ? "translateX(-25%)"
        : currentPageIndex === sponsorshipProposalMeta.totalPages - 1
          ? "translateX(25%)"
          : "translateX(0)"
      : "translateX(0)";

  return (
    <div
      ref={viewportRef}
      id="sponsorship-proposal-book"
      className="mx-auto w-full max-w-[55rem] overflow-hidden rounded-[1.5rem] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand/45"
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
        className="mx-auto w-full max-w-[55rem] transition-transform duration-500 ease-out motion-reduce:transition-none"
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
          {sponsorshipProposalPages.map((page) => (
            <ProposalPage
              key={page.pageNumber}
              page={page}
              onOpenCover={goToNext}
            />
          ))}
        </HTMLFlipBook>
      </div>

      <FlipbookControls
        currentPageIndex={currentPageIndex}
        visibleEndIndex={visibleEndIndex}
        totalPages={sponsorshipProposalMeta.totalPages}
        onFirst={goToFirst}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onLast={goToLast}
      />
    </div>
  );
}
