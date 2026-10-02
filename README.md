# Docs — общая база знаний проектов Games

Здесь лежит то, что нужно больше чем одному проекту: чем проекты являются, какие практики
где уже работают, что выучено в одном и пригодится в другом, какой код общий. Всё, что
касается одного проекта, живёт в его собственном `Docs/`, а сюда попадает ссылкой.

Агенты узнают об этой папке из `C:\Projects\Games\CLAUDE.md`. Claude Code подгружает его в
любой чат, открытый в любом проекте внутри `Games`, поэтому сами проекты менять не нужно.

## Разделы

| папка | что внутри | кто пишет |
| --- | --- | --- |
| [00_Reference](00_Reference/) | стек, инструменты, настройка MCP | владелец |
| [01_Projects](01_Projects/README.md) | карточка на каждый проект и их родословная | владелец; агент правит только статус **своего** проекта |
| [02_Practices](02_Practices/README.md) | практики процесса и измерений, таблица «практика × проект» | владелец, по предложениям из Inbox |
| [03_Ideas](03_Ideas/) | идеи будущих игр | владелец |
| [04_Lessons](04_Lessons/README.md) | уроки, которые переходят из проекта в проект | **агенты** и владелец |
| [05_Inbox](05_Inbox/README.md) | предложения агентов владельцу | **агенты** |
| [06_Code](06_Code/README.md) | каталог общего кода и насколько разошлись его копии | владелец, по предложениям из Inbox |
| `Projects/` | ссылки (junction) на `Docs/` каждого проекта, чтобы Obsidian видел всё в одном хранилище | не в git |
| [scripts](scripts/) | `survey.mjs`: таблицы практик и расхождения кода | — |

## Как следить за тем, что пишут агенты

Агенты в `Docs/` ничего не коммитят. Всё, что они записали, видно так:

```bash
git -C C:/Projects/Games/Docs status
git -C C:/Projects/Games/Docs diff
```

Урок оставляем, правим или удаляем. Предложение из Inbox принимаем (и переносим суть в
Practices, Code или карточку) либо отклоняем. После этого коммит. Если агенты пишут не то
или не туда, правила меняются в двух местах: в `C:\Projects\Games\CLAUDE.md` (что читает
агент) и в README нужного раздела (формат).

## Обновить таблицы

```bash
cd C:/Projects/Games/Docs
node scripts/survey.mjs            # практики и код
node scripts/survey.mjs practices
node scripts/survey.mjs code
```

Вывод вставляется в [02_Practices](02_Practices/README.md) и [06_Code](06_Code/README.md)
на место старого снимка, с датой.

## Ссылки на Docs проектов

`Projects/<Name>` — это junction на `C:\Projects\Games\<Name>\Docs`. Ссылки не хранятся в
git, поэтому на новой машине их надо создать заново (PowerShell, прав администратора не нужно):

```powershell
foreach ($n in 'Tic-tac-toe','Rubiks-cube','Darts','Golf','Template','Nature','TinyWhoopPlayground') {
  New-Item -ItemType Junction -Path "C:\Projects\Games\Docs\Projects\$n" -Target "C:\Projects\Games\$n\Docs"
}
```

Для нового проекта: создать такую же ссылку, написать карточку в `01_Projects/` и добавить
имя в список `PROJECTS` в `scripts/survey.mjs`.
