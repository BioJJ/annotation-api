import { IsNotEmpty } from 'class-validator'
export class CreateAddressDto {
	@IsNotEmpty()
	cep: string
	@IsNotEmpty()
	street: string
	@IsNotEmpty()
	complement: string
	@IsNotEmpty()
	neighborhood: string
	@IsNotEmpty()
	city: string
	@IsNotEmpty()
	state: string
}
