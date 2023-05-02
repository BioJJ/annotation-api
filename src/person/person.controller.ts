import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete
} from '@nestjs/common'
import { PersonService } from './person.service'
import { CreatePersonDto } from './dto/create-person.dto'
import { UpdatePersonDto } from './dto/update-person.dto'
import { Person } from './entities/person.entity'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { IsPublic } from 'src/auth/decorators/is-public.decorator'

@IsPublic()
@Controller('person')
@ApiTags('Person')
export class PersonController {
	constructor(private readonly personService: PersonService) {}

	@Post()
	@ApiBody({ type: CreatePersonDto })
	async create(@Body() createPersonDto: CreatePersonDto): Promise<Person> {
		return await this.personService.create(createPersonDto)
	}

	@Get()
	async findAll(): Promise<Person[]> {
		return await this.personService.findAll()
	}

	@Get(':id')
	async findOne(@Param('id') id: number): Promise<Person> {
		return await this.personService.findOne(id)
	}

	@Patch(':id')
	@ApiBody({ type: UpdatePersonDto })
	async update(
		@Param('id') id: string,
		@Body() updatePersonDto: UpdatePersonDto
	): Promise<void> {
		return await this.personService.update(+id, updatePersonDto)
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<void> {
		return await this.personService.remove(+id)
	}
}
