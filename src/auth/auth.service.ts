import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(user: RegisterDto) {
    const emailExist = await this.usersRepository.findOne({
      where: { email: user.email },
    });

    if (emailExist) {
      throw new ConflictException('Email already exists');
    }

    const phoneExist = await this.usersRepository.findOne({
      where: { phone: user.phone },
    });

    if (phoneExist) {
      throw new ConflictException('Phone number already exists');
    }

    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;

    const user = await this.usersRepository.findOne({
      where: { email },
    });

    const isUserFound = !!user;
    if (!isUserFound) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const token = await this.jwtService.signAsync(payload);

    const userResponse = {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
    };

    return {
      user: userResponse,
      token,
      message: 'Login successful',
    };
  }
}
