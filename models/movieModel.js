import {Sequelize} from 'sequelize';

export default class MovieModel{

    model(config){
        const movie = config.define('movie', {
                name: {
                    type: Sequelize.STRING
                },
                status: {
                    type: Sequelize.STRING(1),
                    defaultValue:'A'
                }
            }, {underscored: true});
      
            return movie;
    }
}