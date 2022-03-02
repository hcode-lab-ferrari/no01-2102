import {
    Injectable,
    CanActivate,
    ExecutionContext,
    BadRequestException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const authorization = request.headers['authorization'];
            const token = authorization.split(' ')[1];

            if (!token) {
                throw new BadRequestException('Token is required');
            }

            request.auth = await this.authService.decodeToken(token);

            request.user = await this.userService.get(request.auth.id);
        } catch (e) {
            return false;
        }

        return true;
    }
}
