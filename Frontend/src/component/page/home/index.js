import HomeTemplate from "../../template/home"


function Home(){
    return(
        <HomeTemplate
            labelHeader="This site is no longer update."
            labelGoto="Go to react.dev">
            </HomeTemplate>


        // <div style={{backgroundColor:"black", height:"60px", textAlign:"center"}}>
            
        //     <label style={{fontWeight:"bold",fontSize:18, color:"white", marginRight:"5px"}}>
        //         This site is no longer update
        //     </label>
        //     <a href = "https://reactjs.org/" ></a>

        // </div>
    )
}

export default Home;