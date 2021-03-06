import {Sequelize} from 'sequelize';

export default class SeatModel{

    model(config){
        const seat = config.define('seat', {
                row: {
                    type: Sequelize.INTEGER
                },
                column: {
                    type: Sequelize.INTEGER
                },
                auditorium_id:{
                    type : Sequelize.INTEGER
                },
                status: {
                    type : Sequelize.ENUM,
                    values : ['P', 'B', 'A'],
                    defaultValue : ['A']
                }
            }, {underscored: true});
      
            return seat;
    }
}