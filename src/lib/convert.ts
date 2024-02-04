export enum IFROM {
  bili = "bili",
  douyin = "douyin",
}

export const convertMessage = (from: IFROM, data: any) => {
  if (from === IFROM.bili) {
    if (data.cmd === "DANMU_MSG") {
      return {
        nickname: data.info[2][1],
        content: data.info[1],
      }
    }
  }
  if (from === IFROM.douyin) {
    if (data && data.nickname && data.content) {
      return {
        nickname: data.nickname,
        content: data.content,
      }
    }
  }
}
