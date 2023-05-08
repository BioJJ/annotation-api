import { Controller, Get, Param } from '@nestjs/common'
import { AddressService } from './address.service'
import { Address } from './entities/address.entity'
import { IsPublic } from 'src/auth/decorators/is-public.decorator'

@IsPublic()
@Controller('address')
export class AddressController {
	constructor(private readonly addressService: AddressService) {}

	@Get(':cep')
	findOne(@Param('cep') id: string) {
		return this.addressService.fetchViaCepService(id)
	}

	@Get()
	async findAll(): Promise<Address[]> {
		return await this.addressService.findAll()
	}

	@Get('/save/:cep')
	create(@Param('cep') cep: string) {
		return this.addressService.save(cep)
	}
}
