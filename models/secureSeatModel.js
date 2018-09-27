
import {Sequelize} from 'sequelize';

export default class SecureSeatModel{

    model(config){
        const secureSeat = config.define('secure_seat', {
                seat_id: {
                    type: Sequelize.INTEGER
                },
                token: {
                    type: Sequelize.STRING
                },
                gen_code: {
                    type: Sequelize.STRING
                },
                status: {
                    type: Sequelize.STRING(1),
                    defaultValue:'A'
                }
            }, {underscored: true});
      
            return secureSeat;
    }
}