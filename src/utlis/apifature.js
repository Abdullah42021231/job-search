export class ApiFeature {
    constructor(mogooseQuery , queryData){
        this.mogooseQuery = mogooseQuery
        this.queryData= queryData
     }

     filter (){
        let {workingTime , location , name , Tskills,...filter} = this.queryData
        filter = JSON.parse(JSON.stringify(filter).replace(/'get|gt|let|lt'/g,match=>`$${match}`))
        this.mogooseQuery.find(filter)
        return this
     }
    }