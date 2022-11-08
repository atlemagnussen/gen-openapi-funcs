import type { WeatherForecast } from "@api"
import rest from "./restService"

export const getWeathers = async () => {
    const url = "WeatherForecast"
    const res = await rest.get<WeatherForecast[]>(url)
    return res
}