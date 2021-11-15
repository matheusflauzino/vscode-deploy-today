import axios from 'axios';
import * as moment from 'moment-timezone';

export interface IAPIResponse {
	shouldideploy: boolean;
	message: string;
}

export default class HttpRequestAPI {
    public static async getShoulDeployAPIResponse(): Promise<IAPIResponse> {
        const timezone = moment.tz.guess();
        const response = await axios.get(`https://shouldideploy.today/api?tz=${timezone}`);
        if (response.status === 200) {
            return response.data as IAPIResponse;
        } else {
            throw new Error("API request error");
        }
    }
}