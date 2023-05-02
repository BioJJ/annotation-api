import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateAnnotationDto } from './dto/create-annotation.dto'
import { UpdateAnnotationDto } from './dto/update-annotation.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Annotation } from './entities/annotation.entity'
import { Repository } from 'typeorm'
import { PersonService } from 'src/person/person.service'
import { Person } from 'src/person/entities/person.entity'

@Injectable()
export class AnnotationService {
	constructor(
		@InjectRepository(Annotation)
		private readonly annotationRepository: Repository<Annotation>,
		private readonly personService: PersonService
	) {}
	async create(createAnnotationDto: CreateAnnotationDto): Promise<Annotation> {
		await this.findUserById(createAnnotationDto.person.id)

		const annotation = this.annotationRepository.create(createAnnotationDto)
		return await this.annotationRepository.save(annotation)
	}

	async update(
		id: number,
		updateAnnotationDto: UpdateAnnotationDto
	): Promise<void> {
		const person = await this.findOne(id)

		this.annotationRepository.merge(person, updateAnnotationDto)
		await this.annotationRepository.save(person)
	}

	private async findUserById(userId: number): Promise<Person> {
		const person = await this.personService.findOne(userId)
		if (!person) {
			throw new NotFoundException(`Não achei pessoa com o id ${userId}`)
		}
		return person
	}

	async findAll(): Promise<Annotation[]> {
		return await this.annotationRepository.find({
			select: ['id', 'title', 'description', 'status', 'person'],
			relations: {
				person: true
			}
		})
	}

	async findOne(id: number): Promise<Annotation> {
		const product = await this.annotationRepository.findOneOrFail({
			select: ['id', 'title', 'description', 'status', 'person'],
			where: { id },
			relations: {
				person: true
			}
		})

		if (!id) {
			throw new NotFoundException(`Não achei uma anotação com o id ${id}`)
		}
		return product
	}

	async remove(id: number): Promise<void> {
		await this.findOne(id)

		if (!id) {
			throw new NotFoundException(`Não achei uma anotação com o id ${id}`)
		}
		this.annotationRepository.softDelete({ id })
	}
}
