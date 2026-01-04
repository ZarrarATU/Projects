import { useState,useEffect } from "react"
import { getPosts } from "../api/postAPI"

function Posts() {

    const [data, setData] = useState([])

    async function getPostsData() {
        const res = await getPosts()
        setData(res.data)

    }

    useEffect(() => {
        getPostsData()
        console.log(data);

    }, [])


    return (
         <div className="posts">
        {
          data.map(post => {
            return <div key={post.id} className="post">
              <div className="section">

                <h3 className="title">{post.title}</h3>
                <p className="body">{post.body}</p>

                <button>EDIT</button>
                <button>DELETE</button>

              </div>
            </div>
          })
        }
      </div>
    )
}

export default Posts