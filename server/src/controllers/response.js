
// Success
export const success = (res, message) => {
    if(typeof(message) == 'object'){
        res.status(200).json(message);
    }else{
        res.status(200).json({
            msg: message
        })
    }
}

// Error
export const error = (res, status, message="Error de servidor") => {
    if(status === 500){
        message="Error de servidor";
    } 
    if(typeof(message) == 'object'){
        return res.status(status).json(message);
    }
    res.status(status).json({
        msg: message
    });
}