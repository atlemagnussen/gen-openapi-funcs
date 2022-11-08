import * as OpenAPI from "openapi-typescript-codegen"
import * as fs from "fs"
import * as path from "path"
import * as http from "http"

let swaggerUrl = "http://localhost:5168/swagger/v1/swagger.json"
let localFolder = "api"
let localFile = "swagger.json"

const saveFile = (content, directory, name) => {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(directory)){
            fs.mkdirSync(directory)
        }
        const fullPath = path.join(directory, name)
        fs.writeFile(fullPath, content, (err) => {
            if(err)
                reject(err)
            else
                resolve(fullPath)
        })
    })
}

const getFileFromHttp = (url) => {
    return new Promise((resolve, reject) => {
        const request = http.request(url, (res) => {
            let data = ""
            res.on("data", (chunk) => data += chunk)
            res.on("end", () => resolve(data))
        })
            .on("error", (e) => reject(e))
        request.end()
    })
}

// const getLocalFile = (path) => {
//     const raw = fs.readFileSync(path)
//     const json = JSON.parse(raw)
// }

const gen = async (getFromHttp) => {
    try {
        if (getFromHttp) {
            const fileContent = await getFileFromHttp(swaggerUrl)
            if (!fileContent)
                console.error(`no file content for ${swaggerUrl}`)
            await saveFile(fileContent, localFolder, localFile)
        }
        
        OpenAPI.generate({
            input: `./${localFolder}/${localFile}`,
            output: `./${localFolder}`,
            exportCore: true,
            exportServices: true,
            exportModels: true,
            exportSchemas: true
        })
    }
    catch (err) {
        console.error(err)
    }
}
gen().then(() => console.log("done"))
    .catch(err => console.error(err))
