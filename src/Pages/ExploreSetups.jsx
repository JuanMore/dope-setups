import { Link } from "react-router-dom"
import categoryImg from "../imgs/1_workstation.jpeg"

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
                        <img src={categoryImg}
                            alt="gaming"
                            className="exploreCategoryImg" />
                        <p className="exploreCategoryName">Gaming</p>
                    </Link>
                    <Link to="/category/programming">
                        <img src={categoryImg}
                            alt="programming"
                            className="exploreCategoryImg" />
                        <p className="exploreCategoryName">Programming</p>
                    </Link>
                </div>
            </main>
        </div>
    )
}

export default ExploreSetups
