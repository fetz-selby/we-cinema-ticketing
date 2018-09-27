import _ from 'lodash';

export function isValidEmail(email){
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export function isNumbers(text){
    if(!(text.trim().length)){
        return false;
    }

    const tmpText = _.toArray(text.trim());
    const result = _.map(tmpText, (it)=>{
                        if(!(_.toUpper(it) === _.toLower(it) && it !== ' ')){
                            return false;
                        }
                    })

    return !(_.includes(result, false));
}