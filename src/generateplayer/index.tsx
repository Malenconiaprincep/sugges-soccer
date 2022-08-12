import axios from "axios"
import { imgs } from "../notionpic"
import "./index.css"

// const host = `http://10.255.128.9:9999`
const host = `http://localhost:9999`

const App = () => {
  const data = {
    notionLogo: "./data/Uruguay/teams-1377-180.png",
    notionName: "乌拉圭",
    players: [
      {
        left: "19.28%",
        top: "-2%",
        img: "./data/Uruguay/players-253-072-22_180.png",
        href: "/player/253072/darwin-nunez/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Núñez",
        teamlogo: "./data/Uruguay/teams-9-180.png",
        pac: 88,
        sho: 80,
        pas: 66,
        dri: 75,
        def: 42,
        phy: 86,
        rating: "79",
        pos: "ST",
      },
      {
        left: "51.84%",
        top: "-2%",
        img: "./data/Uruguay/players-176-580-22_180.png",
        href: "/player/176580/luis-suarez/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Suárez",
        teamlogo: "./data/Uruguay/teams-111325-180.png",
        pac: 71,
        sho: 89,
        pas: 80,
        dri: 81,
        def: 47,
        phy: 81,
        rating: "86",
        pos: "ST",
      },
      {
        left: "-0.96%",
        top: "35%",
        img: "./data/Uruguay/players-225-645-22_180.png",
        href: "/player/225645/giorgian-de-arrascaeta/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "De Arrascaeta",
        teamlogo: "./data/Uruguay/teams-1043-180.png",
        pac: 72,
        sho: 70,
        pas: 74,
        dri: 75,
        def: 44,
        phy: 49,
        rating: "73",
        pos: "CAM",
      },
      {
        left: "22.8%",
        top: "40%",
        img: "./data/Uruguay/players-239-053-22_180.png",
        href: "/player/239053/federico-valverde/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Valverde",
        teamlogo: "./data/Uruguay/teams-243-180.png",
        pac: 86,
        sho: 74,
        pas: 78,
        dri: 79,
        def: 77,
        phy: 80,
        rating: "83",
        pos: "CM",
      },
      {
        left: "49.2%",
        top: "40%",
        img: "./data/Uruguay/players-227-535-22_180.png",
        href: "/player/227535/rodrigo-bentancur/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Bentancur",
        teamlogo: "./data/Uruguay/teams-18-180.png",
        pac: 72,
        sho: 62,
        pas: 79,
        dri: 80,
        def: 78,
        phy: 78,
        rating: "79",
        pos: "CM",
      },
      {
        left: "72.96%",
        top: "35%",
        img: "./data/Uruguay/players-253-283-22_180.png",
        href: "/player/253283/facundo-pellistri/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Pellistri",
        teamlogo: "./data/Uruguay/teams-463-180.png",
        pac: 79,
        sho: 63,
        pas: 65,
        dri: 74,
        def: 27,
        phy: 61,
        rating: "70",
        pos: "RM",
      },
      {
        left: "0.8%",
        top: "65%",
        img: "./data/Uruguay/players-240-716-22_180.png",
        href: "/player/240716/mathias-olivera/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Olivera",
        teamlogo: "./data/Uruguay/teams-48-180.png",
        pac: 76,
        sho: 50,
        pas: 65,
        dri: 70,
        def: 74,
        phy: 77,
        rating: "76",
        pos: "LB",
      },
      {
        left: "23.68%",
        top: "70%",
        img: "./data/Uruguay/players-216-460-22_180.png",
        href: "/player/216460/jose-maria-gimenez/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Giménez",
        teamlogo: "./data/Uruguay/teams-240-180.png",
        pac: 72,
        sho: 45,
        pas: 57,
        dri: 60,
        def: 86,
        phy: 80,
        rating: "84",
        pos: "CB",
      },
      {
        left: "48.32%",
        top: "70%",
        img: "./data/Uruguay/players-182-493-22_180.png",
        href: "/player/182493/diego-godin/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Godín",
        teamlogo: "./data/Uruguay/teams-101088-180.png",
        pac: 54,
        sho: 48,
        pas: 63,
        dri: 61,
        def: 78,
        phy: 77,
        rating: "78",
        pos: "CB",
      },
      {
        left: "71.2%",
        top: "65%",
        img: "./data/Uruguay/players-253-163-22_180.png",
        href: "/player/253163/ronald-araujo/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Araujo",
        teamlogo: "./data/Uruguay/teams-241-180.png",
        pac: 77,
        sho: 47,
        pas: 61,
        dri: 57,
        def: 82,
        phy: 81,
        rating: "82",
        pos: "CB",
      },
      {
        left: "36%",
        top: "85%",
        img: "./data/Uruguay/players-223-690-22_180.png",
        href: "/player/223690/sergio-rochet/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Rochet",
        teamlogo: "./data/Uruguay/teams-111325-180.png",
        pac: 80,
        sho: 76,
        pas: 63,
        dri: 80,
        def: 49,
        phy: 76,
        rating: "77",
        pos: "GK",
      },
    ],
    teamname: "Uruguay",
  }

  const List: any = data.players.map((item: any, index) => {
    let classCard = ""

    if (item.rating >= 80) {
      classCard = "card-22-create-gold"
    } else if (item.rating >= 70) {
      classCard = "card-22-create-silver"
    } else {
      classCard = "card-22-create-bronze"
    }

    return (
      <div>
        <div
          id={`card${index}`}
          className={`card-22-create ${classCard}`}
          key={index}
        >
          <div className="card-22-create-face">
            <div className="card-22-create-face-inner">
              <img
                src={item.img}
                alt="Lionel Messi FIFA 18 Custom Card Creator Face"
              />
            </div>
          </div>
          <div className="card-22-create-badge2">
            <img src={data.notionLogo} width="100" height="100" />
          </div>
          {/* <div className="card-22-create-flag">
            <img src={data.notionLogo} width="72" height="43" />
          </div> */}
          <div className="card-22-create-name">{item.name}</div>
          <div className="card-22-create-rating">{item.rating}</div>
          <div className="card-22-create-position">{item.pos}</div>
          <div className="card-22-create-atts">
            <div className="card-22-create-atts1">
              <div className="card-22-create-attnum card-22-create-attnum1">
                {item.pac}
              </div>
              <div className="card-22-create-attlabel card-22-create-attlabel1">
                PAC
              </div>
              <div className="card-22-create-attnum card-22-create-attnum4">
                {item.dri}
              </div>
              <div className="card-22-create-attlabel card-22-create-attlabel4">
                DRI
              </div>
            </div>
            <div className="card-22-create-atts2">
              <div className="card-22-create-attnum card-22-create-attnum2">
                {item.sho}
              </div>
              <div className="card-22-create-attlabel card-22-create-attlabel2">
                SHO
              </div>
              <div className="card-22-create-attnum card-22-create-attnum5">
                {item.def}
              </div>
              <div className="card-22-create-attlabel card-22-create-attlabel5">
                DEF
              </div>
            </div>
            <div className="card-22-create-atts3">
              <div className="card-22-create-attnum card-22-create-attnum3">
                {item.pas}
              </div>
              <div className="card-22-create-attlabel card-22-create-attlabel3">
                PAS
              </div>
              <div className="card-22-create-attnum card-22-create-attnum6">
                {item.phy}
              </div>
              <div className="card-22-create-attlabel card-22-create-attlabel6">
                PHY
              </div>
            </div>
          </div>
          <div className="card-22-create-headeroverlay"></div>
          {/* <div className="card-22-create-split card-22-create-flag-split"></div> */}
          {/* <div className="card-22-create-split card-22-create-name-split"></div> */}
          <div className="card-22-create-split card-22-create-atts-split"></div>
          <div className="card-22-create-split card-22-create-chem-split"></div>
        </div>
        <button
          onClick={() => {
            const cardid = document.querySelector(
              `#card${index}`
            ) as HTMLElement
            ;(window as any)
              .html2canvas(cardid, {
                backgroundColor: null,
                width: 450,
                height: 650,
                allowTaint: true,
                useCORS: true,
              })
              .then((canvas: any) => {
                document.body.appendChild(canvas)
              })
              .catch((err: any) => {
                alert(err)
              })
          }}
        >
          打印
        </button>
      </div>
    )
  })

  return <div>{List}</div>
}

export default App
