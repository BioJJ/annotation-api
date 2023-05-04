import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Person } from 'src/person/entities/person.entity'
import { Address } from 'src/address/entities/address.entity'
import { Annotation } from 'src/annotation/entities/annotation.entity'
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('POSTGRES_HOST'),
				port: configService.get('POSTGRES_PORT'),
				username: configService.get('POSTGRES_USER'),
				password: configService.get('POSTGRES_PASSWORD'),
				database: configService.get('POSTGRES_DB'),
				entities: [Address, Person, Annotation],
				synchronize: true,
				autoLoadEntities: true
				// logging: true
			})
		})
	]
})
export class DatabaseModule {}
