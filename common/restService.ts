
const baseUrl = "https://localhost:7238/"


const jsonContentType = "application/json"

const get = async <T>(url: string) => {
    const req = createRequest(url, "get", jsonContentType)
    return await http<T>(req)
}
const post = async <T>(url: string, data: any) => {
    const req = createRequest(url, "post", jsonContentType, data)
    return await http<T>(req)
}

const postFile = async <T>(url: string, file: File) => {
    const fullUrl = `${baseUrl}/${url}`
    let fd = new FormData()
    fd.append('file', file)
    const req: RequestInit = {
        method: "POST",
        body: fd,
    }
    //loadingOrSaving.next(true)
    
    //
    const res = await fetch(fullUrl, req).catch((error) => {
        let errorFetchMsg = "Error posting file"
        console.error(error.message)
        //toast.error(errorFetchMsg)
        //loadingOrSaving.next(false)
        throw new Error(errorFetchMsg)
    })
    return resHandler(res)
}

const put = async <T>(url: string, data: any) => {
    const req = createRequest(url, "put", jsonContentType, data)
    return await http<T>(req)
}

const remove = async <T>(url: string) => {
    const req = createRequest(url, "delete")
    return await http<T>(req)
}

const createRequest = (url: string, method: string, contentType?: string, data?: any) => {
    
    const args: RequestInit = {
        method,
        headers: {}
    }
    if (contentType) {
        if (args.headers)
            args.headers["Content-Type"] = contentType
    }
    
    
    if (data) {
        if (contentType === jsonContentType)
            args.body = JSON.stringify(data)
        else
            args.body = data
    }
    
    const fullUrl = `${baseUrl}/${url}`
    return new Request(fullUrl, args)
}

async function http<T>(request: RequestInfo): Promise<T> {
    //loadingOrSaving.next(true)
    let errorFetchMsg
    const res = await fetch(request)
    .catch((error) => {
        errorFetchMsg = "Error fetching"
        console.error(error.message)
        //toast.error(errorFetchMsg)
        //loadingOrSaving.next(false)
        throw new Error(errorFetchMsg)
    })
    return resHandler(res)
}

const resHandler = async (res: Response) => {
    //loadingOrSaving.next(false)
    let errorFetchMsg: string
    if (res.ok) {
        const contentType = res.headers.get("content-type")
        if (res.status === 200 || res.status === 201) {
            
            if (contentType && contentType.includes("application/json")) {
                const json = await res.json()
                return json
            }
            const text = await res.text()
            return text
        }
        else {
            return ""
        }
    } else {
        console.error(`${res.statusText} (${res.status})`)
        
        errorFetchMsg = "Error fetching"
        if (res.status >= 400 && res.status < 500) {
            try {
                const pd = await res.json()
                console.log(pd)
                if (pd.title)
                    errorFetchMsg = pd.title
                else
                    errorFetchMsg = `status${res.status}`
            }
            catch (ex) {
                console.debug(ex);
            }
        } else {
            const message = await res.text()
            console.log(message)
        }
        
        //toast.error(errorFetchMsg)
        throw new Error(errorFetchMsg)
    }
}

export default { get, post, postFile, put, delete: remove }