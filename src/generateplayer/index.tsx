import { imgs } from "../notionpic"
import "./index.css"

// const host = `http://10.255.128.9:9999`
const host = `http://localhost:9999`

const App = () => {
  const data = [
    {
      sho: 75,
      pac: 81,
      def: 73,
      dri: 83,
      pas: 88,
      phy: 74,
      image: `${host}/1.png`,
      familyName: "Xavi",
      givenName: "",
      nationality: "Spain",
      pos: "CM",
      affiliation: "FC Barcelona",
      birthDate: "1980-01-25",
      rating: "85",
      clublogo: "https://cdn.sofifa.net/teams/241/60.png",
      age: "26",
    },
    {
      sho: 77,
      pac: 81,
      def: 75,
      dri: 84,
      pas: 89,
      phy: 74,
      image: `${host}/2.png`,
      familyName: "Xavi",
      givenName: "",
      nationality: "Spain",
      pos: "CM",
      affiliation: "FC Barcelona",
      birthDate: "1980-01-25",
      rating: "86",
      clublogo: "https://cdn.sofifa.net/teams/241/60.png",
      age: "27",
    },
    {
      sho: 79,
      pac: 78,
      def: 66,
      dri: 91,
      pas: 92,
      phy: 69,
      image: `${host}/3.png`,
      familyName: "Xavi",
      givenName: "",
      nationality: "Spain",
      pos: "CM",
      affiliation: "FC Barcelona",
      birthDate: "1980-01-25",
      rating: "87",
      clublogo: "https://cdn.sofifa.net/teams/241/60.png",
      age: "28",
    },
    {
      sho: 80,
      pac: 78,
      def: 67,
      dri: 90,
      pas: 93,
      phy: 70,
      image: `${host}/4.png`,
      familyName: "Xavi",
      givenName: "",
      nationality: "Spain",
      pos: "CM",
      affiliation: "FC Barcelona",
      birthDate: "1980-01-25",
      rating: "87",
      clublogo: "https://cdn.sofifa.net/teams/241/60.png",
      age: "29",
    },
    {
      sho: 75,
      pac: 73,
      def: 66,
      dri: 89,
      pas: 94,
      phy: 67,
      image: `${host}/5.png`,
      familyName: "Xavi",
      givenName: "Xavier",
      nationality: "Spain",
      pos: "CM",
      affiliation: "FC Barcelona",
      birthDate: "1980-01-25",
      rating: "87",
      clublogo: "https://cdn.sofifa.net/teams/241/60.png",
      age: "30",
    },
    {
      sho: 71,
      pac: 67,
      def: 61,
      dri: 87,
      pas: 93,
      phy: 64,
      image: "https://cdn.sofifa.net/players/010/535/12_360.png",
      familyName: "Xavi",
      givenName: "Xavier",
      nationality: "Spain",
      pos: "CM",
      affiliation: "FC Barcelona",
      birthDate: "1980-01-25",
      rating: "91",
      clublogo: "https://cdn.sofifa.net/teams/241/60.png",
      age: "31",
    },
    {
      sho: 73,
      pac: 66,
      def: 61,
      dri: 87,
      pas: 93,
      phy: 61,
      image: "https://cdn.sofifa.net/players/010/535/13_360.png",
      familyName: "Xavi",
      givenName: "Xavier",
      nationality: "Spain",
      pos: "CM",
      affiliation: "FC Barcelona",
      birthDate: "1980-01-25",
      rating: "90",
      clublogo: "https://cdn.sofifa.net/teams/241/60.png",
      age: "32",
    },
    {
      sho: 73,
      pac: 66,
      def: 60,
      dri: 86,
      pas: 92,
      phy: 61,
      image: "https://cdn.sofifa.net/players/010/535/14_360.png",
      familyName: "Xavi",
      givenName: "Xavier",
      nationality: "Spain",
      pos: "CM",
      affiliation: "FC Barcelona",
      birthDate: "1980-01-25",
      rating: "88",
      clublogo: "https://cdn.sofifa.net/teams/241/60.png",
      age: "33",
    },
    {
      sho: 72,
      pac: 66,
      def: 60,
      dri: 85,
      pas: 90,
      phy: 58,
      image: "https://cdn.sofifa.net/players/010/535/15_360.png",
      familyName: "Xavi",
      givenName: "Xavier",
      nationality: "Spain",
      pos: "CM",
      affiliation: "FC Barcelona",
      birthDate: "1980-01-25",
      rating: "86",
      clublogo: "https://cdn.sofifa.net/teams/241/60.png",
      age: "34",
    },
    //
    {
      sho: 75,
      pac: 81,
      def: 63,
      dri: 80,
      pas: 89,
      phy: 64,
      image: "https://www.futwiz.com/assets/img/fifa22/faces/255909.png",
      familyName: "Xavi",
      givenName: "Xavier",
      nationality: "Spain",
      pos: "CM",
      affiliation: "FC Barcelona",
      birthDate: "1980-01-25",
      rating: "88",
      clublogo: "https://cdn.sofifa.net/teams/241/60.png",
      age: "34",
    },
    {
      sho: 75,
      pac: 81,
      def: 63,
      dri: 80,
      pas: 89,
      phy: 64,
      image: "https://www.futwiz.com/assets/img/fifa22/faces/255909.png",
      familyName: "Xavi",
      givenName: "Xavier",
      nationality: "Spain",
      pos: "CM",
      affiliation: "FC Barcelona",
      birthDate: "1980-01-25",
      rating: "88",
      clublogo: "https://cdn.sofifa.net/teams/241/60.png",
      age: "34",
    },
    {
      sho: 74,
      pac: 77,
      def: 66,
      dri: 92,
      pas: 93,
      phy: 68,
      image: "https://www.futwiz.com/assets/img/fifa22/faces/255910.png",
      familyName: "Xavi",
      givenName: "Xavier",
      nationality: "Spain",
      pos: "CM",
      affiliation: "FC Barcelona",
      birthDate: "1980-01-25",
      rating: "90",
      clublogo: "https://cdn.sofifa.net/teams/241/60.png",
      age: "34",
    },
    {
      sho: 80,
      pac: 81,
      def: 72,
      dri: 93,
      pas: 95,
      phy: 72,
      image: "https://www.futwiz.com/assets/img/fifa22/faces/10535.png",
      familyName: "Xavi",
      givenName: "Xavier",
      nationality: "Spain",
      pos: "CM",
      affiliation: "FC Barcelona",
      birthDate: "1980-01-25",
      rating: "93",
      clublogo: "https://cdn.sofifa.net/teams/241/60.png",
      age: "34",
    },
    {
      sho: 81,
      pac: 83,
      def: 74,
      dri: 95,
      pas: 97,
      phy: 74,
      image: "https://www.futwiz.com/assets/img/fifa21/faces/p255911.png",
      familyName: "Xavi",
      givenName: "Xavier",
      nationality: "Spain",
      pos: "CM",
      affiliation: "FC Barcelona",
      birthDate: "1980-01-25",
      rating: "94",
      clublogo: "https://cdn.sofifa.net/teams/241/60.png",
      age: "94",
    },
    {
      sho: 81,
      pac: 83,
      def: 74,
      dri: 95,
      pas: 97,
      phy: 74,
      image: "https://www.futwiz.com/assets/img/fifa21/faces/p255911.png",
      familyName: "Xavi",
      givenName: "Xavier",
      nationality: "Spain",
      pos: "CM",
      affiliation: "FC Barcelona",
      birthDate: "1980-01-25",
      rating: "94",
      clublogo: "https://cdn.sofifa.net/teams/241/60.png",
      age: "94",
    },
    {
      sho: 84,
      pac: 84,
      def: 73,
      dri: 95,
      pas: 96,
      phy: 73,
      image: "https://www.futwiz.com/assets/img/fifa22/faces/p255911.png",
      familyName: "Xavi",
      givenName: "Xavier",
      nationality: "Spain",
      pos: "CM",
      affiliation: "FC Barcelona",
      birthDate: "1980-01-25",
      rating: "94",
      clublogo: "https://cdn.sofifa.net/teams/241/60.png",
      age: "34",
    },
  ]

  const List: any = data.map((item: any, index) => {
    let classCard = ""

    if (item.rating >= 80) {
      classCard = "card-22-create-gold"
    } else if (item.rating >= 70) {
      classCard = "card-22-create-silver"
    } else {
      classCard = "card-22-create-bronze"
    }

    if (index > 8) {
      classCard = "card-22-create-icon"
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
                src={item.image}
                alt="Lionel Messi FIFA 18 Custom Card Creator Face"
              />
            </div>
          </div>
          <div className="card-22-create-badge">
            <img src={item.clublogo} width="72" height="72" />
          </div>
          <div className="card-22-create-flag">
            <img
              src={`${host}/notion/${imgs[item.nationality]}`}
              width="72"
              height="43"
            />
          </div>
          <div className="card-22-create-name">{item.familyName}</div>
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
          <div className="card-22-create-split card-22-create-flag-split"></div>
          <div className="card-22-create-split card-22-create-name-split"></div>
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
