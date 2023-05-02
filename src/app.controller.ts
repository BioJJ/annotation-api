import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { CurrentUser } from './auth/decorators/current-user.decorator'
import { Person } from './person/entities/person.entity'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello()
	}
	@Get('/me')
	getMe(@CurrentUser() currentUser: Person) {
		return currentUser
	}
}
