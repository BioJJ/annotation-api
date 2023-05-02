import { Module } from '@nestjs/common'
import { PersonService } from './person.service'
import { PersonController } from './person.controller'
import { AddressModule } from 'src/address/address.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Person } from './entities/person.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Person]), AddressModule],
	controllers: [PersonController],
	providers: [PersonService],
	exports: [PersonService]
})
export class PersonModule {}
