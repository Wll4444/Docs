---
date: 2026-10-23
source: Nature, этап П-7, ревью Codex (`Nature/Docs/02_Journal/reviews/stage-p7-codex.md`, кандидат `f36a09a`)
tags: [tooling, harness, agents, testing]
applies: все проекты, где флаги передаются скрипту через `npm run <скрипт> -- --флаг` и команду может набрать агент или человек в Windows PowerShell
status: confirmed
---

# В Windows PowerShell `npm run x -- --флаг` теряет флаги: скрипт молча запускается без них

**Что было.** Codex на ревью П-7 Nature набрал в PowerShell `npm run shot -- --table --gpu --check`, и
харнесс запустил обычный сценарий `idle` вместо сверки калибровки. Код выхода был 0, так что пустой
прогон легко засчитать как проверку. Codex заметил подмену по выводу и засчитал только прямой вызов
`node scripts/shot.mjs …`.

Воспроизведено 2026-10-23 (PowerShell 5.1.19041, npm 11.12.1, Node из `C:\Program Files\nodejs`):
- `(Get-Command npm).Source` — `C:\Program Files\nodejs\npm.ps1`, то есть PowerShell запускает
  обёртку-скрипт, а не `npm.cmd`;
- `--` PowerShell съедает как конец параметров скрипта, и флаги уходят в сам npm;
- `npm run shot -- --table=bogus` печатает `npm warn Unknown cli config "--table"`, а дальше
  `> node scripts/shot.mjs` без флагов, и прибор начинает обычный прогон;
- `npm.cmd run shot -- --table=bogus` передаёт флаги: `> node scripts/shot.mjs --table=bogus` и
  отказ «expected quick or full» за секунду.

В Git Bash `npm run … -- …` работает. Все прогоны этапа шли через него, поэтому за два дня этапа ловушка не
проявилась.

**Почему важно другим.** Документы всех проектов семейства пишут команды как `npm run shot -- --флаг`
(`CLAUDE.md`, справочники харнесса), а агенты на Windows по умолчанию работают в PowerShell. Флаг, который
меняет, ЧТО мерится, перестаёт что-либо менять, и прибор честно меряет другое. Самопроверка флагов
(`--scenario`, `--view`, `--gpu`) этого не ловит: флаг до прибора не доходит, и проверять ему нечего. Остаётся
единственный след — предупреждение npm, которое легко пропустить. Сверка, «прошедшая» так, — критерий,
который проходит, пока дефект на месте.

**Как применить.**
- В PowerShell — `npm.cmd run <скрипт> -- --флаг` или прямой вызов `node scripts/<скрипт>.mjs --флаг`. Не
  `npm run … -- …`.
- Засчитывать прогон по тому, что прибор напечатал о себе: строка `> node scripts/shot.mjs …` с флагами,
  `--table (full) — N run(s)`, `verdict:`. Не по коду выхода.
- `npm warn Unknown cli config "--…"` в выводе означает, что флаги до скрипта не дошли.
- Где харнесс это позволяет: режим, который должен был включиться (`--table`, `--check`), печатает себя
  первой строкой. Тогда пропажа видна глазом.

## Подтверждения

- 2026-10-29, TinyWhoopPlayground, этап L09 ([отчёт](../../TinyWhoopPlayground/Docs/02_Journal/stage-l09-process-doc.md),
  находка 2): `npm run loading -- --preview` из PowerShell прошёл «6/6» с кодом 0 на dev вместо production — выдало только
  слово `(dev)` в строке итога; `npm run lint -- --version` вывел версию npm — флаг, известный npm, забирается молча, без
  `Unknown cli config`. Прямой `node scripts/loading.mjs --preview` — `(production)`. Ранее там же — ревью Codex L01b (`shot`).
