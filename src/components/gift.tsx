enum GiftType {
  // 切换模式
  // 棒棒糖  竞速模式
  entertainment = 1,
  competition = 2,
  battle = 3,
}

export const list = [
  {
    title: "娱乐模式",
    type: GiftType.entertainment,
    img: "/bangbangtang.png",
    subtitle: "棒棒糖",
  },
  {
    title: "竞赛模式",
    type: GiftType.competition,
    img: "/xiaoxinxin.png",
    subtitle: "小心心",
  },
  {
    title: "赛局模式",
    type: GiftType.battle,
    img: "/3.png",
    subimg: "/new.gif",
    subtitle: "抖音",
  },
]

export const GiftComponent = () => {
  return (
    <div>
      <div>
        <div>模式切换（可以叠加）</div>
        <div
          style={{
            marginTop: "5px",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          {list.map((item, index) => {
            if(index === 0) return null
            return (
              <div key={index}>
                <img
                  src={item.img}
                  alt=""
                  width={30}
                  style={{ marginRight: "5px" }}
                />
                <span>{item.title}</span>
                {item.subimg && (
                  <img
                    src={item.subimg}
                    alt=""
                    width={30}
                    style={{ marginLeft: "5px" }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
