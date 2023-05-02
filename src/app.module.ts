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
	providers: [AppService]
})
export class AppModule {}
