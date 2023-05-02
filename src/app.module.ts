import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PersonModule } from './person/person.module'
import { AddressModule } from './address/address.module'
import { HttpModule } from '@nestjs/axios'
import { AnnotationModule } from './annotation/annotation.module'
import { ConfigModule } from '@nestjs/config'
import * as Joi from '@hapi/joi'
import { DatabaseModule } from './database/database.module'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'

@Module({
	imports: [
		PersonModule,
		AddressModule,
		AnnotationModule,
		HttpModule,
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				DATABASE_URL: Joi.string().required(),
				PORT: Joi.number()
			})
		}),
		DatabaseModule,
		AuthModule
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard
		}
	]
})
export class AppModule {}
