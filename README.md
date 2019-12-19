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

To use cron, decorate your class with `@Scheduled()` and method with `@Cron()`.
Your class has to be a provider or a controller that is declared in any module.

```javascript
import { Cron, Scheduled } from 'nestjs-cron';

@Injectable()
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

## Cron Intercepter

To intercept cron you can use `@CronIntercepter` decorator. You pass class that implements `CronIntercepterClass` as a parameter. It has one `intercept` method that returns `Promise<boolean>`.

```javascript
export class MyIntercepter implements CronIntercepterClass {
	async intercept() {
		return false;
	}
}
```

Usage example:

```javascript
@Scheduled()
@Injectable()
export class AppService {
	@CronIntercepter(MyIntercepter)
	@Cron('* * * * * *')
	getHello() {
		console.log('test');
	}
}
```

If `intercept` method returns `true` your cron will run as planned. If false method run will be skipped.
