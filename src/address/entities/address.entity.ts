import { Person } from 'src/person/entities/person.entity'
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	OneToMany
} from 'typeorm'

@Entity()
export class Address {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	cep: string

	@Column({ name: 'street' })
	logradouro: string

	@Column({ name: 'complement' })
	complemento: string

	@Column({ name: 'neighborhood' })
	bairro: string

	@Column({ name: 'city' })
	localidade: string

	@Column({ name: 'state' })
	uf: string

	@OneToMany(() => Person, (person) => person.address)
	person: Person[]

	@CreateDateColumn({
		type: 'timestamp',
		name: 'create_at',
		default: () => 'CURRENT_TIMESTAMP(6)'
	})
	createAt: Date

	@UpdateDateColumn({
		type: 'timestamp',
		name: 'update_at',
		default: () => 'CURRENT_TIMESTAMP(6)',
		onUpdate: 'CURRENT_TIMESTAMP(6)'
	})
	updateAt: Date

	@DeleteDateColumn({
		type: 'timestamp',
		name: 'deleted_at',
		default: () => 'CURRENT_TIMESTAMP(6)'
	})
	deletedAt: Date
}
