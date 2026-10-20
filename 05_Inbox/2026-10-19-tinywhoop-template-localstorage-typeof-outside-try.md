---
date: 2026-10-19
from: TinyWhoopPlayground, этап L01b (отчёт `TinyWhoopPlayground/Docs/02_Journal/stage-l01b-main-menu.md`, находка 4)
kind: code
status: open
---

# Шаблон: читать `localStorage` целиком внутри `try`, вместе с `typeof`, — иначе игра не открывается в браузере без хранилища

**Почему.** В TinyWhoop (код настроек пришёл из Template) `audioStore.ts` и `qualityStore.ts` проверяли
`typeof localStorage === 'undefined'` до `try`, а `LanguageProvider.tsx` читал хранилище вовсе без `try`. Где браузер
отказывает в хранилище (заблокированы данные сайтов, некоторые приватные окна), бросает сам геттер `window.localStorage`, и
`typeof` его вызывает. Воспроизведено: init-скрипт, бросающий из геттера, — `SecurityError` при загрузке модулей, 0 canvas,
пустая страница; без блокировки — игра. В TinyWhoop исправлено на этапе L01b, проверка `npm run menu -- --only=storage`.

**Что именно сделать.** В Template: `src/store/audioStore.ts` (`loadPersisted`), `src/store/qualityStore.ts` (`readPersisted`),
`src/i18n/LanguageProvider.tsx` (`resolveInitialLang`) — перенести `typeof localStorage` внутрь `try`, чтение языка обернуть в
`try`. Проверить в браузере с геттером, который бросает; jsdom этого не покажет — его хранилище не бросает.

**Чем рискуем, если не сделать.** Каждый новый прототип от шаблона наследует пустую страницу у части игроков, и ни юниты, ни
харнесс этого не видят.
