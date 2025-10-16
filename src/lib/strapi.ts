import Strapi from "strapi-sdk-js"

// Strapi Cloud 配置
const url = process.env.REACT_APP_STRAPI_URL || `https://soccer.innoz.art/`
const STRAPI_TOKEN = process.env.REACT_APP_STRAPI_TOKEN || ''

export const strapi = new Strapi({
  url,
  axiosOptions: {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  },
})
