import {
    LanguageCode,
    PaymentMethodHandler,
} from '@vendure/core';
import { StarkBankService } from '../service/starkbank.service';

export const starkBankPaymentHandler = new PaymentMethodHandler({
    code: 'stark-bank-pix',
    description: [{ languageCode: LanguageCode.en, value: 'Stark Bank PIX' }],
    args: {
        privateKey: { type: 'string' },
        workspaceId: { type: 'string' },
        environment: { type: 'string' },
    },
    createPayment: async (ctx, order, amount, args) => {
        try {
            const starkBankService = new StarkBankService({
                environment: args.environment,
                id: args.workspaceId,
                privateKey: args.privateKey
            });
            
            const payment = await starkBankService.createPixPayment(order);

            return {
                amount: order.totalWithTax,
                state: 'Authorized',
                transactionId: payment.id,
                metadata: {
                    pixUrl: payment.brcode,
                    pixQrCode: payment.brcode,
                },
            };
        } catch (error: any) {
            console.error(`Erro ao processar pagamento: ${error}`);
            return {
                amount: order.totalWithTax,
                state: 'Declined',
                transactionId: '',
                metadata: {
                    errorMessage: error.message,
                },
            };
        }
    },
    settlePayment: async (ctx, order, payment, args) => {
        try {
            const starkBankService = new StarkBankService({
                environment: args.environment,
                id: args.workspaceId,
                privateKey: args.privateKey
            });

            const pixPayment = await starkBankService.getPixPaymentStatus(payment.transactionId);

            if (pixPayment.status === 'paid') {
                return {
                    success: true,
                    metadata: {
                        paymentDate: pixPayment.updated,
                    },
                };
            } else {
                return {
                    success: false,
                    metadata: {
                        status: pixPayment.status,
                    },
                };
            }
        } catch (error: any) {
            console.error(`Erro ao verificar pagamento: ${error}`);
            return {
                success: false,
                metadata: {
                    errorMessage: error.message,
                },
            };
        }
    },
});