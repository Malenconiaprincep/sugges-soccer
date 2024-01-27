import Strapi from "strapi-sdk-js"

const url = `https://soccer.innoz.art/`
// const url = `https://soccer.n.seon.im/`
const STRAPI_TOKEN = `af4bf2234f537edb9984db52af305a42623d1b13eea064795b420a41a96816cb238a0338197a3bf5ebef3e237776462e7829d17af3d069160771f67659b17f7612f40e7a44d36a0ea795888c4d1d278622e6639a511e5f4fe5c7b245885f3d743886a3da5b3f737b344104965412b7dd82541a85f8c7aad9fb4becd04ded27a4`

export const strapi = new Strapi({
  url,
  axiosOptions: {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  },
})
