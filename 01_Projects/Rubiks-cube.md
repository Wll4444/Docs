---
project: Rubiks-cube
path: C:\Projects\Games\Rubiks-cube
kind: игра (выпущена)
stack: R3F + Zustand, без физики
started: 2026-05-04
updated: 2026-09-30
---

# Rubiks-cube — Gryning

**Gryning** («рассвет» по-шведски) — интерактивный 3D-кубик Рубика. Вращение граней
перетаскиванием, клавиатура в стандартной нотации, отмена хода, перемешивание, таймер,
настройки, зеркала. Палитра «Morning / Calm» и тёплый утренний свет.

**Статус:** последний коммит 2026-06-22, сборка подготовлена к публикации на itch.io.
Путь: подсказки и авто-сборка (этапы 5–7, в том числе детектор стадий LBL) были
сделаны, а затем убраны перед выпуском v1 (2026-06-01). После этого шли редизайн v2 и
доработки v3–v4. Подробно в [журнале](../Projects/Rubiks-cube/02_Journal/).

## Где что

- `C:\Projects\Games\Rubiks-cube\CLAUDE.md` — архитектура: целочисленные позиции кубиков,
  перестановки цветов, анимация через временный pivot, `BOARD.md`
- [rubiks_cube_plan.md](../Projects/Rubiks-cube/01_Specs/rubiks_cube_plan.md)

## Что можно взять

- **Опыт с подсказками**: они строились дважды и дважды были убраны. Прежде чем делать
  подсказки в другой головоломке, стоит прочитать [план](../Projects/Rubiks-cube/01_Specs/layered_hints_plan.md)
  и журналы этапов 7.x, чтобы понять, почему так вышло.
- **Выпуск на itch.io**: [план](../Projects/Rubiks-cube/01_Specs/itch_release_plan.md),
  [сборка](../Projects/Rubiks-cube/02_Journal/itch-release-build.md) и папка `07_Releases/itch`.
  Это единственный проект, доведённый до сборки для выпуска.
- **Мобильную адаптацию**: [refinements-v3-stage-M-mobile](../Projects/Rubiks-cube/02_Journal/refinements-v3-stage-M-mobile.md).
- **i18n**: отсюда взят `src/i18n`, файлы `context.ts` и `LanguageProvider.tsx` почти без
  изменений живут во всех проектах после него, [R7-i18n](../Projects/Rubiks-cube/02_Journal/redesign-v2-stage-R7-i18n.md).
- **Анимацию поворота** через переподвешивание мешей во временную группу (описана в
  CLAUDE.md проекта).

## Происхождение

Второй проект после Tic-tac-toe, начат в Cursor. Его каркас стал основой для Darts.
