import { Module } from '@nestjs/common'
import { AddressService } from './address.service'
import { AddressController } from './address.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Address } from './entities/address.entity'
import { HttpModule } from '@nestjs/axios'

@Module({
	imports: [TypeOrmModule.forFeature([Address]), HttpModule],
	controllers: [AddressController],
	providers: [AddressService],
	exports: [AddressService]
})
export class AddressModule {}
