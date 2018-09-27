
import {Sequelize} from 'sequelize';

export default class CustomerDetailModel{

    model(config){
        const customer = config.define('customer_transaction', {
                fullname: {
                    type: Sequelize.STRING
                },
                card_number: {
                    type: Sequelize.STRING
                },
                expire_month: {
                    type: Sequelize.STRING
                },
                expire_year: {
                    type: Sequelize.STRING
                },
                code: {
                    type: Sequelize.STRING
                },
                cost: {
                    type: Sequelize.DOUBLE
                },
                status: {
                    type: Sequelize.STRING(1),
                    defaultValue:'A'
                }
            }, {underscored: true});
      
            return customer;
    }
}