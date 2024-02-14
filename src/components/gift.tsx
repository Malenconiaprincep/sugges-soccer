enum GiftType {
  // 切换模式
  // 棒棒糖  竞速模式
  bangbangtang = 1,
}

export const GiftComponent = () => {
  const list = [
    {
      title: "娱乐模式",
      type: GiftType.bangbangtang,
      img: "/xiaoxinxin.png",
      subtitle: "小心心",
    },
    {
      title: "竞速模式",
      type: GiftType.bangbangtang,
      img: "/douyin.png",
      subtitle: "抖音",
    },
    // {
    //   title: "积分模式（暂未开放）",
    // },
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
                <img src={item.img} alt="" width={30} />
                <span>{item.title}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
