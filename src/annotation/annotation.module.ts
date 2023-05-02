import { Module } from '@nestjs/common'
import { AnnotationService } from './annotation.service'
import { AnnotationController } from './annotation.controller'
import { PersonModule } from 'src/person/person.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Annotation } from './entities/annotation.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Annotation]), PersonModule],
	controllers: [AnnotationController],
	providers: [AnnotationService],
	exports: [AnnotationService]
})
export class AnnotationModule {}
