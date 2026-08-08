interface Window {
  __lenis?: {
    destroy: () => void;
    raf: (time: number) => void;
    scrollTo: (element: HTMLElement, options?: { offset?: number; duration?: number; easing?: (t: number) => number }) => void;
  };
}

interface HTMLDocument {
  documentElement: HTMLElement & {
    classList: DOMTokenList;
  };
}