<!-- Если читаете файл в VSCode — нажмите ctrl+shift+v, чтобы включить режим просмотра. Для macOS — cmd+shift+v. -->

# Практические задания sukharev.io 🧮 🏗 💻

Задания для самостоятельной практики в рамках учебника — [sukharev.io](https://www.sukharev.io/textbook)

## Настройка окружения

Чтобы решать задачи — нужно писать программы. Чтобы компьютер мог выполнить эти программы — нужно настроить для него окружение.

Настройка состоит из двух шагов:

1. Установка **Java Development Kit** (JDK), чтобы запустить симулятор железа компьютера. Симулятор в котором собирается компьютер написан на Java. JDK — это программа, которая позволяет выполнять Java код.
2. Установка **редактора кода**, чтобы писать в нем программы. Редактор кода — это такая же программа, как ворд. **Ворд** редактирует **текст**. **Редактор** кода редактирует **код**. Мы будем устанавливать VSCode, это обязательно, потому что для него написаны расширения, позволяющие выполнять практические задания.

## JDK

- Установите JDK — [https://www.oracle.com/java/technologies/javase-downloads.html](https://www.oracle.com/java/technologies/javase-downloads.html). Сайт официальный. Скриншот-инструкция ниже:

![Инструкция — как установить JDK (кликните на ссылку с зажатым ctrl или cmd для macOS)](/img/how2download-jdk.png)

### Установка переменных окружения (обязательно для Windows)

1. Откройте «Панель управления» (Control Panel), затем «Система» (System).
2. Кликните в «Расширенные настройки» (Advanced), а потом «Переменные окружения» (Environment Variables).
3. Кликните «Редактировать переменные окружения» (Edit the system environment variables). Далее кликните «Новая» (New).
4. В Системных переменных (System Variables) добавьте две новые переменные JRE_HOME и JAVA_HOME.
5. В каждую переменную запишите адрес до папки `bin` из JDK, которую вы только что установили. Обычно `bin` папка в JDK устанавливается по адресу `C:\Program Files\Java\jdk-9\bin`.

Если у вас Windows и в процессе выполнения задач вы столкнетесь с ошибкой `You need to install [Java Runtime Environment] First. [Done] Comparison Failure with code=2` — значит вы неправильно установили переменные. Перечитайте этот раздел и выполните шаги еще раз. Если ничего не помогает — пишите в на почту [help@sukharev.io](mailto:help@sukharev.io).

## Редактор кода

[Установите редактор кода — VSCode](https://code.visualstudio.com/download)

Далее, откройте VSCode и установите расширения Nand2Tetris авторов roblourens и leafvmaple. Скриншот-инструкция ниже.

![Инструкция — как скачать расширения для VSCode (кликните на ссылку с зажатым ctrl или cmd для macOS)](/img/how2download-vscode_extensions.png)

## Задачи

После настройки скачайте zip архив с задачами.

В архиве 12 проектов. Один проект — один уровень строения компьютера.

Ниже скриншот, как скачать архив.

![Инструкция — как скачать проекты (кликните на ссылку с зажатым ctrl или cmd для macOS)](/img/how2download-zip.png)

## Вопросы

Все вопросы задавайте в телеграм группе [@sukharev_community](https://www.t.me/sukharev_community) или отправляйте на почту [help@sukharev.io](mailto:help@sukharev.io).

## Далее

Перед выполнением проектов, почитайте — [как писать HDL код](https://github.com/di-sukharev/computer/tree/master/projects/README.md). HDL — это язык на котором проектируется железо компьютера, мы используем его в четырех проектах, чтобы собрать компьютер.

## Лицензия

Практические задачи доступны по лицензии [Creative Common Attribution-NonCommercial-ShareAlike 3.0 Unported License](https://creativecommons.org/licenses/by-nc-sa/3.0/) в рамках книги «The Elements of Computing Systems». Спасибо авторам — Ноаму Нисану (Noam Nisan) и Шимону Шокену (Shimon Schocken) ❤️
