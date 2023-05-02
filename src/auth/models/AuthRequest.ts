import { Request } from 'express'
import { Person } from '../../person/entities/person.entity'

export interface AuthRequest extends Request {
	user: Person
}
