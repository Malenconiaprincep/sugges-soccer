import { strapi } from "../lib/strapi"

export const pageSize = 10

export async function getList(page: number = 1): Promise<any> {
  try {
    const res = await strapi.find("teams", {
      populate: {
        [0]: "formations",
        [1]: "logo",
      },
      pagination: {
        page,
        pageSize,
      },
    })
    if (res.data) {
      return res.data
    }
  } catch (e) {
    return []
  }
}

export async function getCount() {
  try {
    const res = await strapi.find("teams")
    // @ts-ignore
    return res?.meta?.pagination?.total || 0
  } catch (e) {
    return null
  }
}

export async function getDetailTeam(tid: number) {
  try {
    const res = await strapi.find(`teams/${tid}`, {
      populate: {
        players: {
          populate: {
            [0]: "teams.logo",
            [1]: "avatar",
          },
        },
        formations: {
          populate: {
            [0]: "formations",
          },
        },
        logo: {
          populate: {
            [0]: "logo",
          },
        },
      },
    })

    return res.data
  } catch (e) {
    return null
  }
}
