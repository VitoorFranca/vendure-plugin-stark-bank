import { VendurePlugin, PluginCommonModule, LanguageCode } from '@vendure/core';
import { starkBankPaymentHandler } from './handlers/starkbank-payment-handler';

@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [
],
  configuration: config => {
    config.customFields.Order.push({
      name: "starkBankPluginPaymentMethodCode",
      type: 'string',
      public: true,
      options: [
        {
          value: 'PIX',
          label: [
            { languageCode: LanguageCode.en, value: 'PIX' },
            { languageCode: LanguageCode.pt_BR, value: 'PIX' }
          ]
        },
        {
          value: 'credit_card',
          label: [
            { languageCode: LanguageCode.en, value: 'Credit Card' },
            { languageCode: LanguageCode.pt_BR, value: 'Cartão de Crédito' }
          ]
        }
      ],
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'StarkBank Payment Method'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'Método de Pagamento do StarkBank'
        }
      ],
      description: [
        {
          languageCode: LanguageCode.en,
          value: 'Used internally by Promotion to calculate discount for order'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value:
          'Usado internamente para usar a condição de promoção baseada no método de pagamento do StarkBank'
        }
      ]
    });
    
    config.paymentOptions.paymentMethodHandlers.push(starkBankPaymentHandler);

    return config;
  },
})
export class StarkBankPlugin {}