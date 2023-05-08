import { Injectable } from '@nestjs/common'
import { CreateAddressDto } from './dto/create-address.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Address } from './entities/address.entity'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class AddressService {
	constructor(
		@InjectRepository(Address)
		private readonly repository: Repository<Address>,
		private readonly httpService: HttpService
	) {}
	async create(createAddressDto: CreateAddressDto): Promise<Address> {
		const address = this.repository.create(createAddressDto)
		return await this.repository.save(address)
	}

	async save(cepWithLeftPad: string): Promise<Address> {
		const address: any = this.repository.create(
			await this.fetchViaCepService(cepWithLeftPad)
		)
		return await this.repository.save(address)
	}

	async findAll(): Promise<Address[]> {
		return await this.repository.find({
			select: [
				'id',
				'cep',
				'logradouro',
				'complemento',
				'bairro',
				'localidade',
				'uf'
			]
		})
	}

	async fetchViaCepService(cepWithLeftPad: string): Promise<any> {
		const url = `https://viacep.com.br/ws/${cepWithLeftPad}/json/`

		const config = {
			headers: {
				'Content-Type': `application/json`
			}
		}

		const response = await lastValueFrom(this.httpService.get(url, config))

		if (response.status === 200) {
			return response.data
			// this.extractCepValuesFromResponse(response.data)
		}
		// .then(this.analyzeAndParseResponse)
		// .then(this.checkForViaCepError)
		// .then(this.extractCepValuesFromResponse)
		// .catch(this.throwApplicationError)
	}

	analyzeAndParseResponse(response) {
		if (response) {
			return response.data
		}

		throw Error('Erro ao se conectar com o serviço ViaCEP.')
	}

	checkForViaCepError(responseObject) {
		if (responseObject.erro === true) {
			throw new Error('CEP não encontrado na base do ViaCEP.')
		}

		return responseObject
	}

	extractCepValuesFromResponse(responseObject) {
		const address: any = null
		console.log('responseObject', responseObject)
		if (responseObject.cep != null) {
			address.cep = responseObject.cep ?? ''
			address.state = responseObject.uf
			address.city = responseObject.localidade
			address.neighborhood = responseObject.bairro
			address.street = responseObject.logradouro
			address.complement = responseObject.complemento
		}

		console.log('adresss', address)
		const dto = this.repository.create(address)
		return dto
	}

	throwApplicationError(error) {
		// const serviceError = new ServiceError({
		// 	message: error.message,
		// 	service: 'viacep'
		// })
		// if (error.name === 'FetchError') {
		// 	serviceError.message = 'Erro ao se conectar com o serviço ViaCEP.'
		// }
		// throw serviceError
	}
}
