import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { useI18n } from '../contexts/I18nContext';

// Durations and dial geometry from the Pocha web timer.
const durations = [15, 20, 25, 30, 35, 40, 45, 50, 55];
const clampIndex = (index: number) => Math.max(0, Math.min(durations.length - 1, index));
const mascotPath = '/assets/pocha/mascot/pocha-spin-wheel';
const keyboardSteps = new Map([
  ['ArrowUp', 1], ['ArrowRight', 1], ['ArrowDown', -1], ['ArrowLeft', -1],
  ['PageUp', 3], ['PageDown', -3],
]);
type Spin = 'top' | 'bot';
type Drag = {
  id: number;
  y: number;
  index: number;
  step: number;
  lastY: number;
  lastTime: number;
  velocity: number;
  option?: number;
};

export default function PomodoroWheel({ paused }: { paused: boolean }) {
  const { locale } = useI18n();
  const fr = locale === 'fr';
  const [position, setPosition] = useState(3);
  const [dragging, setDragging] = useState(false);
  const [spin, setSpin] = useState<Spin | null>(null);
  const index = useRef(3);
  const gesture = useRef<Drag | null>(null);
  const dial = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLVideoElement>(null);
  const bottom = useRef<HTMLVideoElement>(null);
  const spinTimeout = useRef<number | undefined>(undefined);
  const wheelTimeout = useRef<number | undefined>(undefined);
  const selected = durations[Math.round(position)];

  const move = useCallback((target: number) => {
    const next = clampIndex(target);
    const previous = index.current;
    index.current = next;
    setPosition(next);

    if (Math.round(next) !== Math.round(previous)) {
      setSpin(next > previous ? 'top' : 'bot');
      window.clearTimeout(spinTimeout.current);
      spinTimeout.current = window.setTimeout(() => setSpin(null), 720);
    }
  }, []);

  useEffect(() => {
    const element = dial.current;
    if (!element) return;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || gesture.current || !event.deltaY) return;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientHeight : 1);
      const next = clampIndex(index.current + delta / Math.max(15, element.clientHeight * .195));
      if (next === index.current) return;
      event.preventDefault();
      move(next);
      window.clearTimeout(wheelTimeout.current);
      wheelTimeout.current = window.setTimeout(() => move(Math.round(index.current)), 115);
    };

    element.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      element.removeEventListener('wheel', onWheel);
      window.clearTimeout(wheelTimeout.current);
      window.clearTimeout(spinTimeout.current);
    };
  }, [move]);

  useEffect(() => {
    const video = spin === 'top' ? top.current : spin === 'bot' ? bottom.current : null;
    if (!video || paused) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (motion.matches || document.hidden) {
        video.pause();
        return;
      }
      if (!video.hasAttribute('src')) video.src = `${mascotPath}-${spin}-loop.webm`;
      void video.play().catch(() => {});
    };
    sync();
    motion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      video.pause();
      if (video.readyState > 0) video.currentTime = 0;
      motion.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [spin, paused]);

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || gesture.current) return;
    const option = (event.target as Element).closest('[data-wheel-index]')?.getAttribute('data-wheel-index');
    window.clearTimeout(wheelTimeout.current);
    event.currentTarget.setPointerCapture(event.pointerId);
    gesture.current = {
      id: event.pointerId,
      y: event.clientY,
      index: index.current,
      step: Math.max(15, event.currentTarget.clientHeight * .195),
      lastY: event.clientY,
      lastTime: event.timeStamp,
      velocity: 0,
      option: option === undefined ? undefined : Number(option),
    };
    setDragging(true);
  }

  function drag(event: PointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    if (!start || event.pointerId !== start.id) return;
    const delta = event.clientY - start.y;
    if (Math.abs(delta) > 3) start.option = undefined;
    if (start.option === undefined) {
      const elapsed = event.timeStamp - start.lastTime;
      if (elapsed > 0) start.velocity = (event.clientY - start.lastY) / elapsed / start.step;
      start.lastY = event.clientY;
      start.lastTime = event.timeStamp;
      move(start.index + delta / start.step);
    }
  }

  function finish(event: PointerEvent<HTMLDivElement>, cancelled = false) {
    const start = gesture.current;
    if (!start || event.pointerId !== start.id) return;
    gesture.current = null;
    setDragging(false);
    const velocity = cancelled || event.timeStamp - start.lastTime > 100 ? 0 : start.velocity;
    const momentum = Math.max(-3, Math.min(3, velocity * 110));
    const nearest = Math.round(clampIndex(index.current + momentum));
    move(!cancelled && start.option !== undefined ? start.option : nearest);
  }

  function key(event: KeyboardEvent<HTMLDivElement>) {
    const step = keyboardSteps.get(event.key);
    const next = event.key === 'Home' ? 0
      : event.key === 'End' ? durations.length - 1
        : step === undefined ? undefined : Math.round(index.current) + step;
    if (next === undefined) return;
    event.preventDefault();
    window.clearTimeout(wheelTimeout.current);
    move(next);
  }

  return (
    <div className="pocha-wheel">
      <div
        ref={dial}
        className="pocha-wheel__dial"
        data-dragging={dragging}
        role="slider"
        tabIndex={0}
        aria-label={fr ? 'Durée de la session' : 'Session duration'}
        aria-valuemin={durations[0]}
        aria-valuemax={durations[durations.length - 1]}
        aria-valuenow={selected}
        aria-valuetext={`${selected} minutes`}
        aria-orientation="vertical"
        onKeyDown={key}
        onPointerDown={startDrag}
        onPointerMove={drag}
        onPointerUp={(event) => finish(event)}
        onLostPointerCapture={(event) => finish(event, true)}
        onPointerCancel={(event) => finish(event, true)}
      >
        <svg className="pocha-wheel__arc" viewBox="85 55 360 230" aria-hidden="true">
          <circle cx="470" cy="170" r="235" className="pocha-wheel__rim" />
          <circle cx="470" cy="170" r="235" className="pocha-wheel__edge" />
          {durations.map((minutes, option) => {
            const relative = option - position;
            const distance = Math.abs(relative);
            if (distance > 3.25) return null;
            const angle = Math.PI + relative * Math.PI / 9;
            const x = 470 + Math.cos(angle) * 157;
            const y = 170 + Math.sin(angle) * 157;
            const active = minutes === selected;

            return (
              <g
                key={minutes}
                data-wheel-index={option}
                className={active ? 'pocha-wheel__number is-selected' : 'pocha-wheel__number'}
                style={{
                  transform: `translate(${x}px, ${y}px) rotate(${relative * 14.4}deg)`,
                  opacity: active ? 1 : Math.max(.25, .67 - distance * .12),
                }}
              >
                {active && <path d="M-43 -9 L-27 0 L-43 9 Z" />}
                <text textAnchor="middle" dominantBaseline="central">{minutes}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="pocha-wheel__mascot" aria-hidden="true">
        <img src={`${mascotPath}-top-loop.webp`} alt="" width="220" height="220" loading="lazy" />
        <video ref={top} data-active={!paused && spin === 'top'} poster={`${mascotPath}-top-loop.webp`} muted playsInline loop preload="none" />
        <video ref={bottom} data-active={!paused && spin === 'bot'} poster={`${mascotPath}-bot-loop.webp`} muted playsInline loop preload="none" />
      </div>
    </div>
  );
}
