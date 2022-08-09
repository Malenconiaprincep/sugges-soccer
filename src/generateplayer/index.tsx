import axios from "axios"
import { imgs } from "../notionpic"
import "./index.css"

// const host = `http://10.255.128.9:9999`
const host = `http://localhost:9999`

const App = () => {
  const data = {
    notionLogo: "./data/spain/teams-1362-180.png",
    notionName: "西班牙",
    players: [
      {
        left: "0.8%",
        top: "7.5%",
        img: "./data/spain/players-230-142-22_180.png",
        href: "/player/230142/mikel-oyarzabal-ugarte/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Oyarzabal",
        teamlogo: "./data/spain/teams-457-180.png",
        pac: 82,
        sho: 82,
        pas: 81,
        dri: 84,
        def: 41,
        phy: 63,
        rating: "85",
        pos: "LW",
      },
      {
        left: "35.956%",
        top: "-2.5%",
        img: "./data/spain/players-201-153-22_180.png",
        href: "/player/201153/alvaro-borja-morata-martin/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Morata",
        teamlogo: "./data/spain/teams-240-180.png",
        pac: 82,
        sho: 78,
        pas: 72,
        dri: 79,
        def: 31,
        phy: 77,
        rating: "81",
        pos: "ST",
      },
      {
        left: "71.2%",
        top: "7.5%",
        img: "./data/spain/players-241-461-22_180.png",
        href: "/player/241461/ferran-torres-garcia/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Ferran Torres",
        teamlogo: "./data/spain/teams-241-180.png",
        pac: 84,
        sho: 79,
        pas: 79,
        dri: 84,
        def: 35,
        phy: 67,
        rating: "83",
        pos: "RW",
      },
      {
        left: "21.92%",
        top: "30%",
        img: "./data/spain/players-251-854-22_180.png",
        href: "/player/251854/pedro-gonzalez-lopez/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Pedri",
        teamlogo: "./data/spain/teams-241-180.png",
        pac: 78,
        sho: 67,
        pas: 81,
        dri: 87,
        def: 68,
        phy: 67,
        rating: "84",
        pos: "CM",
      },
      {
        left: "50.08%",
        top: "30%",
        img: "./data/spain/players-193-747-22_180.png",
        href: "/player/193747/jorge-resurreccion/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Koke",
        teamlogo: "./data/spain/teams-240-180.png",
        pac: 70,
        sho: 73,
        pas: 85,
        dri: 81,
        def: 79,
        phy: 79,
        rating: "85",
        pos: "CM",
      },
      {
        left: "36%",
        top: "47.5%",
        img: "./data/spain/players-189-511-22_180.png",
        href: "/player/189511/sergio-busquets-burgos/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Sergio Busquets",
        teamlogo: "./data/spain/teams-241-180.png",
        pac: 42,
        sho: 62,
        pas: 79,
        dri: 79,
        def: 81,
        phy: 73,
        rating: "84",
        pos: "CDM",
      },
      {
        left: "-0.0624%",
        top: "62.5%",
        img: "./data/spain/players-189-332-22_180.png",
        href: "/player/189332/jordi-alba-ramos/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Jordi Alba",
        teamlogo: "./data/spain/teams-241-180.png",
        pac: 84,
        sho: 70,
        pas: 80,
        dri: 82,
        def: 77,
        phy: 71,
        rating: "84",
        pos: "LB",
      },
      {
        left: "21.568%",
        top: "67.5%",
        img: "./data/spain/players-241-464-22_180.png",
        href: "/player/241464/pau-francisco-torres/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Pau Torres",
        teamlogo: "./data/spain/teams-483-180.png",
        pac: 72,
        sho: 38,
        pas: 67,
        dri: 70,
        def: 84,
        phy: 80,
        rating: "82",
        pos: "CB",
      },
      {
        left: "50.3352%",
        top: "67.5%",
        img: "./data/spain/players-245-037-22_180.png",
        href: "/player/245037/eric-garcia-martret/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Eric García",
        teamlogo: "./data/spain/teams-241-180.png",
        pac: 65,
        sho: 44,
        pas: 70,
        dri: 68,
        def: 81,
        phy: 72,
        rating: "79",
        pos: "CB",
      },
      {
        left: "72.5992%",
        top: "62.5%",
        img: "./data/spain/players-204-963-22_180.png",
        href: "/player/204963/daniel-carvajal-ramos/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Carvajal",
        teamlogo: "./data/spain/teams-243-180.png",
        pac: 77,
        sho: 54,
        pas: 77,
        dri: 80,
        def: 79,
        phy: 79,
        rating: "84",
        pos: "RB",
      },
      {
        left: "36%",
        top: "83.25%",
        img: "./data/spain/players-230-869-22_180.png",
        href: "/player/230869/unai-simon-mendibil/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Unai Simón",
        teamlogo: "./data/spain/teams-448-180.png",
        pac: 82,
        sho: 78,
        pas: 77,
        dri: 85,
        def: 48,
        phy: 85,
        rating: "82",
        pos: "GK",
      },
    ],
    teamname: "spain",
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
