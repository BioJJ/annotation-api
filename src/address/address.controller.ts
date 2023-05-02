import { Controller, Get, Param } from '@nestjs/common'
import { AddressService } from './address.service'

@Controller('address')
export class AddressController {
	constructor(private readonly addressService: AddressService) {}
	@Get(':cep')
	findOne(@Param('cep') id: string) {
		return this.addressService.fetchViaCepService(id)
	}
}
