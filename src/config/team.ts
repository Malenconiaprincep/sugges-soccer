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
    console.log("getList response:", res)
    if (res.data) {
      return res.data
    }
    return []
  } catch (e) {
    console.error("getList error:", e)
    return []
  }
}

export async function getCount() {
  try {
    const res = await strapi.find("teams")
    console.log("getCount response:", res)
    // 修复 Strapi 5.x 的响应结构
    return res?.meta?.pagination?.total || res?.data?.length || 0
  } catch (e) {
    console.error("getCount error:", e)
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

export async function getPlayers(pids: number[]): Promise<any> {
  try {
    const res = await strapi.find(`players`, {
      filters: {
        pid: {
          $in: pids,
        },
      },
      populate: ["teams.logo", "avatar"],
    })

    return res.data
  } catch (e) {
    return null
  }
}
