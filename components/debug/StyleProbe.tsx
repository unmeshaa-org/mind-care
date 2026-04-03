'use client';

import { useEffect } from 'react';

export default function StyleProbe() {
  useEffect(() => {
    const el = document.getElementById('tw-probe');
    const cs = el ? window.getComputedStyle(el) : null;

    const payload = {
      sessionId: 'f7dd5f',
      runId: 'pre-fix',
      hypothesisId: 'H1',
      location: 'components/debug/StyleProbe.tsx:15',
      message: 'Tailwind probe computed styles',
      data: {
        found: Boolean(el),
        className: el?.className ?? null,
        display: cs?.display ?? null,
        marginTop: cs?.marginTop ?? null,
        gap: (cs as CSSStyleDeclaration | null)?.gap ?? null,
        padding: cs?.padding ?? null,
      },
      timestamp: Date.now(),
    };

    // #region agent log
    fetch('http://127.0.0.1:7414/ingest/bd1f5ed8-b068-4155-b2c2-af99d9e1d817', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'f7dd5f' },
      body: JSON.stringify(payload),
    })
      .catch(() =>
        fetch('/api/debug-log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).catch(() => {}),
      )
      .catch(() => {});
    // #endregion agent log
  }, []);

  // Intentionally hidden but still measurable via computed styles.
  return (
    <div
      id="tw-probe"
      className="pointer-events-none fixed left-0 top-0 z-[-1] flex gap-4 p-6 mt-10 opacity-0"
      aria-hidden="true"
    />
  );
}

