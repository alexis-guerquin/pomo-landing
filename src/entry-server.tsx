import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { Writable } from 'node:stream';
import { I18nProvider } from './contexts/I18nContext';
import AppSSR from './AppSSR';

/**
 * Prérendu d'une URL en HTML statique.
 * Utilise renderToPipeableStream pour supporter Suspense et les imports dynamiques.
 */
export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const parts: string[] = [];

    const writable = new Writable({
      write(chunk: unknown, _enc: string, cb: () => void) {
        parts.push(String(chunk));
        cb();
      },
      final(cb: () => void) {
        resolve(parts.join(''));
        cb();
      },
    });

    const { pipe } = renderToPipeableStream(
      <StrictMode>
        <StaticRouter location={url}>
          <I18nProvider>
            <AppSSR />
          </I18nProvider>
        </StaticRouter>
      </StrictMode>,
      {
        onAllReady() {
          pipe(writable);
        },
        onError(err: unknown) {
          reject(err);
        },
      }
    );
  });
}
