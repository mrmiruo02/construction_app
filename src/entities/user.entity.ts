import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: null })
  password: string;

  @Column({ default: 'client' })
  role: 'client' | 'admin' | 'contructor' | 'supplier';

  @Column({ default: 'custom' })
  provider: 'custom' | 'google' | 'facebook' | 'twitter';
}
