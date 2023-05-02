import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { AuthRequest } from '../models/AuthRequest'
import { Person } from 'src/person/entities/person.entity'

export const CurrentUser = createParamDecorator(
	(data: unknown, context: ExecutionContext): Person => {
		const request = context.switchToHttp().getRequest<AuthRequest>()

		return request.user
	}
)
