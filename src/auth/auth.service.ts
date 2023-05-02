import { Injectable } from '@nestjs/common'
import { compareSync } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UserToken } from './models/UserToken'
import { UserPayload } from './models/UserPayload'
import { PersonService } from 'src/person/person.service'
import { Person } from 'src/person/entities/person.entity'

@Injectable()
export class AuthService {
	constructor(
		private readonly personService: PersonService,
		private readonly jwtService: JwtService
	) {}

	async login(user: Person): Promise<UserToken> {
		const payload: UserPayload = {
			sub: user.id,
			email: user.email,
			name: user.name
		}

		return {
			access_token: this.jwtService.sign(payload),
			sub: user.id,
			email: user.email,
			name: user.name
		}
	}

	async validateUser(email: string, password: string) {
		let user: Person
		try {
			user = await this.personService.findEmail(email)
		} catch (error) {
			return null
		}

		const isPasswordValid = compareSync(password, user.password)
		if (!isPasswordValid) return null

		return user
	}
}
