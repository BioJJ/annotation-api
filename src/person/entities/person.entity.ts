import { Address } from 'src/address/entities/address.entity'
import { Annotation } from 'src/annotation/entities/annotation.entity'
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	ManyToOne,
	OneToMany,
	BeforeInsert,
	JoinColumn
} from 'typeorm'
import { hashSync } from 'bcrypt'

@Entity()
export class Person {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column()
	email: string

	@Column()
	password: string

	@Column({ name: 'mother_name' })
	motherName: string

	@Column({ name: 'father_name' })
	fatherName: string

	@ManyToOne(() => Address, (address) => address.person)
	address: Address

	@OneToMany(() => Annotation, (annotation) => annotation.person)
	annotation: Annotation[]

	@Column({ name: 'date_of_birth' })
	dateBirth: string

	@Column({ default: true })
	status: boolean

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
		name: 'deleted_at'
	})
	deletedAt: Date

	@BeforeInsert()
	hashPassword() {
		this.password = hashSync(this.password, 10)
	}
}
