const Page404 = () => {
    return(
        <div style={{display: "flex",justifyContent: "center", marginTop: "90px"}}>
        <div style={{display: "flex", flexDirection: "column", textAlign: "center", color: "#34375d"}}>
        <h1>Упс! Страница не найдена.</h1>
        <img src="http://localhost:9000/test/404.png" style={{height: "400px"}}/>
        </div>
        </div>
    );
}

export default Page404;