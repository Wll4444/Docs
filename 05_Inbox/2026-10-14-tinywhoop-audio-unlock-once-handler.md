---
date: 2026-10-14
from: TinyWhoopPlayground, ревью Codex этапа 7 (R1, долг D-24)
kind: code
status: open
---

# Разблокировка звука в Template: снимать обработчики жеста только после `running`, а не после первого события

**Почему.** `Template/src/audio/useGameSounds.ts` вешает `pointerdown` и `keydown` с `{ once: true }` и зовёт
`unlockAudio()`. Escape (и другие клавиши без активации по HTML) обработчик тратит, а `resume()` контекст не запускает: дальше
ни одна клавиша звук не включает, только клик. Codex воспроизвёл это в TinyWhoop в headless Chrome 154 с
`--autoplay-policy=document-user-activation-required` — `TinyWhoopPlayground/Docs/02_Journal/reviews/stage-07-codex.md`, R1.
В TinyWhoop это долг D-24 (`TinyWhoopPlayground/Docs/01_Specs/debt.md`), а не исправление: путь обхода есть. Код
шаблона копируется в каждый новый прототип вместе с дефектом. Харнесс шаблона идёт с флагом автовоспроизведения и
дефекта не видит. Урок — [2026-10-14-tinywhoop-gamepad-is-not-audio-gesture](../04_Lessons/2026-10-14-tinywhoop-gamepad-is-not-audio-gesture.md).

**Что именно сделать.** В `Template/src/audio/useGameSounds.ts` не ставить `{ once: true }`. Снимать оба обработчика, когда
контекст перешёл в `running` (`statechange`), либо не снимать вовсе: `resume()` на запущенном контексте безвреден. Проверка —
свежие страницы без флага автовоспроизведения: R; Escape → R; Escape → Space; клик. Читать настоящий `AudioContext`.

**Чем рискуем, если не сделать.** Игрок, первой нажавший Escape (выход из полноэкранного режима, закрытие меню), остаётся
без звука, пока не кликнет; в игре с подсказкой «нажмите клавишу» подсказка врёт. Каждый следующий прототип чинит это
заново или не замечает.
