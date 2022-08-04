import axios from "axios"
import { imgs } from "../notionpic"
import "./index.css"

// const host = `http://10.255.128.9:9999`
const host = `http://localhost:9999`

const App = () => {
  const data = {
    notionLogo: "./data/portugal/teams-1354-180.png",
    notionName: "葡萄牙",
    players: [
      {
        left: "-1.4%",
        top: "2.5%",
        img: "./data/portugal/players-224-458-22_180.png",
        href: "/player/224458/diogo-jose-teixeira-da-silva/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Diogo Jota",
        teamlogo: "./data/portugal/teams-9-180.png",
        pac: 85,
        sho: 83,
        pas: 75,
        dri: 85,
        def: 57,
        phy: 78,
        rating: "85",
        pos: "CF",
      },
      {
        left: "35.956%",
        top: "-2.5%",
        img: "./data/portugal/players-020-801-22_180.png",
        href: "/player/20801/c-ronaldo-dos-santos-aveiro/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Cristiano Ronaldo",
        teamlogo: "./data/portugal/teams-11-180.png",
        pac: 85,
        sho: 93,
        pas: 80,
        dri: 86,
        def: 34,
        phy: 75,
        rating: "91",
        pos: "ST",
      },
      {
        left: "73.4%",
        top: "2.5%",
        img: "./data/portugal/players-218-667-22_180.png",
        href: "/player/218667/bernardo-mota-carvalho-e-silva/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Bernardo Silva",
        teamlogo: "./data/portugal/teams-10-180.png",
        pac: 80,
        sho: 78,
        pas: 83,
        dri: 91,
        def: 61,
        phy: 68,
        rating: "87",
        pos: "CAM",
      },
      {
        left: "21.92%",
        top: "33.83%",
        img: "./data/portugal/players-162-347-22_180.png",
        href: "/player/162347/joao-filipe-moutinho/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "João Moutinho",
        teamlogo: "./data/portugal/teams-110-180.png",
        pac: 50,
        sho: 71,
        pas: 84,
        dri: 80,
        def: 71,
        phy: 66,
        rating: "81",
        pos: "CM",
      },
      {
        left: "50.08%",
        top: "30%",
        img: "./data/portugal/players-212-198-22_180.png",
        href: "/player/212198/bruno-miguel-borges-fernandes/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Bruno Fernandes",
        teamlogo: "./data/portugal/teams-11-180.png",
        pac: 75,
        sho: 86,
        pas: 88,
        dri: 82,
        def: 67,
        phy: 75,
        rating: "87",
        pos: "CAM",
      },
      {
        left: "35.4632%",
        top: "51.03%",
        img: "./data/portugal/players-229-391-22_180.png",
        href: "/player/229391/joao-maria-palhinha-goncalves/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Palhinha",
        teamlogo: "./data/portugal/teams-144-180.png",
        pac: 65,
        sho: 65,
        pas: 70,
        dri: 72,
        def: 85,
        phy: 89,
        rating: "82",
        pos: "CDM",
      },
      {
        left: "0.8%",
        top: "62.5%",
        img: "./data/portugal/players-209-889-22_180.png",
        href: "/player/209889/raphael-guerreiro/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Guerreiro",
        teamlogo: "./data/portugal/teams-22-180.png",
        pac: 75,
        sho: 76,
        pas: 86,
        dri: 87,
        def: 76,
        phy: 56,
        rating: "83",
        pos: "LB",
      },
      {
        left: "22.4656%",
        top: "69.79%",
        img: "./data/portugal/players-239-818-22_180.png",
        href: "/player/239818/ruben-santos-gato-alves-dias/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Rúben Dias",
        teamlogo: "./data/portugal/teams-10-180.png",
        pac: 64,
        sho: 38,
        pas: 66,
        dri: 68,
        def: 88,
        phy: 89,
        rating: "88",
        pos: "CB",
      },
      {
        left: "50.3352%",
        top: "70.22%",
        img: "./data/portugal/players-120-533-22_180.png",
        href: "/player/120533/kepler-laveran-lima-ferreira/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Pepe",
        teamlogo: "./data/portugal/teams-236-180.png",
        pac: 77,
        sho: 51,
        pas: 60,
        dri: 61,
        def: 83,
        phy: 87,
        rating: "82",
        pos: "CB",
      },
      {
        left: "71.2%",
        top: "62.5%",
        img: "./data/portugal/players-210-514-22_180.png",
        href: "/player/210514/joao-pedro-cavaco-cancelo/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "João Cancelo",
        teamlogo: "./data/portugal/teams-10-180.png",
        pac: 85,
        sho: 73,
        pas: 85,
        dri: 85,
        def: 81,
        phy: 72,
        rating: "88",
        pos: "LB",
      },
      {
        left: "36%",
        top: "83.25%",
        img: "./data/portugal/players-178-005-22_180.png",
        href: "/player/178005/rui-pedro-dos-santos-patricio/",
        defaultimg: "https://cdn.sofifa.net/players/notfound_0_60.png",
        name: "Rui Patrício",
        teamlogo: "./data/portugal/teams-52-180.png",
        pac: 82,
        sho: 80,
        pas: 77,
        dri: 83,
        def: 55,
        phy: 80,
        rating: "82",
        pos: "GK",
      },
    ],
    teamname: "portugal",
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
