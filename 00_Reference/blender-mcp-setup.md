# Установка MCP сервера Blender для Claude

## Требования

- Windows 10/11
- [Python 3.12](https://www.python.org/downloads/)
- [uv](https://docs.astral.sh/uv/getting-started/installation/) — менеджер пакетов Python
- Blender 3.0+
- Claude Desktop

---

## Шаг 1 — Установка uv

Открой PowerShell и выполни:

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

Убедись, что `uvx.exe` доступен по пути `C:\Users\<ИМЯ_ПОЛЬЗОВАТЕЛЯ>\.local\bin\uvx.exe`.

---

## Шаг 2 — Исключение папки uv из Windows Defender

> ⚠️ Этот шаг обязателен. Windows Defender блокирует загружаемые `.whl` файлы в момент установки, что приводит к ошибке `os error 32`.

1. Открой **Безопасность Windows** → Защита от вирусов и угроз
2. Выбери **Параметры защиты от вирусов и угроз**
3. Прокрути вниз до раздела **Исключения** → нажми **Добавление или удаление исключений**
4. Нажми **Добавить исключение** → **Папка**
5. Укажи путь:
   ```
   C:\Users\<ИМЯ_ПОЛЬЗОВАТЕЛЯ>\AppData\Local\uv\
   ```

---

## Шаг 3 — Очистка кэша uv

Если ты уже пробовал запускать сервер и получал ошибки — очисти кэш:

```powershell
Remove-Item -Recurse -Force "$env:LOCALAPPDATA\uv\cache"
```

---

## Шаг 4 — Установка blender-mcp

Установи пакет постоянно через `uv tool install` (не через `uvx`, который пытается ставить зависимости при каждом запуске):

```powershell
uv tool install blender-mcp
```

---

## Шаг 5 — Настройка аддона в Blender

1. Скачай аддон со страницы [blender-mcp на GitHub](https://github.com/ahujasid/blender-mcp)
2. В Blender открой **Edit → Preferences → Add-ons → Install**
3. Выбери скачанный файл аддона
4. Активируй аддон и нажми **Start MCP Server** в панели аддона (порт по умолчанию: `9876`)

---

## Шаг 6 — Настройка Claude Desktop

Открой файл конфигурации Claude:

```
C:\Users\<ИМЯ_ПОЛЬЗОВАТЕЛЯ>\AppData\Roaming\Claude\claude_desktop_config.json
```

Добавь следующую конфигурацию:

```json
{
  "mcpServers": {
    "blender": {
      "command": "blender-mcp"
    }
  }
}
```

> 💡 Используй команду `blender-mcp` напрямую (не `uvx blender-mcp`), так как пакет уже установлен глобально на шаге 4.

---

## Шаг 7 — Проверка подключения

1. Перезапусти Claude Desktop
2. Убедись, что MCP сервер в Blender запущен
3. В Claude должен появиться значок 🔌 с инструментами Blender

---

## Частые проблемы

| Ошибка | Причина | Решение |
|--------|---------|---------|
| `os error 32` при установке pywin32 | Файл заблокирован антивирусом | Шаг 2 + очистить кэш (Шаг 3) |
| `Server transport closed unexpectedly` | Ошибка установки зависимостей | Повторить Шаги 2–4 |
| Claude не видит инструменты Blender | Blender аддон не запущен | Нажать **Start MCP Server** в Blender |
