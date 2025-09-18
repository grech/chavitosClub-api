import "dotenv/config"

import {get} from "env-var"


export const envs = {
     PORT: get('PORT').required().asPortNumber(),
     DB_HOST: get('DB_HOST').required().asString(),
     USER_DB: get('USER_DB').required().asString(),
     PASS_DB: get('PASS_DB').required().asString(),
     DB_PORT: get('DB_PORT').required().asPortNumber(),
     DB: get('DB').required().asString()
}