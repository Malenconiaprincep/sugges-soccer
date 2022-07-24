import { imgs } from "../notionpic"
import "./index.css"

// const host = `http://10.255.128.9:9999`
const host = `http://192.168.2.100:9999`

const App = () => {
  const data = [
    // {
    //   sho: 72,
    //   pac: 87,
    //   def: 71,
    //   dri: 82,
    //   pas: 85,git st
    //   phy: 73,
    //   image: "https://cdn.sofifa.net/players/000/041/07_360.png",
    //   familyName: "Iniesta",
    //   givenName: "",
    //   nationality: "Spain",
    //   pos: "CM",
    //   affiliation: "FC Barcelona",
    //   birthDate: "1984-05-11",
    //   rating: "83",
    //   clublogo: "https://cdn.sofifa.net/teams/241/60.png",
    //   age: "22",
    // },
    // {
    //   sho: 74,
    //   pac: 85,
    //   def: 73,
    //   dri: 86,
    //   pas: 84,
    //   phy: 74,
    //   image: "https://cdn.sofifa.net/players/000/041/08_360.png",
    //   familyName: "Iniesta",
    //   givenName: "",
    //   nationality: "Spain",
    //   pos: "CM",
    //   affiliation: "FC Barcelona",
    //   birthDate: "1984-05-11",
    //   rating: "84",
    //   clublogo: "https://cdn.sofifa.net/teams/241/60.png",
    //   age: "23",
    // },
    // {
    //   sho: 75,
    //   pac: 82,
    //   def: 69,
    //   dri: 90,
    //   pas: 89,
    //   phy: 66,
    //   image: "https://cdn.sofifa.net/players/000/041/09_360.png",
    //   familyName: "Iniesta",
    //   givenName: "",
    //   nationality: "Spain",
    //   pos: "CM",
    //   affiliation: "FC Barcelona",
    //   birthDate: "1984-05-11",
    //   rating: "85",
    //   clublogo: "https://cdn.sofifa.net/teams/241/60.png",
    //   age: "24",
    // },
    // {
    //   sho: 76,
    //   pac: 83,
    //   def: 63,
    //   dri: 91,
    //   pas: 89,
    //   phy: 68,
    //   image: "https://cdn.sofifa.net/players/000/041/10_360.png",
    //   familyName: "Iniesta",
    //   givenName: "",
    //   nationality: "Spain",
    //   pos: "CAM",
    //   affiliation: "FC Barcelona",
    //   birthDate: "1984-05-11",
    //   rating: "87",
    //   clublogo: "https://cdn.sofifa.net/teams/241/60.png",
    //   age: "25",
    // },
    // {
    //   sho: 74,
    //   pac: 82,
    //   def: 58,
    //   dri: 92,
    //   pas: 90,
    //   phy: 63,
    //   image: "https://cdn.sofifa.net/players/000/041/11_360.png",
    //   familyName: "Iniesta Luján",
    //   givenName: "Andrés",
    //   nationality: "Spain",
    //   pos: "CAM",
    //   affiliation: "FC Barcelona",
    //   birthDate: "1984-05-11",
    //   rating: "87",
    //   clublogo: "https://cdn.sofifa.net/teams/241/60.png",
    //   age: "26",
    // },[
    {
      sho: 71,
      pac: 67,
      def: 61,
      dri: 87,
      pas: 93,
      phy: 64,
      image: "https://cdn.sofifa.net/players/010/535/12_360.png",
      familyName: "Hernández Creus",
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
      familyName: "Hernández Creus",
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
      familyName: "Hernández Creus",
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
      familyName: "Hernández Creus",
      givenName: "Xavier",
      nationality: "Spain",
      pos: "CM",
      affiliation: "FC Barcelona",
      birthDate: "1980-01-25",
      rating: "86",
      clublogo: "https://cdn.sofifa.net/teams/241/60.png",
      age: "34",
    },
    {
      sho: 59,
      pac: 52,
      def: 69,
      dri: 66,
      pas: 74,
      phy: 76,
      image: "https://cdn.sofifa.net/players/179/528/16_360.png",
      familyName: "Torres Buigues",
      givenName: "Xavier",
      nationality: "Spain",
      pos: "CDM",
      affiliation: "Real Betis Balompié",
      birthDate: "1986-11-21",
      rating: "74",
      clublogo: "https://cdn.sofifa.net/teams/449/60.png",
      age: "28",
    },
    {
      sho: 58,
      pac: 54,
      def: 68,
      dri: 61,
      pas: 68,
      phy: 75,
      image: "https://cdn.sofifa.net/players/179/528/17_360.png",
      familyName: "Torres Buigues",
      givenName: "Xavier",
      nationality: "Spain",
      pos: "CDM",
      affiliation: "Real Sporting de Gijón",
      birthDate: "1986-11-21",
      rating: "71",
      clublogo: "https://cdn.sofifa.net/teams/459/60.png",
      age: "29",
    },
    {
      sho: 58,
      pac: 54,
      def: 68,
      dri: 61,
      pas: 68,
      phy: 75,
      image: "https://cdn.sofifa.net/players/179/528/18_360.png",
      familyName: "Torres Buigues",
      givenName: "Xavier",
      nationality: "Spain",
      pos: "CDM",
      affiliation: "Perth Glory",
      birthDate: "1986-11-21",
      rating: "71",
      clublogo: "https://cdn.sofifa.net/teams/111399/60.png",
      age: "30",
    },
    {
      sho: 59,
      pac: 48,
      def: 67,
      dri: 62,
      pas: 68,
      phy: 77,
      image: "https://cdn.sofifa.net/players/179/528/19_360.png",
      familyName: "Torres Buigues",
      givenName: "Xavier",
      nationality: "Spain",
      pos: "CDM",
      affiliation: "Elche CF",
      birthDate: "1986-11-21",
      rating: "71",
      clublogo: "https://cdn.sofifa.net/teams/468/60.png",
      age: "31",
    },
    {
      sho: 51,
      pac: 74,
      def: 70,
      dri: 70,
      pas: 66,
      phy: 65,
      image: "https://cdn.sofifa.net/players/215/725/20_360.png",
      familyName: "Quintillà Guasch",
      givenName: "Xavier",
      nationality: "Spain",
      pos: "LB",
      affiliation: "Villarreal CF",
      birthDate: "1996-08-23",
      rating: "73",
      clublogo: "https://cdn.sofifa.net/teams/483/60.png",
      age: "22",
    },
    {
      sho: 51,
      pac: 72,
      def: 70,
      dri: 70,
      pas: 67,
      phy: 65,
      image: "https://cdn.sofifa.net/players/215/725/21_360.png",
      familyName: "Quintillà Guasch",
      givenName: "Xavier",
      nationality: "Spain",
      pos: "LB",
      affiliation: "Norwich City",
      birthDate: "1996-08-23",
      rating: "73",
      clublogo: "https://cdn.sofifa.net/teams/1792/60.png",
      age: "23",
    },
    {
      sho: 60,
      pac: 62,
      def: 70,
      dri: 64,
      pas: 69,
      phy: 77,
      image: "https://cdn.sofifa.net/players/179/528/22_360.png",
      familyName: "Torres Buigues",
      givenName: "Xavier",
      nationality: "Spain",
      pos: "CDM",
      affiliation: "CD Lugo",
      birthDate: "1986-11-21",
      rating: "73",
      clublogo: "https://cdn.sofifa.net/teams/110831/60.png",
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
