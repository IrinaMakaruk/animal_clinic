import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import { User, UserCredentials } from '../entities';
import { CreateUserDto, LoginDto } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserCredentials)
    private readonly credentialsRepository: Repository<UserCredentials>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<{ user: User; token: string }> {
    const { username, email, password } = createUserDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { username }],
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = this.userRepository.create({
      id: uuidv4(),
      username,
      email,
    });

    const savedUser = await this.userRepository.save(user);

    // Create user credentials
    const credentials = this.credentialsRepository.create({
      userId: savedUser.id,
      password: hashedPassword,
    });

    await this.credentialsRepository.save(credentials);

    // Generate JWT token
    const token = this.jwtService.sign({
      sub: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
    });

    return { user: savedUser, token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    // Find user with credentials
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['userCredentials'],
    });

    if (!user || !user.userCredentials) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.userCredentials.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const token = this.jwtService.sign({
      sub: user.id,
      username: user.username,
      email: user.email,
    });

    return { token };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['userCredentials'],
    });

    if (user && user.userCredentials) {
      const isPasswordValid = await bcrypt.compare(password, user.userCredentials.password);
      if (isPasswordValid) {
        return user;
      }
    }

    return null;
  }
}