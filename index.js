const args = process.argv.slice(2);
const flags = {
  version: 'v0.0.1',
  help: `Доступные команды:
--help    — печатает этот текст;
--version — печатает версию приложения;`,
  default: `Привет пользователь!
Эта программа будет запускать сервер «Кексобукинг».
Автор: Никитенко Роман.`,
  error: (undefinedFlag) => {
    return `Неизвестная команда ${undefinedFlag}.
Чтобы прочитать правила использования приложения, наберите "--help"`;
  },
};

switch (args[0]) {
  case '--version':
    console.log(flags.version);
    break;

  case '--help':
    console.log(flags.help);
    break;

  case undefined:
    console.log(flags.default);
    break;

  default:
    console.error(flags.error(args.join(' ')));
    process.exit(1);
}
