# NestJS cron Module

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
