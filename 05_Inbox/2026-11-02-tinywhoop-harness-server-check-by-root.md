---
date: 2026-11-02
from: TinyWhoopPlayground, подготовка параллельных веток R01 и D-57 (коммит 0ba78d7)
kind: code
status: open
---

# В прибор Template (`scripts/shot.mjs`, `servesThisProject`) — узнавать свой dev-сервер по корню папки, а не по имени пакета

**Почему.** Во втором worktree того же репозитория имя пакета совпадает, и драйверы прибора переиспользуют
сервер соседней папки, то есть меряют чужую ветку
([урок](../04_Lessons/2026-11-02-tinywhoop-worktree-shares-package-name.md)).

**Что именно сделать.** Перенести из `TinyWhoopPlayground` `rootPlugin`, `sameRoot` и новую
`servesThisProject` (`scripts/browser.mjs`; в Template проверка пока в `scripts/shot.mjs`), типы `scripts/browser.d.mts`, подключение `rootPlugin()` в
`vite.config.ts`. Заодно `.gitattributes` со строкой `playtests/*.jsonl merge=union`: две ветки, на которых
летали в один день, дописывают в один файл журнала.

**Чем рискуем, если не сделать.** Пока у проекта одна папка — ничем. Со второй — тихие измерения не того кода.
