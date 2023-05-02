import { Injectable, NotFoundException } from '@nestjs/common'
import { CreatePersonDto } from './dto/create-person.dto'
import { UpdatePersonDto } from './dto/update-person.dto'
import { Person } from './entities/person.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AddressService } from 'src/address/address.service'

@Injectable()
export class PersonService {
	constructor(
		@InjectRepository(Person)
		private readonly personRepository: Repository<Person>,
		private readonly addressService: AddressService
	) {}

	async create(createPersonDto: CreatePersonDto): Promise<Person> {
		const person = this.personRepository.create(createPersonDto)

		person.address = await this.addressService.create(
			await this.getAddress(createPersonDto.cep)
		)

		return await this.personRepository.save(person)
	}

	async update(id: number, updatePersonDto: UpdatePersonDto) {
		const person = await this.findOne(id)

		if (updatePersonDto.cep != null) {
			person.address = await this.addressService.create(
				await this.getAddress(updatePersonDto.cep)
			)
		}

		this.personRepository.merge(person, updatePersonDto)
		await this.personRepository.save(person)
	}

	private async getAddress(cep: string) {
		return await this.addressService.fetchViaCepService(cep)
	}

	async findAll(): Promise<Person[]> {
		return await this.personRepository.find({
			select: [
				'id',
				'name',
				'email',
				'motherName',
				'fatherName',
				'dateBirth',
				'address'
			],
			where: { status: true },
			relations: {
				address: true
			}
		})
	}

	async findOne(id: number): Promise<Person> {
		const person = await this.personRepository.findOneOrFail({
			select: [
				'id',
				'name',
				'motherName',
				'fatherName',
				'dateBirth',
				'status',
				'address'
			],
			where: { id },
			relations: {
				address: true
			}
		})

		if (!id) {
			throw new NotFoundException(`Não achei um Pessoa com o id ${id}`)
		}
		return person
	}

	async findEmail(email: string): Promise<Person> {
		const user = await this.personRepository.findOneOrFail({
			select: ['id', 'name', 'email', 'status', 'password'],
			where: { email }
		})

		if (!user) {
			throw new NotFoundException(`Não achei um usuario com o Email ${user}`)
		}
		return user
	}
	async remove(id: number): Promise<void> {
		await this.findOne(id)

		if (!id) {
			throw new NotFoundException(`Não achei um Pessoa com o id ${id}`)
		}
		this.personRepository.softDelete({ id })
	}
}
