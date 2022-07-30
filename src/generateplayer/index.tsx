import axios from "axios"
import { imgs } from "../notionpic"
import "./index.css"

// const host = `http://10.255.128.9:9999`
const host = `http://localhost:9999`

const App = () => {
  const data = {
    notionLogo: "./data/france/teams-1335-180.png",
    notionName: "法国",
    players: [
      {
        left: "25.44%",
        top: "0%",
        img: "./data/france/players-231-747-22_180.png",
        href: "/player/231747/kylian-mbappe/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Mbappé",
        teamlogo: "./data/france/teams-73-180.png",
        pac: 97,
        sho: 88,
        pas: 80,
        dri: 92,
        def: 36,
        phy: 77,
        rating: "91",
        pos: "ST",
      },
      {
        left: "44.2632%",
        top: "-2.07%",
        img: "./data/france/players-178-509-22_180.png",
        href: "/player/178509/olivier-giroud/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Giroud",
        teamlogo: "./data/france/teams-47-180.png",
        pac: 42,
        sho: 82,
        pas: 72,
        dri: 73,
        def: 42,
        phy: 79,
        rating: "81",
        pos: "ST",
      },
      {
        left: "36%",
        top: "18.75%",
        img: "./data/france/players-194-765-22_180.png",
        href: "/player/194765/antoine-griezmann/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Griezmann",
        teamlogo: "./data/france/teams-240-180.png",
        pac: 80,
        sho: 84,
        pas: 84,
        dri: 87,
        def: 52,
        phy: 72,
        rating: "85",
        pos: "ST",
      },
      {
        left: "-3.6%",
        top: "32.5%",
        img: "./data/france/players-232-656-22_180.png",
        href: "/player/232656/theo-hernandez/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Hernández",
        teamlogo: "./data/france/teams-47-180.png",
        pac: 93,
        sho: 72,
        pas: 76,
        dri: 81,
        def: 78,
        phy: 83,
        rating: "84",
        pos: "LB",
      },
      {
        left: "74.4648%",
        top: "32.5%",
        img: "./data/france/players-213-345-22_180.png",
        href: "/player/213345/kingsley-coman/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Coman",
        teamlogo: "./data/france/teams-21-180.png",
        pac: 92,
        sho: 77,
        pas: 78,
        dri: 87,
        def: 30,
        phy: 60,
        rating: "85",
        pos: "LM",
      },
      {
        left: "22.8%",
        top: "51.25%",
        img: "./data/france/players-195-864-22_180.png",
        href: "/player/195864/paul-pogba/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Pogba",
        teamlogo: "./data/france/teams-45-180.png",
        pac: 69,
        sho: 81,
        pas: 86,
        dri: 86,
        def: 63,
        phy: 82,
        rating: "86",
        pos: "CM",
      },
      {
        left: "49.2%",
        top: "51.25%",
        img: "./data/france/players-215-914-22_180.png",
        href: "/player/215914/ngolo-kante/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Kanté",
        teamlogo: "./data/france/teams-5-180.png",
        pac: 78,
        sho: 66,
        pas: 75,
        dri: 82,
        def: 87,
        phy: 83,
        rating: "90",
        pos: "CDM",
      },
      {
        left: "17.7664%",
        top: "69.84%",
        img: "./data/france/players-220-814-22_180.png",
        href: "/player/220814/lucas-hernandez/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Hernández",
        teamlogo: "./data/france/teams-21-180.png",
        pac: 77,
        sho: 54,
        pas: 69,
        dri: 71,
        def: 85,
        phy: 80,
        rating: "84",
        pos: "CB",
      },
      {
        left: "36%",
        top: "70%",
        img: "./data/france/players-201-535-22_180.png",
        href: "/player/201535/raphael-varane/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Varane",
        teamlogo: "./data/france/teams-11-180.png",
        pac: 82,
        sho: 49,
        pas: 64,
        dri: 66,
        def: 86,
        phy: 81,
        rating: "85",
        pos: "CB",
      },
      {
        left: "54.7%",
        top: "69.84%",
        img: "./data/france/players-241-486-22_180.png",
        href: "/player/241486/jules-kounde/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Koundé",
        teamlogo: "./data/france/teams-481-180.png",
        pac: 82,
        sho: 45,
        pas: 64,
        dri: 72,
        def: 84,
        phy: 78,
        rating: "83",
        pos: "CB",
      },
      {
        left: "36%",
        top: "83.25%",
        img: "./data/france/players-167-948-22_180.png",
        href: "/player/167948/hugo-lloris/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Lloris",
        teamlogo: "./data/france/teams-18-180.png",
        pac: 88,
        sho: 83,
        pas: 65,
        dri: 88,
        def: 61,
        phy: 84,
        rating: "87",
        pos: "GK",
      },
    ],
    teamname: "france",
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
