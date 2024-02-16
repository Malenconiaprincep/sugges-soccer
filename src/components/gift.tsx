enum GiftType {
  // 切换模式
  // 棒棒糖  竞速模式
  xiaoxinxin = 1,
  douyin = 2,
  bangbangtang = 3,
}

export const GiftComponent = () => {
  const list = [
    {
      title: "娱乐模式",
      type: GiftType.bangbangtang,
      img: "/2.png",
      subtitle: "小心心",
    },
    {
      title: "竞赛模式",
      type: GiftType.bangbangtang,
      img: "/3.png",
      subtitle: "抖音",
    },
    {
      title: "赛局模式",
      type: GiftType.bangbangtang,
      img: "/1.png",
      subimg: "/new.gif",
      subtitle: "棒棒糖",
    },
  ]

  return (
    <div>
      <div>
        <div>模式切换（不予叠加）</div>
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
