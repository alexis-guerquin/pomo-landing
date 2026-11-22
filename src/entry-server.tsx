import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { Writable } from 'node:stream';
import { findPage } from './config/routes';
import { I18nProvider } from './contexts/I18nContext';
import App from './App';

export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const parts: string[] = [];
    const writable = new Writable({
      write(chunk: Buffer, _encoding, done) {
        parts.push(chunk.toString());
        done();
      },
      final(done) {
        resolve(parts.join(''));
        done();
      },
    });

    const { pipe } = renderToPipeableStream(
      <html lang={findPage(url)?.locale ?? 'fr'}>
        <head />
        <body>
          <div id="root">
            <StrictMode>
              <StaticRouter location={url}>
                <I18nProvider><App /></I18nProvider>
              </StaticRouter>
            </StrictMode>
          </div>
        </body>
      </html>,
      {
        onAllReady() { pipe(writable); },
        onError: reject,
      },
    );
  });
}

export { siteUrl, landingImages } from './config/landing';
export { pages } from './config/routes';
