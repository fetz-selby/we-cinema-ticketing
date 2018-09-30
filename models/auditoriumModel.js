import {Sequelize} from 'sequelize';

export default class AuditoriumModel{

    model(config){
        const auditorium = config.define('auditorium', {
                auditorium_name: {
                    type: Sequelize.STRING,
                    set(val) {
                      this.setDataValue('auditorium_name', (val).trim().toUpperCase());
                    }  
                },
                movie_id: {
                    type: Sequelize.INTEGER
                },
                day:{
                    type: Sequelize.STRING
                },
                time: {
                    type : Sequelize.STRING
                },
                x_size: {
                    type: Sequelize.INTEGER
                },
                y_size:{
                    type: Sequelize.INTEGER
                },
                price: {
                    type: Sequelize.DOUBLE
                },
                status: {
                    type: Sequelize.STRING(1),
                    defaultValue:'A'
                }
            }, {underscored: true});
      
            return auditorium;
    }
}