import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
    constructor(private httpService: HttpService) {}

    async payment() {
        this.httpService.request({
            url: 'https://api.mercadopago.com/v1/payments',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + process.env.MERCADOPAGO_TOKEN,
            },
            data: {
                token: '',
                description: 'Payment for product',
                external_reference: 'MP0001',
                installments: 1,
                payer: {
                    entity_type: 'individual',
                    type: 'customer',
                    identification: {},
                },
                payment_method_id: 'visa',
                transaction_amount: 58.8,
            },
        });
    }
}
