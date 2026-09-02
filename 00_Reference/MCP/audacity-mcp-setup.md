# Установка MCP сервера Audacity для Claude Code (VS Code)

Инструкция для настройки на **новом компьютере** — повторяет рабочую конфигурацию,
уже проверенную на первом. Claude Desktop и Claude Code (CLI/VS Code) читают
**разные** конфиги, поэтому даже если Desktop уже настроен, для VS Code нужен
отдельный шаг.

## Требования

- Windows 10/11
- [Python 3.10+](https://www.python.org/downloads/) (проверено на 3.13)
- Audacity **3.x** (4.x пока не поддерживается сервером)
- Claude Code (`claude` в PATH — устанавливается вместе с VS Code расширением)

---

## Шаг 1 — Получение исходников AudacityMCP

```powershell
git clone https://github.com/xDarkzx/Audacity-MCP.git C:\Dev\Audacity-MCP
```

Можно и без git — скачать ZIP с [страницы репозитория](https://github.com/xDarkzx/Audacity-MCP)
и распаковать в `C:\Dev\Audacity-MCP`. Путь не обязан быть именно таким, но
дальнейшие команды в этой инструкции используют его — поменяй везде на свой,
если распаковал в другое место.

---

## Шаг 2 — Установка через install.bat

```powershell
cd C:\Dev\Audacity-MCP
.\install.bat
```

Скрипт сам:
1. Проверяет Python (или ставит через winget)
2. Ставит пакет `audacity-mcp` через `pip install .` **из этой локальной папки**
   (не тянет ничего с PyPI/GitHub)
3. Включает `mod-script-pipe` в конфиге Audacity (`%APPDATA%\audacity\audacity.cfg`)
4. Настраивает **Claude Desktop** автоматически — но не Claude Code, это отдельный шаг 4

> ⚠️ Если запускаешь из активного venv — скрипт предупредит и остановится.
> Деактивируй venv (`deactivate`) и запусти заново: пакет должен ставиться в
> глобальный Python, чтобы GUI-приложения его нашли.

Хочешь сначала посмотреть, что скрипт сделает, ничего не меняя:
```powershell
.\install.bat --dry-run
```

---

## Шаг 3 — Проверка mod-script-pipe (если install.bat не смог включить сам)

1. Открой Audacity → **Edit → Preferences → Modules**
2. Выставь `mod-script-pipe` → **Enabled**
3. Перезапусти Audacity

Без этого сервер не сможет подключиться к Audacity вообще (не проблема Claude —
это способ, которым AudacityMCP управляет Audacity).

---

## Шаг 4 — Регистрация сервера в Claude Code

Это ключевой шаг, которого нет в `install.bat` — он настраивает только Claude
Desktop. Для Claude Code сервер нужно зарегистрировать через CLI.

Сначала узнай точный путь к установленной команде — GUI-приложения (и иногда
терминал VS Code) не всегда видят тот же PATH, что обычный терминал, поэтому
надёжнее не полагаться на голое имя `audacity-mcp`, а взять полный путь:

```powershell
python -c "import sysconfig; print(sysconfig.get_path('scripts'))"
```

Это выведет что-то вроде `C:\Python313\Scripts`. Добавь к нему `\audacity-mcp.exe`
и зарегистрируй сервер:

```powershell
claude mcp add --scope user audacity -- "C:\Python313\Scripts\audacity-mcp.exe"
```

(поправь путь на то, что реально вывела предыдущая команда). `--scope user` —
сервер будет доступен во всех проектах на этом компьютере, как и в Desktop.

---

## Шаг 5 — Проверка подключения

1. Открой/запусти Audacity (сервер общается через named pipe — Audacity должен
   быть уже открыт, сам он его не запускает)
2. Проверь регистрацию:
   ```powershell
   claude mcp get audacity
   ```
   Должно быть `Status: ✓ Connected`
3. Перезапусти/открой новый чат Claude Code в VS Code — уже запущенная сессия
   не подхватит новый сервер на лету
4. Спроси в чате что-то вроде «покажи информацию о текущем проекте в Audacity»

---

## Частые проблемы

| Ошибка | Причина | Решение |
|--------|---------|---------|
| `Failed to connect` сразу после `claude mcp add` | Audacity не запущен, или `mod-script-pipe` выключен | Открыть Audacity, проверить Шаг 3 |
| `claude mcp add` пишет `Invalid environment variable format` | `-e` — variadic-флаг, «съедает» следующий позиционный аргумент, если он не в формате `KEY=value` | Ставить имя сервера **перед** `-e`: `claude mcp add --scope user audacity -e KEY=value -- ...` |
| Команда `audacity-mcp` не находится (`No such file or directory`), хотя `install.bat` отработал без ошибок | Scripts-папка Python не в PATH того процесса, который запускает MCP-сервер | Использовать полный путь из Шага 4 вместо голого `audacity-mcp` |
| В Claude Desktop работает, а в Claude Code — нет | Это два разных конфига, Claude Code не читает `claude_desktop_config.json` | Выполнить Шаг 4 (регистрация отдельно для Claude Code) |
| Пакет не ставится через pip / хочется запускать прямо из исходников без `install.bat` | Иногда осознанный выбор (например, для разработки самого MCP-сервера) | См. раздел «Альтернатива» ниже |

---

## Альтернатива: без pip-установки, прямо из исходников

Если по какой-то причине пакет не устанавливается через pip (или это осознанный
выбор — например, для отладки самого сервера), можно указать Claude Code
запускать модуль напрямую из папки с исходниками. Так изначально был настроен
первый компьютер:

```powershell
claude mcp add --scope user audacity -e "PYTHONPATH=C:\Dev\Audacity-MCP" -- "C:\Python313\python.exe" -m audacity_mcp.main
```

`PYTHONPATH` указывает на папку с исходниками (`C:\Dev\Audacity-MCP`), чтобы
`python -m audacity_mcp.main` мог найти пакет `audacity_mcp`, даже если он не
установлен через pip. Поправь пути `python.exe` и `PYTHONPATH` под свою систему.

Соответствующий JSON (для сравнения, если редактируешь конфиг вручную —
пример из `claude_desktop_config.json` на первом компьютере):

```json
{
  "mcpServers": {
    "audacity": {
      "command": "C:\\Python313\\python.exe",
      "args": ["-m", "audacity_mcp.main"],
      "cwd": "C:\\Dev\\Audacity-MCP"
    }
  }
}
```

Claude Code (`claude mcp add`) не поддерживает поле `cwd` напрямую — `PYTHONPATH`
через `-e` даёт тот же результат для `python -m ...`.

---

## Управление сервером

```powershell
claude mcp list              # список серверов + статус подключения
claude mcp get audacity      # подробности + команда для удаления
claude mcp remove audacity --scope user   # удалить и настроить заново
```

## Ссылки

- Репозиторий: https://github.com/xDarkzx/Audacity-MCP
- Полный гайд по установке (все ОС и клиенты): `docs/INSTALLATION.md` в репозитории
- Справочник инструментов: `docs/TOOLS.md` в репозитории
