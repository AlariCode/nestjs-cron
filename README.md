# NestJS cron Module

![alt cover](https://github.com/AlariCode/nestjs-cron/raw/master/img/logo.jpg)

**More NestJS libs on [alariblog.ru](https://alariblog.ru)**

[![npm version](https://badgen.net/npm/v/nestjs-cron)](https://www.npmjs.com/package/nestjs-cron)
[![npm version](https://badgen.net/npm/license/nestjs-cron)](https://www.npmjs.com/package/nestjs-cron)
[![npm version](https://badgen.net/github/open-issues/AlariCode/nestjs-cron)](https://github.com/AlariCode/nestjs-cron/issues)
[![npm version](https://badgen.net/github/prs/AlariCode/nestjs-cron)](https://github.com/AlariCode/nestjs-cron/pulls)

NestJS cron package allows you easily setup cron for your controllers or services.

```bash
npm i nestjs-cron
```

Then register module in your root app.module

```javascript
import { CronModule } from 'nestjs-cron';

@Module({
	imports: [
		// ...
		CronModule.forRoot(),
	],
})
export class AppModule {}
```

To use cron, decorate your class with `@Scheduled()` and method with `@Cron()`

```javascript
import { Cron, Scheduled } from 'nestjs-cron';

@Scheduled()
export class MyClass {
	@Cron('* * * * * *')
	async myMethod() {
		//...
	}
}
```

`'* * * * * *'` - is a standart cron notation. In this example it will be triggered every second.
Additionaly you can use options:

```javascript
@Cron('* * * * * *', {
	launchOnInit: true,
	sync: true,
})
```

-   launchOnInit - Launch job one time right after start
-   sync - Wait for method to finish before launching next tick if your function takes more time then cron.
