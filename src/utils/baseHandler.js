
export default class BaseHandler{
    constructor(args={},context={}){
        this.args = args;
        this.context = context;
    }

    static execute(args,context={}) {
    return new this(args,context);
    }

}

