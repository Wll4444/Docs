---
project: Template
path: C:\Projects\Games\Template
kind: шаблон прототипов
stack: R3F + Rapier + Zustand
started: 2026-09-18
updated: 2026-09-30
---

# Template

Шаблон для браузерных 3D-прототипов. В нём уже собраны скриншот-харнесс, который гоняет
настоящую игру без окна, замеры кадров и утечек, уровни качества, i18n, аудио и
разбиение на слои, при котором игровая логика тестируется в Node. Работающее демо:
оттянуть, отпустить, бросить мяч в мишень из трёх колец, пять бросков за раунд.

**Статус:** этапы харнесса A–E и debt-05 (редьюсер броска) закрыты, долга на пороге нет.
Сверка харнесса с Golf и Nature закончена: D (2026-09-30) перенёс из Nature `npm run diff` и
таймер GPU, E (2026-09-30) — журнал звука в запись калибровки (`sounds`, T-14). Следующий этап
реестром не назначен. Подробно в [журнале](../Projects/Template/02_Journal/README.md).

## Где что

- `C:\Projects\Games\Template\CLAUDE.md` — правила, которые переживают смену игры: слои,
  R3F, физика, как измерять, как вести этап. Это самая полная версия общих правил.
- [demo-rules.md](../Projects/Template/06_Reference/demo-rules.md) — правила только демо
- [master_plan_TEMPLATE.md](../Projects/Template/01_Specs/master_plan_TEMPLATE.md) — заготовка плана прототипа
- [debt.md](../Projects/Template/01_Specs/debt.md) — реестр долга
- `/new-prototype <Name>` — превращает копию шаблона в новый прототип

## Что можно взять

Всё: шаблон для того и существует. **Это канонический источник общего кода** (см.
[06_Code](../06_Code/README.md)). Из того, чего пока нет больше нигде:

- **playlog**: запись того, что делал живой человек на dev-сервере, [playtest.md](../Projects/Template/06_Reference/playtest.md).
- **Мутационная проверка** `scripts/mutate.mjs`: ломает код и смотрит, краснеют ли тесты.
- **Окно ввода** в харнессе: [screenshot-harness.md](../Projects/Template/06_Reference/screenshot-harness.md).

## Происхождение

Первый коммит: «Template project based on Darts». Процесс (реестр долга, план харнесса,
журнал с оглавлением) пришёл из Golf.
