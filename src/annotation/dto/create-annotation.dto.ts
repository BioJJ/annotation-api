import { Person } from 'src/person/entities/person.entity'
import { IsNotEmpty } from 'class-validator'

export class CreateAnnotationDto {
	@IsNotEmpty()
	title: string

	@IsNotEmpty()
	description: string

	@IsNotEmpty()
	person: Person
}
