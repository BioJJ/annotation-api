import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete
} from '@nestjs/common'
import { AnnotationService } from './annotation.service'
import { CreateAnnotationDto } from './dto/create-annotation.dto'
import { UpdateAnnotationDto } from './dto/update-annotation.dto'
import { ApiBody, ApiTags } from '@nestjs/swagger'

@Controller('annotation')
@ApiTags('annotation')
export class AnnotationController {
	constructor(private readonly annotationService: AnnotationService) {}

	@Post()
	@ApiBody({ type: CreateAnnotationDto })
	create(@Body() createAnnotationDto: CreateAnnotationDto) {
		return this.annotationService.create(createAnnotationDto)
	}

	@Get()
	findAll() {
		return this.annotationService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.annotationService.findOne(+id)
	}

	@Patch(':id')
	@ApiBody({ type: UpdateAnnotationDto })
	update(
		@Param('id') id: string,
		@Body() updateAnnotationDto: UpdateAnnotationDto
	) {
		return this.annotationService.update(+id, updateAnnotationDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.annotationService.remove(+id)
	}
}
