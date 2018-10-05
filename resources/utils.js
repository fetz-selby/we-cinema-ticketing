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

export function getHTMLSeats(seats){

    if(seats){
        let HTML = '';
        seats.map((seat)=>{
            const row = seat.row;
            const column = seat.column;

            HTML += `<div class='row'>
                <div class='qty-header'>${row}</div>
                <div class='unit-header'>${column}</div>
            </div>
            <div class='clearfix'></div>`
        });

        return HTML;
    }
}

export function generateCode() {
    let firstPart = (Math.random() * 46656) | 0;
    let secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}

export function getHTMLPaymentReciept(name, 
                                    card, 
                                    expiryDate,
                                    desc, 
                                    price, 
                                    numberSeats, 
                                    totalPrice, 
                                    genCode, 
                                    transactionId, 
                                    date,
                                    movie,
                                    time,
                                    auditorium,
                                    dySeats){

    return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
  <meta name="description" content=""/>
  <meta name="author" content=""/>
  <title>Payment Summary</title>
 
  <!-- Custom Style-->
  <style>
  hr{
            
}
.spacer{clear: both; height: 20px;}
.clearfix{clear: both; height: 0}
.container{
    width: 550px;
    padding: 10px;
}

.container .seat-label{
    float: left;
    font-size: 1em;
    letter-spacing: 1px;
    padding: 1px 0;
    color: #555555;
    font-style: italic; 
}

.container .title{
    float: left;
    font-size: 1.1em;
    padding: 5px 0;
    font-weight: 600;
    color: #333333;
}

.container .company{
    float: left;
    font-size: 1.1em;
    letter-spacing: 1px;
}

.container .date{
    float: right;
    font-size: 0.8em;
    color: #333333;
    letter-spacing: 1px;
}

.container .details-container {
    float: left;
    padding: 10px 0;
    width: 200px;
}

.container .details-container2 {
    float: right;
    padding: 10px 0;
    width: 200px;
}

.container .details-container .info{
    float: left;
    font-size: 0.8em;
    letter-spacing: 1px;
    padding: 1px 0;
    color: #555555;
    font-style: italic;
}

.container .details-container .info-highlite{
    float: left;
    font-size: 0.8em;
    font-weight: 600;
    letter-spacing: 1px;
    padding: 0 0 10px 0;
    color: #333333;
}

.container .details-container2 .info{
    float: left;
    font-size: 0.8em;
    letter-spacing: 1px;
    padding: 1px 0;
    color: #555555;
    font-style: italic;
}

.container .details-container2 .info-highlite{
    float: left;
    font-size: 0.8em;
    font-weight: 600;
    letter-spacing: 1px;
    padding: 0 0 10px 0;
    color: #333333;
}

.container .header-row {
    float: left;
    text-align: left;
    background: #a2a2a2;
    padding: 10px;
    width: 100%;
    color: #333333;
    letter-spacing: 1px;
    font-size: 0.8em;
}

.container .header-row .qty-header{
    float: left;
    width: 80px;
    font-size: 0.8em;
}

.container .header-row .unit-header{
    float: left;
    width: 80px;
    font-size: 0.8em;
}

.container .header-row .desc-header{
    float: left;
    width: 300px;
    font-size: 0.8em;
}

.container .header-row .sub-header{
    float: left;
    width: 80px;
    font-size: 0.8em;
}

.container .row {
    float: left;
    text-align: left;
    background: #f2f2f2;
    padding: 10px;
    width: 100%;
    color: #333333;
    letter-spacing: 1px;
    font-size: 0.8em;
}

.container .row .qty-header{
    float: left;
    width: 80px;
    font-size: 0.8em;
}

.container .row .unit-header{
    float: left;
    width: 80px;
    font-size: 0.8em;
}

.container .row .desc-header{
    float: left;
    width: 300px;
    font-size: 0.8em;
}

.container .row .sub-header{
    float: left;
    width: 80px;
    font-size: 0.8em;
}

.container .summary{
    float: right;
    padding: 5px;
    font-size: 0.8em;
}

.container .summary .label{
    float: left;
    padding: 2px 10px;
    width: 120px;
    font-size: 1em;
    color: #333333;
    letter-spacing: 1px;
    font-size: 0.8em;
}

.container .summary .value{
    float: left;
    padding: 2px 0;
    font-weight: 600;
    letter-spacing: 1px;
    color: #333333;
    font-size: 0.8em;
}
        
</style>
  
</head>

<body>   
    <div class='container'>
        <div class='title'>Auftrag xGyL45</div>
        <div class='clearfix'></div>
        <div class='company'>Online Cinema Ticket - wibas etarate</div>
        <div class='spacer'></div>
        <div class='date'>Datum: ${date}</div>
        <div class='clearfix'></div>
        <hr />
        <div class='details-container'>
            <div class='info'>Karteninhaber</div>
            <div class='clearfix'></div>
            <div class='info-highlite'>${name}</div>
            <div class='clearfix'></div>
            <div class='info'>Kartennummer</div>
            <div class='clearfix'></div>
            <div class='info-highlite'>**** **** **** *${card}</div>
            <div class='clearfix'></div>
            <div class='info'>Gultig bis</div>
            <div class='clearfix'></div>
            <div class='info-highlite'>${expiryDate}</div>
        </div>
        
        <div class='details-container2'>
            <div class='info'>Rechnung #</div>
            <div class='clearfix'></div>
            <div class='info-highlite'>${transactionId}</div>
            <div class='clearfix'></div>
            <div class='info'>Auftragsnummer</div>
            <div class='clearfix'></div>
            <div class='info-highlite'>${genCode}</div>
            <div class='clearfix'></div>
            
        </div>
        
        <div class='spacer'></div>
        <hr />
        <div class='spacer'></div>

        <div class='details-container'>
            <div class='info'>Film</div>
            <div class='clearfix'></div>
            <div class='info-highlite'>${movie}</div>
            <div class='clearfix'></div>
            <div class='info'>Zeit</div>
            <div class='clearfix'></div>
            <div class='info-highlite'>${time}</div>
            <div class='clearfix'></div>
            <div class='info'>Halle</div>
            <div class='clearfix'></div>
            <div class='info-highlite'>${auditorium}</div>
        </div>
        
        <div class='spacer'></div>
        <div class='seat-label'>gekaufte Sitze</div>
        <div class='clearfix'></div>
        <div class='header-row' style='background:none; padding-left:0'>
            <div class='qty-header'>Reihe</div>
            <div class='unit-header'>Säule</div>
        </div>
        <div class='clearfix'></div>
        ${dySeats}
        
        <div class='spacer'></div>
        <div class='header-row'>
            <div class='qty-header'>QTY</div>
            <div class='unit-header'>Einheit</div>
            <div class='desc-header'>Beschreibung</div>
            <div class='sub-header'>Zwischensumme</div>
        </div>
        <div class='clearfix'></div>
        <div class='row'>
            <div class='qty-header'>${numberSeats}</div>
            <div class='unit-header'>${price}</div>
            <div class='desc-header'>${desc}</div>
            <div class='sub-header'>${totalPrice}</div>
        </div>
        <div class='spacer'></div>
        
        <div class='summary'>
            <div class='label'>Zwischensumme</div>
            <div class='value'>${totalPrice} EUR</div>
            <div class='clearfix'></div>
            <div class='label'>MwSt(0%)</div>
            <div class='value'>0 EUR</div>
            <div class='spacer'></div>
            <div class='label'>gesamt</div>
            <div class='value'>${totalPrice} EUR</div>
        </div>
    </div>
</body>
</html>

    
    `;

}