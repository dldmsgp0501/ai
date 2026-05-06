$(function(){
    let movieData = [];
    
    let imgUrl = "https://image.tmdb.org/t/p/original"
    const getMovieData = async () => {
        let url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=011b7a3109a3d0d148b527113baaefc9&language=ko&page=1&region=KR&page=1';
        let respons = await fetch(url);
        let data = await respons.json()
        console.log(data);
        movieData = data;
        console.log(movieData);
        rander();
    };
    getMovieData();
    const rander = () =>{
        let movieCard="";
        movieData.results.map((item)=>{
            movieCard = movieCard + `<li>
                    <a href="#">
                        <div class="imgbox">
                            <img src=${imgUrl + item.poster_path} alt="악마는 프라다를 입는다">
                        </div>
                        <div class="txtbox">
                            <h3>${item.title}</h3>
                            <p>
                                <span>평점:${item.vote_average}</span>
                                <span>개봉일:${item.release_date}</span>
                            </p>
                            <div class="btn_wrap">
                                <button class="btn_like">♡${item.vote_count}</button>
                                <button class="btn_date">예매</button>
                                <button class="btn_cinema">CINEMA</button>
                            </div>
                        </div>
                    </a>
                </li>`;

                let list = document.getElementById("list")
                list.innerHTML = movieCard;
        });
    };
});