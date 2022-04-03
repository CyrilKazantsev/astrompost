import React, {useEffect, useState}  from "react"

export const useApi = (handler) => {

    const [data, setData] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        console.log("DONE");
        handler()
            .then( result => setData(result))
            .catch( err => setError(err))
    }, [handler])


    return {data, error}
}