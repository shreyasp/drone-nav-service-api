import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const getToken = async (): Promise<any> => {
    const config = {
        headers: {
            "content-type": "application/json",
        },
    };
    const body = {
        client_id: `${process.env.AUTH0_CLIENT_ID}`,
        client_secret: `${process.env.AUTH0_CLIENT_SECRET}`,
        audience: `${process.env.AUTH0_AUDIENCE}`,
        grant_type: `${process.env.AUTH0_GRANT_TYPE}`,
    };
    const { data } = await axios.post(
        `${process.env.AUTH0_TOKEN_URL}`,
        body,
        config
    );

    return {
        accessToken: data.access_token,
        tokenType: data.token_type,
    };
};

export { getToken };
