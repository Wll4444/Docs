# 🎮 Web GameDev Stack Cheat Sheet: Runner Edition

Краткий справочник по современному стеку для разработки казуальных 3D-игр в браузере (аналогов Subway Surfers).

---

## 🏗️ 1. Ядро (The Engine)

* **[Three.js](https://threejs.org/)** — Низкоуровневая обертка над WebGL. Работает с мешами, материалами, светом и матрицами.
* **[React-Three-Fiber (R3F)](https://docs.pmnd.rs/react-three-fiber)** — Декларативный мост. Позволяет строить сцену Three.js как дерево React-компонентов. Автоматически управляет жизненным циклом объектов (dispose).
* **[Drei](https://github.com/pmndrs/drei)** — Библиотека "полезностей" для R3F. Содержит готовые камеры, контроллеры, абстракции для шейдеров и текста.

## ⚙️ 2. Физика (Physics)

* **[Rapier.rs](https://rapier.rs/)** — Быстрый 2D/3D физический движок, написанный на Rust и работающий через WebAssembly (WASM).
    * **RigidBody**: Типы `dynamic`, `fixed`, `kinematicPositionBased`.
    * **Colliders**: Cuboid, Sphere, Capsule, Mesh.
    * **@react-three/rapier**: Интеграция Rapier в R3F. Позволяет оборачивать меши в физические тела.

## 🎨 3. Визуал и Стилизация (Shaders & VFX)

* **Custom Shaders**: Использование GLSL в `shaderMaterial` для создания эффектов:
    * *World Bending*: Искривление мира через модификацию `gl_Position.y` в Vertex Shader.
    * *Toon Shading*: Мультяшная заливка.
* **Post-processing**: Библиотека `@react-three/postprocessing`.
    * *Bloom*: Свечение.
    * *SSAO*: Мягкие тени на стыках.
    * *LUT (Look-Up Tables)*: Глобальная цветокоррекция палитры.

## 🕹️ 4. Игровая логика и Инструменты

* **[Zustand](https://github.com/pmndrs/zustand)** — Легковесный менеджер состояний. Идеален для хранения счета, состояния игры (MENU, PLAYING) и настроек, так как работает вне цикла рендеринга React.
* **[Leva](https://github.com/pmndrs/leva)** — GUI-панель в браузере для настройки параметров (скорость, гравитация, цвета) в реальном времени.
* **[Snapshot Interpolation](https://github.com/geckosio/snapshot-interpolation)** — Если планируется мультиплеер.

---

## 🛠️ Архитектурные паттерны для Runner

1.  **Object Pooling**: Переиспользование чанков дорожки и препятствий для избежания фризов из-за Garbage Collector.
2.  **Lane-based Movement**: Смена линий (Lanes) через `lerp` или `spring` анимацию, в то время как движение вперед константно.
3.  **Kinematic Controllers**: Использование кинематических тел для игрока, чтобы иметь "Unity-like" контроль над перемещением, сохраняя расчет коллизий.

---

## 🚀 Быстрый старт (Команды)

```bash
# Создание проекта (Vite + React)
npm create vite@latest my-game -- --template react

# Установка зависимостей
npm install three @types/three @react-three/fiber @react-three/drei @react-three/rapier leva zustand