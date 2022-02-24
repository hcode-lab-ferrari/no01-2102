import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidId } from 'utils/validation-id';
import { CreatePaymentSituationDto } from './dto/create-payment-situation.dto';
import { UpdatePaymentSituationDto } from './dto/update-payment-situation.dto';

@Injectable()
export class PaymentSituationService {

  constructor(private prismaService: PrismaService) {}

  create(data: CreatePaymentSituationDto) {
    return this.prismaService.paymentSituation.create({
      data,
    });
  }

  findAll() {
    return this.prismaService.paymentSituation.findMany();
  }

  findOne(id: number) {
    return this.prismaService.paymentSituation.findUnique({
      where: {
        id: isValidId(id),
      },
    });
  }

  update(id: number, updatePaymentSituationDto: UpdatePaymentSituationDto) {
    return this.prismaService.paymentSituation.update({
      data: updatePaymentSituationDto,
      where: {
        id: isValidId(id),
      },
    });
  }

  remove(id: number) {
    return this.prismaService.paymentSituation.delete({
      where: {
        id: isValidId(id),
      },
    });
  }
}
