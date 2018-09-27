
import {Sequelize} from 'sequelize';

export default class CustomerPurchaseModel{

    model(config){
        const purchase = config.define('purchase', {
                customer_transaction_id: {
                    type: Sequelize.INTEGER
                },
                seat_id: {
                    type: Sequelize.INTEGER
                },
                status: {
                    type: Sequelize.STRING(1),
                    defaultValue:'A'
                }
            }, {underscored: true});
      
            return purchase;
    }
}