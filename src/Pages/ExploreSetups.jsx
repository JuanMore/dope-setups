import { Link } from "react-router-dom"
import gaming from "../imgs/gaming.jpeg"
import programming from "../imgs/programming.jpeg"
import security from "../imgs/security.jpeg"
import other from "../imgs/other.jpeg"

function ExploreSetups() {
    return (
        <div className="explore-setups">
            <header>
                <p className="pageHeader">Explore all</p>
            </header>

            <main>

                <p className="exploreCategoryHeading">Categories</p>
                <div className="exploreCategories">
                    <Link to="/category/gaming">
                        <img src={gaming}
                            alt="gaming"
                            className="exploreCategoryImg" />
                        <p className="exploreCategoryName">Gaming</p>
                    </Link>
                    <Link to="/category/programming">
                        <img src={programming}
                            alt="programming"
                            className="exploreCategoryImg" />
                        <p className="exploreCategoryName">Programming</p>
                    </Link>
                    <Link to="/category/security">
                        <img src={security}
                            alt="programming"
                            className="exploreCategoryImg" />
                        <p className="exploreCategoryName">Security</p>
                    </Link>
                    <Link to="/category/other">
                        <img src={other}
                            alt="programming"
                            className="exploreCategoryImg" />
                        <p className="exploreCategoryName">Other</p>
                    </Link>
                </div>
            </main>
        </div>
    )
}

export default ExploreSetups
