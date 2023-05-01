const dateFormatter = (date: string) =>{
 return date.slice(0, date.indexOf('T'));
}

export default dateFormatter;