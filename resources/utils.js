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

export function getExpiry(hours){
    let date = new Date();
    date.setMinutes(new Date().getMinutes()+(60*hours));

    return date;
}

export function generateCode() {
    let firstPart = (Math.random() * 46656) | 0;
    let secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}