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
				type: 'mysql',
				url: configService.get('DATABASE_URL'),
				// entities: [__dirname + '/../**/*.entity.ts'],
				entities: [Person, Address, Annotation],
				ssl: { rejectUnauthorized: true },
				logging: true
				// synchronize: true
			})
		})
	]
})
export class DatabaseModule {}
