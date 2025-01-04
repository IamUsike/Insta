class ApiResponse{
    constructor(stautsCode, data, message="success"){
        this.stautsCodecode=stautsCode,
        this.data=data,
        this.message=message
    }
}

export {ApiResponse}