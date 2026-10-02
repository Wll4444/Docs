# Проекты

Карточка отвечает на три вопроса: что это за проект, где в нём что лежит и что из него
может взять другой проект. Статус в карточке занимает одну-две строки и ссылается на
журнал проекта. Числа в карточку не копируются: они живут в проекте, который их измерил.

| проект | что это | стек | начат | статус (2026-09-30) |
| --- | --- | --- | --- | --- |
| [Tic-tac-toe](Tic-tac-toe.md) | крестики-нолики на кубе 3×3×3 | R3F, Zustand | 2026-04 | не развивается с 2026-05-01 |
| [Rubiks-cube](Rubiks-cube.md) | Gryning — кубик Рубика с подсказками | R3F, Zustand | 2026-05 | сборка для itch.io, 2026-06-22 |
| [Darts](Darts.md) | метательная трилогия: дартс → лук → ножи | R3F, Rapier, Zustand | 2026-06 | журнал до этапа 19 (лук) |
| [Golf](Golf.md) | 3D-гольф, три лунки | R3F, Rapier, Zustand | 2026-09-11 | шесть этапов игры, очередь долга пуста |
| [Template](Template.md) | шаблон прототипов с демо-броском | R3F, Rapier, Zustand | 2026-09-18 | харнесс A–C, debt-05 |
| [Nature](Nature.md) | песочница: рельеф, биомы, растительность | R3F, Rapier, Zustand | 2026-09-25 | этап 4 (трава) |
| [TinyWhoopPlayground](TinyWhoopPlayground.md) | симулятор полёта FPV-вупа с настоящего пульта | R3F, Rapier, Zustand, Gamepad API | 2026-10-01 | этап 1 (2026-10-02), следующий — ввод с пульта |

Cursor использовался только в двух первых проектах, дальше вся работа идёт в Claude Code.

Версии библиотек у всех одинаковые: React 19, three 0.184, R3F 9, Drei 10, Rapier 2,
Zustand 5, Vite 8.

## Родословная

Восстановлена по первым коммитам и журналам. Код и практики переходили так:

```
Tic-tac-toe ──► Rubiks-cube ──► Darts ──► Template (демо: кольцевая мишень)
 (Cursor)        (Cursor →         │            ▲     │
                  Claude Code)     │            │     └──► Golf ──► Nature
                                   │            └── обратно: реестр долга, план харнесса,
                                   │                журнал с оглавлением (из Golf)
                                   └── каркас взят из Rubiks-cube, плюс физика

Template ──► TinyWhoopPlayground (копия после харнесса E, 2026-10-01)
```

- Darts: «the framework is being transferred from the sibling `Rubiks-cube` project».
- Template: первый коммит «Template project based on Darts».
- Golf: демо-слайс шаблона (кольцевая мишень) удалён на этапе 1.
- Nature: «Stage 0 — the template from Golf».
- TinyWhoopPlayground: копия Template после `harness-e` (2026-09-30), `/new-prototype`, 2026-10-01.
- Template, журнал: из Golf пришли реестр долга, план харнесса и журнал в нынешнем виде.

## Не описаны

В `C:\Projects\Games` есть ещё `Cube`, `Godot`, `HelloWorld`, `Krakout3dGodot`,
`Tic-tac-toe-2d`, `Tutorials`. Если какой-то из них станет живым, ему нужна карточка
(порядок действий — в [README хранилища](../README.md)).
